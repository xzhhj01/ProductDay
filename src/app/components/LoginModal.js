'use client';

import { useState } from 'react';
import { authService } from '../services/auth/login.service';

export default function LoginModal({ isOpen, onClose, onLoginSuccess, defaultTab = 'login' }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(defaultTab === 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      window.google?.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setError('Google 로그인을 사용할 수 없습니다.');
          setLoading(false);
        }
      });
    } catch (err) {
      setError('Google 로그인에 실패했습니다.');
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // TODO: Implement email login API call
      const result = await authService.loginWithEmail({
        email,
        password
      });
      
      onLoginSuccess(result.user);
      onClose();
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }
    
    try {
      const result = await authService.register({
        email,
        password,
        name
      });
      
      onLoginSuccess(result.user);
      onClose();
    } catch (err) {
      console.error('Registration error in modal:', err);
      // Supabase 에러 메시지 처리
      if (err.message && err.message.includes('email_address_invalid')) {
        setError('유효한 이메일 주소를 입력해주세요. (예: yourname@gmail.com)');
      } else if (err.message) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('회원가입에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div 
        style={{ position: 'absolute', inset: 0 }}
        onClick={onClose}
      ></div>
      
      <div 
        data-login-modal
        style={{
        position: 'relative',
        maxWidth: '420px',
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-3xl)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid var(--neutral-100)',
        zIndex: 1001,
      }}>
        <button
          onClick={onClose}
          className="btn btn-ghost"
          style={{ 
            position: 'absolute', 
            top: 'var(--spacing-lg)', 
            right: 'var(--spacing-lg)', 
            padding: 'var(--spacing-sm)',
            minWidth: 'auto',
            width: '32px',
            height: '32px'
          }}
        >
          ✕
        </button>

        <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>{showRegister ? '회원가입' : '로그인'}</h2>

        {error && (
          <div className="badge badge-danger" style={{ 
            width: '100%', 
            marginBottom: 'var(--spacing-lg)', 
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--radius-sm)' 
          }}>
            {error}
          </div>
        )}

        {showRegister ? (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <label htmlFor="reg-name" style={{ fontSize: '14px', fontWeight: 500 }}>이름</label>
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="홍길동"
                style={{
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--neutral-200)',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: 'var(--bg-secondary)',
                  height: '44px'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--neutral-200)'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <label htmlFor="reg-email" style={{ fontSize: '14px', fontWeight: 500 }}>이메일</label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                style={{
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--neutral-200)',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: 'var(--bg-secondary)',
                  height: '44px'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--neutral-200)'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <label htmlFor="reg-password" style={{ fontSize: '14px', fontWeight: 500 }}>비밀번호</label>
              <input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="6자 이상"
                style={{
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--neutral-200)',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: 'var(--bg-secondary)',
                  height: '44px'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--neutral-200)'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <label htmlFor="reg-confirm-password" style={{ fontSize: '14px', fontWeight: 500 }}>비밀번호 확인</label>
              <input
                id="reg-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="비밀번호 재입력"
                style={{
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--neutral-200)',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: 'var(--bg-secondary)',
                  height: '44px'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--neutral-200)'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                marginTop: 'var(--spacing-md)',
                height: '48px',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              {loading ? '가입 중...' : '가입하기'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowRegister(false);
                setEmail('');
                setPassword('');
                setName('');
                setConfirmPassword('');
                setError('');
              }}
              className="btn btn-ghost"
              style={{ 
                width: '100%',
                height: '48px',
                fontSize: '14px',
                color: 'var(--text-secondary)'
              }}
            >
              ← 로그인으로 돌아가기
            </button>
          </form>
        ) : !showEmailLogin ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn btn-secondary"
              style={{ 
                width: '100%',
                height: '48px',
                fontSize: '16px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-sm)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google로 로그인
            </button>


            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-md)', 
              marginTop: 'var(--spacing-lg)',
              marginBottom: 'var(--spacing-md)' 
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--neutral-200)' }}></div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>또는</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--neutral-200)' }}></div>
            </div>

            <button
              onClick={() => setShowEmailLogin(true)}
              className="btn btn-outline"
              style={{ 
                width: '100%',
                height: '48px',
                fontSize: '16px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-sm)',
                border: '2px solid var(--accent-primary)',
                color: 'var(--accent-primary)'
              }}
            >
              <span style={{ fontSize: '20px' }}>✉️</span>
              이메일로 로그인
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <label htmlFor="email" style={{ fontSize: '14px', fontWeight: 500 }}>이메일</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                style={{
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--neutral-200)',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: 'var(--bg-secondary)',
                  height: '44px'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--neutral-200)'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <label htmlFor="password" style={{ fontSize: '14px', fontWeight: 500 }}>비밀번호</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="비밀번호"
                style={{
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--neutral-200)',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: 'var(--bg-secondary)',
                  height: '44px'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--neutral-200)'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                marginTop: 'var(--spacing-md)',
                height: '48px',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>

            <button
              type="button"
              onClick={() => setShowEmailLogin(false)}
              className="btn btn-ghost"
              style={{ 
                width: '100%',
                height: '48px',
                fontSize: '14px',
                color: 'var(--text-secondary)'
              }}
            >
              ← 다른 방법으로 로그인
            </button>

            <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                아직 계정이 없으신가요?
              </span>
              <button
                type="button"
                data-tab="register"
                onClick={() => setShowRegister(true)}
                style={{ 
                  marginLeft: 'var(--spacing-sm)',
                  color: 'var(--accent-primary)',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                회원가입
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}