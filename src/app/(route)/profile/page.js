"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "../../utils/auth-check";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedGame, setSelectedGame] = useState("valorant");
    const router = useRouter();

    useEffect(() => {
        // 더미 유저 정보 로드
        const dummyUser = getCurrentUser();
        setUser(dummyUser);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background:
                        "linear-gradient(to bottom right, var(--neutral-50), rgba(30, 136, 229, 0.05))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    className="card"
                    style={{
                        borderRadius: "var(--radius-lg)",
                        padding: "var(--spacing-3xl)",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            fontSize: "48px",
                            marginBottom: "var(--spacing-lg)",
                        }}
                    >
                        ⏳
                    </div>
                    <p>로딩 중...</p>
                </div>
            </div>
        );
    }

    const getTierGradient = (tier) => {
        if (!tier) return "#6b7280, #4b5563";
        const tierName = tier.toLowerCase();
        if (tierName.includes("아이언")) return "#4b5563, #374151";
        if (tierName.includes("브론즈")) return "#d97706, #b45309";
        if (tierName.includes("실버")) return "#d1d5db, #9ca3af";
        if (tierName.includes("골드")) return "#fbbf24, #f59e0b";
        if (tierName.includes("플래티넘")) return "#2dd4bf, #06b6d4";
        if (tierName.includes("에메랄드")) return "#34d399, #10b981";
        if (tierName.includes("다이아몬드")) return "#60a5fa, #6366f1";
        if (tierName.includes("마스터")) return "#a855f7, #7c3aed";
        if (tierName.includes("그랜드마스터")) return "#ef4444, #e11d48";
        if (tierName.includes("챌린저")) return "#fde047, #fb923c";
        return "#6b7280, #4b5563";
    };

    const getCurrentTier = () => {
        return selectedGame === "valorant"
            ? user.stats.valorant.rank
            : user.stats.lol.rank;
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to bottom right, var(--neutral-50), rgba(30, 136, 229, 0.05))",
            }}
        >
            {/* Profile Header */}
            <div
                style={{
                    backgroundColor: "var(--surface)",
                    boxShadow: "var(--shadow-lg)",
                }}
            >
                <div
                    className="container"
                    style={{
                        paddingTop: "var(--spacing-2xl)",
                        paddingBottom: "var(--spacing-2xl)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--spacing-2xl)",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Profile Avatar */}
                        <div style={{ position: "relative" }}>
                            <div
                                style={{
                                    width: "128px",
                                    height: "128px",
                                    background: `linear-gradient(to right, ${getTierGradient(
                                        getCurrentTier()
                                    )}})`,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "var(--shadow-lg)",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "48px",
                                        fontWeight: 700,
                                        color: "white",
                                    }}
                                >
                                    {(user.username || "")
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "-8px",
                                    right: "-8px",
                                    backgroundColor: "var(--surface)",
                                    borderRadius: "50%",
                                    padding: "4px",
                                    boxShadow: "var(--shadow-lg)",
                                }}
                            >
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        background:
                                            "linear-gradient(to right, #34d399, #10b981)",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "white",
                                            fontSize: "14px",
                                        }}
                                    >
                                        ✓
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div style={{ flex: 1 }}>
                            <h1 style={{ marginBottom: "var(--spacing-sm)" }}>
                                {user.username}
                            </h1>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "var(--spacing-lg)",
                                    flexWrap: "wrap",
                                    marginBottom: "var(--spacing-md)",
                                }}
                            >
                                {getCurrentTier() && (
                                    <span
                                        style={{
                                            padding:
                                                "var(--spacing-sm) var(--spacing-lg)",
                                            borderRadius: "9999px",
                                            background: `linear-gradient(to right, ${getTierGradient(
                                                getCurrentTier()
                                            )}})`,
                                            color: "white",
                                            fontWeight: 600,
                                            boxShadow: "var(--shadow-md)",
                                        }}
                                    >
                                        {getCurrentTier()}
                                    </span>
                                )}
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "var(--spacing-xs)",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    <span>🌍</span>
                                    <span>KR 서버</span>
                                </span>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "var(--spacing-sm)",
                                }}
                            >
                                <button
                                    onClick={() => setSelectedGame("valorant")}
                                    style={{
                                        padding:
                                            "var(--spacing-sm) var(--spacing-md)",
                                        border: "none",
                                        borderRadius: "var(--radius-md)",
                                        background:
                                            selectedGame === "valorant"
                                                ? "linear-gradient(135deg, #ff4655 0%, #0f1419 100%)"
                                                : "var(--neutral-100)",
                                        color:
                                            selectedGame === "valorant"
                                                ? "white"
                                                : "var(--text-secondary)",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        transition:
                                            "all var(--transition-normal)",
                                    }}
                                >
                                    🎯 발로란트
                                </button>
                                <button
                                    onClick={() => setSelectedGame("lol")}
                                    style={{
                                        padding:
                                            "var(--spacing-sm) var(--spacing-md)",
                                        border: "none",
                                        borderRadius: "var(--radius-md)",
                                        background:
                                            selectedGame === "lol"
                                                ? "linear-gradient(135deg, #1e88e5 0%, #3b82f6 100%)"
                                                : "var(--neutral-100)",
                                        color:
                                            selectedGame === "lol"
                                                ? "white"
                                                : "var(--text-secondary)",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        transition:
                                            "all var(--transition-normal)",
                                    }}
                                >
                                    ⚔️ 리그 오브 레전드
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div
                            style={{
                                display: "flex",
                                gap: "var(--spacing-lg)",
                            }}
                        >
                            <button
                                className="btn btn-ghost"
                                style={{ borderRadius: "9999px" }}
                            >
                                프로필 편집
                            </button>
                            <button
                                className="btn btn-primary"
                                style={{ borderRadius: "9999px" }}
                            >
                                친구 추가
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div
                className="container"
                style={{
                    paddingTop: "var(--spacing-2xl)",
                    paddingBottom: "var(--spacing-2xl)",
                }}
            >
                {/* Tab Navigation */}
                <div
                    style={{
                        display: "flex",
                        gap: "var(--spacing-lg)",
                        marginBottom: "var(--spacing-2xl)",
                        borderBottom: "1px solid var(--neutral-200)",
                        paddingBottom: "var(--spacing-lg)",
                    }}
                >
                    {[
                        { id: "overview", label: "개요", icon: "📊" },
                        { id: "stats", label: "통계", icon: "📈" },
                        { id: "matches", label: "최근 경기", icon: "🎮" },
                        { id: "posts", label: "내 게시물", icon: "📝" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: "var(--spacing-md) var(--spacing-lg)",
                                border: "none",
                                background:
                                    activeTab === tab.id
                                        ? "var(--accent)"
                                        : "transparent",
                                color:
                                    activeTab === tab.id
                                        ? "white"
                                        : "var(--text-secondary)",
                                borderRadius: "var(--radius-lg)",
                                cursor: "pointer",
                                transition: "all var(--transition-normal)",
                                fontWeight: activeTab === tab.id ? 600 : 400,
                            }}
                        >
                            <span style={{ marginRight: "var(--spacing-sm)" }}>
                                {tab.icon}
                            </span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "var(--spacing-xl)",
                        }}
                    >
                        {/* 선택된 게임 통계 */}
                        <div
                            className="card"
                            style={{ padding: "var(--spacing-xl)" }}
                        >
                            <h3
                                style={{
                                    marginBottom: "var(--spacing-lg)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "var(--spacing-sm)",
                                }}
                            >
                                <span>
                                    {selectedGame === "valorant" ? "🎯" : "⚔️"}
                                </span>
                                {selectedGame === "valorant"
                                    ? "발로란트 통계"
                                    : "리그 오브 레전드 통계"}
                            </h3>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "var(--spacing-md)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>랭크:</span>
                                    <span style={{ fontWeight: 600 }}>
                                        {selectedGame === "valorant"
                                            ? user.stats.valorant.rank
                                            : user.stats.lol.rank}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>
                                        {selectedGame === "valorant"
                                            ? "RR:"
                                            : "LP:"}
                                    </span>
                                    <span style={{ fontWeight: 600 }}>
                                        {selectedGame === "valorant"
                                            ? user.stats.valorant.rr
                                            : user.stats.lol.lp}
                                    </span>
                                </div>
                                {selectedGame === "valorant" ? (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <span>평균 ACS:</span>
                                            <span style={{ fontWeight: 600 }}>
                                                {user.stats.valorant.acs}
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <span>K/D:</span>
                                            <span style={{ fontWeight: 600 }}>
                                                {user.stats.valorant.kd}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span>KDA:</span>
                                        <span style={{ fontWeight: 600 }}>
                                            {user.stats.lol.kda}
                                        </span>
                                    </div>
                                )}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>승률:</span>
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            color:
                                                (selectedGame === "valorant"
                                                    ? user.stats.valorant
                                                          .winRate
                                                    : user.stats.lol.winRate) >
                                                50
                                                    ? "#10b981"
                                                    : "#ef4444",
                                        }}
                                    >
                                        {selectedGame === "valorant"
                                            ? user.stats.valorant.winRate
                                            : user.stats.lol.winRate}
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 주요 캐릭터/에이전트 */}
                        <div
                            className="card"
                            style={{ padding: "var(--spacing-xl)" }}
                        >
                            <h3
                                style={{
                                    marginBottom: "var(--spacing-lg)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "var(--spacing-sm)",
                                }}
                            >
                                <span>🏆</span>
                                주요{" "}
                                {selectedGame === "valorant"
                                    ? "에이전트"
                                    : "챔피언"}
                            </h3>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "var(--spacing-sm)",
                                }}
                            >
                                {(selectedGame === "valorant"
                                    ? user.mainAgents
                                    : user.mainChampions
                                ).map((character, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            padding:
                                                "var(--spacing-sm) var(--spacing-md)",
                                            background:
                                                selectedGame === "valorant"
                                                    ? "linear-gradient(135deg, rgba(255, 70, 85, 0.1) 0%, rgba(15, 20, 25, 0.1) 100%)"
                                                    : "linear-gradient(135deg, rgba(30, 136, 229, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
                                            borderRadius: "var(--radius-md)",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            color:
                                                selectedGame === "valorant"
                                                    ? "#ff4655"
                                                    : "#1e88e5",
                                        }}
                                    >
                                        {character}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 활동 통계 */}
                        <div
                            className="card"
                            style={{ padding: "var(--spacing-xl)" }}
                        >
                            <h3
                                style={{
                                    marginBottom: "var(--spacing-lg)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "var(--spacing-sm)",
                                }}
                            >
                                <span>📊</span>
                                커뮤니티 활동
                            </h3>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "var(--spacing-md)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>총 게시물:</span>
                                    <span style={{ fontWeight: 600 }}>
                                        {user.totalPosts}개
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>받은 투표:</span>
                                    <span style={{ fontWeight: 600 }}>
                                        {user.totalVotes}개
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>가입일:</span>
                                    <span style={{ fontWeight: 600 }}>
                                        {user.joinDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "matches" && (
                    <div
                        className="card"
                        style={{ padding: "var(--spacing-xl)" }}
                    >
                        <h3
                            style={{
                                marginBottom: "var(--spacing-lg)",
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--spacing-sm)",
                            }}
                        >
                            <span>
                                {selectedGame === "valorant" ? "🎯" : "⚔️"}
                            </span>
                            {selectedGame === "valorant"
                                ? "발로란트"
                                : "리그 오브 레전드"}{" "}
                            최근 경기
                        </h3>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "var(--spacing-md)",
                            }}
                        >
                            {(selectedGame === "valorant"
                                ? user.stats.valorant.recentMatches
                                : user.stats.lol.recentMatches
                            ).map((match, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: "var(--spacing-md)",
                                        border: "1px solid var(--neutral-200)",
                                        borderRadius: "var(--radius-md)",
                                        borderLeft: `4px solid ${
                                            match.result === "승리"
                                                ? "#10b981"
                                                : "#ef4444"
                                        }`,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "var(--spacing-sm)",
                                        }}
                                    >
                                        <span style={{ fontWeight: 600 }}>
                                            {selectedGame === "valorant"
                                                ? match.map
                                                : match.champion}
                                        </span>
                                        <span
                                            style={{
                                                color:
                                                    match.result === "승리"
                                                        ? "#10b981"
                                                        : "#ef4444",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {match.result}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            fontSize: "14px",
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        <span>
                                            {selectedGame === "valorant"
                                                ? match.agent
                                                : match.position}
                                        </span>
                                        <span>
                                            {selectedGame === "valorant"
                                                ? `ACS: ${match.acs}`
                                                : `KDA: ${match.kda}`}
                                        </span>
                                    </div>
                                    {selectedGame === "valorant" && (
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            스코어: {match.score}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 다른 탭들도 비슷하게 구현 */}
                {activeTab === "stats" && (
                    <div
                        className="card"
                        style={{
                            padding: "var(--spacing-xl)",
                            textAlign: "center",
                        }}
                    >
                        <h3>상세 통계</h3>
                        <p style={{ color: "var(--text-secondary)" }}>
                            상세 통계 기능은 곧 추가될 예정입니다.
                        </p>
                    </div>
                )}

                {activeTab === "posts" && (
                    <div
                        className="card"
                        style={{
                            padding: "var(--spacing-xl)",
                            textAlign: "center",
                        }}
                    >
                        <h3>내 게시물</h3>
                        <p style={{ color: "var(--text-secondary)" }}>
                            게시물 관리 기능은 곧 추가될 예정입니다.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
