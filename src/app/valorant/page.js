"use client";

import Link from "next/link";
import { useState } from "react";
import { requireAuth } from "@/app/utils/auth-check";
import { useRouter } from "next/navigation";
import LoginModal from "@/app/components/LoginModal";

export default function ValorantHome() {
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #ffffff, #f5f7fa)",
            }}
        >
            {/* Hero Section */}
            <section
                className="section"
                style={{ position: "relative", overflow: "hidden" }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to right, #ff4655, #0f1419)",
                        opacity: 0.05,
                    }}
                ></div>
                <div
                    className="container"
                    style={{ position: "relative", zIndex: 10 }}
                >
                    <div style={{ textAlign: "center" }}>
                        <h1
                            style={{
                                fontSize: "clamp(48px, 6vw, 64px)",
                                fontWeight: 700,
                                marginBottom: "var(--spacing-xl)",
                                background:
                                    "linear-gradient(to right, #ff4655, #0f1419)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            방구석 대법관
                        </h1>
                        <p
                            style={{
                                fontSize: "20px",
                                color: "var(--text-secondary)",
                                marginBottom: "var(--spacing-3xl)",
                                maxWidth: "600px",
                                margin: "0 auto var(--spacing-3xl)",
                            }}
                        >
                            플레이 판정을 받고, 실력을 향상시키세요.
                            <br />
                            커뮤니티와 함께 성장하는 발로란트 플랫폼
                        </p>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "var(--spacing-xl)",
                                justifyContent: "center",
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
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
                                className="btn btn-primary"
                                style={{
                                    padding: "0 var(--spacing-2xl)",
                                    height: "52px",
                                    fontSize: "16px",
                                    borderRadius: "9999px",
                                    boxShadow: "var(--shadow-lg)",
                                    transform: "scale(1)",
                                    transition: "all var(--transition-normal)",
                                }}
                            >
                                🎮 영상 업로드
                            </button>
                            <Link href="/valorant/community">
                                <button
                                    className="btn btn-ghost"
                                    style={{
                                        padding: "0 var(--spacing-2xl)",
                                        height: "52px",
                                        fontSize: "16px",
                                        borderRadius: "9999px",
                                        boxShadow: "var(--shadow-lg)",
                                        borderWidth: "2px",
                                        transform: "scale(1)",
                                        transition:
                                            "all var(--transition-normal)",
                                    }}
                                >
                                    📋 게시판 둘러보기
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <div className="container section">
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "var(--spacing-4xl)",
                    }}
                >
                    <h2>주요 서비스</h2>
                    <p>당신의 실력 향상을 위한 최고의 도구</p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "var(--spacing-2xl)",
                    }}
                >
                    <Link
                        href="/valorant/community"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div
                            className="card"
                            style={{
                                padding: "var(--spacing-2xl)",
                                borderRadius: "var(--radius-lg)",
                                border: "1px solid var(--neutral-100)",
                                transition: "all var(--transition-normal)",
                                cursor: "pointer",
                                height: "100%",
                            }}
                        >
                            <div
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(255, 70, 85, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "var(--spacing-xl)",
                                    fontSize: "32px",
                                }}
                            >
                                📹
                            </div>
                            <h3 style={{ marginBottom: "var(--spacing-lg)" }}>
                                문철 게시판
                            </h3>
                            <p
                                style={{
                                    marginBottom: "var(--spacing-xl)",
                                    lineHeight: "1.6",
                                }}
                            >
                                발로란트 플레이 영상을 업로드하고 커뮤니티의
                                전문적인 판정을 받아보세요. 실시간 피드백으로
                                빠르게 성장할 수 있습니다.
                            </p>
                            <button
                                className="btn btn-accent"
                                style={{ width: "100%" }}
                            >
                                게시판 가기 →
                            </button>
                        </div>
                    </Link>

                    <Link
                        href="/valorant/mentor"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div
                            className="card"
                            style={{
                                padding: "var(--spacing-2xl)",
                                borderRadius: "var(--radius-lg)",
                                border: "1px solid var(--neutral-100)",
                                transition: "all var(--transition-normal)",
                                cursor: "pointer",
                                height: "100%",
                            }}
                        >
                            <div
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(15, 20, 25, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "var(--spacing-xl)",
                                    fontSize: "32px",
                                }}
                            >
                                🎯
                            </div>
                            <h3 style={{ marginBottom: "var(--spacing-lg)" }}>
                                멘토 매칭
                            </h3>
                            <p
                                style={{
                                    marginBottom: "var(--spacing-xl)",
                                    lineHeight: "1.6",
                                }}
                            >
                                검증된 고수들에게 직접 조언을 구해보세요. 1:1
                                맞춤형 코칭으로 약점을 극복할 수 있습니다.
                            </p>
                            <button
                                className="btn btn-secondary"
                                style={{ width: "100%" }}
                            >
                                멘토 찾기 →
                            </button>
                        </div>
                    </Link>
                </div>

                {/* Stats Section */}
                <div
                    style={{
                        marginTop: "var(--spacing-5xl)",
                        background:
                            "linear-gradient(to right, var(--neutral-50), var(--neutral-100))",
                        borderRadius: "var(--radius-lg)",
                        padding: "var(--spacing-3xl)",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "var(--spacing-2xl)",
                            textAlign: "center",
                        }}
                    >
                        <div>
                            <h4
                                style={{
                                    fontSize: "36px",
                                    color: "var(--accent)",
                                    marginBottom: "var(--spacing-sm)",
                                }}
                            >
                                856+
                            </h4>
                            <p>활성 유저</p>
                        </div>
                        <div>
                            <h4
                                style={{
                                    fontSize: "36px",
                                    color: "var(--secondary)",
                                    marginBottom: "var(--spacing-sm)",
                                }}
                            >
                                423
                            </h4>
                            <p>영상 리뷰</p>
                        </div>
                        <div>
                            <h4
                                style={{
                                    fontSize: "36px",
                                    color: "#10b981",
                                    marginBottom: "var(--spacing-sm)",
                                }}
                            >
                                92%
                            </h4>
                            <p>만족도</p>
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
