"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { requireAuth } from "@/app/utils/auth-check";
import { useRouter } from "next/navigation";
import LoginModal from "@/app/components/LoginModal";

export default function ValorantCommunityPage() {
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [posts] = useState([
        {
            id: 1,
            title: "어센트 A사이트 진입 vs 미드 컨트롤",
            content:
                "라운드 초반에 A사이트로 바로 진입할지 미드를 먼저 컨트롤할지 고민됩니다.",
            author: "듀얼리스트123",
            tier: "다이아몬드 2",
            votes: { a: 67, b: 34 },
            tags: ["사이트 진입", "전략", "팀플레이"],
            situation: "사이트 진입",
            map: "어센트",
            game: "발로란트",
            agents: ["제트", "레이나"],
            createdAt: "1시간 전",
            comments: 15,
        },
        {
            id: 2,
            title: "바인드 B사이트 방어 포지션",
            content:
                "상대팀이 B사이트로 러시할 때 어떤 포지션이 가장 효과적일까요?",
            author: "센티넬456",
            tier: "플래티넘 1",
            votes: { a: 45, b: 23 },
            tags: ["사이트 방어", "포지셔닝", "센티넬"],
            situation: "사이트 방어",
            map: "바인드",
            game: "발로란트",
            agents: ["사이퍼", "킬조이"],
            createdAt: "3시간 전",
            comments: 8,
        },
        {
            id: 3,
            title: "헤이븐 리테이크 상황 판단",
            content:
                "C사이트를 빼앗겼을 때 리테이크 타이밍과 방법에 대해 조언 부탁드립니다.",
            author: "컨트롤러789",
            tier: "초월자 3",
            votes: { a: 89, b: 12 },
            tags: ["리테이크", "타이밍", "팀워크"],
            situation: "리테이크",
            map: "헤이븐",
            game: "발로란트",
            agents: ["오멘", "바이퍼"],
            createdAt: "5시간 전",
            comments: 22,
        },
        {
            id: 4,
            title: "스플릿 미드 컨트롤 에이전트 선택",
            content:
                "스플릿에서 미드를 효과적으로 컨트롤할 수 있는 에이전트 조합이 궁금합니다.",
            author: "이니시에이터",
            tier: "골드 3",
            votes: { a: 34, b: 56 },
            tags: ["미드 컨트롤", "에이전트 선택", "맵 컨트롤"],
            situation: "맵 컨트롤",
            map: "스플릿",
            game: "발로란트",
            agents: ["소바", "브리치"],
            createdAt: "7시간 전",
            comments: 12,
        },
    ]);

    const [activeFilters, setActiveFilters] = useState({
        situation: [],
        map: [],
        agent: [],
        tag: [],
    });

    // Show more states
    const [agentSearch, setAgentSearch] = useState("");

    // All agents data (역할군별 분류에서 사용)
    const allAgents = [
        "게코",
        "네온",
        "데드락",
        "레이나",
        "레이즈",
        "멘",
        "바이퍼",
        "브리치",
        "브림스톤",
        "세이지",
        "소바",
        "스카이",
        "아스트라",
        "아이소",
        "오멘",
        "요루",
        "제트",
        "체임버",
        "케이오",
        "킬조이",
        "페이드",
        "피닉스",
        "하버",
        "사이퍼",
        "클로브",
    ].sort();

    const valorantMaps = [
        "어센트",
        "바인드",
        "헤이븐",
        "스플릿",
        "아이스박스",
        "브리즈",
        "프랙처",
        "펄",
        "로터스",
        "선셋",
    ];

    const valorantSituations = [
        "사이트 진입",
        "사이트 방어",
        "리테이크",
        "세팅",
        "클러치",
        "이코 라운드",
        "포스 바이",
        "포스트 플랜트",
    ];

    // Filter agents based on search
    const filteredAgents = useMemo(() => {
        if (!agentSearch) return allAgents;
        return allAgents.filter((agent) =>
            agent.toLowerCase().includes(agentSearch.toLowerCase())
        );
    }, [agentSearch, allAgents]);

    // 에이전트를 역할군별로 분류
    const agentsByRole = {
        엔트리: [
            "제트",
            "레이나",
            "레이즈",
            "피닉스",
            "요루",
            "네온",
            "아이소",
        ],
        척후대: ["소바", "브리치", "스카이", "케이오", "페이드", "게코"],
        전략가: ["오멘", "바이퍼", "브림스톤", "아스트라", "하버", "클로브"],
        감시자: ["사이퍼", "킬조이", "세이지", "체임버", "데드락"],
    };

    // 검색어에 따른 역할군별 필터링
    const filteredAgentsByRole = useMemo(() => {
        if (!agentSearch) return agentsByRole;

        const filtered = {};
        Object.keys(agentsByRole).forEach((role) => {
            const filteredRoleAgents = agentsByRole[role].filter((agent) =>
                agent.toLowerCase().includes(agentSearch.toLowerCase())
            );
            if (filteredRoleAgents.length > 0) {
                filtered[role] = filteredRoleAgents;
            }
        });
        return filtered;
    }, [agentSearch, agentsByRole]);

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
        if (tierLower.includes("아센던트") || tierLower.includes("초월자"))
            return "tier-ascendant";
        if (tierLower.includes("불멸")) return "tier-immortal";
        if (tierLower.includes("레디언트")) return "tier-radiant";
        return "tier-unranked";
    };

    const getTagClass = (tag) => {
        const tagColors = [
            "tag-red",
            "tag-orange",
            "tag-yellow",
            "tag-green",
            "tag-blue",
            "tag-purple",
        ];
        return tagColors[tag.length % tagColors.length];
    };

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            // 발로란트 게시물만 표시
            if (post.game !== "발로란트") return false;

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

            // 에이전트 필터
            if (activeFilters.agent.length > 0) {
                const hasAgent = post.agents?.some((agent) =>
                    activeFilters.agent.includes(agent)
                );
                if (!hasAgent) return false;
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
            agent: [],
            tag: [],
        });
        setAgentSearch("");
    };

    const hasActiveFilters =
        Object.values(activeFilters).some((arr) => arr.length > 0) ||
        agentSearch;

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
                                    "linear-gradient(to right, #ff4655, #0f1419)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            발로란트 문철 게시판
                        </h1>
                        <p style={{ color: "var(--text-secondary)" }}>
                            발로란트 플레이 상황을 공유하고 커뮤니티의 판정을
                            받아보세요
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            requireAuth(
                                () => router.push("/valorant/community/upload"),
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
                            background:
                                "linear-gradient(135deg, #ff4655 0%, #0f1419 100%)",
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
                                            color: "#ff4655",
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
                                    {valorantSituations.map((situation) => (
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
                                    {valorantMaps.map((map) => (
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

                            {/* 에이전트별 필터 */}
                            <div style={{ marginBottom: "var(--spacing-xl)" }}>
                                <h4
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        marginBottom: "var(--spacing-md)",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    에이전트별
                                </h4>

                                {/* 에이전트 검색 */}
                                <div
                                    style={{
                                        marginBottom: "var(--spacing-md)",
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="에이전트 검색..."
                                        value={agentSearch}
                                        onChange={(e) =>
                                            setAgentSearch(e.target.value)
                                        }
                                        className="filter-search"
                                    />
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "var(--spacing-md)",
                                        maxHeight: "300px",
                                        overflowY: "auto",
                                    }}
                                >
                                    {Object.keys(filteredAgentsByRole).map(
                                        (role) => (
                                            <div key={role}>
                                                <h5
                                                    style={{
                                                        fontSize: "12px",
                                                        fontWeight: 600,
                                                        color: "var(--text-primary)",
                                                        marginBottom:
                                                            "var(--spacing-sm)",
                                                        textTransform:
                                                            "uppercase",
                                                        letterSpacing: "0.05em",
                                                    }}
                                                >
                                                    {role}
                                                </h5>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "var(--spacing-sm)",
                                                        marginBottom:
                                                            "var(--spacing-sm)",
                                                    }}
                                                >
                                                    {filteredAgentsByRole[
                                                        role
                                                    ].map((agent) => (
                                                        <label
                                                            key={agent}
                                                            style={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={activeFilters.agent.includes(
                                                                    agent
                                                                )}
                                                                onChange={() =>
                                                                    toggleFilter(
                                                                        "agent",
                                                                        agent
                                                                    )
                                                                }
                                                                style={{
                                                                    marginRight:
                                                                        "var(--spacing-sm)",
                                                                }}
                                                                className="filter-checkbox"
                                                            />
                                                            <span
                                                                style={{
                                                                    fontSize:
                                                                        "14px",
                                                                }}
                                                            >
                                                                {agent}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    )}

                                    {Object.keys(filteredAgentsByRole)
                                        .length === 0 &&
                                        agentSearch && (
                                            <p
                                                style={{
                                                    fontSize: "14px",
                                                    color: "var(--text-secondary)",
                                                    textAlign: "center",
                                                    padding:
                                                        "var(--spacing-md)",
                                                }}
                                            >
                                                검색 결과가 없습니다
                                            </p>
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
                                        href={`/valorant/community/${post.id}`}
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
                                                            color: "#ff4655",
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
                                                    {post.agents && (
                                                        <span>
                                                            🎯{" "}
                                                            {post.agents.join(
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
                    router.push("/valorant/community/upload");
                }}
            />
        </div>
    );
}
