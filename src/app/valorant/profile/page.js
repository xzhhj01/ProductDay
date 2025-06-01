"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "../../utils/auth-check";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../styles/profile.module.css";

export default function ValorantProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const router = useRouter();

    useEffect(() => {
        // 더미 유저 정보 로드
        const dummyUser = getCurrentUser();
        setUser(dummyUser);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className={styles.valorantLoadingContainer}>
                <div className={`card ${styles.loadingCard}`}>
                    <div className={styles.loadingIcon}>⏳</div>
                    <p>로딩 중...</p>
                </div>
            </div>
        );
    }

    const getValorantTierGradient = (tier) => {
        if (!tier) return "#6b7280, #4b5563";
        const tierName = tier.toLowerCase();
        if (tierName.includes("아이언")) return "#4b5563, #374151";
        if (tierName.includes("브론즈")) return "#d97706, #b45309";
        if (tierName.includes("실버")) return "#d1d5db, #9ca3af";
        if (tierName.includes("골드")) return "#fbbf24, #f59e0b";
        if (tierName.includes("플래티넘")) return "#2dd4bf, #06b6d4";
        if (tierName.includes("다이아몬드")) return "#60a5fa, #6366f1";
        if (tierName.includes("어센던트")) return "#34d399, #10b981";
        if (tierName.includes("불멸") || tierName.includes("이모탈"))
            return "#a855f7, #7c3aed";
        if (tierName.includes("레디언트")) return "#fde047, #fb923c";
        return "#6b7280, #4b5563";
    };

    return (
        <div className={styles.valorantContainer}>
            {/* Profile Header */}
            <div className={styles.profileHeader}>
                <div className={`container ${styles.profileHeaderContainer}`}>
                    <div className={styles.profileHeaderContent}>
                        {/* Profile Avatar */}
                        <div className={styles.avatarContainer}>
                            <div
                                className={styles.avatar}
                                style={{
                                    background: `linear-gradient(to right, ${getValorantTierGradient(
                                        user.valorantTier
                                    )})`,
                                }}
                            >
                                <span className={styles.avatarText}>
                                    {(user.username || "")
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>
                            </div>
                            <div className={styles.statusBadge}>
                                <div
                                    className={`${styles.statusIcon} ${styles.valorantStatusIcon}`}
                                >
                                    <span className={styles.statusIconText}>
                                        🎯
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className={styles.profileInfo}>
                            <h1 className={styles.profileTitle}>
                                {user.username}
                            </h1>
                            <div className={styles.profileMeta}>
                                {user.valorantTier && (
                                    <span
                                        className={styles.tierBadge}
                                        style={{
                                            background: `linear-gradient(to right, ${getValorantTierGradient(
                                                user.valorantTier
                                            )})`,
                                        }}
                                    >
                                        {user.valorantTier}
                                    </span>
                                )}
                                <span className={styles.metaItem}>
                                    <span>🌍</span>
                                    <span>KR 서버</span>
                                </span>
                                <span className={styles.metaItem}>
                                    <span>🎯</span>
                                    <span>RR: {user.stats.valorant.rr}</span>
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actionButtons}>
                            <button
                                className={`btn btn-ghost ${styles.editButton}`}
                            >
                                프로필 편집
                            </button>
                            <button
                                className={`btn ${styles.valorantAddFriendButton}`}
                            >
                                친구 추가
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className={`container ${styles.contentContainer}`}>
                {/* Tab Navigation */}
                <div className={styles.tabNavigation}>
                    {[
                        { id: "overview", label: "개요", icon: "📊" },
                        { id: "stats", label: "통계", icon: "📈" },
                        { id: "matches", label: "최근 경기", icon: "🎮" },
                        { id: "agents", label: "에이전트", icon: "🎯" },
                        { id: "posts", label: "내 게시물", icon: "📝" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${styles.tabButton} ${
                                activeTab === tab.id
                                    ? `${styles.tabButtonActive} ${styles.valorantTabActive}`
                                    : styles.tabButtonInactive
                            }`}
                        >
                            <span className={styles.tabIcon}>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                    <div className={styles.overviewGrid}>
                        {/* 발로란트 랭크 정보 */}
                        <div className={`card ${styles.statsCard}`}>
                            <h3 className={styles.cardTitle}>
                                <span>🏆</span>
                                랭크 정보
                            </h3>
                            <div className={styles.statsGrid}>
                                <div className={styles.statRow}>
                                    <span>현재 랭크:</span>
                                    <span className={styles.statValue}>
                                        {user.stats.valorant.rank}
                                    </span>
                                </div>
                                <div className={styles.statRow}>
                                    <span>RR:</span>
                                    <span className={styles.statValue}>
                                        {user.stats.valorant.rr}
                                    </span>
                                </div>
                                <div className={styles.statRow}>
                                    <span>승률:</span>
                                    <span
                                        className={
                                            user.stats.valorant.winRate > 50
                                                ? styles.winRatePositive
                                                : styles.winRateNegative
                                        }
                                    >
                                        {user.stats.valorant.winRate}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 게임 통계 */}
                        <div className={`card ${styles.statsCard}`}>
                            <h3 className={styles.cardTitle}>
                                <span>📈</span>
                                게임 통계
                            </h3>
                            <div className={styles.statsGrid}>
                                <div className={styles.statRow}>
                                    <span>평균 ACS:</span>
                                    <span className={styles.statValue}>
                                        {user.stats.valorant.acs}
                                    </span>
                                </div>
                                <div className={styles.statRow}>
                                    <span>K/D 비율:</span>
                                    <span className={styles.statValue}>
                                        {user.stats.valorant.kd}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 주요 에이전트 */}
                        <div className={`card ${styles.statsCard}`}>
                            <h3 className={styles.cardTitle}>
                                <span>🎯</span>
                                주요 에이전트
                            </h3>
                            <div className={styles.characterTags}>
                                {user.mainAgents.map((agent, index) => (
                                    <span
                                        key={index}
                                        className={`${styles.characterTag} ${styles.valorantCharacterTag}`}
                                    >
                                        {agent}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 커뮤니티 활동 */}
                        <div className={`card ${styles.statsCard}`}>
                            <h3 className={styles.cardTitle}>
                                <span>📊</span>
                                커뮤니티 활동
                            </h3>
                            <div className={styles.statsGrid}>
                                <div className={styles.statRow}>
                                    <span>총 게시물:</span>
                                    <span className={styles.statValue}>
                                        {user.totalPosts}개
                                    </span>
                                </div>
                                <div className={styles.statRow}>
                                    <span>받은 투표:</span>
                                    <span className={styles.statValue}>
                                        {user.totalVotes}개
                                    </span>
                                </div>
                                <div className={styles.statRow}>
                                    <span>가입일:</span>
                                    <span className={styles.statValue}>
                                        {user.joinDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "matches" && (
                    <div className={`card ${styles.matchesContainer}`}>
                        <h3 className={styles.cardTitle}>
                            <span>🎮</span>
                            최근 경기
                        </h3>
                        <div className={styles.matchesList}>
                            {user.stats.valorant.recentMatches.map(
                                (match, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.matchItem} ${
                                            match.result === "승리"
                                                ? styles.matchItemWin
                                                : styles.matchItemLoss
                                        }`}
                                    >
                                        <div className={styles.matchHeader}>
                                            <span className={styles.matchTitle}>
                                                {match.map}
                                            </span>
                                            <span
                                                className={`${
                                                    styles.matchResult
                                                } ${
                                                    match.result === "승리"
                                                        ? styles.matchResultWin
                                                        : styles.matchResultLoss
                                                }`}
                                            >
                                                {match.result}
                                            </span>
                                        </div>
                                        <div className={styles.matchDetails}>
                                            <span>{match.agent}</span>
                                            <span>ACS: {match.acs}</span>
                                        </div>
                                        <div className={styles.matchScore}>
                                            스코어: {match.score}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}

                {/* 다른 탭들 */}
                {activeTab === "stats" && (
                    <div className={`card ${styles.placeholderCard}`}>
                        <h3>상세 통계</h3>
                        <p className={styles.placeholderText}>
                            상세 통계 기능은 곧 추가될 예정입니다.
                        </p>
                    </div>
                )}

                {activeTab === "agents" && (
                    <div className={`card ${styles.placeholderCard}`}>
                        <h3>에이전트 통계</h3>
                        <p className={styles.placeholderText}>
                            에이전트별 상세 통계는 곧 추가될 예정입니다.
                        </p>
                    </div>
                )}

                {activeTab === "posts" && (
                    <div className={`card ${styles.placeholderCard}`}>
                        <h3>내 게시물</h3>
                        <p className={styles.placeholderText}>
                            게시물 관리 기능은 곧 추가될 예정입니다.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
