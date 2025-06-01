"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { requireAuth } from "@/app/utils/auth-check";
import { useRouter } from "next/navigation";
import LoginModal from "@/app/components/LoginModal";

export default function CommunityPage() {
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [posts] = useState([
        {
            id: 1,
            title: "바론 스틸 vs 팀파이트 선택 상황",
            content:
                "바론을 치고 있는데 상대팀이 오는 상황에서 어떤 선택이 맞을까요?",
            author: "정글러123",
            tier: "골드 2",
            votes: { a: 45, b: 23 },
            tags: ["바론", "팀파이트", "정글"],
            situation: "오브젝트",
            map: "소환사의 협곡",
            game: "리그 오브 레전드",
            champions: ["리신", "그레이브즈"],
            createdAt: "2시간 전",
            comments: 12,
        },
        {
            id: 2,
            title: "탑 라인전 갱킹 타이밍 판정",
            content:
                "상대방이 푸시하고 있을 때 갱킹을 요청했는데 안 와줬어요. 누구 잘못인가요?",
            author: "탑솔러456",
            tier: "플래티넘 4",
            votes: { a: 67, b: 34 },
            tags: ["탑", "갱킹", "라인전"],
            situation: "라인전",
            map: "소환사의 협곡",
            game: "리그 오브 레전드",
            champions: ["가렌", "다리우스"],
            createdAt: "4시간 전",
            comments: 8,
        },
        {
            id: 3,
            title: "서포터 로밍 vs 원딜 보호",
            content: "미드에 갱킹 기회가 있는데 원딜이 혼자 남는 상황입니다.",
            author: "서포터789",
            tier: "다이아몬드 3",
            votes: { a: 89, b: 12 },
            tags: ["서포터", "로밍", "원딜"],
            situation: "로밍",
            map: "소환사의 협곡",
            game: "리그 오브 레전드",
            champions: ["쓰레쉬", "노틸러스"],
            createdAt: "6시간 전",
            comments: 15,
        },
        {
            id: 4,
            title: "칼바람 나락 시작 아이템 선택",
            content:
                "AP 챔피언으로 시작할 때 잃은 챕터 vs 도란링 어떤게 좋나요?",
            author: "칼바람장인",
            tier: "실버 1",
            votes: { a: 34, b: 56 },
            tags: ["아이템", "시작템", "AP"],
            situation: "아이템빌드",
            map: "칼바람 나락",
            game: "리그 오브 레전드",
            champions: ["럭스", "제라스"],
            createdAt: "8시간 전",
            comments: 20,
        },
        {
            id: 5,
            title: "베이븐 에코 로테이션 어디로?",
            content:
                "B 사이트 베이븐에서 2명이 들어오는데 에코 어디로 가야 하나요?",
            author: "발로란트유저99",
            tier: "골드 3",
            votes: { a: 56, b: 32 },
            tags: ["베이븐", "로테이션", "수비"],
            situation: "사이트 방어",
            map: "베이븐",
            game: "발로란트",
            agents: ["오멘", "제트"],
            createdAt: "5시간 전",
            comments: 9,
        },
        {
            id: 6,
            title: "스플릿 A사이트 리테이크 진입 타이밍",
            content: "A 사이트를 뺏겼을 때 스모크 없이 진입해야 할까요?",
            author: "레이디언트123",
            tier: "다이아몬드 2",
            votes: { a: 78, b: 43 },
            tags: ["스플릿", "리테이크", "A사이트"],
            situation: "리테이크",
            map: "스플릿",
            game: "발로란트",
            agents: ["브림스톤", "페이드"],
            createdAt: "1시간 전",
            comments: 18,
        },
        {
            id: 7,
            title: "어센트 B메인 연막 타이밍 판정",
            content:
                "러쉬할 때 오멘 연막을 먼저 깔고 가야 하나요, 아니면 진입하면서 깔아야 하나요?",
            author: "불멸3유저",
            tier: "불멸 3",
            votes: { a: 92, b: 31 },
            tags: ["어센트", "연막", "러쉬"],
            situation: "사이트 진입",
            map: "어센트",
            game: "발로란트",
            agents: ["오멘", "레이나"],
            createdAt: "3시간 전",
            comments: 24,
        },
        {
            id: 8,
            title: "헤이븐 가라지 수비 로테이션",
            content: "C 사이트에서 가라지 소리 들렸을 때 바로 로테해야 하나요?",
            author: "플래3수비전문",
            tier: "플래티넘 3",
            votes: { a: 45, b: 67 },
            tags: ["헤이븐", "로테이션", "수비"],
            situation: "사이트 방어",
            map: "헤이븐",
            game: "발로란트",
            agents: ["사이퍼", "소바"],
            createdAt: "2시간 전",
            comments: 15,
        },
        {
            id: 9,
            title: "바인드 A숏 홀드 각도 선택",
            content:
                "A숏 홀드할 때 화장실 앞에서 보는게 나은가요 아니면 램프에서 보는게 나은가요?",
            author: "실버탈출희망",
            tier: "실버 2",
            votes: { a: 34, b: 89 },
            tags: ["바인드", "홀드", "수비"],
            situation: "사이트 방어",
            map: "바인드",
            game: "발로란트",
            agents: ["킬조이", "세이지"],
            createdAt: "7시간 전",
            comments: 31,
        },
        {
            id: 10,
            title: "아이스박스 B사이트 얼티 사용 타이밍",
            content:
                "제트 얼티 쓸 때 연막 먼저 까는게 좋나요 아니면 바로 날아가는게 좋나요?",
            author: "제트원트릭",
            tier: "골드 1",
            votes: { a: 56, b: 72 },
            tags: ["아이스박스", "얼티메이트", "제트"],
            situation: "얼티메이트",
            map: "아이스박스",
            game: "발로란트",
            agents: ["제트", "레이즈"],
            createdAt: "4시간 전",
            comments: 19,
        },
    ]);

    const [activeFilters, setActiveFilters] = useState({
        situation: [],
        map: [],
        champion: [],
        tag: [],
    });

    // Show more states
    const [showAllChampions, setShowAllChampions] = useState(false);
    const [championSearch, setChampionSearch] = useState("");

    // All champions data
    const allChampions = [
        "가렌",
        "갈리오",
        "갱플랭크",
        "그라가스",
        "그레이브즈",
        "그웬",
        "나르",
        "나미",
        "나서스",
        "노틸러스",
        "녹턴",
        "누누와 윌럼프",
        "니달리",
        "니코",
        "닐라",
        "다리우스",
        "다이애나",
        "드레이븐",
        "라이즈",
        "라칸",
        "람머스",
        "럭스",
        "럼블",
        "레나타 글라스크",
        "레넥톤",
        "레오나",
        "렉사이",
        "렐",
        "렝가",
        "루시안",
        "룰루",
        "르블랑",
        "리 신",
        "리븐",
        "리산드라",
        "릴리아",
        "마스터 이",
        "마오카이",
        "말자하",
        "말파이트",
        "모데카이저",
        "모르가나",
        "문도 박사",
        "미스 포츈",
        "밀리오",
        "바드",
        "바루스",
        "바이",
        "베이가",
        "베인",
        "벡스",
        "벨베스",
        "벨코즈",
        "볼리베어",
        "브라움",
        "브랜드",
        "브라이어",
        "블라디미르",
        "블리츠크랭크",
        "빅토르",
        "뽀삐",
        "사미라",
        "사이온",
        "사일러스",
        "샤코",
        "세나",
        "세라핀",
        "세주아니",
        "세트",
        "소나",
        "소라카",
        "쉔",
        "쉬바나",
        "스웨인",
        "스카너",
        "시비르",
        "신 짜오",
        "신드라",
        "신지드",
        "쓰레쉬",
        "아리",
        "아무무",
        "아우렐리온 솔",
        "아이번",
        "아지르",
        "아칼리",
        "아크샨",
        "아트록스",
        "아펠리오스",
        "알리스타",
        "애니",
        "애니비아",
        "애쉬",
        "야스오",
        "에코",
        "엘리스",
        "오공",
        "오른",
        "오리아나",
        "올라프",
        "요네",
        "요릭",
        "우디르",
        "우르곳",
        "워윅",
        "유미",
        "이렐리아",
        "이블린",
        "이즈리얼",
        "일라오이",
        "자르반 4세",
        "자야",
        "자이라",
        "자크",
        "잔나",
        "잭스",
        "제드",
        "제라스",
        "제리",
        "제이스",
        "조이",
        "직스",
        "진",
        "질리언",
        "징크스",
        "초가스",
        "카르마",
        "카밀",
        "카사딘",
        "카서스",
        "카시오페아",
        "카이사",
        "카직스",
        "카타리나",
        "칼리스타",
        "케넨",
        "케이틀린",
        "케인",
        "케일",
        "코그모",
        "코르키",
        "퀸",
        "크산테",
        "클레드",
        "키아나",
        "킨드레드",
        "타릭",
        "탈론",
        "탈리야",
        "탐 켄치",
        "트런들",
        "트리스타나",
        "트린다미어",
        "트위스티드 페이트",
        "트위치",
        "티모",
        "파이크",
        "판테온",
        "피들스틱",
        "피오라",
        "피즈",
        "하이머딩거",
        "헤카림",
        "흐웨이",
    ].sort();

    const lolMaps = ["소환사의 협곡", "칼바람 나락"];

    const lolSituations = [
        "라인전",
        "갱킹",
        "로밍",
        "한타",
        "오브젝트",
        "아이템빌드",
        "정글링",
        "백도어",
    ];

    // Filter champions based on search
    const filteredChampions = useMemo(() => {
        if (!championSearch) return allChampions;
        return allChampions.filter((champion) =>
            champion.toLowerCase().includes(championSearch.toLowerCase())
        );
    }, [championSearch, allChampions]);

    const toggleFilter = (category, value) => {
        setActiveFilters((prev) => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter((item) => item !== value)
                : [...prev[category], value],
        }));
    };

    const getTierClass = (tier) => {
        const tierLower = tier.toLowerCase();
        if (tierLower.includes("아이언")) return "tier-iron";
        if (tierLower.includes("브론즈")) return "tier-bronze";
        if (tierLower.includes("실버")) return "tier-silver";
        if (tierLower.includes("골드")) return "tier-gold";
        if (tierLower.includes("플래티넘")) return "tier-platinum";
        if (tierLower.includes("다이아몬드")) return "tier-diamond";
        if (tierLower.includes("마스터")) return "tier-master";
        if (tierLower.includes("그랜드마스터")) return "tier-grandmaster";
        if (tierLower.includes("챌린저")) return "tier-challenger";
        return "tier-unranked";
    };

    const getTagClass = (tag) => {
        const tagColors = [
            "tag-blue",
            "tag-green",
            "tag-purple",
            "tag-orange",
            "tag-pink",
            "tag-red",
        ];
        return tagColors[tag.length % tagColors.length];
    };

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            // 롤 게시물만 표시
            if (post.game !== "리그 오브 레전드") return false;

            // 상황 필터
            if (
                activeFilters.situation.length > 0 &&
                !activeFilters.situation.includes(post.situation)
            ) {
                return false;
            }

            // 맵 필터
            if (
                activeFilters.map.length > 0 &&
                !activeFilters.map.includes(post.map)
            ) {
                return false;
            }

            // 챔피언 필터
            if (activeFilters.champion.length > 0) {
                const hasChampion = post.champions?.some((champion) =>
                    activeFilters.champion.includes(champion)
                );
                if (!hasChampion) return false;
            }

            // 태그 필터
            if (activeFilters.tag.length > 0) {
                const hasTag = post.tags.some((tag) =>
                    activeFilters.tag.includes(tag)
                );
                if (!hasTag) return false;
            }

            return true;
        });
    }, [posts, activeFilters]);

    const clearAllFilters = () => {
        setActiveFilters({
            situation: [],
            map: [],
            champion: [],
            tag: [],
        });
        setChampionSearch("");
    };

    const hasActiveFilters =
        Object.values(activeFilters).some((arr) => arr.length > 0) ||
        championSearch;

    return (
        <div style={{ minHeight: "100vh", background: "var(--background)" }}>
            <div
                className="container"
                style={{
                    paddingTop: "var(--spacing-2xl)",
                    paddingBottom: "var(--spacing-2xl)",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "var(--spacing-2xl)",
                        flexWrap: "wrap",
                        gap: "var(--spacing-lg)",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                fontSize: "32px",
                                fontWeight: 700,
                                marginBottom: "var(--spacing-sm)",
                                background:
                                    "linear-gradient(to right, #1e88e5, #7c3aed)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            리그 오브 레전드 문철 게시판
                        </h1>
                        <p style={{ color: "var(--text-secondary)" }}>
                            리그 오브 레전드 플레이 상황을 공유하고 커뮤니티의
                            판정을 받아보세요
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            requireAuth(
                                () => router.push("/community/upload"),
                                setShowLoginModal
                            );
                        }}
                        className="btn btn-primary"
                        style={{
                            padding: "0 var(--spacing-xl)",
                            height: "48px",
                            borderRadius: "var(--radius-lg)",
                            fontSize: "16px",
                            fontWeight: 600,
                        }}
                    >
                        📝 새 글 작성
                    </button>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "280px 1fr",
                        gap: "var(--spacing-2xl)",
                    }}
                    className="filter-grid"
                >
                    {/* Filters Sidebar */}
                    <div
                        style={{
                            position: "sticky",
                            top: "var(--spacing-xl)",
                            height: "fit-content",
                        }}
                        className="filter-sidebar"
                    >
                        <div
                            className="card"
                            style={{ padding: "var(--spacing-xl)" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "var(--spacing-lg)",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: 600,
                                    }}
                                >
                                    필터
                                </h3>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearAllFilters}
                                        style={{
                                            color: "var(--accent)",
                                            fontSize: "14px",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        전체 해제
                                    </button>
                                )}
                            </div>

                            {/* 상황별 필터 */}
                            <div style={{ marginBottom: "var(--spacing-xl)" }}>
                                <h4
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        marginBottom: "var(--spacing-md)",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    상황별
                                </h4>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "var(--spacing-sm)",
                                    }}
                                >
                                    {lolSituations.map((situation) => (
                                        <label
                                            key={situation}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={activeFilters.situation.includes(
                                                    situation
                                                )}
                                                onChange={() =>
                                                    toggleFilter(
                                                        "situation",
                                                        situation
                                                    )
                                                }
                                                style={{
                                                    marginRight:
                                                        "var(--spacing-sm)",
                                                }}
                                                className="filter-checkbox"
                                            />
                                            <span style={{ fontSize: "14px" }}>
                                                {situation}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 맵별 필터 */}
                            <div style={{ marginBottom: "var(--spacing-xl)" }}>
                                <h4
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        marginBottom: "var(--spacing-md)",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    맵별
                                </h4>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "var(--spacing-sm)",
                                    }}
                                >
                                    {lolMaps.map((map) => (
                                        <label
                                            key={map}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={activeFilters.map.includes(
                                                    map
                                                )}
                                                onChange={() =>
                                                    toggleFilter("map", map)
                                                }
                                                style={{
                                                    marginRight:
                                                        "var(--spacing-sm)",
                                                }}
                                                className="filter-checkbox"
                                            />
                                            <span style={{ fontSize: "14px" }}>
                                                {map}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 챔피언별 필터 */}
                            <div style={{ marginBottom: "var(--spacing-xl)" }}>
                                <h4
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        marginBottom: "var(--spacing-md)",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    챔피언별
                                </h4>

                                {/* 챔피언 검색 */}
                                <div
                                    style={{
                                        marginBottom: "var(--spacing-md)",
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="챔피언 검색..."
                                        value={championSearch}
                                        onChange={(e) =>
                                            setChampionSearch(e.target.value)
                                        }
                                        className="filter-search"
                                    />
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "var(--spacing-sm)",
                                        maxHeight: "200px",
                                        overflowY: "auto",
                                    }}
                                >
                                    {(showAllChampions
                                        ? filteredChampions
                                        : filteredChampions.slice(0, 8)
                                    ).map((champion) => (
                                        <label
                                            key={champion}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={activeFilters.champion.includes(
                                                    champion
                                                )}
                                                onChange={() =>
                                                    toggleFilter(
                                                        "champion",
                                                        champion
                                                    )
                                                }
                                                style={{
                                                    marginRight:
                                                        "var(--spacing-sm)",
                                                }}
                                                className="filter-checkbox"
                                            />
                                            <span style={{ fontSize: "14px" }}>
                                                {champion}
                                            </span>
                                        </label>
                                    ))}
                                    {filteredChampions.length > 8 &&
                                        !championSearch && (
                                            <button
                                                onClick={() =>
                                                    setShowAllChampions(
                                                        !showAllChampions
                                                    )
                                                }
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    color: "var(--accent)",
                                                    fontSize: "12px",
                                                    cursor: "pointer",
                                                    textAlign: "left",
                                                    padding: 0,
                                                }}
                                            >
                                                {showAllChampions
                                                    ? "접기"
                                                    : `+${
                                                          filteredChampions.length -
                                                          8
                                                      }개 더보기`}
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Posts List */}
                    <div>
                        {filteredPosts.length === 0 ? (
                            <div
                                className="card"
                                style={{
                                    padding: "var(--spacing-3xl)",
                                    textAlign: "center",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "18px",
                                        marginBottom: "var(--spacing-lg)",
                                    }}
                                >
                                    조건에 맞는 게시물이 없습니다
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="btn btn-ghost"
                                >
                                    필터 초기화
                                </button>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "var(--spacing-lg)",
                                }}
                            >
                                {filteredPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/community/${post.id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <div
                                            className="card"
                                            style={{
                                                padding: "var(--spacing-xl)",
                                                cursor: "pointer",
                                                transition:
                                                    "all var(--transition-normal)",
                                                border: "1px solid var(--neutral-100)",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "flex-start",
                                                    marginBottom:
                                                        "var(--spacing-md)",
                                                }}
                                            >
                                                <div style={{ flex: 1 }}>
                                                    <h3
                                                        style={{
                                                            fontSize: "18px",
                                                            fontWeight: 600,
                                                            marginBottom:
                                                                "var(--spacing-sm)",
                                                            lineHeight: "1.4",
                                                        }}
                                                    >
                                                        {post.title}
                                                    </h3>
                                                    <p
                                                        style={{
                                                            color: "var(--text-secondary)",
                                                            lineHeight: "1.5",
                                                            marginBottom:
                                                                "var(--spacing-md)",
                                                        }}
                                                    >
                                                        {post.content}
                                                    </p>
                                                </div>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        marginLeft:
                                                            "var(--spacing-lg)",
                                                        minWidth: "80px",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontSize: "24px",
                                                            fontWeight: 700,
                                                            color: "var(--accent)",
                                                            marginBottom:
                                                                "var(--spacing-xs)",
                                                        }}
                                                    >
                                                        {post.votes.a +
                                                            post.votes.b}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: "12px",
                                                            color: "var(--text-secondary)",
                                                        }}
                                                    >
                                                        투표
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: "var(--spacing-sm)",
                                                    marginBottom:
                                                        "var(--spacing-md)",
                                                }}
                                            >
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className={`tag ${getTagClass(
                                                            tag
                                                        )}`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                    fontSize: "14px",
                                                    color: "var(--text-secondary)",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "var(--spacing-lg)",
                                                    }}
                                                >
                                                    <span>{post.author}</span>
                                                    <span
                                                        className={`tier ${getTierClass(
                                                            post.tier
                                                        )}`}
                                                    >
                                                        {post.tier}
                                                    </span>
                                                    <span>🗺️ {post.map}</span>
                                                    {post.champions && (
                                                        <span>
                                                            ⚔️{" "}
                                                            {post.champions.join(
                                                                ", "
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "var(--spacing-md)",
                                                    }}
                                                >
                                                    <span>
                                                        💬 {post.comments}
                                                    </span>
                                                    <span>
                                                        {post.createdAt}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={() => {
                    setShowLoginModal(false);
                    router.push("/community/upload");
                }}
            />
        </div>
    );
}
