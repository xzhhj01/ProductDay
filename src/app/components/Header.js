"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "../services/auth/login.service";
import LoginModal from "./LoginModal";
import styles from "../styles/header.module.css";
import { getCurrentUser } from "@/app/utils/auth-check";

export default function Header() {
    const [user, setUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showGameDropdown, setShowGameDropdown] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // 현재 게임 감지
    const isValorant = pathname.startsWith("/valorant");
    const currentGame = isValorant ? "valorant" : "lol";

    // 게임별 색상 테마
    const headerClass = isValorant ? styles.valorantHeader : styles.header;

    useEffect(() => {
        const user = getCurrentUser();
        setUser(user);
    }, []);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
    };

    const handleLoginSuccess = (userData) => {
        setUser(userData);
    };

    const handleGameSwitch = (game) => {
        setIsDropdownOpen(false);
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
        return game === "valorant" ? "🎯" : "⚔️";
    };

    const getGameName = (game) => {
        return game === "valorant" ? "발로란트" : "리그 오브 레전드";
    };

    const getNavigationLinks = () => {
        const basePrefix = currentGame === "valorant" ? "/valorant" : "";

        return [
            {
                href: currentGame === "valorant" ? "/valorant" : "/",
                icon: "🏠",
                label: "홈",
            },
            {
                href: `${basePrefix}/community`,
                icon: "💬",
                label: "커뮤니티",
            },
            {
                href: "/mentor",
                icon: "🎯",
                label: "멘토",
            },
            {
                href: `${basePrefix}/profile`,
                icon: "👤",
                label: "프로필",
            },
        ];
    };

    // 스마트 라우팅 - 현재 페이지에 맞는 경로로 이동
    const getSmartRoute = (targetGame) => {
        if (pathname === "/" || pathname === "/valorant") {
            return targetGame === "valorant" ? "/valorant" : "/";
        }
        if (pathname.includes("/community")) {
            return targetGame === "valorant"
                ? "/valorant/community"
                : "/community";
        }
        if (pathname.includes("/profile")) {
            return targetGame === "valorant" ? "/valorant/profile" : "/profile";
        }
        // 기본값
        return targetGame === "valorant" ? "/valorant" : "/";
    };

    const isActiveLink = (href) => {
        if (href === "/" && pathname === "/") return true;
        if (href === "/valorant" && pathname === "/valorant") return true;
        if (href !== "/" && href !== "/valorant" && pathname.startsWith(href))
            return true;
        return false;
    };

    return (
        <>
            <header className={headerClass}>
                <div className="container">
                    <div className={styles.headerContainer}>
                        <div className={styles.leftSection}>
                            {/* Logo */}
                            <Link
                                href={
                                    currentGame === "valorant"
                                        ? "/valorant"
                                        : "/"
                                }
                                className={`${styles.logo} ${
                                    isValorant ? styles.valorantLogo : ""
                                }`}
                            >
                                <div className={styles.logoIcon}>
                                    {currentGame === "valorant" ? "🎯" : "⚔️"}
                                </div>
                                방구석대법관
                            </Link>

                            {/* Game Selector */}
                            <div className={styles.gameSelector}>
                                <button
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className={`${styles.currentGame} ${
                                        isValorant
                                            ? styles.valorantCurrentGame
                                            : ""
                                    }`}
                                >
                                    <span className={styles.gameIcon}>
                                        {currentGame === "valorant"
                                            ? "🎯"
                                            : "⚔️"}
                                    </span>
                                    <span>{getGameName(currentGame)}</span>
                                    <span
                                        className={`${styles.dropdownArrow} ${
                                            isDropdownOpen
                                                ? styles.dropdownArrowOpen
                                                : ""
                                        }`}
                                    >
                                        ▼
                                    </span>
                                </button>

                                {isDropdownOpen && (
                                    <div className={styles.gameDropdown}>
                                        <button
                                            onClick={() =>
                                                handleGameSwitch("lol")
                                            }
                                            className={`${styles.gameOption} ${
                                                currentGame === "lol"
                                                    ? styles.gameOptionActive
                                                    : ""
                                            }`}
                                        >
                                            <span className={styles.gameIcon}>
                                                ⚔️
                                            </span>
                                            리그 오브 레전드
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleGameSwitch("valorant")
                                            }
                                            className={`${styles.gameOption} ${
                                                currentGame === "valorant"
                                                    ? isValorant
                                                        ? styles.valorantGameOptionActive
                                                        : styles.gameOptionActive
                                                    : ""
                                            }`}
                                        >
                                            <span className={styles.gameIcon}>
                                                🎯
                                            </span>
                                            발로란트
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Game Toggle */}
                            <div
                                className={`${styles.mobileGameToggle} ${
                                    isValorant
                                        ? styles.valorantMobileGameToggle
                                        : ""
                                }`}
                            >
                                <span>
                                    {currentGame === "valorant" ? "🎯" : "⚔️"}
                                </span>
                                <div
                                    className={`${styles.toggleSwitch} ${
                                        isValorant
                                            ? styles.valorantToggleSwitch
                                            : ""
                                    } ${
                                        currentGame === "valorant"
                                            ? isValorant
                                                ? styles.valorantToggleSwitchActive
                                                : styles.toggleSwitchActive
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleGameSwitch(
                                            currentGame === "valorant"
                                                ? "lol"
                                                : "valorant"
                                        )
                                    }
                                >
                                    <div
                                        className={`${styles.toggleHandle} ${
                                            isValorant
                                                ? styles.valorantToggleHandle
                                                : ""
                                        } ${
                                            currentGame === "valorant"
                                                ? isValorant
                                                    ? styles.valorantToggleHandleActive
                                                    : styles.toggleHandleActive
                                                : ""
                                        }`}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className={styles.navigation}>
                            {getNavigationLinks().map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${styles.navLink} ${
                                        isValorant ? styles.valorantNavLink : ""
                                    } ${
                                        isActiveLink(link.href)
                                            ? isValorant
                                                ? styles.valorantNavLinkActive
                                                : styles.navLinkActive
                                            : ""
                                    }`}
                                >
                                    <span className={styles.navIcon}>
                                        {link.icon}
                                    </span>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* User Actions */}
                        <div className={styles.rightSection}>
                            {user ? (
                                <div className={styles.userMenu}>
                                    <button
                                        onClick={() =>
                                            setIsUserMenuOpen(!isUserMenuOpen)
                                        }
                                        className={`${styles.userButton} ${
                                            isValorant
                                                ? styles.valorantUserButton
                                                : ""
                                        }`}
                                    >
                                        <div
                                            className={`${styles.userAvatar} ${
                                                isValorant
                                                    ? styles.valorantUserAvatar
                                                    : ""
                                            }`}
                                        >
                                            {(
                                                user.summonerName ||
                                                user.name ||
                                                ""
                                            )
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <span>
                                            {user.summonerName || user.name}
                                        </span>
                                        <span
                                            className={`${
                                                styles.dropdownArrow
                                            } ${
                                                isUserMenuOpen
                                                    ? styles.dropdownArrowOpen
                                                    : ""
                                            }`}
                                        >
                                            ▼
                                        </span>
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className={styles.userDropdown}>
                                            <Link
                                                href={
                                                    currentGame === "valorant"
                                                        ? "/valorant/profile"
                                                        : "/profile"
                                                }
                                                className={
                                                    styles.userDropdownItem
                                                }
                                            >
                                                <span>👤</span>
                                                프로필
                                            </Link>
                                            <div
                                                className={
                                                    styles.userDropdownDivider
                                                }
                                            ></div>
                                            <button
                                                className={
                                                    styles.userDropdownItem
                                                }
                                                onClick={handleLogout}
                                            >
                                                <span>🚪</span>
                                                로그아웃
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={styles.authButtons}>
                                    <button
                                        className={`${styles.loginButton} ${
                                            isValorant
                                                ? styles.valorantLoginButton
                                                : ""
                                        }`}
                                        onClick={() => setShowLoginModal(true)}
                                    >
                                        로그인
                                    </button>
                                    <button
                                        className={`${styles.signupButton} ${
                                            isValorant
                                                ? styles.valorantSignupButton
                                                : ""
                                        }`}
                                    >
                                        회원가입
                                    </button>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
                                className={`${styles.mobileMenuButton} ${
                                    isValorant
                                        ? styles.valorantMobileMenuButton
                                        : ""
                                }`}
                            >
                                ☰
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div
                        className={`${styles.mobileMenu} ${
                            isValorant ? styles.valorantMobileMenu : ""
                        }`}
                    >
                        <nav className={styles.mobileNavigation}>
                            {getNavigationLinks().map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${styles.mobileNavLink} ${
                                        isValorant
                                            ? styles.valorantMobileNavLink
                                            : ""
                                    } ${
                                        isActiveLink(link.href)
                                            ? isValorant
                                                ? styles.valorantMobileNavLinkActive
                                                : styles.mobileNavLinkActive
                                            : ""
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className={styles.mobileNavIcon}>
                                        {link.icon}
                                    </span>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {!user && (
                            <div
                                className={`${styles.mobileAuthButtons} ${
                                    isValorant
                                        ? styles.valorantMobileAuthButtons
                                        : ""
                                }`}
                            >
                                <button
                                    className={`${styles.loginButton} ${
                                        isValorant
                                            ? styles.valorantLoginButton
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setShowLoginModal(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    로그인
                                </button>
                                <button
                                    className={`${styles.signupButton} ${
                                        isValorant
                                            ? styles.valorantSignupButton
                                            : ""
                                    }`}
                                >
                                    회원가입
                                </button>
                            </div>
                        )}
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
