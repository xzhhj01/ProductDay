"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    validatePostTitle,
    validatePostContent,
    validateVoteOptions,
    getCharacterCountDisplay,
    VALIDATION_LIMITS,
} from "@/app/utils/validation";
import Snackbar from "@/app/components/Snackbar";

export default function PostForm({
    gameType,
    mode = "create",
    initialData = null,
    onSubmit,
}) {
    const [title, setTitle] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [videoAnalysis, setVideoAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState("");
    const [selectedTags, setSelectedTags] = useState({
        champions: [],
        lanes: [],
        situations: [],
        maps: [],
        agents: [],
    });
    const [content, setContent] = useState("");

    // 투표 설정
    const [voteType, setVoteType] = useState(
        gameType === "lol" ? "champion" : "agent"
    );
    const [voteOptions, setVoteOptions] = useState(["", ""]);
    const [allowNeutral, setAllowNeutral] = useState(false);
    const [voteDeadline, setVoteDeadline] = useState("");

    // 유효성 검사 상태
    const [validationErrors, setValidationErrors] = useState({});

    // 스낵바 상태
    const [snackbar, setSnackbar] = useState({
        isVisible: false,
        message: "",
        type: "success",
    });

    // 디버깅용 로그 상태
    const [debugLogs, setDebugLogs] = useState([]);

    // 디버그 로그 추가 함수
    const addDebugLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setDebugLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
        console.log(`[PostForm Debug] ${message}`);
    };

    // 게임별 태그 데이터
    const tagData = {
        lol: {
            champions: [
                "야스오",
                "제드",
                "아리",
                "진",
                "카이사",
                "그레이브즈",
                "리 신",
                "쓰레쉬",
                "블리츠크랭크",
            ],
            lanes: ["탑", "정글", "미드", "원딜", "서포터"],
            situations: [
                "갱킹",
                "팀파이트",
                "라인전",
                "오브젝트",
                "백도어",
                "로밍",
            ],
        },
        valorant: {
            maps: [
                "바인드",
                "헤이븐",
                "스플릿",
                "어센트",
                "아이스박스",
                "브리즈",
                "프랙처",
                "펄",
            ],
            agents: [
                "제트",
                "레이나",
                "피닉스",
                "레이즈",
                "요루",
                "네온",
                "세이지",
                "킬조이",
                "사이퍼",
                "소바",
                "오멘",
                "브림스톤",
                "바이퍼",
                "아스트라",
            ],
            situations: [
                "스파이크 설치",
                "스파이크 해제",
                "클러치",
                "에코",
                "러시",
                "로테이션",
            ],
        },
    };

    const [tagSearch, setTagSearch] = useState("");

    // 수정 모드일 때 초기 데이터 설정
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setTitle(initialData.title || "");
            setContent(initialData.content || "");
            setSelectedTags(
                initialData.tags || {
                    champions: [],
                    lanes: [],
                    situations: [],
                    maps: [],
                    agents: [],
                }
            );
            setVoteOptions(initialData.voteOptions || ["", ""]);
            setAllowNeutral(initialData.allowNeutral || false);
            setVoteDeadline(initialData.voteDeadline || "");
            if (initialData.videoAnalysis) {
                setVideoAnalysis(initialData.videoAnalysis);
            }
            addDebugLog("초기 데이터 로드 완료");
        }
    }, [mode, initialData]);

    // 비디오 파일 선택 및 분석
    const handleVideoSelect = async (file) => {
        if (!file) {
            setVideoFile(null);
            setVideoAnalysis(null);
            setAnalysisError("");
            addDebugLog("비디오 파일 제거됨");
            return;
        }

        addDebugLog(
            `비디오 파일 선택됨: ${file.name} (${(
                file.size /
                1024 /
                1024
            ).toFixed(2)}MB)`
        );
        setVideoFile(file);
        setAnalysisError("");

        // 파일 크기 체크 (100MB 제한)
        if (file.size > 100 * 1024 * 1024) {
            const error = "파일 크기가 100MB를 초과합니다.";
            setAnalysisError(error);
            addDebugLog(`오류: ${error}`);
            return;
        }

        // 파일 형식 체크
        const allowedTypes = [
            "video/mp4",
            "video/avi",
            "video/mov",
            "video/quicktime",
        ];
        if (!allowedTypes.includes(file.type)) {
            const error =
                "지원하지 않는 파일 형식입니다. MP4, AVI, MOV 파일만 업로드 가능합니다.";
            setAnalysisError(error);
            addDebugLog(`오류: ${error}`);
            return;
        }

        // 개발 환경에서는 분석 건너뛰기 옵션 제공
        if (process.env.NODE_ENV === "development") {
            addDebugLog("개발 환경 - 분석 건너뛰기 가능");
            setSnackbar({
                isVisible: true,
                message: "개발 환경에서는 AI 분석을 건너뛸 수 있습니다.",
                type: "info",
            });
        } else {
            // 프로덕션에서만 자동 분석
            await analyzeVideo(file);
        }
    };

    // 수동 분석 시작 함수
    const startManualAnalysis = () => {
        if (videoFile) {
            analyzeVideo(videoFile);
        }
    };

    // 분석 건너뛰기 함수 (개발용)
    const skipAnalysis = () => {
        addDebugLog("분석 건너뛰기 - 더미 데이터 사용");
        setVideoAnalysis([
            {
                time: 30.5,
                dataUrl:
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
                gameAnalysis: {
                    game: "lol",
                    summary: "개발 환경 더미 분석 결과입니다.",
                    player: {
                        champion: "야스오",
                        positioning: "양호",
                        currentAction: "라인전",
                    },
                    analysis: {
                        strengths: ["좋은 포지셔닝"],
                        improvements: ["CS 향상 필요"],
                        recommendation: "더 적극적인 플레이",
                    },
                },
            },
        ]);
    };

    // 비디오 분석 함수
    const analyzeVideo = async (file) => {
        setIsAnalyzing(true);
        setAnalysisError("");
        addDebugLog("비디오 분석 시작");

        try {
            // 1단계: 비디오 메타데이터 로드
            addDebugLog("1단계: 비디오 메타데이터 로드 중...");
            const video = document.createElement("video");
            const url = URL.createObjectURL(file);
            video.src = url;

            await new Promise((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                    reject(new Error("비디오 로드 타임아웃 (10초)"));
                }, 10000);

                video.onloadedmetadata = () => {
                    clearTimeout(timeoutId);
                    addDebugLog(
                        `비디오 정보: ${video.duration.toFixed(1)}초, ${
                            video.videoWidth
                        }x${video.videoHeight}`
                    );
                    resolve();
                };
                video.onerror = () => {
                    clearTimeout(timeoutId);
                    reject(new Error("비디오 로드 실패"));
                };
            });

            // 2단계: 프레임 캡처 (최대 5개)
            addDebugLog("2단계: 프레임 캡처 중...");
            const frames = await captureFramesFromVideo(video, 5);
            addDebugLog(`${frames.length}개 프레임 캡처 완료`);

            // 3단계: API 분석 요청
            addDebugLog("3단계: AI 분석 요청 중...");
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60초 타임아웃

            try {
                const response = await fetch("/api/analyze_video", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ frames }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error || `HTTP ${response.status}`
                    );
                }

                const data = await response.json();
                addDebugLog("AI 분석 완료");
                setVideoAnalysis(data.analyzedFrames);
            } catch (fetchError) {
                clearTimeout(timeoutId);
                if (fetchError.name === "AbortError") {
                    throw new Error("분석 요청 타임아웃 (60초)");
                }
                throw fetchError;
            }

            URL.revokeObjectURL(url);
        } catch (error) {
            addDebugLog(`분석 오류: ${error.message}`);
            setAnalysisError(
                `비디오 분석 중 오류가 발생했습니다: ${error.message}`
            );
        } finally {
            setIsAnalyzing(false);
        }
    };

    // 프레임 캡처 함수 (개선됨)
    const captureFramesFromVideo = async (video, numFrames) => {
        const frames = [];
        const duration = video.duration;

        if (isNaN(duration) || duration <= 0) {
            throw new Error("비디오 길이를 확인할 수 없습니다.");
        }

        // 비디오가 너무 짧으면 프레임 수 조정
        const maxFrames = Math.min(numFrames, Math.floor(duration / 2));
        const interval = (duration * 0.8) / (maxFrames - 1); // 비디오의 80%만 사용
        const startTime = duration * 0.1; // 10% 지점부터 시작

        addDebugLog(
            `프레임 캡처 설정: ${maxFrames}개, 간격 ${interval.toFixed(1)}초`
        );

        const canvas = document.createElement("canvas");
        canvas.width = Math.min(video.videoWidth || 1280, 640); // 최대 640px로 제한
        canvas.height = Math.min(video.videoHeight || 720, 360); // 최대 360px로 제한
        const ctx = canvas.getContext("2d");

        for (let i = 0; i < maxFrames; i++) {
            const time = startTime + interval * i;
            addDebugLog(
                `프레임 ${i + 1}/${maxFrames} 캡처 중... (${time.toFixed(1)}초)`
            );

            await new Promise((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                    reject(new Error(`프레임 ${i + 1} 캡처 타임아웃`));
                }, 5000);

                video.currentTime = time;
                video.onseeked = () => {
                    clearTimeout(timeoutId);
                    try {
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        const dataUrl = canvas.toDataURL("image/jpeg", 0.7); // 품질 70%로 압축
                        frames.push({
                            time: time,
                            dataUrl: dataUrl,
                        });
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                };
            });
        }

        return frames;
    };

    // textarea 자동 높이 조절
    const handleTextareaResize = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    // 태그 추가
    const addTag = (category, tag) => {
        if (!selectedTags[category].includes(tag)) {
            setSelectedTags((prev) => ({
                ...prev,
                [category]: [...prev[category], tag],
            }));
            addDebugLog(`태그 추가: ${category} - ${tag}`);
        }
    };

    // 태그 제거
    const removeTag = (category, tag) => {
        setSelectedTags((prev) => ({
            ...prev,
            [category]: prev[category].filter((t) => t !== tag),
        }));
        addDebugLog(`태그 제거: ${category} - ${tag}`);
    };

    // 투표 옵션 업데이트
    const updateVoteOption = (index, value) => {
        const newOptions = [...voteOptions];
        newOptions[index] = value;
        setVoteOptions(newOptions);

        const validation = validateVoteOptions(newOptions);
        setValidationErrors((prev) => ({
            ...prev,
            voteOptions: validation.isValid ? null : validation.message,
        }));
    };

    // 실시간 유효성 검사
    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        const validation = validatePostTitle(newTitle);
        setValidationErrors((prev) => ({
            ...prev,
            title: validation.isValid ? null : validation.message,
        }));
    };

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);

        const validation = validatePostContent(newContent);
        setValidationErrors((prev) => ({
            ...prev,
            content: validation.isValid ? null : validation.message,
        }));
    };

    // 폼 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        addDebugLog("폼 제출 시작");

        // 필수 항목 체크
        if (!title.trim()) {
            setSnackbar({
                isVisible: true,
                message: "제목을 입력해주세요.",
                type: "error",
            });
            return;
        }

        if (!content.trim()) {
            setSnackbar({
                isVisible: true,
                message: "본문을 입력해주세요.",
                type: "error",
            });
            return;
        }

        if (!voteOptions[0].trim() || !voteOptions[1].trim()) {
            setSnackbar({
                isVisible: true,
                message: "투표 옵션을 모두 입력해주세요.",
                type: "error",
            });
            return;
        }

        const formData = {
            title,
            videoFile,
            videoAnalysis,
            selectedTags,
            content,
            voteType,
            voteOptions,
            allowNeutral,
            voteDeadline,
        };

        addDebugLog("폼 데이터 검증 완료");

        if (onSubmit) {
            onSubmit(formData);
            addDebugLog("onSubmit 호출 완료");
        }

        // 스낵바 표시
        setSnackbar({
            isVisible: true,
            message:
                mode === "create"
                    ? "재판이 성공적으로 등록되었습니다!"
                    : "재판이 성공적으로 수정되었습니다!",
            type: "success",
        });
    };

    // 스낵바 닫기
    const closeSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, isVisible: false }));
    };

    const currentTagData = tagData[gameType];
    const gameColor = gameType === "lol" ? "blue" : "red";
    const cancelUrl =
        gameType === "lol" ? "/lol/community" : "/valorant/community";

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {mode === "create" ? "새 재판 열기" : "재판 수정하기"}
                </h1>
            </div>

            {/* 개발환경 디버그 패널 */}
            {process.env.NODE_ENV === "development" && debugLogs.length > 0 && (
                <div className="mb-6 px-4 sm:px-6 lg:px-8">
                    <details className="bg-gray-100 rounded-lg p-4">
                        <summary className="cursor-pointer font-medium text-gray-700">
                            디버그 로그 ({debugLogs.length})
                        </summary>
                        <div className="mt-2 max-h-40 overflow-y-auto">
                            {debugLogs.map((log, index) => (
                                <div
                                    key={index}
                                    className="text-xs text-gray-600 font-mono"
                                >
                                    {log}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setDebugLogs([])}
                            className="mt-2 text-xs text-red-600 hover:text-red-700"
                        >
                            로그 지우기
                        </button>
                    </details>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-8 px-4 sm:px-6 lg:px-8"
            >
                {/* 1. 제목 입력 */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        제목 <span className="text-red-500">*</span>
                    </h2>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="어떤 상황에 대해 재판을 요청하시나요?"
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${gameColor}-500 focus:border-transparent`}
                        required
                    />
                    {validationErrors.title && (
                        <p className="text-red-500 text-sm mt-2">
                            {validationErrors.title}
                        </p>
                    )}
                </section>

                {/* 2. 동영상 업로드 */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        동영상 업로드
                    </h2>
                    {mode === "edit" ? (
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center bg-gray-50">
                            <p className="text-gray-400 text-sm">
                                동영상은 수정할 수 없습니다
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                {videoFile ? (
                                    <div className="space-y-4">
                                        <div className="text-green-600">
                                            <svg
                                                className="w-12 h-12 mx-auto mb-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <p className="font-medium">
                                                {videoFile.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {(
                                                    videoFile.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}{" "}
                                                MB
                                            </p>
                                        </div>

                                        {/* 분석 상태 표시 */}
                                        {isAnalyzing && (
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                                                    <span className="text-blue-700 text-sm">
                                                        비디오 AI 분석 중...
                                                    </span>
                                                </div>
                                                <p className="text-blue-600 text-xs mt-2 text-center">
                                                    프레임을 캡처하고 게임
                                                    상황을 분석하고 있습니다
                                                </p>
                                            </div>
                                        )}

                                        {/* 분석 완료 */}
                                        {videoAnalysis && !isAnalyzing && (
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <svg
                                                        className="w-5 h-5 text-green-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    <span className="text-green-700 text-sm">
                                                        AI 분석 완료!{" "}
                                                        {videoAnalysis.length}개
                                                        프레임 분석됨
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* 분석 오류 */}
                                        {analysisError && (
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                <p className="text-red-700 text-sm">
                                                    {analysisError}
                                                </p>
                                                <div className="mt-2 space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            analyzeVideo(
                                                                videoFile
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-700 text-sm underline"
                                                        disabled={isAnalyzing}
                                                    >
                                                        다시 분석하기
                                                    </button>
                                                    {process.env.NODE_ENV ===
                                                        "development" && (
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                skipAnalysis
                                                            }
                                                            className="text-green-600 hover:text-green-700 text-sm underline"
                                                        >
                                                            분석 건너뛰기
                                                            (개발용)
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* 개발환경 수동 분석 버튼 */}
                                        {process.env.NODE_ENV ===
                                            "development" &&
                                            !videoAnalysis &&
                                            !isAnalyzing &&
                                            !analysisError && (
                                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                                    <p className="text-yellow-700 text-sm mb-2">
                                                        개발 환경 옵션:
                                                    </p>
                                                    <div className="space-x-2">
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                startManualAnalysis
                                                            }
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                                                        >
                                                            AI 분석 시작
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                skipAnalysis
                                                            }
                                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                                                        >
                                                            더미 데이터로
                                                            건너뛰기
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setVideoFile(null);
                                                setVideoAnalysis(null);
                                                setAnalysisError("");
                                                addDebugLog("비디오 파일 제거");
                                            }}
                                            className="text-red-600 hover:text-red-700 text-sm"
                                        >
                                            파일 제거
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <svg
                                            className="w-12 h-12 text-gray-400 mx-auto mb-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                        <p className="text-sm text-gray-500 mb-4">
                                            MP4, AVI, MOV 파일 지원 (최대 100MB)
                                            <br />
                                            <span className="font-medium text-blue-600">
                                                업로드 시 자동으로 AI 분석이
                                                시작됩니다
                                            </span>
                                        </p>
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) =>
                                                handleVideoSelect(
                                                    e.target.files[0]
                                                )
                                            }
                                            className="hidden"
                                            id="video-upload"
                                        />
                                        <label
                                            htmlFor="video-upload"
                                            className={`bg-${gameColor}-500 hover:bg-${gameColor}-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors`}
                                        >
                                            파일 선택
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* 분석 결과 미리보기 */}
                            {videoAnalysis && videoAnalysis.length > 0 && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-medium text-gray-900 mb-3">
                                        AI 분석 결과 미리보기
                                    </h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {videoAnalysis
                                            .slice(0, 3)
                                            .map((frame, index) => (
                                                <div
                                                    key={index}
                                                    className="relative"
                                                >
                                                    <img
                                                        src={frame.dataUrl}
                                                        alt={`프레임 ${
                                                            index + 1
                                                        }`}
                                                        className="w-full h-20 object-cover rounded"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b">
                                                        {frame.gameAnalysis
                                                            ?.game || "분석중"}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        게시글 작성 완료 후 전체 AI 분석 결과를
                                        확인할 수 있습니다
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* 3. 태그 선택 */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        태그 선택
                    </h2>
                    <div className="space-y-6">
                        {gameType === "lol" ? (
                            <>
                                {/* 챔피언 */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        챔피언
                                    </h3>
                                    {selectedTags.champions.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {selectedTags.champions.map(
                                                (tag) => (
                                                    <span
                                                        key={`champions-${tag}`}
                                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer"
                                                        onClick={() =>
                                                            removeTag(
                                                                "champions",
                                                                tag
                                                            )
                                                        }
                                                    >
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            className="ml-2 text-current hover:text-red-600"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            placeholder="챔피언 이름을 검색하세요..."
                                            value={tagSearch}
                                            onChange={(e) =>
                                                setTagSearch(e.target.value)
                                            }
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3 h-24 overflow-y-auto">
                                        {tagSearch ? (
                                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                                                {currentTagData.champions
                                                    .filter((tag) =>
                                                        tag
                                                            .toLowerCase()
                                                            .includes(
                                                                tagSearch.toLowerCase()
                                                            )
                                                    )
                                                    .map((tag) => (
                                                        <button
                                                            key={tag}
                                                            type="button"
                                                            onClick={() =>
                                                                addTag(
                                                                    "champions",
                                                                    tag
                                                                )
                                                            }
                                                            disabled={selectedTags.champions.includes(
                                                                tag
                                                            )}
                                                            className={`px-2 py-1 text-xs rounded border transition-colors ${
                                                                selectedTags.champions.includes(
                                                                    tag
                                                                )
                                                                    ? "bg-blue-200 text-blue-800 border-blue-400 cursor-not-allowed"
                                                                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                                                            }`}
                                                        >
                                                            {tag}
                                                        </button>
                                                    ))}
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <p className="text-gray-500 text-sm text-center">
                                                    챔피언 이름을 검색해주세요
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 라인 */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        라인
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {currentTagData.lanes.map((tag) => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() =>
                                                    selectedTags.lanes.includes(
                                                        tag
                                                    )
                                                        ? removeTag(
                                                              "lanes",
                                                              tag
                                                          )
                                                        : addTag("lanes", tag)
                                                }
                                                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                                                    selectedTags.lanes.includes(
                                                        tag
                                                    )
                                                        ? "bg-green-100 text-green-700 border-green-400"
                                                        : "bg-white text-gray-700 border-gray-300"
                                                }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* 맵 */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                        맵
                                    </h3>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                                        {currentTagData.maps.map((tag) => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() =>
                                                    selectedTags.maps.includes(
                                                        tag
                                                    )
                                                        ? removeTag("maps", tag)
                                                        : addTag("maps", tag)
                                                }
                                                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                                                    selectedTags.maps.includes(
                                                        tag
                                                    )
                                                        ? "bg-orange-200 text-orange-800 border-orange-400"
                                                        : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
                                                }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 에이전트 */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                        에이전트
                                    </h3>
                                    {selectedTags.agents.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {selectedTags.agents.map((tag) => (
                                                <span
                                                    key={`agents-${tag}`}
                                                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm cursor-pointer"
                                                    onClick={() =>
                                                        removeTag("agents", tag)
                                                    }
                                                >
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        className="ml-2 text-current hover:text-red-600"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            placeholder="에이전트 이름을 검색하세요..."
                                            value={tagSearch}
                                            onChange={(e) =>
                                                setTagSearch(e.target.value)
                                            }
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3 h-24 overflow-y-auto">
                                        {tagSearch ? (
                                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                                                {currentTagData.agents
                                                    .filter((tag) =>
                                                        tag
                                                            .toLowerCase()
                                                            .includes(
                                                                tagSearch.toLowerCase()
                                                            )
                                                    )
                                                    .map((tag) => (
                                                        <button
                                                            key={tag}
                                                            type="button"
                                                            onClick={() =>
                                                                selectedTags.agents.includes(
                                                                    tag
                                                                )
                                                                    ? removeTag(
                                                                          "agents",
                                                                          tag
                                                                      )
                                                                    : addTag(
                                                                          "agents",
                                                                          tag
                                                                      )
                                                            }
                                                            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                                                                selectedTags.agents.includes(
                                                                    tag
                                                                )
                                                                    ? "bg-red-200 text-red-800 border-red-400"
                                                                    : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                                                            }`}
                                                        >
                                                            {tag}
                                                        </button>
                                                    ))}
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <p className="text-gray-500 text-sm text-center">
                                                    에이전트 이름을 검색해주세요
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* 상황별 */}
                        <div>
                            <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                상황별
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {currentTagData.situations.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() =>
                                            selectedTags.situations.includes(
                                                tag
                                            )
                                                ? removeTag("situations", tag)
                                                : addTag("situations", tag)
                                        }
                                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                                            selectedTags.situations.includes(
                                                tag
                                            )
                                                ? "bg-purple-100 text-purple-700 border-purple-400"
                                                : "bg-white text-gray-700 border-gray-300"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. 본문 입력 */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        본문 <span className="text-red-500">*</span>
                    </h2>
                    <textarea
                        value={content}
                        onChange={handleContentChange}
                        placeholder="상황에 대해 자세히 설명해주세요. 어떤 점이 문제였는지, 어떤 판단을 원하는지 구체적으로 작성해주세요."
                        rows={8}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${gameColor}-500 focus:border-transparent resize-none`}
                        required
                    />
                    {validationErrors.content && (
                        <p className="text-red-500 text-sm mt-2">
                            {validationErrors.content}
                        </p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                        {
                            getCharacterCountDisplay(
                                content,
                                VALIDATION_LIMITS.POST_CONTENT
                            ).text
                        }
                    </p>
                </section>

                {/* 5. 투표 설정 */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        투표 설정 <span className="text-red-500">*</span>
                    </h2>
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-4">
                            투표 옵션
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                {/* 옵션 1 */}
                                <div className="flex-1 min-w-[200px] max-w-xs">
                                    <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4 text-center">
                                        {mode === "edit" ? (
                                            <div className="w-full px-4 py-3 text-center bg-gray-100 text-gray-600 font-medium text-lg rounded-lg">
                                                {voteOptions[0] ||
                                                    "첫 번째 선택지"}
                                            </div>
                                        ) : (
                                            <textarea
                                                value={voteOptions[0]}
                                                onChange={(e) =>
                                                    updateVoteOption(
                                                        0,
                                                        e.target.value
                                                    )
                                                }
                                                onInput={handleTextareaResize}
                                                placeholder="첫 번째 선택지"
                                                maxLength={
                                                    VALIDATION_LIMITS.VOTE_OPTION
                                                }
                                                rows={1}
                                                className="w-full px-4 py-3 text-center border-0 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none bg-white text-gray-700 font-medium text-lg resize-none overflow-hidden"
                                            />
                                        )}
                                    </div>
                                    {mode !== "edit" && (
                                        <div className="text-xs text-gray-500 text-left mt-2 px-4">
                                            {voteOptions[0].length}/
                                            {VALIDATION_LIMITS.VOTE_OPTION}자
                                        </div>
                                    )}
                                </div>

                                {/* VS */}
                                <div className="flex-shrink-0">
                                    <div
                                        className={`w-16 h-16 rounded-full flex items-center justify-center ${
                                            allowNeutral
                                                ? "bg-gray-500"
                                                : "bg-gray-600"
                                        }`}
                                    >
                                        <span className="text-white font-bold text-xs">
                                            {allowNeutral ? "중립기어" : "VS"}
                                        </span>
                                    </div>
                                </div>

                                {/* 옵션 2 */}
                                <div className="flex-1 min-w-[200px] max-w-xs">
                                    <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4 text-center">
                                        {mode === "edit" ? (
                                            <div className="w-full px-4 py-3 text-center bg-gray-100 text-gray-600 font-medium text-lg rounded-lg">
                                                {voteOptions[1] ||
                                                    "두 번째 선택지"}
                                            </div>
                                        ) : (
                                            <textarea
                                                value={voteOptions[1]}
                                                onChange={(e) =>
                                                    updateVoteOption(
                                                        1,
                                                        e.target.value
                                                    )
                                                }
                                                onInput={handleTextareaResize}
                                                placeholder="두 번째 선택지"
                                                maxLength={
                                                    VALIDATION_LIMITS.VOTE_OPTION
                                                }
                                                rows={1}
                                                className="w-full px-4 py-3 text-center border-0 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none bg-white text-gray-700 font-medium text-lg resize-none overflow-hidden"
                                            />
                                        )}
                                    </div>
                                    {mode !== "edit" && (
                                        <div className="text-xs text-gray-500 text-left mt-2 px-4">
                                            {voteOptions[1].length}/
                                            {VALIDATION_LIMITS.VOTE_OPTION}자
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {validationErrors.voteOptions && mode !== "edit" && (
                            <p className="text-red-500 text-sm mt-2">
                                {validationErrors.voteOptions}
                            </p>
                        )}
                    </div>

                    {/* 중립 옵션 */}
                    <div className="mb-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={allowNeutral}
                                onChange={(e) =>
                                    setAllowNeutral(e.target.checked)
                                }
                                disabled={mode === "edit"}
                                className="mr-3"
                            />
                            <span
                                className={`text-sm ${
                                    mode === "edit"
                                        ? "text-gray-500"
                                        : "text-gray-700"
                                }`}
                            >
                                중립 옵션 추가
                            </span>
                        </label>
                    </div>

                    {/* 마감 기한 */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                            투표 마감 기한
                        </h3>
                        <input
                            type="datetime-local"
                            value={voteDeadline}
                            onChange={(e) => setVoteDeadline(e.target.value)}
                            className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${gameColor}-500 focus:border-transparent`}
                        />
                    </div>
                </section>

                {/* 제출 버튼 */}
                <div className="flex justify-center space-x-4 pt-6">
                    <Link
                        href={cancelUrl}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        취소
                    </Link>
                    <button
                        type="submit"
                        disabled={isAnalyzing}
                        className={`px-8 py-3 bg-${gameColor}-500 hover:bg-${gameColor}-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors`}
                    >
                        {isAnalyzing
                            ? "분석 중..."
                            : mode === "create"
                            ? "재판 열기"
                            : "수정 완료"}
                    </button>
                </div>
            </form>

            {/* 스낵바 표시 */}
            <Snackbar
                isVisible={snackbar.isVisible}
                message={snackbar.message}
                type={snackbar.type}
                onClose={closeSnackbar}
            />
        </div>
    );
}
