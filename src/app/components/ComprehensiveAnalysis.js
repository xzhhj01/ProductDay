"use client";

import { useState } from "react";

export default function ComprehensiveAnalysis({ frames = [] }) {
    const [showIndividual, setShowIndividual] = useState(false);

    if (!frames || frames.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">분석 결과가 없습니다.</p>
            </div>
        );
    }

    // 전체 분석 요약 생성
    const generateSummary = () => {
        const validFrames = frames.filter((frame) => frame.gameAnalysis);

        if (validFrames.length === 0) {
            return {
                game: "알 수 없음",
                totalFrames: frames.length,
                analyzedFrames: 0,
                commonTags: [],
                overallAssessment: "분석할 수 있는 프레임이 없습니다.",
                champions: [],
                maps: [],
                situations: [],
            };
        }

        // 게임 식별
        const games = validFrames.map((f) => f.gameAnalysis.game);
        const gameConfidence = validFrames.map(
            (f) => f.gameAnalysis.confidence || 50
        );
        const avgConfidence =
            gameConfidence.reduce((a, b) => a + b, 0) / gameConfidence.length;
        const mostCommonGame = games
            .sort(
                (a, b) =>
                    games.filter((v) => v === a).length -
                    games.filter((v) => v === b).length
            )
            .pop();

        // 챔피언/에이전트 추출
        const champions = validFrames
            .map((f) => f.gameAnalysis.player?.champion)
            .filter((c) => c && c !== "확인불가" && c !== "Unknown")
            .filter((c, i, arr) => arr.indexOf(c) === i);

        // 맵 정보 추출
        const maps = validFrames
            .map((f) => f.gameAnalysis.gameState?.map)
            .filter((m) => m && m !== "확인불가" && m !== "Unknown")
            .filter((m, i, arr) => arr.indexOf(m) === i);

        // 상황 정보 추출
        const situations = validFrames
            .map((f) => f.gameAnalysis.gameState?.situation)
            .filter((s) => s && s !== "확인불가")
            .filter((s, i, arr) => arr.indexOf(s) === i);

        // 위치 정보 추출
        const locations = validFrames
            .map((f) => f.gameAnalysis.gameState?.location)
            .filter((l) => l && l !== "확인불가")
            .filter((l, i, arr) => arr.indexOf(l) === i);

        // 모든 태그 수집
        const allTags = validFrames.flatMap((f) => f.gameAnalysis.tags || []);
        const tagCounts = {};
        allTags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });

        const commonTags = Object.entries(tagCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 8)
            .map(([tag]) => tag);

        // 강점과 개선점 수집
        const strengths = validFrames.flatMap(
            (f) => f.gameAnalysis.analysis?.strengths || []
        );
        const improvements = validFrames.flatMap(
            (f) => f.gameAnalysis.analysis?.improvements || []
        );

        // 위험도 분석
        const threatLevels = validFrames.map(
            (f) => f.gameAnalysis.surroundings?.threatLevel
        );
        const dangerousFrames = threatLevels.filter(
            (t) => t === "위험" || t === "매우위험"
        ).length;

        return {
            game: mostCommonGame,
            gameConfidence: Math.round(avgConfidence),
            totalFrames: frames.length,
            analyzedFrames: validFrames.length,
            champions: [...new Set(champions)],
            maps: [...new Set(maps)],
            situations: [...new Set(situations)],
            locations: [...new Set(locations)],
            commonTags,
            strengths: [...new Set(strengths)].slice(0, 5),
            improvements: [...new Set(improvements)].slice(0, 5),
            dangerousFrames,
            threatPercentage: Math.round(
                (dangerousFrames / validFrames.length) * 100
            ),
        };
    };

    const summary = generateSummary();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const getGameIcon = (game) => {
        if (game === "lol") return "⚔️";
        if (game === "valorant") return "🎯";
        return "🎮";
    };

    const getConfidenceColor = (confidence) => {
        if (confidence >= 80) return "text-green-600";
        if (confidence >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <div className="space-y-6">
            {/* 전체 요약 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <span className="mr-2">
                            {getGameIcon(summary.game)}
                        </span>
                        📊 AI 분석 요약
                    </h3>
                    <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {summary.game?.toUpperCase() || "게임 분석"}
                        </span>
                        <span
                            className={`text-sm font-medium ${getConfidenceColor(
                                summary.gameConfidence
                            )}`}
                        >
                            신뢰도: {summary.gameConfidence}%
                        </span>
                    </div>
                </div>

                {/* 핵심 통계 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {summary.analyzedFrames}
                        </div>
                        <div className="text-sm text-gray-600">
                            분석된 프레임
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {summary.champions.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            식별된 캐릭터
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                            {summary.situations.length}
                        </div>
                        <div className="text-sm text-gray-600">다양한 상황</div>
                    </div>
                    <div className="text-center">
                        <div
                            className={`text-2xl font-bold ${
                                summary.threatPercentage > 50
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                        >
                            {summary.threatPercentage}%
                        </div>
                        <div className="text-sm text-gray-600">위험 상황</div>
                    </div>
                </div>

                {/* 식별된 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {/* 챔피언/에이전트 */}
                    {summary.champions.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                {summary.game === "lol" ? "챔피언" : "에이전트"}
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {summary.champions.map((champion, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                                    >
                                        {champion}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 맵 */}
                    {summary.maps.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                맵
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {summary.maps.map((map, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium"
                                    >
                                        {map}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 상황 */}
                    {summary.situations.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                주요 상황
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {summary.situations.map((situation, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
                                    >
                                        {situation}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 공통 태그 */}
                {summary.commonTags?.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                            🏷️ 주요 태그
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {summary.commonTags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-white text-blue-700 rounded text-sm border border-blue-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* 종합 평가 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {summary.strengths?.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                ✅ 잘한 점
                            </h4>
                            <ul className="space-y-1">
                                {summary.strengths
                                    .slice(0, 3)
                                    .map((strength, index) => (
                                        <li
                                            key={index}
                                            className="text-sm text-gray-700 pl-2"
                                        >
                                            • {strength}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}

                    {summary.improvements?.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-orange-700 mb-2 flex items-center">
                                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                🎯 개선할 점
                            </h4>
                            <ul className="space-y-1">
                                {summary.improvements
                                    .slice(0, 3)
                                    .map((improvement, index) => (
                                        <li
                                            key={index}
                                            className="text-sm text-gray-700 pl-2"
                                        >
                                            • {improvement}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* 개별 프레임 토글 */}
            <div className="text-center">
                <button
                    onClick={() => setShowIndividual(!showIndividual)}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                >
                    {showIndividual
                        ? "프레임별 분석 숨기기"
                        : "프레임별 분석 보기"}
                    <span className="ml-2">{showIndividual ? "↑" : "↓"}</span>
                </button>
            </div>

            {/* 개별 프레임 분석 */}
            {showIndividual && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-center">
                        🔍 프레임별 상세 분석
                    </h3>

                    {frames.map((frame, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                        >
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-gray-900">
                                        프레임 {index + 1} -{" "}
                                        {formatTime(frame.time)}
                                    </h4>
                                    {frame.gameAnalysis?.confidence && (
                                        <span
                                            className={`text-sm font-medium ${getConfidenceColor(
                                                frame.gameAnalysis.confidence
                                            )}`}
                                        >
                                            신뢰도:{" "}
                                            {frame.gameAnalysis.confidence}%
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
                                {/* 프레임 이미지 */}
                                <div className="space-y-3">
                                    <div className="relative">
                                        <img
                                            src={frame.dataUrl}
                                            alt={`프레임 ${index + 1}`}
                                            className="w-full h-auto rounded-lg shadow-sm"
                                        />
                                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                                            {formatTime(frame.time)}
                                        </div>
                                        {frame.gameAnalysis?.game && (
                                            <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                                                {getGameIcon(
                                                    frame.gameAnalysis.game
                                                )}{" "}
                                                {frame.gameAnalysis.game.toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 분석 결과 */}
                                <div className="space-y-4">
                                    {frame.gameAnalysis ? (
                                        <>
                                            {/* 캐릭터 정보 */}
                                            {frame.gameAnalysis.player && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">
                                                        🎭 플레이어 정보
                                                    </h5>
                                                    <div className="bg-gray-50 rounded p-3 space-y-2">
                                                        {frame.gameAnalysis
                                                            .player.champion &&
                                                            frame.gameAnalysis
                                                                .player
                                                                .champion !==
                                                                "확인불가" && (
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-600">
                                                                        {frame
                                                                            .gameAnalysis
                                                                            .game ===
                                                                        "lol"
                                                                            ? "챔피언:"
                                                                            : "에이전트:"}
                                                                    </span>
                                                                    <span className="font-medium text-blue-600">
                                                                        {
                                                                            frame
                                                                                .gameAnalysis
                                                                                .player
                                                                                .champion
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                        {frame.gameAnalysis
                                                            .player.role && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">
                                                                    역할:
                                                                </span>
                                                                <span className="font-medium">
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .player
                                                                            .role
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {frame.gameAnalysis
                                                            .player.health && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">
                                                                    체력:
                                                                </span>
                                                                <span
                                                                    className={`font-medium ${
                                                                        frame
                                                                            .gameAnalysis
                                                                            .player
                                                                            .health ===
                                                                        "위험"
                                                                            ? "text-red-600"
                                                                            : frame
                                                                                  .gameAnalysis
                                                                                  .player
                                                                                  .health ===
                                                                              "낮음"
                                                                            ? "text-orange-600"
                                                                            : "text-green-600"
                                                                    }`}
                                                                >
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .player
                                                                            .health
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {frame.gameAnalysis
                                                            .player
                                                            .positioning && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">
                                                                    포지셔닝:
                                                                </span>
                                                                <span className="font-medium">
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .player
                                                                            .positioning
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* 게임 상황 */}
                                            {frame.gameAnalysis.gameState && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">
                                                        🎮 게임 상황
                                                    </h5>
                                                    <div className="bg-blue-50 rounded p-3 space-y-2">
                                                        {frame.gameAnalysis
                                                            .gameState.map &&
                                                            frame.gameAnalysis
                                                                .gameState
                                                                .map !==
                                                                "확인불가" && (
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-600">
                                                                        맵:
                                                                    </span>
                                                                    <span className="font-medium text-blue-600">
                                                                        {
                                                                            frame
                                                                                .gameAnalysis
                                                                                .gameState
                                                                                .map
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                        {frame.gameAnalysis
                                                            .gameState
                                                            .location && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">
                                                                    위치:
                                                                </span>
                                                                <span className="font-medium">
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .gameState
                                                                            .location
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {frame.gameAnalysis
                                                            .gameState
                                                            .situation && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">
                                                                    상황:
                                                                </span>
                                                                <span className="font-medium">
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .gameState
                                                                            .situation
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {frame.gameAnalysis
                                                            .gameState
                                                            .phase && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">
                                                                    게임 단계:
                                                                </span>
                                                                <span className="font-medium">
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .gameState
                                                                            .phase
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {frame.gameAnalysis
                                                            .gameState
                                                            .gameTime && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">
                                                                    게임 시간:
                                                                </span>
                                                                <span className="font-medium">
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .gameState
                                                                            .gameTime
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* 위험도 및 주변 상황 */}
                                            {frame.gameAnalysis
                                                .surroundings && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">
                                                        ⚠️ 주변 상황
                                                    </h5>
                                                    <div className="bg-yellow-50 rounded p-3 space-y-2">
                                                        {frame.gameAnalysis
                                                            .surroundings
                                                            .threatLevel && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">
                                                                    위험도:
                                                                </span>
                                                                <span
                                                                    className={`font-medium ${
                                                                        frame
                                                                            .gameAnalysis
                                                                            .surroundings
                                                                            .threatLevel ===
                                                                        "매우위험"
                                                                            ? "text-red-600"
                                                                            : frame
                                                                                  .gameAnalysis
                                                                                  .surroundings
                                                                                  .threatLevel ===
                                                                              "위험"
                                                                            ? "text-orange-600"
                                                                            : frame
                                                                                  .gameAnalysis
                                                                                  .surroundings
                                                                                  .threatLevel ===
                                                                              "주의"
                                                                            ? "text-yellow-600"
                                                                            : "text-green-600"
                                                                    }`}
                                                                >
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .surroundings
                                                                            .threatLevel
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {frame.gameAnalysis
                                                            .surroundings.allies
                                                            ?.length > 0 && (
                                                            <div>
                                                                <span className="text-gray-600 text-sm">
                                                                    아군:
                                                                </span>
                                                                <div className="flex flex-wrap gap-1 mt-1">
                                                                    {frame.gameAnalysis.surroundings.allies.map(
                                                                        (
                                                                            ally,
                                                                            i
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                                                                            >
                                                                                {
                                                                                    ally
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {frame.gameAnalysis
                                                            .surroundings
                                                            .enemies?.length >
                                                            0 && (
                                                            <div>
                                                                <span className="text-gray-600 text-sm">
                                                                    적군:
                                                                </span>
                                                                <div className="flex flex-wrap gap-1 mt-1">
                                                                    {frame.gameAnalysis.surroundings.enemies.map(
                                                                        (
                                                                            enemy,
                                                                            i
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                                                                            >
                                                                                {
                                                                                    enemy
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* AI 분석 */}
                                            {frame.gameAnalysis.analysis && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">
                                                        🤖 AI 분석
                                                    </h5>
                                                    <div className="space-y-3">
                                                        {/* 핵심 포인트 */}
                                                        {frame.gameAnalysis
                                                            .analysis
                                                            .keyMoment && (
                                                            <div>
                                                                <h6 className="text-sm font-medium text-indigo-700 mb-1">
                                                                    💡 핵심
                                                                    포인트
                                                                </h6>
                                                                <p className="text-sm text-gray-700 bg-indigo-50 p-2 rounded">
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .analysis
                                                                            .keyMoment
                                                                    }
                                                                </p>
                                                            </div>
                                                        )}

                                                        {frame.gameAnalysis
                                                            .analysis.strengths
                                                            ?.length > 0 && (
                                                            <div>
                                                                <h6 className="text-sm font-medium text-green-700 mb-1">
                                                                    ✅ 잘한 점
                                                                </h6>
                                                                <ul className="text-sm text-gray-700 space-y-1">
                                                                    {frame.gameAnalysis.analysis.strengths.map(
                                                                        (
                                                                            strength,
                                                                            i
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="flex items-start"
                                                                            >
                                                                                <span className="text-green-500 mr-2">
                                                                                    ✓
                                                                                </span>
                                                                                {
                                                                                    strength
                                                                                }
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {frame.gameAnalysis
                                                            .analysis
                                                            .improvements
                                                            ?.length > 0 && (
                                                            <div>
                                                                <h6 className="text-sm font-medium text-orange-700 mb-1">
                                                                    🎯 개선할 점
                                                                </h6>
                                                                <ul className="text-sm text-gray-700 space-y-1">
                                                                    {frame.gameAnalysis.analysis.improvements.map(
                                                                        (
                                                                            improvement,
                                                                            i
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="flex items-start"
                                                                            >
                                                                                <span className="text-orange-500 mr-2">
                                                                                    →
                                                                                </span>
                                                                                {
                                                                                    improvement
                                                                                }
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {frame.gameAnalysis
                                                            .analysis
                                                            .recommendation && (
                                                            <div>
                                                                <h6 className="text-sm font-medium text-blue-700 mb-1">
                                                                    💬 추천 행동
                                                                </h6>
                                                                <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                                                                    💡{" "}
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .analysis
                                                                            .recommendation
                                                                    }
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* 기술적 정보 */}
                                            {frame.gameAnalysis.technical && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">
                                                        🔧 기술적 정보
                                                    </h5>
                                                    <div className="bg-gray-50 rounded p-3 space-y-2">
                                                        {frame.gameAnalysis
                                                            .technical
                                                            .ui_elements
                                                            ?.length > 0 && (
                                                            <div>
                                                                <span className="text-gray-600 text-sm">
                                                                    UI 요소:
                                                                </span>
                                                                <div className="flex flex-wrap gap-1 mt-1">
                                                                    {frame.gameAnalysis.technical.ui_elements.map(
                                                                        (
                                                                            element,
                                                                            i
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                                                            >
                                                                                {
                                                                                    element
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {frame.gameAnalysis
                                                            .technical
                                                            .minimap_info && (
                                                            <div className="text-sm">
                                                                <span className="text-gray-600">
                                                                    미니맵 정보:
                                                                </span>
                                                                <span className="ml-2 text-gray-700">
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .technical
                                                                            .minimap_info
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* 요약 */}
                                            {frame.gameAnalysis.summary && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">
                                                        📝 상황 요약
                                                    </h5>
                                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded leading-relaxed">
                                                        {
                                                            frame.gameAnalysis
                                                                .summary
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            {/* 태그 */}
                                            {frame.gameAnalysis.tags?.length >
                                                0 && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">
                                                        🏷️ 태그
                                                    </h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {frame.gameAnalysis.tags.map(
                                                            (tag, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : frame.error ? (
                                        <div className="text-center py-8">
                                            <div className="text-red-500 mb-2">
                                                ⚠️
                                            </div>
                                            <p className="text-sm text-red-600">
                                                분석 오류: {frame.error}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="text-gray-400 mb-2">
                                                🔄
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                분석 중...
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
