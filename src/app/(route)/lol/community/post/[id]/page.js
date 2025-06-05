"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CommunityHeader from "@/app/components/CommunityHeader";
import {
    getCharacterCountDisplay,
    VALIDATION_LIMITS,
} from "@/app/utils/validation";
import ComprehensiveAnalysis from "@/app/components/ComprehensiveAnalysis";

export default function LoLCommunityPostPage() {
    const params = useParams();
    const postId = params.id;

    // 더미 포스트 데이터 (실제로는 API에서 가져올 데이터)
    const [post, setPost] = useState({
        id: 1,
        title: "야스오 vs 제드 라인전 상황 판단 부탁드립니다",
        author: {
            nickname: "소환사123",
            tier: "Gold",
        },
        createdAt: "2024-01-15T10:30:00Z",
        videoUrl: null, // 실제로는 동영상 URL
        tags: {
            champions: ["야스오", "제드"],
            lanes: ["미드"],
            situations: ["라인전"],
        },
        content:
            "미드 라인에서 야스오로 제드와 라인전을 하던 중 애매한 상황이 발생했습니다. 제드가 그림자를 사용해서 딜교환을 시도했는데, 제가 바람 장막을 사용한 타이밍이 맞았는지 궁금합니다. 그리고 이후 추가 딜교환을 시도한 것이 올바른 판단이었는지도 의견 부탁드립니다.",
        voteOptions: ["야스오가 잘했다", "제드가 잘했다"],
        allowNeutral: true,
        voteDeadline: "2024-01-22T10:30:00Z",
        votes: {
            option1: 45,
            option2: 32,
            neutral: 8,
        },
        totalVotes: 85,
        views: 156,
        comments: 12,
        videoAnalysis: null,
    });

    // 댓글 데이터
    const [comments, setComments] = useState([
        {
            id: 1,
            author: "프로게이머지망생",
            content:
                "야스오 바람 장막 타이밍이 정말 좋았네요! 제드 Q를 완벽하게 막았습니다.",
            createdAt: "2024-01-15T11:00:00Z",
            likes: 5,
        },
        {
            id: 2,
            author: "미드라이너",
            content:
                "개인적으로는 제드가 더 좋은 플레이를 했다고 생각해요. 그림자 위치선정이 완벽했습니다.",
            createdAt: "2024-01-15T11:15:00Z",
            likes: 3,
        },
    ]);

    const [newComment, setNewComment] = useState("");
    const [selectedVote, setSelectedVote] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);

    // 투표 처리
    const handleVote = (option) => {
        if (hasVoted) return;
        setSelectedVote(option);
        setHasVoted(true);
        // 실제로는 API 호출
        console.log("투표:", option);
    };

    // 댓글 입력 처리
    const handleCommentChange = (e) => {
        const value = e.target.value;
        setNewComment(value);
    };

    // 댓글 추가
    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            id: comments.length + 1,
            author: "현재사용자", // 실제로는 로그인한 사용자
            content: newComment.trim(),
            createdAt: new Date().toISOString(),
            likes: 0,
        };

        setComments([...comments, comment]);
        setNewComment("");
    };

    // 시간 포맷팅
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return (
            date.toLocaleDateString("ko-KR") +
            " " +
            date.toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const postTime = new Date(timestamp);
        const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));

        if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
        if (diffInMinutes < 1440)
            return `${Math.floor(diffInMinutes / 60)}시간 전`;
        return `${Math.floor(diffInMinutes / 1440)}일 전`;
    };

    const getTierColor = (tier) => {
        const tierColors = {
            Iron: "text-gray-600",
            Bronze: "text-amber-600",
            Silver: "text-gray-500",
            Gold: "text-yellow-500",
            Platinum: "text-cyan-500",
            Diamond: "text-blue-500",
            Master: "text-purple-500",
            Grandmaster: "text-red-500",
            Challenger: "text-orange-500",
        };
        return tierColors[tier] || "text-gray-600";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Community Header */}
            <CommunityHeader
                gameType="lol"
                title="리그 오브 레전드 법원"
                description="소환사의 협곡에서 발생한 분쟁을 공정하게 심판합니다"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8">
                {/* 헤더 */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {post.title}
                        </h1>
                        <div className="flex space-x-2">
                            <Link
                                href={`/lol/community/post/${postId}/edit`}
                                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                수정하기
                            </Link>
                            <button className="px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                                삭제하기
                            </button>
                        </div>
                    </div>

                    {/* PostCard와 동일한 형태의 사용자 정보 */}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                            {/* 유저 정보 */}
                            <div className="flex items-center space-x-1">
                                <span className="font-medium text-gray-700">
                                    {post.author.nickname}
                                </span>
                                <span
                                    className={`${getTierColor(
                                        post.author.tier
                                    )} font-medium`}
                                >
                                    {post.author.tier}
                                </span>
                            </div>

                            {/* 작성시간 */}
                            <span>{formatDate(post.createdAt)}</span>
                        </div>

                        {/* 통계 정보들 */}
                        <div className="flex items-center space-x-3">
                            {/* 조회수 */}
                            <div className="flex items-center space-x-1">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                                <span>{post.views}</span>
                            </div>

                            {/* 댓글 수 */}
                            <div className="flex items-center space-x-1">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                                <span>{post.comments}</span>
                            </div>

                            {/* 추천수 */}
                            <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-lg">
                                <svg
                                    className="w-4 h-4 text-blue-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-blue-700">
                                    {post.totalVotes}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {/* 챔피언 태그 */}
                    {post.tags.champions.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                    {/* 라인 태그 */}
                    {post.tags.lanes.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                    {/* 상황별 태그 */}
                    {post.tags.situations.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* 동영상 영역 - videoUrl이 있을 때만 표시 */}
                {post.videoUrl && (
                    <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            동영상
                        </h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                            <svg
                                className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
                            <p className="text-gray-500">
                                동영상이 업로드되지 않았습니다
                            </p>
                        </div>
                    </section>
                )}
                {post.videoAnalysis && post.videoAnalysis.length > 0 && (
                    <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            🤖 AI 분석 결과
                        </h2>
                        <ComprehensiveAnalysis frames={post.videoAnalysis} />
                    </section>
                )}
                {/* 본문 */}
                <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        본문
                    </h2>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                    </div>
                </section>

                {/* 투표 */}
                <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        투표
                    </h2>

                    {!hasVoted ? (
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    {/* 옵션 1 */}
                                    <button
                                        onClick={() => handleVote("option1")}
                                        className="flex-1 min-w-[200px] max-w-xs bg-gray-100 border-2 border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
                                    >
                                        <div className="text-gray-700 font-medium text-lg break-words">
                                            {post.voteOptions[0]}
                                        </div>
                                    </button>

                                    {/* 중앙 아이콘 */}
                                    <div className="flex-shrink-0">
                                        {post.allowNeutral ? (
                                            <button
                                                onClick={() =>
                                                    handleVote("neutral")
                                                }
                                                className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-500 hover:bg-gray-600 transition-colors cursor-pointer"
                                            >
                                                <span className="text-white font-bold text-xs">
                                                    중립기어
                                                </span>
                                            </button>
                                        ) : (
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-600">
                                                <span className="text-white font-bold text-xs">
                                                    VS
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* 옵션 2 */}
                                    <button
                                        onClick={() => handleVote("option2")}
                                        className="flex-1 min-w-[200px] max-w-xs bg-gray-100 border-2 border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
                                    >
                                        <div className="text-gray-700 font-medium text-lg break-words">
                                            {post.voteOptions[1]}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="text-center text-green-600 font-medium mb-4">
                                투표가 완료되었습니다!
                            </div>

                            {/* 투표 결과 */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">
                                        {post.voteOptions[0]}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{
                                                    width: `${
                                                        (post.votes.option1 /
                                                            post.totalVotes) *
                                                        100
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {post.votes.option1}표
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">
                                        {post.voteOptions[1]}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-red-500 h-2 rounded-full"
                                                style={{
                                                    width: `${
                                                        (post.votes.option2 /
                                                            post.totalVotes) *
                                                        100
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {post.votes.option2}표
                                        </span>
                                    </div>
                                </div>

                                {post.allowNeutral && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700">
                                            판단하기 어려움
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gray-500 h-2 rounded-full"
                                                    style={{
                                                        width: `${
                                                            (post.votes
                                                                .neutral /
                                                                post.totalVotes) *
                                                            100
                                                        }%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {post.votes.neutral}표
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="text-center text-sm text-gray-500 mt-4">
                                총 {post.totalVotes}명이 투표했습니다
                            </div>

                            {/* 투표 변경 버튼 */}
                            <div className="text-center mt-4">
                                <button
                                    onClick={() => {
                                        setHasVoted(false);
                                        setSelectedVote(null);
                                    }}
                                    className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    다시 투표하기
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {/* 댓글 */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        댓글 ({comments.length})
                    </h2>

                    {/* 댓글 작성 */}
                    <form onSubmit={handleAddComment} className="mb-6">
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={handleCommentChange}
                                    placeholder="댓글을 작성해주세요..."
                                    rows={3}
                                    maxLength={VALIDATION_LIMITS.COMMENT}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    {newComment.length}/
                                    {VALIDATION_LIMITS.COMMENT}자
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors h-full"
                                >
                                    댓글 작성
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* 댓글 목록 */}
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="border-b border-gray-100 pb-4 last:border-b-0"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-gray-900">
                                            {comment.author}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {formatDate(comment.createdAt)}
                                        </span>
                                    </div>
                                    <button className="text-sm text-gray-500 hover:text-red-600 flex items-center space-x-1">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                        <span>{comment.likes}</span>
                                    </button>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    {comment.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 하단 버튼 */}
                <div className="flex justify-center mt-8">
                    <Link
                        href="/lol/community"
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        목록으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
}
