"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import CommunityHeader from "@/app/components/CommunityHeader";
import {
    getCharacterCountDisplay,
    VALIDATION_LIMITS,
} from "@/app/utils/validation";
import ComprehensiveAnalysis from "@/app/components/ComprehensiveAnalysis";

export default function ValorantCommunityPostPage() {
    const params = useParams();
    const router = useRouter();
    const postId = parseInt(params.id);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 댓글 데이터
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [selectedVote, setSelectedVote] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);

    // 게시글 로드
    useEffect(() => {
        const loadPost = () => {
            try {
                // localStorage에서 게시글 불러오기
                const savedPosts = localStorage.getItem("judgegg_posts");
                if (!savedPosts) {
                    setError("게시글을 찾을 수 없습니다.");
                    setLoading(false);
                    return;
                }

                const allPosts = JSON.parse(savedPosts);
                const foundPost = allPosts.find(
                    (p) => p.id === postId && p.gameType === "valorant"
                );

                if (!foundPost) {
                    setError("게시글을 찾을 수 없습니다.");
                    setLoading(false);
                    return;
                }

                // 게시글 조회수 증가
                foundPost.views = (foundPost.views || 0) + 1;

                // 업데이트된 게시글 목록을 다시 저장
                const updatedPosts = allPosts.map((p) =>
                    p.id === postId ? foundPost : p
                );
                localStorage.setItem(
                    "judgegg_posts",
                    JSON.stringify(updatedPosts)
                );

                setPost(foundPost);

                // 댓글 데이터 설정 (실제로는 API에서 가져올 데이터)
                setComments([
                    {
                        id: 1,
                        author: "듀얼리스트마스터",
                        content:
                            "정말 좋은 분석이네요! 많은 도움이 되었습니다.",
                        createdAt: new Date(
                            Date.now() - 1000 * 60 * 30
                        ).toISOString(),
                        likes: 7,
                    },
                    {
                        id: 2,
                        author: "레이즈장인",
                        content:
                            "저도 비슷한 상황을 겪었는데 이런 판단이 맞는 것 같아요.",
                        createdAt: new Date(
                            Date.now() - 1000 * 60 * 15
                        ).toISOString(),
                        likes: 4,
                    },
                ]);
            } catch (error) {
                console.error("게시글 로드 실패:", error);
                setError("게시글을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (postId) {
            loadPost();
        }
    }, [postId]);

    // 투표 처리
    const handleVote = (option) => {
        if (hasVoted) return;

        setSelectedVote(option);
        setHasVoted(true);

        // 실제로는 API 호출하여 투표 결과 업데이트
        console.log("투표:", option);

        // 로컬 상태에서 투표 수 증가 (데모용)
        setPost((prev) => ({
            ...prev,
            votes: (prev.votes || 0) + 1,
        }));
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <CommunityHeader
                    gameType="valorant"
                    title="발로란트 법원"
                    description="전술적 FPS에서 발생한 분쟁을 공정하게 심판합니다"
                />
                <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">
                            게시글을 불러오는 중...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-gray-50">
                <CommunityHeader
                    gameType="valorant"
                    title="발로란트 법원"
                    description="전술적 FPS에서 발생한 분쟁을 공정하게 심판합니다"
                />
                <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="text-red-500 text-6xl mb-4">❌</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {error || "게시글을 찾을 수 없습니다"}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            요청하신 게시글이 존재하지 않거나 삭제되었습니다.
                        </p>
                        <Link
                            href="/valorant/community"
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            목록으로 돌아가기
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Community Header */}
            <CommunityHeader
                gameType="valorant"
                title="발로란트 법원"
                description="전술적 FPS에서 발생한 분쟁을 공정하게 심판합니다"
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
                                href={`/valorant/community/post/${postId}/edit`}
                                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                수정하기
                            </Link>
                            <button className="px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                                삭제하기
                            </button>
                        </div>
                    </div>

                    {/* 사용자 정보 */}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
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
                            <span>{formatDate(post.createdAt)}</span>
                        </div>

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
                                <span>{post.views || 0}</span>
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
                                <span>{comments.length}</span>
                            </div>

                            {/* 추천수 */}
                            <div className="flex items-center space-x-1 bg-red-50 px-2 py-1 rounded-lg">
                                <svg
                                    className="w-4 h-4 text-red-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-red-700">
                                    {post.votes || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {/* 맵 태그 */}
                    {post.selectedTags?.maps?.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                    {/* 에이전트 태그 */}
                    {post.selectedTags?.agents?.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                    {/* 상황별 태그 */}
                    {post.selectedTags?.situations?.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                    {/* 기본 태그 (하위 호환성) */}
                    {post.tags &&
                        post.tags.length > 0 &&
                        !post.selectedTags &&
                        post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                </div>

                {/* 동영상 영역 */}
                {post.videoFile && (
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
                                동영상: {post.videoFile}
                            </p>
                        </div>
                    </section>
                )}

                {/* AI 분석 결과 */}
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
                                        className="flex-1 min-w-[200px] max-w-xs bg-gray-100 border-2 border-gray-300 rounded-lg p-4 text-center hover:border-red-400 hover:bg-red-50 transition-colors"
                                    >
                                        <div className="text-gray-700 font-medium text-lg break-words">
                                            {post.voteOptions?.[0] ||
                                                "첫 번째 선택지"}
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
                                                    중립
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
                                        className="flex-1 min-w-[200px] max-w-xs bg-gray-100 border-2 border-gray-300 rounded-lg p-4 text-center hover:border-red-400 hover:bg-red-50 transition-colors"
                                    >
                                        <div className="text-gray-700 font-medium text-lg break-words">
                                            {post.voteOptions?.[1] ||
                                                "두 번째 선택지"}
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
                            <div className="text-center text-sm text-gray-500 mt-4">
                                투표 결과는 향후 업데이트될 예정입니다.
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    onClick={() => {
                                        setHasVoted(false);
                                        setSelectedVote(null);
                                    }}
                                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    {newComment.length}/
                                    {VALIDATION_LIMITS.COMMENT}자
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors h-full"
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
                        href="/valorant/community"
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        목록으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
}
