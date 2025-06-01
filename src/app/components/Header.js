"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "../services/auth/login.service";
import LoginModal from "./LoginModal";

export default function Header() {
    const [user, setUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showGameDropdown, setShowGameDropdown] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // 현재 게임 감지
    const currentGame = pathname.startsWith("/valorant") ? "valorant" : "lol";

    useEffect(() => {
        // Do not load any user data on initial load
        // Users must login manually
    }, []);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
    };

    const handleLoginSuccess = (userData) => {
        setUser(userData);
    };

    const handleGameSwitch = (game) => {
        setShowGameDropdown(false);

        if (game === currentGame) return;

        // 현재 페이지에 따라 적절한 경로로 이동
        if (pathname === "/" || pathname.startsWith("/valorant")) {
            // 홈페이지인 경우
            router.push(game === "valorant" ? "/valorant" : "/");
        } else if (pathname.includes("/community")) {
            // 커뮤니티 페이지인 경우
            router.push(
                game === "valorant" ? "/valorant/community" : "/community"
            );
        } else if (pathname.includes("/profile")) {
            // 프로필 페이지인 경우
            router.push(game === "valorant" ? "/valorant/profile" : "/profile");
        } else {
            // 기타 페이지는 홈으로
            router.push(game === "valorant" ? "/valorant" : "/");
        }
    };

    const getGameIcon = (game) => {
        return game === "valorant" ? "🔴" : "🔵";
    };

    const getGameName = (game) => {
        return game === "valorant" ? "발로란트" : "리그 오브 레전드";
    };

    const getNavigationLinks = () => {
        const basePrefix = currentGame === "valorant" ? "/valorant" : "";

        return [
            {
                href: `${basePrefix}/community`,
                icon: "📹",
                label: "문철 게시판",
            },
            {
                href: "/mentor",
                icon: "🎯",
                label: "멘토 매칭",
            },
            {
                href: `${basePrefix}/profile`,
                icon: "👤",
                label: "프로필",
            },
        ];
    };

    return (
        <>
            <header
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                }}
            >
                <div className="container">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "64px",
                        }}
                    >
                        {/* Logo */}
                        <Link
                            href={
                                currentGame === "valorant" ? "/valorant" : "/"
                            }
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--spacing-sm)",
                                textDecoration: "none",
                                transition: "transform var(--transition-fast)",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.transform =
                                    "scale(1.05)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                            }
                        >
                            <div
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    background:
                                        currentGame === "valorant"
                                            ? "linear-gradient(135deg, #ff4655 0%, #0f1419 100%)"
                                            : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
                                }}
                            >
                                <span
                                    style={{
                                        color: "white",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                    }}
                                >
                                    {currentGame === "valorant" ? "V" : "LV"}
                                </span>
                            </div>
                            <span
                                style={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    color: "#1a1a1a",
                                }}
                            >
                                방구석대법관
                            </span>
                        </Link>

                        {/* Game Selector */}
                        <div
                            style={{ position: "relative" }}
                            className="hide-mobile"
                        >
                            <button
                                onClick={() =>
                                    setShowGameDropdown(!showGameDropdown)
                                }
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "var(--spacing-sm)",
                                    padding:
                                        "var(--spacing-sm) var(--spacing-lg)",
                                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                                    border: "1px solid rgba(0, 0, 0, 0.08)",
                                    borderRadius: "var(--radius-lg)",
                                    cursor: "pointer",
                                    transition: "all var(--transition-normal)",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "var(--text-primary)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "rgba(0, 0, 0, 0.06)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "rgba(0, 0, 0, 0.04)";
                                }}
                            >
                                <span>{getGameIcon(currentGame)}</span>
                                <span>{getGameName(currentGame)}</span>
                                <span
                                    style={{
                                        transform: showGameDropdown
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                        transition:
                                            "transform var(--transition-normal)",
                                    }}
                                >
                                    ▼
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {showGameDropdown && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        right: 0,
                                        marginTop: "var(--spacing-xs)",
                                        backgroundColor: "white",
                                        border: "1px solid rgba(0, 0, 0, 0.08)",
                                        borderRadius: "var(--radius-lg)",
                                        boxShadow:
                                            "0 4px 12px rgba(0, 0, 0, 0.15)",
                                        overflow: "hidden",
                                        zIndex: 1001,
                                    }}
                                >
                                    <button
                                        onClick={() => handleGameSwitch("lol")}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "var(--spacing-sm)",
                                            padding:
                                                "var(--spacing-md) var(--spacing-lg)",
                                            backgroundColor:
                                                currentGame === "lol"
                                                    ? "rgba(79, 70, 229, 0.1)"
                                                    : "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            color:
                                                currentGame === "lol"
                                                    ? "#4f46e5"
                                                    : "var(--text-primary)",
                                            transition:
                                                "all var(--transition-normal)",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (currentGame !== "lol") {
                                                e.currentTarget.style.backgroundColor =
                                                    "rgba(0, 0, 0, 0.04)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (currentGame !== "lol") {
                                                e.currentTarget.style.backgroundColor =
                                                    "transparent";
                                            }
                                        }}
                                    >
                                        <span>🔵</span>
                                        <span>리그 오브 레전드</span>
                                        {currentGame === "lol" && (
                                            <span
                                                style={{ marginLeft: "auto" }}
                                            >
                                                ✓
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleGameSwitch("valorant")
                                        }
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "var(--spacing-sm)",
                                            padding:
                                                "var(--spacing-md) var(--spacing-lg)",
                                            backgroundColor:
                                                currentGame === "valorant"
                                                    ? "rgba(255, 70, 85, 0.1)"
                                                    : "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            color:
                                                currentGame === "valorant"
                                                    ? "#ff4655"
                                                    : "var(--text-primary)",
                                            transition:
                                                "all var(--transition-normal)",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (currentGame !== "valorant") {
                                                e.currentTarget.style.backgroundColor =
                                                    "rgba(0, 0, 0, 0.04)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (currentGame !== "valorant") {
                                                e.currentTarget.style.backgroundColor =
                                                    "transparent";
                                            }
                                        }}
                                    >
                                        <span>🔴</span>
                                        <span>발로란트</span>
                                        {currentGame === "valorant" && (
                                            <span
                                                style={{ marginLeft: "auto" }}
                                            >
                                                ✓
                                            </span>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Desktop Navigation */}
                        <nav
                            className="hide-mobile"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--spacing-2xl)",
                            }}
                        >
                            {getNavigationLinks().map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        color: "#6b7280",
                                        fontWeight: 500,
                                        textDecoration: "none",
                                        transition: "all 0.15s ease",
                                        padding: "6px 12px",
                                        borderRadius: "6px",
                                        position: "relative",
                                        fontSize: "14px",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            currentGame === "valorant"
                                                ? "#ff4655"
                                                : "#4f46e5";
                                        e.currentTarget.style.backgroundColor =
                                            currentGame === "valorant"
                                                ? "rgba(255, 70, 85, 0.06)"
                                                : "rgba(79, 70, 229, 0.06)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "#6b7280";
                                        e.currentTarget.style.backgroundColor =
                                            "transparent";
                                    }}
                                >
                                    <span>{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* User Actions */}
                        <div
                            className="hide-mobile"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--spacing-lg)",
                            }}
                        >
                            {user ? (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "var(--spacing-lg)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "var(--spacing-sm)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                background:
                                                    currentGame === "valorant"
                                                        ? "linear-gradient(135deg, #ff4655, #0f1419)"
                                                        : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                boxShadow:
                                                    "0 2px 4px rgba(0, 0, 0, 0.1)",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: "white",
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {(
                                                    user.summonerName ||
                                                    user.name ||
                                                    ""
                                                )
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                        <span
                                            style={{
                                                color: "var(--color-text-primary)",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {user.summonerName || user.name}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-ghost"
                                        style={{
                                            padding: "0 var(--spacing-md)",
                                            fontSize: "14px",
                                            height: "36px",
                                        }}
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowLoginModal(true)}
                                    style={{
                                        borderRadius: "20px",
                                        boxShadow:
                                            "0 1px 2px rgba(0, 0, 0, 0.05)",
                                        padding: "0 20px",
                                        height: "36px",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        background:
                                            currentGame === "valorant"
                                                ? "linear-gradient(135deg, #ff4655 0%, #0f1419 100%)"
                                                : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                                        color: "white",
                                        border: "none",
                                        cursor: "pointer",
                                        transition:
                                            "all var(--transition-normal)",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform =
                                            "translateY(-1px)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform =
                                            "translateY(0)")
                                    }
                                >
                                    로그인
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="show-mobile"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{
                                background: "none",
                                border: "none",
                                fontSize: "20px",
                                cursor: "pointer",
                                padding: "8px",
                                borderRadius: "6px",
                                transition: "background-color 0.15s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "rgba(0, 0, 0, 0.05)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "transparent")
                            }
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div
                        className="show-mobile"
                        style={{
                            backgroundColor: "white",
                            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                            padding: "var(--spacing-lg) 0",
                        }}
                    >
                        <div className="container">
                            {/* Mobile Game Selector */}
                            <div style={{ marginBottom: "var(--spacing-lg)" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "var(--spacing-sm)",
                                        padding: "var(--spacing-sm)",
                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                        borderRadius: "var(--radius-lg)",
                                    }}
                                >
                                    <button
                                        onClick={() => handleGameSwitch("lol")}
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "var(--spacing-xs)",
                                            padding: "var(--spacing-sm)",
                                            backgroundColor:
                                                currentGame === "lol"
                                                    ? "white"
                                                    : "transparent",
                                            border: "none",
                                            borderRadius: "var(--radius-md)",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            color:
                                                currentGame === "lol"
                                                    ? "#4f46e5"
                                                    : "var(--text-secondary)",
                                            boxShadow:
                                                currentGame === "lol"
                                                    ? "0 1px 3px rgba(0, 0, 0, 0.1)"
                                                    : "none",
                                            transition:
                                                "all var(--transition-normal)",
                                        }}
                                    >
                                        <span>🔵</span>
                                        <span>롤</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleGameSwitch("valorant")
                                        }
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "var(--spacing-xs)",
                                            padding: "var(--spacing-sm)",
                                            backgroundColor:
                                                currentGame === "valorant"
                                                    ? "white"
                                                    : "transparent",
                                            border: "none",
                                            borderRadius: "var(--radius-md)",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            color:
                                                currentGame === "valorant"
                                                    ? "#ff4655"
                                                    : "var(--text-secondary)",
                                            boxShadow:
                                                currentGame === "valorant"
                                                    ? "0 1px 3px rgba(0, 0, 0, 0.1)"
                                                    : "none",
                                            transition:
                                                "all var(--transition-normal)",
                                        }}
                                    >
                                        <span>🔴</span>
                                        <span>발로란트</span>
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Navigation */}
                            <nav
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "var(--spacing-sm)",
                                }}
                            >
                                {getNavigationLinks().map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "var(--spacing-sm)",
                                            padding: "var(--spacing-md)",
                                            color: "var(--text-primary)",
                                            textDecoration: "none",
                                            borderRadius: "var(--radius-md)",
                                            transition:
                                                "background-color var(--transition-normal)",
                                        }}
                                        onClick={() => setIsMenuOpen(false)}
                                        onTouchStart={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                "rgba(0, 0, 0, 0.04)")
                                        }
                                        onTouchEnd={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                "transparent")
                                        }
                                    >
                                        <span>{link.icon}</span>
                                        <span>{link.label}</span>
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile User Actions */}
                            <div
                                style={{
                                    marginTop: "var(--spacing-lg)",
                                    paddingTop: "var(--spacing-lg)",
                                    borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                                }}
                            >
                                {user ? (
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
                                                alignItems: "center",
                                                gap: "var(--spacing-sm)",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "32px",
                                                    height: "32px",
                                                    background:
                                                        currentGame ===
                                                        "valorant"
                                                            ? "linear-gradient(135deg, #ff4655, #0f1419)"
                                                            : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
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
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {(
                                                        user.summonerName ||
                                                        user.name ||
                                                        ""
                                                    )
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                            <span style={{ fontWeight: 500 }}>
                                                {user.summonerName || user.name}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-ghost"
                                            style={{
                                                width: "100%",
                                                justifyContent: "center",
                                            }}
                                        >
                                            로그아웃
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setShowLoginModal(true);
                                            setIsMenuOpen(false);
                                        }}
                                        className="btn btn-primary"
                                        style={{
                                            width: "100%",
                                            justifyContent: "center",
                                            background:
                                                currentGame === "valorant"
                                                    ? "linear-gradient(135deg, #ff4655 0%, #0f1419 100%)"
                                                    : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                                        }}
                                    >
                                        로그인
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Backdrop for dropdown */}
            {showGameDropdown && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999,
                    }}
                    onClick={() => setShowGameDropdown(false)}
                />
            )}

            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </>
    );
}
