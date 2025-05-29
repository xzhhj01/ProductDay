import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    // OAuth 인증 성공 후 홈페이지로 리다이렉트
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 에러가 있는 경우 로그인 페이지로 리다이렉트
  return NextResponse.redirect(new URL('/?error=auth', request.url))
}