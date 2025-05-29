import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    const { credential, clientId } = await request.json();
    
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Google 인증에 실패했습니다.' },
        { status: 400 }
      );
    }

    const googleUser = await response.json();

    if (googleUser.aud !== clientId) {
      return NextResponse.json(
        { error: '잘못된 클라이언트입니다.' },
        { status: 400 }
      );
    }

    const user = {
      id: googleUser.sub,
      email: googleUser.email,
      name: googleUser.name,
      profileImage: googleUser.picture,
      provider: 'google',
      summonerName: null,
      tier: 'UNRANKED',
      points: 0,
      badges: ['신규'],
      createdAt: new Date().toISOString()
    };

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });

    return NextResponse.json({
      token,
      user,
      message: 'Google 계정으로 로그인되었습니다.'
    });

  } catch (error) {
    console.error('Google login error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}