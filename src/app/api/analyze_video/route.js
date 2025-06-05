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
                                    text: `게임 화면을 분석하여 다음 JSON 형식으로 응답해주세요:
                                    {
                                        "game": "게임 이름 (lol/valorant)",
                                        "player": {
                                            "champion": "플레이어 캐릭터",
                                            "role": "역할",
                                            "level": "레벨",
                                            "health": "체력 상태",
                                            "mana": "마나 상태",
                                            "gold": "골드",
                                            "skills": {
                                                "q": "Q 스킬 상태",
                                                "w": "W 스킬 상태", 
                                                "e": "E 스킬 상태",
                                                "r": "R 스킬 상태"
                                            },
                                            "items": ["아이템 목록"],
                                            "positioning": "포지셔닝 평가",
                                            "currentAction": "현재 행동"
                                        },
                                        "gameState": {
                                            "gameTime": "게임 시간",
                                            "phase": "게임 단계",
                                            "location": "위치",
                                            "situation": "상황"
                                        },
                                        "surroundings": {
                                            "allies": ["아군 목록"],
                                            "enemies": ["적군 목록"],
                                            "threatLevel": "위험도"
                                        },
                                        "analysis": {
                                            "playStyle": "플레이 스타일",
                                            "strengths": ["잘한 점"],
                                            "improvements": ["개선점"],
                                            "recommendation": "추천 행동"
                                        },
                                        "tags": ["태그들"],
                                        "summary": "상황 요약"
                                    }`,
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
