//예시 테스트 코드 주석 지우고 작성

// const API_KEY = process.env.OPGG_API_KEY;
// const BASE_URL = 'https://api.op.gg/api/v1';

// export async function getSummonerInfo(summonerName) {
//     try {
//         const response = await fetch(`${BASE_URL}/summoners/kr/${encodeURIComponent(summonerName)}`, {
//             headers: {
//                 'Authorization': `Bearer ${API_KEY}`
//             }
//         });
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching summoner info:', error);
//         throw error;
//     }
// }

// export async function getMatchHistory(summonerId, limit = 20) {
//     try {
//         const response = await fetch(`${BASE_URL}/summoners/${summonerId}/matches?limit=${limit}`, {
//             headers: {
//                 'Authorization': `Bearer ${API_KEY}`
//             }
//         });
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching match history:', error);
//         throw error;
//     }
// }

// export async function getMatchDetail(matchId) {
//     try {
//         const response = await fetch(`${BASE_URL}/matches/${matchId}`, {
//             headers: {
//                 'Authorization': `Bearer ${API_KEY}`
//             }
//         });
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching match detail:', error);
//         throw error;
//     }
// } 