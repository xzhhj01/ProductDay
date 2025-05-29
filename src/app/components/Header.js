'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authService } from '../services/auth/login.service';
import LoginModal from './LoginModal';

export default function Header() {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <>
      <header style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.98)', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', 
        position: 'fixed', 
        top: 0, 
        left: 0,
        right: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            height: '64px' 
          }}>
            {/* Logo */}
            <Link href="/" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-sm)', 
              textDecoration: 'none',
              transition: 'transform var(--transition-fast)' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)'
              }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>LV</span>
              </div>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>방구석대법관</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hide-mobile" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-2xl)' 
            }}>
              <Link href="/community" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: '#6b7280', 
                fontWeight: 500, 
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                padding: '6px 12px',
                borderRadius: '6px',
                position: 'relative',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4f46e5';
                e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              >
                <span>📹</span>
                <span>문철 게시판</span>
              </Link>
              <Link href="/mentor" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: '#6b7280', 
                fontWeight: 500,
                textDecoration: 'none', 
                transition: 'all 0.15s ease',
                padding: '6px 12px',
                borderRadius: '6px',
                position: 'relative',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4f46e5';
                e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              >
                <span>🎯</span>
                <span>멘토 매칭</span>
              </Link>
              <Link href="/profile" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: '#6b7280', 
                fontWeight: 500,
                textDecoration: 'none', 
                transition: 'all 0.15s ease',
                padding: '6px 12px',
                borderRadius: '6px',
                position: 'relative',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4f46e5';
                e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              >
                <span>👤</span>
                <span>프로필</span>
              </Link>
            </nav>

            {/* User Actions */}
            <div className="hide-mobile" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-lg)' 
            }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}>
                      <span style={{ color: 'white', fontSize: '14px', fontWeight: 700 }}>
                        {(user.summonerName || user.name || '').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
                      {user.summonerName || user.name}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-ghost"
                    style={{ padding: '0 var(--spacing-md)', fontSize: '14px', height: '36px' }}
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  style={{ 
                    borderRadius: '20px', 
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    padding: '0 20px',
                    height: '36px',
                    fontSize: '14px',
                    fontWeight: 500,
                    background: '#4f46e5',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#4338ca';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#4f46e5';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  로그인
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="hide-desktop">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--color-text-secondary)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <svg style={{ width: '24px', height: '24px' }} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Overlay background */}
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 998,
              }}
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="hide-desktop" style={{ 
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'var(--color-background)', 
              borderTop: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xl)',
              zIndex: 999
            }}>
            <div style={{ padding: 'var(--spacing-lg)' }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                <Link 
                  href="/community" 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    padding: 'var(--spacing-lg) var(--spacing-xl)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-elevated)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(30, 136, 229, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    📹
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>문철 게시판</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>커뮤니티 판정 받기</div>
                  </div>
                </Link>
                <Link 
                  href="/mentor" 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    padding: 'var(--spacing-lg) var(--spacing-xl)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-elevated)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    🎯
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>멘토 매칭</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>1:1 코칭 받기</div>
                  </div>
                </Link>
                <Link 
                  href="/profile" 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    padding: 'var(--spacing-lg) var(--spacing-xl)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-elevated)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    👤
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>프로필</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>내 정보 관리</div>
                  </div>
                </Link>
              </nav>
              
              <div style={{ 
                marginTop: 'var(--spacing-2xl)', 
                paddingTop: 'var(--spacing-2xl)', 
                borderTop: '1px solid var(--color-border)' 
              }}>
                {user ? (
                  <div style={{ 
                    padding: 'var(--spacing-xl)',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                      }}>
                        <span style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>
                          {(user.summonerName || user.name || '').charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {user.summonerName || user.name}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                          {user.email || '온라인'}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="btn btn-danger"
                      style={{ 
                        width: '100%', 
                        height: '44px',
                        fontSize: '15px',
                        fontWeight: 600
                      }}
                    >
                      로그아웃
                    </button>
                  </div>
                ) : (
                  <div>
                    <button 
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsMenuOpen(false);
                      }}
                      className="btn btn-primary"
                      style={{ 
                        width: '100%', 
                        height: '52px',
                        fontSize: '16px',
                        fontWeight: 600,
                        borderRadius: '9999px',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                      }}
                    >
                      로그인
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          </>
        )}
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}