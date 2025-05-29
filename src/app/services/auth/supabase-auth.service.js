import { supabase } from '@/lib/supabase'

export const supabaseAuthService = {
  // 이메일 회원가입
  async signUp(email, password, metadata = {}) {
    console.log('Supabase signUp called with:', { email, metadata }); // 디버깅용
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    console.log('Supabase response:', { data, error }); // 디버깅용
    
    if (error) {
      console.error('Supabase signup error:', error);
      throw error;
    }
    
    return data
  },

  // 이메일 로그인
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Google 로그인
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (error) throw error
    return data
  },

  // 로그아웃
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // 현재 사용자 가져오기
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // 세션 가져오기
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  // 비밀번호 재설정 이메일 보내기
  async resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    
    if (error) throw error
    return data
  },

  // 사용자 정보 업데이트
  async updateUser(updates) {
    const { data, error } = await supabase.auth.updateUser(updates)
    
    if (error) throw error
    return data
  },

  // 인증 상태 변경 리스너
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}