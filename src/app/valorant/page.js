"use client";

import Link from "next/link";
import { useState } from "react";
import { requireAuth } from "@/app/utils/auth-check";
import { useRouter } from "next/navigation";
import LoginModal from "@/app/components/LoginModal";
import styles from "../styles/home.module.css";

export default function ValorantHome() {
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <div className={styles.valorantContainer}>
            {/* Hero Section */}
            <section className={styles.valorantHeroSection}>
                <div className="container">
                    <div style={{ textAlign: "center" }}>
                        <h1 className={styles.heroTitle}>방구석 대법관</h1>
                        <p className={styles.heroSubtitle}>
                            발로란트 플레이 판정을 받고, 실력을 향상시키세요.
                            <br />
                            커뮤니티와 함께 성장하는 발로란트 플랫폼
                        </p>

                        <div className={styles.heroButtons}>
                            <button
                                onClick={() => {
                                    requireAuth(
                                        () =>
                                            router.push(
                                                "/valorant/community/upload"
                                            ),
                                        setShowLoginModal
                                    );
                                }}
                                className={`btn ${styles.heroButton} ${styles.valorantHeroPrimaryButton}`}
                            >
                                🎯 영상 업로드
                            </button>
                            <Link href="/valorant/community">
                                <button
                                    className={`btn ${styles.heroButton} ${styles.heroSecondaryButton} ${styles.valorantHeroSecondaryButton}`}
                                >
                                    📋 게시판 둘러보기
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <div className={`container ${styles.featuresSection}`}>
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "var(--spacing-4xl)",
                    }}
                >
                    <h2 className={styles.sectionTitle}>주요 서비스</h2>
                    <p className={styles.sectionSubtitle}>
                        당신의 발로란트 실력 향상을 위한 최고의 도구
                    </p>
                </div>

                <div className={styles.featuresGrid}>
                    <Link
                        href="/valorant/community"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div className={`card ${styles.featureCard}`}>
                            <div className={styles.featureIcon}>🎯</div>
                            <h3 className={styles.featureTitle}>
                                발로란트 게시판
                            </h3>
                            <p className={styles.featureDescription}>
                                발로란트 플레이 영상을 업로드하고 커뮤니티의
                                전문적인 판정을 받아보세요. 에이전트별 전략과 맵
                                컨트롤 피드백을 받을 수 있습니다.
                            </p>
                            <button
                                className={`btn ${styles.valorantCommunityButton}`}
                            >
                                게시판 가기 →
                            </button>
                        </div>
                    </Link>

                    <Link
                        href="/mentor"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div className={`card ${styles.featureCard}`}>
                            <div className={styles.featureIcon}>🏆</div>
                            <h3 className={styles.featureTitle}>멘토 매칭</h3>
                            <p className={styles.featureDescription}>
                                발로란트 고랭크 플레이어들에게 직접 조언을
                                구해보세요. 에이전트별 전문 코칭과 맞춤형 전략을
                                배울 수 있습니다.
                            </p>
                            <button
                                className={`btn ${styles.valorantCommunityButton}`}
                            >
                                멘토 찾기 →
                            </button>
                        </div>
                    </Link>
                </div>

                {/* Stats Section */}
                <div className={styles.statsSection}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <h4
                                className={`${styles.statNumber} ${styles.valorantStatNumber}`}
                            >
                                892+
                            </h4>
                            <p className={styles.statLabel}>발로란트 유저</p>
                        </div>
                        <div className={styles.statCard}>
                            <h4
                                className={`${styles.statNumber} ${styles.valorantStatNumber}`}
                            >
                                345
                            </h4>
                            <p className={styles.statLabel}>영상 리뷰</p>
                        </div>
                        <div className={styles.statCard}>
                            <h4
                                className={`${styles.statNumber} ${styles.valorantStatNumber}`}
                            >
                                91%
                            </h4>
                            <p className={styles.statLabel}>만족도</p>
                        </div>
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
