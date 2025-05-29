'use client';

import { useState, useEffect } from 'react';
import { authService } from '../../services/auth/login.service';
import { supabaseAuthService } from '../../services/auth/supabase-auth.service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginModal from '../../components/LoginModal';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [modalDefaultTab, setModalDefaultTab] = useState('login');
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            // Check if user is actually authenticated with Supabase
            const session = await supabaseAuthService.getSession();
            if (!session) {
                // No valid session, show login modal
                setModalDefaultTab('register');
                setShowLoginModal(true);
                setLoading(false);
                return;
            }

            // Get current user from Supabase
            const currentUser = await supabaseAuthService.getCurrentUser();
            if (currentUser) {
                // Merge with any additional data from localStorage
                const localUser = authService.getCurrentUser();
                setUser({ ...currentUser, ...localUser });
            } else {
                setModalDefaultTab('register');
                setShowLoginModal(true);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setModalDefaultTab('register');
            setShowLoginModal(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, var(--neutral-50), rgba(30, 136, 229, 0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="card" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-3xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-lg)' }}>⏳</div>
                    <p>로딩 중...</p>
                </div>
            </div>
        );
    }

    if (!user && !showLoginModal) {
        return null;
    }

    if (showLoginModal) {
        return (
            <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, var(--neutral-50), rgba(30, 136, 229, 0.05))' }}>
                <div className="container" style={{ paddingTop: 'var(--spacing-3xl)', paddingBottom: 'var(--spacing-3xl)' }}>
                    <div className="card" style={{ 
                        maxWidth: '600px', 
                        margin: '0 auto', 
                        padding: 'var(--spacing-3xl)', 
                        borderRadius: 'var(--radius-lg)', 
                        textAlign: 'center',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>회원가입이 필요합니다</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
                            프로필 페이지를 이용하시려면 먼저 회원가입을 해주세요.
                        </p>
                        <button 
                            onClick={() => {
                                setModalDefaultTab('register');
                                setShowLoginModal(true);
                            }}
                            className="btn btn-primary"
                            style={{ minWidth: '200px', marginBottom: 'var(--spacing-lg)' }}
                        >
                            회원가입 하기
                        </button>
                        <div>
                            <button 
                                onClick={() => router.push('/')}
                                className="btn btn-ghost"
                                style={{ fontSize: '14px' }}
                            >
                                홈으로 돌아가기
                            </button>
                        </div>
                    </div>
                </div>
                <LoginModal 
                    isOpen={showLoginModal} 
                    onClose={() => router.push('/')}
                    onLoginSuccess={(user) => {
                        setUser(user);
                        setShowLoginModal(false);
                    }}
                    defaultTab={modalDefaultTab}
                />
            </div>
        );
    }

    const getTierGradient = (tier) => {
        if (!tier) return '#6b7280, #4b5563';
        const tierName = tier.toLowerCase();
        if (tierName.includes('아이언')) return '#4b5563, #374151';
        if (tierName.includes('브론즈')) return '#d97706, #b45309';
        if (tierName.includes('실버')) return '#d1d5db, #9ca3af';
        if (tierName.includes('골드')) return '#fbbf24, #f59e0b';
        if (tierName.includes('플래티넘')) return '#2dd4bf, #06b6d4';
        if (tierName.includes('에메랄드')) return '#34d399, #10b981';
        if (tierName.includes('다이아몬드')) return '#60a5fa, #6366f1';
        if (tierName.includes('마스터')) return '#a855f7, #7c3aed';
        if (tierName.includes('그랜드마스터')) return '#ef4444, #e11d48';
        if (tierName.includes('챌린저')) return '#fde047, #fb923c';
        return '#6b7280, #4b5563';
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, var(--neutral-50), rgba(30, 136, 229, 0.05))' }}>
            {/* Profile Header */}
            <div style={{ backgroundColor: 'var(--surface)', boxShadow: 'var(--shadow-lg)' }}>
                <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2xl)', flexWrap: 'wrap' }}>
                        {/* Profile Avatar */}
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: '128px',
                                height: '128px',
                                background: `linear-gradient(to right, ${getTierGradient(user.tier)})`,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 'var(--shadow-lg)'
                            }}>
                                <span style={{ fontSize: '48px', fontWeight: 700, color: 'white' }}>
                                    {(user.summonerName || user.name || '').charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', backgroundColor: 'var(--surface)', borderRadius: '50%', padding: '4px', boxShadow: 'var(--shadow-lg)' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'linear-gradient(to right, #34d399, #10b981)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ color: 'white', fontSize: '14px' }}>✓</span>
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div style={{ flex: 1 }}>
                            <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
                                {user.summonerName || user.name}
                            </h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)', flexWrap: 'wrap' }}>
                                {user.tier && (
                                    <span style={{
                                        padding: 'var(--spacing-sm) var(--spacing-lg)',
                                        borderRadius: '9999px',
                                        background: `linear-gradient(to right, ${getTierGradient(user.tier)})`,
                                        color: 'white',
                                        fontWeight: 600,
                                        boxShadow: 'var(--shadow-md)'
                                    }}>
                                        {user.tier}
                                    </span>
                                )}
                                {user.region && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', color: 'var(--text-secondary)' }}>
                                        <span>🌍</span>
                                        <span>{user.region} 서버</span>
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                            <button className="btn btn-ghost" style={{ borderRadius: '9999px' }}>
                                계정 설정
                            </button>
                            <button 
                                onClick={async () => {
                                    await authService.logout();
                                    router.push('/');
                                }}
                                className="btn btn-danger" style={{ borderRadius: '9999px' }}
                            >
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Tabs */}
            <div style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--neutral-200)' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: 'var(--spacing-2xl)' }}>
                        <button
                            onClick={() => setActiveTab('overview')}
                            style={{
                                padding: 'var(--spacing-lg) var(--spacing-xl)',
                                fontWeight: 500,
                                borderBottom: '2px solid',
                                borderColor: activeTab === 'overview' ? 'var(--accent)' : 'transparent',
                                color: activeTab === 'overview' ? 'var(--accent)' : 'var(--text-secondary)',
                                background: 'none',
                                transition: 'all var(--transition-fast)',
                                cursor: 'pointer'
                            }}
                        >
                            개요
                        </button>
                        <button
                            onClick={() => setActiveTab('posts')}
                            style={{
                                padding: 'var(--spacing-lg) var(--spacing-xl)',
                                fontWeight: 500,
                                borderBottom: '2px solid',
                                borderColor: activeTab === 'posts' ? 'var(--accent)' : 'transparent',
                                color: activeTab === 'posts' ? 'var(--accent)' : 'var(--text-secondary)',
                                background: 'none',
                                transition: 'all var(--transition-fast)',
                                cursor: 'pointer'
                            }}
                        >
                            내 게시글
                        </button>
                        <button
                            onClick={() => setActiveTab('stats')}
                            style={{
                                padding: 'var(--spacing-lg) var(--spacing-xl)',
                                fontWeight: 500,
                                borderBottom: '2px solid',
                                borderColor: activeTab === 'stats' ? 'var(--accent)' : 'transparent',
                                color: activeTab === 'stats' ? 'var(--accent)' : 'var(--text-secondary)',
                                background: 'none',
                                transition: 'all var(--transition-fast)',
                                cursor: 'pointer'
                            }}
                        >
                            통계
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
                {activeTab === 'overview' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-2xl)' }}>
                        {/* Stats Cards */}
                        <div className="card" style={{ padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--neutral-100)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>게시글</h3>
                                <span style={{ fontSize: '32px' }}>📝</span>
                            </div>
                            <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--spacing-sm)' }}>12</p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>작성한 글</p>
                        </div>

                        <div className="card" style={{ padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--neutral-100)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>판정 참여</h3>
                                <span style={{ fontSize: '32px' }}>⚖️</span>
                            </div>
                            <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--spacing-sm)' }}>45</p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>참여한 판정</p>
                        </div>

                        <div className="card" style={{ padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--neutral-100)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>정확도</h3>
                                <span style={{ fontSize: '32px' }}>🎯</span>
                            </div>
                            <p style={{ fontSize: '32px', fontWeight: 700, color: '#10b981', marginBottom: 'var(--spacing-sm)' }}>78%</p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>판정 정확도</p>
                        </div>

                        {/* Recent Activity */}
                        <div className="card" style={{ gridColumn: 'span 3 / span 3', padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--neutral-100)' }}>
                            <h3 style={{ marginBottom: 'var(--spacing-xl)' }}>최근 활동</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)', padding: 'var(--spacing-lg)', backgroundColor: 'var(--neutral-50)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        backgroundColor: 'rgba(30, 136, 229, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px'
                                    }}>
                                        📹
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--spacing-xs)' }}>바론 스틸 vs 팀파이트 선택 상황</p>
                                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 0 }}>2시간 전 게시글 작성</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)', padding: 'var(--spacing-lg)', backgroundColor: 'var(--neutral-50)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px'
                                    }}>
                                        👍
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--spacing-xs)' }}>탑 라인전 갱킹 타이밍 판정</p>
                                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 0 }}>5시간 전 판정 참여</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'posts' && (
                    <div className="card" style={{ padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--neutral-100)' }}>
                        <h3 style={{ marginBottom: 'var(--spacing-xl)' }}>내가 작성한 게시글</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>아직 작성한 게시글이 없습니다.</p>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="card" style={{ padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--neutral-100)' }}>
                        <h3 style={{ marginBottom: 'var(--spacing-xl)' }}>상세 통계</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>통계 데이터를 준비 중입니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}