"use client";

import { useState, useEffect } from "react";
import PostCard from "../../../components/PostCard";
import PostFilter from "../../../components/PostFilter";
import CommunityHeader from "../../../components/CommunityHeader";

export default function LoLCommunityPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedSituation, setSelectedSituation] = useState("");
    const [selectedChampion, setSelectedChampion] = useState("");
    const [championSearch, setChampionSearch] = useState("");
    const [showMoreChampions, setShowMoreChampions] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 게시글 로드
    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = () => {
        try {
            // localStorage에서 게시글 불러오기
            const savedPosts = localStorage.getItem("judgegg_posts");
            let allPosts = [];

            if (savedPosts) {
                allPosts = JSON.parse(savedPosts);
            }

            // LoL 게시글만 필터링
            const lolPosts = allPosts.filter((post) => post.gameType === "lol");

            // 더미 데이터가 없으면 추가
            if (lolPosts.length === 0) {
                const dummyPosts = [
                    {
                        id: Date.now() + 1,
                        title: "정글러가 갱킹 안 와주는데 이게 정상인가요?",
                        gameType: "lol",
                        votes: 23,
                        views: 156,
                        tags: ["정글", "갱킹", "라이너"],
                        author: { nickname: "소환사123", tier: "Gold" },
                        commentCount: 15,
                        createdAt: new Date(Date.now() - 1000 * 60 * 30),
                        content:
                            "미드 라인에서 계속 요청해도 정글러가 갱킹을 안 와줍니다.",
                        voteOptions: ["정글러가 잘못했다", "미드가 잘못했다"],
                        allowNeutral: true,
                        selectedTags: {
                            champions: ["야스오"],
                            lanes: ["미드"],
                            situations: ["갱킹"],
                            maps: [],
                            agents: [],
                        },
                    },
                    {
                        id: Date.now() + 2,
                        title: "야스오 픽했는데 팀이 욕하는 상황",
                        gameType: "lol",
                        votes: 45,
                        views: 289,
                        tags: ["야스오", "챔피언 선택", "팀워크"],
                        author: { nickname: "바람검객", tier: "Platinum" },
                        commentCount: 32,
                        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
                        content: "야스오를 픽했는데 팀원들이 계속 욕을 합니다.",
                        voteOptions: ["야스오가 문제다", "팀이 문제다"],
                        allowNeutral: true,
                        selectedTags: {
                            champions: ["야스오"],
                            lanes: ["미드"],
                            situations: ["팀워크"],
                            maps: [],
                            agents: [],
                        },
                    },
                    {
                        id: Date.now() + 3,
                        title: "서포터가 와드 안 박는데 어떻게 해야 하나요?",
                        gameType: "lol",
                        votes: 18,
                        views: 94,
                        tags: ["서포터", "와드", "시야"],
                        author: { nickname: "ADC마스터", tier: "Diamond" },
                        commentCount: 8,
                        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
                        content:
                            "서포터가 와드를 전혀 박지 않아서 시야가 없습니다.",
                        voteOptions: ["서포터가 잘못했다", "ADC가 잘못했다"],
                        allowNeutral: true,
                        selectedTags: {
                            champions: [],
                            lanes: ["원딜", "서포터"],
                            situations: ["시야"],
                            maps: [],
                            agents: [],
                        },
                    },
                ];

                // 더미 데이터를 localStorage에 저장
                const allPostsWithDummy = [...allPosts, ...dummyPosts];
                localStorage.setItem(
                    "judgegg_posts",
                    JSON.stringify(allPostsWithDummy)
                );
                setPosts(dummyPosts);
            } else {
                // 최신순으로 정렬
                lolPosts.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setPosts(lolPosts);
            }
        } catch (error) {
            console.error("게시글 로드 실패:", error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    // 새 게시글 확인 (주기적으로 체크)
    useEffect(() => {
        const checkForNewPosts = () => {
            loadPosts();
        };

        // 5초마다 새 게시글 체크
        const interval = setInterval(checkForNewPosts, 5000);

        // 페이지 포커스시에도 체크
        const handleFocus = () => {
            loadPosts();
        };
        window.addEventListener("focus", handleFocus);

        return () => {
            clearInterval(interval);
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    const situations = [];

    // 필터 핸들러 함수들
    const handleSortChange = (sortType) => {
        console.log("정렬 변경:", sortType);
        let sortedPosts = [...posts];

        switch (sortType) {
            case "latest":
                sortedPosts.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                break;
            case "popular":
                sortedPosts.sort((a, b) => b.views - a.views);
                break;
            case "votes":
                sortedPosts.sort((a, b) => b.votes - a.votes);
                break;
        }

        setPosts(sortedPosts);
    };

    const handleSearchChange = (query) => {
        console.log("검색어 변경:", query);
        loadPosts(); // 전체 다시 로드 후 필터링 (실제로는 서버에서 검색)
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <CommunityHeader
                    gameType="lol"
                    title="리그 오브 레전드 법원"
                    description="소환사의 협곡에서 발생한 분쟁을 공정하게 심판합니다"
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">
                            게시글을 불러오는 중...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 1. Community Info */}
            <CommunityHeader
                gameType="lol"
                title="리그 오브 레전드 법원"
                description="소환사의 협곡에서 발생한 분쟁을 공정하게 심판합니다"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* 2. Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
                            <h3 className="font-semibold text-gray-900 mb-4">
                                카테고리
                            </h3>

                            {/* 전체 */}
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className={`w-full text-left px-3 py-2 rounded-lg mb-2 transition-colors ${
                                    selectedCategory === "all"
                                        ? "bg-lol-100 text-lol-700 font-medium"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                전체 ({posts.length})
                            </button>

                            {/* 상황별 */}
                            <div className="mb-4">
                                <button
                                    onClick={() =>
                                        setSelectedCategory("situation")
                                    }
                                    className={`w-full text-left px-3 py-2 rounded-lg mb-2 transition-colors ${
                                        selectedCategory === "situation"
                                            ? "bg-lol-100 text-lol-700 font-medium"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    상황별
                                </button>

                                {selectedCategory === "situation" && (
                                    <div className="ml-4 space-y-1">
                                        {situations.map((situation) => (
                                            <button
                                                key={situation}
                                                onClick={() =>
                                                    setSelectedSituation(
                                                        situation
                                                    )
                                                }
                                                className={`w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                                                    selectedSituation ===
                                                    situation
                                                        ? "bg-lol-50 text-lol-600"
                                                        : "hover:bg-gray-50"
                                                }`}
                                            >
                                                {situation}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 챔피언별 */}
                            <div>
                                <button
                                    onClick={() =>
                                        setSelectedCategory("champion")
                                    }
                                    className={`w-full text-left px-3 py-2 rounded-lg mb-2 transition-colors ${
                                        selectedCategory === "champion"
                                            ? "bg-lol-100 text-lol-700 font-medium"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    챔피언별
                                </button>

                                {selectedCategory === "champion" && (
                                    <div className="ml-4">
                                        {/* 챔피언 검색 */}
                                        <input
                                            type="text"
                                            placeholder="챔피언 검색..."
                                            value={championSearch}
                                            onChange={(e) =>
                                                setChampionSearch(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-lol-500 focus:border-transparent"
                                        />

                                        {/* 챔피언 목록 (일단 빈 상태) */}
                                        <div className="text-sm text-gray-500 text-center py-4">
                                            챔피언 데이터 준비중...
                                        </div>

                                        {!showMoreChampions && (
                                            <button
                                                onClick={() =>
                                                    setShowMoreChampions(true)
                                                }
                                                className="w-full text-sm text-lol-600 hover:text-lol-700 py-2"
                                            >
                                                더보기
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 메인 컨텐츠 */}
                    <div className="flex-1">
                        {/* 3. Filter */}
                        <PostFilter
                            gameType="lol"
                            onSortChange={handleSortChange}
                            onSearchChange={handleSearchChange}
                        />

                        {/* 새 게시글 알림 */}
                        <div className="mb-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="w-5 h-5 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="text-blue-700 text-sm">
                                        총 <strong>{posts.length}개</strong>의
                                        재판이 진행 중입니다.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 4. Body - 게시글 목록 */}
                        {posts.length > 0 ? (
                            <div className="space-y-4">
                                {posts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        gameType="lol"
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">
                                    📝
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    아직 등록된 재판이 없습니다
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    첫 번째 재판을 열어보세요!
                                </p>
                                <button
                                    onClick={() =>
                                        (window.location.href =
                                            "/lol/community/write")
                                    }
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    재판 열기
                                </button>
                            </div>
                        )}

                        {/* 더 보기 버튼 */}
                        {posts.length > 0 && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={loadPosts}
                                    className="px-6 py-3 bg-lol-500 text-white rounded-lg hover:bg-lol-600 transition-colors"
                                >
                                    새로고침
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 플로팅 글쓰기 버튼 */}
            <div className="fixed bottom-6 right-32 z-50 group flex flex-col items-center">
                {/* 말풍선 툴팁 */}
                <div
                    className="mb-4 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200"
                    style={{
                        animation: "float 3s ease-in-out infinite",
                    }}
                >
                    ⚖️ 새 재판 열기
                    {/* 말풍선 꼬리 */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>

                <button
                    onClick={() =>
                        (window.location.href = "/lol/community/write")
                    }
                    className="w-14 h-14 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
                    style={{
                        backgroundColor: "#3B82F6",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#2563EB";
                        e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#3B82F6";
                        e.target.style.transform = "scale(1)";
                    }}
                >
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
            </div>

            {/* CSS 애니메이션 정의 */}
            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }
            `}</style>
        </div>
    );
}
