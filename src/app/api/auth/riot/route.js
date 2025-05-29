import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    const { accessToken, summonerName, region } = await request.json();
    
    const riotApiResponse = await fetch(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY
        }
      }
    );

    if (!riotApiResponse.ok) {
      return NextResponse.json(
        { error: '라이엇 계정 확인에 실패했습니다.' },
        { status: 400 }
      );
    }

    const summonerData = await riotApiResponse.json();
    
    const rankedResponse = await fetch(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}`,
      {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY
        }
      }
    );

    let tier = 'UNRANKED';
    if (rankedResponse.ok) {
      const rankedData = await rankedResponse.json();
      const soloQueue = rankedData.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
      if (soloQueue) {
        tier = `${soloQueue.tier} ${soloQueue.rank}`;
      }
    }

    const user = {
      id: summonerData.id,
      summonerName: summonerData.name,
      tier,
      profileIconId: summonerData.profileIconId,
      summonerLevel: summonerData.summonerLevel,
      region,
      points: 0,
      badges: ['신규'],
      createdAt: new Date().toISOString()
    };

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });

    return NextResponse.json({
      token,
      user,
      message: '라이엇 계정으로 로그인되었습니다.'
    });

  } catch (error) {
    console.error('Riot login error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}