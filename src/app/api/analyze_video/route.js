import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
    try {
        const { frames } = await request.json();

        if (!frames || frames.length === 0) {
            return NextResponse.json(
                { error: "프레임 데이터가 누락되었습니다." },
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "API 키가 설정되지 않았습니다." },
                { status: 500 }
            );
        }

        const openai = new OpenAI({ apiKey });

        const analyzedFrames = [];

        for (const frame of frames) {
            try {
                const base64Image = frame.dataUrl.split(",")[1];

                const response = await openai.chat.completions.create({
                    model: "gpt-4o",
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: `당신은 League of Legends와 VALORANT 게임 전문 분석가입니다. 제공된 게임 스크린샷을 매우 세밀하게 분석하여 다음 JSON 형식으로 응답해주세요.

**분석 지침:**

1. **게임 식별**: UI 요소, HUD 디자인, 캐릭터 모델을 보고 정확히 구분
   - LoL: 미니맵이 우하단, 스킬 아이콘이 하단 중앙, 체력/마나바가 하단
   - VALORANT: 미니맵이 좌상단, 탄약 표시가 우하단, 스킬 아이콘이 우하단

2. **챔피언/에이전트 식별** (매우 중요):
   - LoL: 캐릭터 모델, 스킬 아이콘, 체력바 색상, 애니메이션 등을 종합적으로 판단
   - VALORANT: 손/무기 모델, 스킬 UI, 에이전트별 고유 UI 요소 확인
   - 확실하지 않으면 "Unknown" 또는 "확인불가"로 표시

3. **맵/위치 식별**:
   - LoL: 소환사의 협곡 지형, 정글 몬스터, 타워, 강 등의 지형지물
   - VALORANT: 맵별 고유 건축물, 색상 팔레트, 사이트 구조 확인

4. **상황 분석**:
   - 팀파이트, 1:1 교전, 갱킹, 파밍, 오브젝트 싸움 등 정확히 구분
   - 스킬 이펙트, 체력 상태, 위치 등을 종합 판단

5. **태그 생성**:
   - 확실히 식별된 요소만 태그로 추가
   - 게임별 전문 용어 사용 (예: LoL - "라인전", "갱킹", "로밍" / VALORANT - "사이트 수비", "러시", "클러치")

**응답 형식:**
{
    "game": "lol 또는 valorant",
    "confidence": "게임 식별 확신도 (0-100)",
    "player": {
        "champion": "챔피언/에이전트 이름 (정확히 식별된 경우만)",
        "role": "역할 (LoL: 탑/정글/미드/원딜/서포터, VALORANT: 듀얼리스트/이니시에이터/컨트롤러/센티넬)",
        "level": "레벨 (표시된 경우)",
        "health": "체력 상태 (높음/중간/낮음/위험)",
        "mana": "마나/스킬 상태 (LoL만, 표시된 경우)",
        "gold": "골드 (LoL만, 표시된 경우)",
        "money": "크레딧 (VALORANT만, 표시된 경우)",
        "skills": {
            "q": "Q 스킬 사용가능/쿨다운/사용중",
            "w": "W 스킬 상태",
            "e": "E 스킬 상태",
            "r": "궁극기 상태"
        },
        "items": ["아이템 목록 (식별 가능한 것만)"],
        "weapons": ["무기 목록 (VALORANT만, 식별 가능한 것만)"],
        "positioning": "포지셔닝 평가 (공격적/수비적/중립적/위험함)",
        "currentAction": "현재 행동 (이동중/교전중/스킬사용/대기중/후퇴중)"
    },
    "gameState": {
        "gameTime": "게임 시간 (표시된 경우)",
        "round": "라운드 (VALORANT만)",
        "score": "점수 (표시된 경우)",
        "phase": "게임 단계 (초반/중반/후반)",
        "location": "위치 (LoL: 탑라인/미드라인/봇라인/정글/강/베이스, VALORANT: A사이트/B사이트/미드/스폰)",
        "map": "맵 이름 (확실한 경우만)",
        "situation": "상황 (라인전/갱킹/팀파이트/파밍/오브젝트/사이트수비/러시/로테이션)"
    },
    "surroundings": {
        "allies": ["아군 정보 (보이는 경우만)"],
        "enemies": ["적군 정보 (보이는 경우만)"],
        "minions": "미니언 상태 (LoL만)",
        "threatLevel": "위험도 (안전/주의/위험/매우위험)"
    },
    "analysis": {
        "playStyle": "플레이 스타일 분석",
        "strengths": ["잘한 점들 (구체적으로)"],
        "improvements": ["개선할 점들 (구체적으로)"],
        "recommendation": "추천 행동",
        "keyMoment": "이 순간의 핵심 포인트"
    },
    "tags": [
        "게임별 정확한 태그들",
        "챔피언/에이전트명 (확실한 경우)",
        "맵이름 (확실한 경우)", 
        "상황태그",
        "역할태그",
        "난이도태그"
    ],
    "summary": "상황 요약 (한국어, 2-3문장)",
    "technical": {
        "resolution": "해상도 추정",
        "ui_elements": ["확인된 UI 요소들"],
        "visual_effects": ["보이는 시각 효과들"],
        "minimap_info": "미니맵에서 얻을 수 있는 정보"
    }
}

**중요 주의사항:**
- 확실하지 않은 정보는 "확인불가" 또는 null로 표시
- 챔피언/에이전트 식별이 가장 중요하므로 UI, 모델, 스킬 등을 종합적으로 분석
- 태그는 정확히 식별된 요소만 포함
- 한국어로 분석하되 게임 전문용어는 정확히 사용
- LoL과 VALORANT의 차이점을 명확히 구분하여 분석`,
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: `data:image/jpeg;base64,${base64Image}`,
                                    },
                                },
                            ],
                        },
                    ],
                    response_format: { type: "json_object" },
                    temperature: 0.1,
                    max_tokens: 4000,
                });

                const gameAnalysis = JSON.parse(
                    response.choices[0].message.content
                );

                analyzedFrames.push({
                    ...frame,
                    gameAnalysis,
                });
            } catch (error) {
                console.error("프레임 분석 오류:", error);
                analyzedFrames.push({
                    ...frame,
                    gameAnalysis: null,
                    error: error.message,
                });
            }
        }

        return NextResponse.json({ analyzedFrames });
    } catch (error) {
        console.error("비디오 분석 오류:", error);
        return NextResponse.json(
            { error: error.message || "비디오 분석 실패" },
            { status: 500 }
        );
    }
}
