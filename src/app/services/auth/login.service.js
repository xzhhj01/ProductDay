import axios from 'axios';
import { supabaseAuthService } from './supabase-auth.service';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const authService = {
  async loginWithRiot(riotData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/riot`, riotData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async loginWithSocial(provider, socialData) {
    try {
      if (provider === 'google') {
        const result = await supabaseAuthService.signInWithGoogle();
        return result;
      }
      
      // 기타 소셜 로그인은 기존 방식 유지
      const response = await axios.post(`${API_BASE_URL}/auth/${provider}`, socialData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async loginWithEmail(credentials) {
    try {
      // Supabase로 로그인
      const { user, session } = await supabaseAuthService.signIn(
        credentials.email,
        credentials.password
      );
      
      if (session) {
        localStorage.setItem('token', session.access_token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return { user, token: session?.access_token };
    } catch (error) {
      throw error.message || '로그인에 실패했습니다.';
    }
  },

  async register(userData) {
    try {
      // Supabase로 회원가입
      const data = await supabaseAuthService.signUp(
        userData.email,
        userData.password,
        {
          name: userData.name,
          phone: userData.phone
        }
      );
      
      console.log('Supabase signup response:', data); // 디버깅용
      
      // Supabase v2에서는 data 객체 안에 user와 session이 있음
      const { user, session } = data;
      
      // 추가 사용자 정보를 백엔드에 저장 (필요한 경우)
      try {
        await axios.post(`${API_BASE_URL}/auth/register`, {
          ...userData,
          supabaseId: user?.id
        }, {
          withCredentials: true
        });
      } catch (backendError) {
        console.warn('백엔드 등록 실패:', backendError);
      }
      
      if (session) {
        localStorage.setItem('token', session.access_token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return { user, token: session?.access_token };
    } catch (error) {
      console.error('Register error:', error); // 디버깅용
      throw error.message || '회원가입에 실패했습니다.';
    }
  },

  async logout() {
    try {
      await supabaseAuthService.signOut();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      // 로컬 스토리지는 그래도 정리
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser() {
    try {
      // Don't auto-check for existing sessions
      // Only return user if explicitly logged in during this session
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isLoggedIn() {
    return !!this.getToken();
  }
};