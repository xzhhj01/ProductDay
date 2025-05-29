const RIOT_API_KEY = process.env.RIOT_API_KEY;
const RIOT_BASE_URL = 'https://kr.api.riotgames.com';

export const lolService = {
  async getSummonerByName(summonerName, region = 'kr') {
    try {
      const response = await fetch(
        `${RIOT_BASE_URL}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`,
        {
          headers: {
            'X-Riot-Token': RIOT_API_KEY
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('소환사를 찾을 수 없습니다.');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching summoner info:', error);
      throw error;
    }
  },

  async getRankedInfo(summonerId) {
    try {
      const response = await fetch(
        `${RIOT_BASE_URL}/lol/league/v4/entries/by-summoner/${summonerId}`,
        {
          headers: {
            'X-Riot-Token': RIOT_API_KEY
          }
        }
      );
      
      if (!response.ok) {
        return [];
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching ranked info:', error);
      return [];
    }
  },

  async getMatchHistory(puuid, count = 20) {
    try {
      const response = await fetch(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}`,
        {
          headers: {
            'X-Riot-Token': RIOT_API_KEY
          }
        }
      );
      
      if (!response.ok) {
        return [];
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching match history:', error);
      return [];
    }
  },

  async getMatchDetail(matchId) {
    try {
      const response = await fetch(
        `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`,
        {
          headers: {
            'X-Riot-Token': RIOT_API_KEY
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('매치 정보를 찾을 수 없습니다.');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching match detail:', error);
      throw error;
    }
  },

  async analyzeVideo(videoFile) {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      
      const response = await fetch('/api/video/analyze', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('영상 분석에 실패했습니다.');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error analyzing video:', error);
      throw error;
    }
  },

  formatTier(tier, rank) {
    if (!tier || tier === 'UNRANKED') {
      return 'UNRANKED';
    }
    return `${tier} ${rank}`;
  },

  getChampionImageUrl(championId) {
    return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${championId}.png`;
  },

  getProfileIconUrl(iconId) {
    return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${iconId}.png`;
  }
};