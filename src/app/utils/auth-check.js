// 개발용 더미 유저 정보
const DUMMY_USER = {
    id: 1,
    username: "테스트유저",
    email: "test@example.com",
    tier: "다이아몬드 2",
    valorantTier: "다이아몬드 2",
    lolTier: "골드 1",
    profileImage: null,
    joinDate: "2024-01-15",
    totalPosts: 15,
    totalVotes: 234,
    winRate: 67.5,
    mainAgents: ["제트", "레이나"],
    mainChampions: ["진", "카이사"],
    stats: {
        valorant: {
            rank: "다이아몬드 2",
            rr: 45,
            acs: 245,
            kd: 1.35,
            winRate: 67.5,
            recentMatches: [
                {
                    map: "어센트",
                    result: "승리",
                    score: "13-8",
                    agent: "제트",
                    acs: 267,
                },
                {
                    map: "바인드",
                    result: "패배",
                    score: "11-13",
                    agent: "레이나",
                    acs: 223,
                },
                {
                    map: "헤이븐",
                    result: "승리",
                    score: "13-6",
                    agent: "제트",
                    acs: 289,
                },
            ],
        },
        lol: {
            rank: "골드 1",
            lp: 78,
            winRate: 62.3,
            kda: "2.1/1.8/7.4",
            recentMatches: [
                {
                    champion: "진",
                    result: "승리",
                    kda: "8/2/12",
                    position: "원딜",
                },
                {
                    champion: "카이사",
                    result: "승리",
                    kda: "12/4/6",
                    position: "원딜",
                },
                {
                    champion: "진",
                    result: "패배",
                    kda: "3/7/8",
                    position: "원딜",
                },
            ],
        },
    },
};

// 개발용: 항상 인증된 것으로 처리
export const requireAuth = (callback, showLoginModal) => {
    // 개발 환경에서는 항상 인증된 것으로 처리
    if (callback) {
        callback();
    }
    return true;
};

// 더미 유저 정보 반환
export const getCurrentUser = () => {
    return DUMMY_USER;
};

// 로그인 상태 확인 (개발용: 항상 true)
export const isLoggedIn = () => {
    return true;
};

// 토큰 확인 (개발용: 항상 더미 토큰 반환)
export const getToken = () => {
    return "dummy-token-for-development";
};

// 로그아웃 (개발용: 아무것도 하지 않음)
export const logout = () => {
    console.log("개발 환경에서는 로그아웃이 비활성화되어 있습니다.");
};
