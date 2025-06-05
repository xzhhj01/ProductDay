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
            };
        }

        const games = validFrames.map((f) => f.gameAnalysis.game);
        const mostCommonGame = games
            .sort(
                (a, b) =>
                    games.filter((v) => v === a).length -
                    games.filter((v) => v === b).length
            )
            .pop();

        const allTags = validFrames.flatMap((f) => f.gameAnalysis.tags || []);
        const tagCounts = {};
        allTags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });

        const commonTags = Object.entries(tagCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([tag]) => tag);

        const strengths = validFrames.flatMap(
            (f) => f.gameAnalysis.analysis?.strengths || []
        );
        const improvements = validFrames.flatMap(
            (f) => f.gameAnalysis.analysis?.improvements || []
        );

        return {
            game: mostCommonGame,
            totalFrames: frames.length,
            analyzedFrames: validFrames.length,
            commonTags,
            strengths: [...new Set(strengths)].slice(0, 3),
            improvements: [...new Set(improvements)].slice(0, 3),
        };
    };

    const summary = generateSummary();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="space-y-6">
            {/* 전체 요약 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        📊 전체 분석 요약
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {summary.game?.toUpperCase() || "게임 분석"}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                            {summary.strengths?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600">잘한 점</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                            {summary.improvements?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600">개선할 점</div>
                    </div>
                </div>

                {/* 공통 태그 */}
                {summary.commonTags?.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                            주요 태그
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
                                잘한 점
                            </h4>
                            <ul className="space-y-1">
                                {summary.strengths.map((strength, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-700"
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
                                개선할 점
                            </h4>
                            <ul className="space-y-1">
                                {summary.improvements.map(
                                    (improvement, index) => (
                                        <li
                                            key={index}
                                            className="text-sm text-gray-700"
                                        >
                                            • {improvement}
                                        </li>
                                    )
                                )}
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
                        🎯 프레임별 상세 분석
                    </h3>

                    {frames.map((frame, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                        >
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                <h4 className="font-medium text-gray-900">
                                    프레임 {index + 1} -{" "}
                                    {formatTime(frame.time)}
                                </h4>
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
                                    </div>
                                </div>

                                {/* 분석 결과 */}
                                <div className="space-y-4">
                                    {frame.gameAnalysis ? (
                                        <>
                                            {/* 게임 정보 */}
                                            {frame.gameAnalysis.player && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">
                                                        플레이어 상태
                                                    </h5>
                                                    <div className="bg-gray-50 rounded p-3 space-y-2">
                                                        {frame.gameAnalysis
                                                            .player
                                                            .champion && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">
                                                                    캐릭터:
                                                                </span>
                                                                <span className="font-medium">
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
                                                        {frame.gameAnalysis
                                                            .player
                                                            .currentAction && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">
                                                                    현재 행동:
                                                                </span>
                                                                <span className="font-medium">
                                                                    {
                                                                        frame
                                                                            .gameAnalysis
                                                                            .player
                                                                            .currentAction
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
                                                        게임 상황
                                                    </h5>
                                                    <div className="bg-blue-50 rounded p-3 space-y-2">
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
                                                    </div>
                                                </div>
                                            )}

                                            {/* AI 분석 */}
                                            {frame.gameAnalysis.analysis && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">
                                                        AI 분석
                                                    </h5>
                                                    <div className="space-y-3">
                                                        {frame.gameAnalysis
                                                            .analysis.strengths
                                                            ?.length > 0 && (
                                                            <div>
                                                                <h6 className="text-sm font-medium text-green-700 mb-1">
                                                                    잘한 점
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
                                                                    개선할 점
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
                                                                    추천 행동
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

                                            {/* 요약 */}
                                            {frame.gameAnalysis.summary && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">
                                                        상황 요약
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
                                                        태그
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
