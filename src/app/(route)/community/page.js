'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { requireAuth } from '@/app/utils/auth-check';
import { useRouter } from 'next/navigation';
import LoginModal from '@/app/components/LoginModal';

export default function CommunityPage() {
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [posts] = useState([
        {
            id: 1,
            title: "바론 스틸 vs 팀파이트 선택 상황",
            content: "바론을 치고 있는데 상대팀이 오는 상황에서 어떤 선택이 맞을까요?",
            author: "정글러123",
            tier: "골드 2",
            votes: { a: 45, b: 23 },
            tags: ["바론", "팀파이트", "정글"],
            situation: "오브젝트",
            map: "소환사의 협곡",
            game: "리그 오브 레전드",
            champions: ["리신", "그레이브즈"],
            createdAt: "2시간 전",
            comments: 12
        },
        {
            id: 2,
            title: "탑 라인전 갱킹 타이밍 판정",
            content: "상대방이 푸시하고 있을 때 갱킹을 요청했는데 안 와줬어요. 누구 잘못인가요?",
            author: "탑솔러456",
            tier: "플래티넘 4",
            votes: { a: 67, b: 34 },
            tags: ["탑", "갱킹", "라인전"],
            situation: "라인전",
            map: "소환사의 협곡",
            game: "리그 오브 레전드",
            champions: ["가렌", "다리우스"],
            createdAt: "4시간 전",
            comments: 8
        },
        {
            id: 3,
            title: "서포터 로밍 vs 원딜 보호",
            content: "미드에 갱킹 기회가 있는데 원딜이 혼자 남는 상황입니다.",
            author: "서포터789",
            tier: "다이아몬드 3",
            votes: { a: 89, b: 12 },
            tags: ["서포터", "로밍", "원딜"],
            situation: "로밍",
            map: "소환사의 협곡",
            game: "리그 오브 레전드",
            champions: ["쓰레쉬", "노틸러스"],
            createdAt: "6시간 전",
            comments: 15
        },
        {
            id: 4,
            title: "칼바람 나락 시작 아이템 선택",
            content: "AP 챔피언으로 시작할 때 잃은 챕터 vs 도란링 어떤게 좋나요?",
            author: "칼바람장인",
            tier: "실버 1",
            votes: { a: 34, b: 56 },
            tags: ["아이템", "시작템", "AP"],
            situation: "아이템빌드",
            map: "칼바람 나락",
            game: "리그 오브 레전드",
            champions: ["럭스", "제라스"],
            createdAt: "8시간 전",
            comments: 20
        },
        {
            id: 5,
            title: "베이븐 에코 로테이션 어디로?",
            content: "B 사이트 베이븐에서 2명이 들어오는데 에코 어디로 가야 하나요?",
            author: "발로란트유저99",
            tier: "골드 3",
            votes: { a: 56, b: 32 },
            tags: ["베이븐", "로테이션", "수비"],
            situation: "사이트 방어",
            map: "베이븐",
            game: "발로란트",
            agents: ["오멘", "제트"],
            createdAt: "5시간 전",
            comments: 9
        },
        {
            id: 6,
            title: "스플릿 A사이트 리테이크 진입 타이밍",
            content: "A 사이트를 뺏겼을 때 스모크 없이 진입해야 할까요?",
            author: "레이디언트123",
            tier: "다이아몬드 2",
            votes: { a: 78, b: 43 },
            tags: ["스플릿", "리테이크", "A사이트"],
            situation: "리테이크",
            map: "스플릿",
            game: "발로란트",
            agents: ["브림스톤", "페이드"],
            createdAt: "1시간 전",
            comments: 18
        },
        {
            id: 7,
            title: "어센트 B메인 연막 타이밍 판정",
            content: "러쉬할 때 오멘 연막을 먼저 깔고 가야 하나요, 아니면 진입하면서 깔아야 하나요?",
            author: "불멸3유저",
            tier: "불멸 3",
            votes: { a: 92, b: 31 },
            tags: ["어센트", "연막", "러쉬"],
            situation: "사이트 진입",
            map: "어센트",
            game: "발로란트",
            agents: ["오멘", "레이나"],
            createdAt: "3시간 전",
            comments: 24
        },
        {
            id: 8,
            title: "헤이븐 가라지 수비 로테이션",
            content: "C 사이트에서 가라지 소리 들렸을 때 바로 로테해야 하나요?",
            author: "플래3수비전문",
            tier: "플래티넘 3",
            votes: { a: 45, b: 67 },
            tags: ["헤이븐", "로테이션", "수비"],
            situation: "사이트 방어",
            map: "헤이븐",
            game: "발로란트",
            agents: ["사이퍼", "소바"],
            createdAt: "2시간 전",
            comments: 15
        },
        {
            id: 9,
            title: "바인드 A숏 홀드 각도 선택",
            content: "A숏 홀드할 때 화장실 앞에서 보는게 나은가요 아니면 램프에서 보는게 나은가요?",
            author: "실버탈출희망",
            tier: "실버 2",
            votes: { a: 34, b: 89 },
            tags: ["바인드", "홀드", "수비"],
            situation: "사이트 방어",
            map: "바인드",
            game: "발로란트",
            agents: ["킬조이", "세이지"],
            createdAt: "7시간 전",
            comments: 31
        },
        {
            id: 10,
            title: "아이스박스 B사이트 얼티 사용 타이밍",
            content: "제트 얼티 쓸 때 연막 먼저 까는게 좋나요 아니면 바로 날아가는게 좋나요?",
            author: "제트원트릭",
            tier: "골드 1",
            votes: { a: 56, b: 72 },
            tags: ["아이스박스", "얼티메이트", "제트"],
            situation: "얼티메이트",
            map: "아이스박스",
            game: "발로란트",
            agents: ["제트", "레이즈"],
            createdAt: "4시간 전",
            comments: 19
        }
    ]);

    const [selectedGame, setSelectedGame] = useState('');
    const [activeFilters, setActiveFilters] = useState({
        situation: [],
        map: [],
        champion: [],
        agent: [],
        tag: []
    });
    
    // Show more states
    const [showAllChampions, setShowAllChampions] = useState(false);
    const [showAllAgents, setShowAllAgents] = useState(false);
    
    // All champions and agents data
    const allChampions = [
        '가렌', '갈리오', '갱플랭크', '그라가스', '그레이브즈', '그웬', '나르', '나미', '나서스', '노틸러스',
        '녹턴', '누누와 윌럼프', '니달리', '니코', '닐라', '다리우스', '다이애나', '드레이븐', '라이즈', '라칸',
        '람머스', '럭스', '럼블', '레나타 글라스크', '레넥톤', '레오나', '렉사이', '렐', '렝가', '루시안',
        '룰루', '르블랑', '리 신', '리븐', '리산드라', '릴리아', '마스터 이', '마오카이', '말자하', '말파이트',
        '모데카이저', '모르가나', '문도 박사', '미스 포츈', '밀리오', '바드', '바루스', '바이', '베이가', '베인',
        '벡스', '벨베스', '벨코즈', '볼리베어', '브라움', '브랜드', '브라이어', '블라디미르', '블리츠크랭크', '빅토르',
        '뽀삐', '사미라', '사이온', '사일러스', '샤코', '세나', '세라핀', '세주아니', '세트', '소나',
        '소라카', '쉔', '쉬바나', '스웨인', '스카너', '시비르', '신 짜오', '신드라', '신지드', '쓰레쉬',
        '아리', '아무무', '아우렐리온 솔', '아이번', '아지르', '아칼리', '아크샨', '아트록스', '아펠리오스', '알리스타',
        '애니', '애니비아', '애쉬', '야스오', '에코', '엘리스', '오공', '오른', '오리아나', '올라프',
        '요네', '요릭', '우디르', '우르곳', '워윅', '유미', '이렐리아', '이블린', '이즈리얼', '일라오이',
        '자르반 4세', '자야', '자이라', '자크', '잔나', '잭스', '제드', '제라스', '제리', '제이스',
        '조이', '직스', '진', '질리언', '징크스', '초가스', '카르마', '카밀', '카사딘', '카서스',
        '카시오페아', '카이사', '카직스', '카타리나', '칼리스타', '케넨', '케이틀린', '케인', '케일', '코그모',
        '코르키', '퀸', '크산테', '클레드', '키아나', '킨드레드', '타릭', '탈론', '탈리야', '탐 켄치',
        '트런들', '트리스타나', '트린다미어', '트위스티드 페이트', '트위치', '티모', '파이크', '판테온', '피들스틱', '피오라',
        '피즈', '하이머딩거', '헤카림', '흐웨이']
    .sort();
    
    const allAgents = [
        '게코', '네온', '데드락', '레이나', '레이즈', '멘', '바이퍼', '브리치', '브림스톤',
        '세이지', '소바', '스카이', '아스트라', '아이소', '오멘', '요루', '제트', '체임버',
        '케이오', '킬조이', '페이드', '페닉스', '하버'
    ].sort();
    
    const allLolMaps = ['소환사의 협곡', '칼바람 나락', '협곡 나락', '전략적 팀 전투'];
    const allValorantMaps = ['어센트', '바인드', '헤이븐', '스플릿', '아이스박스', '브리즈', '프랙처', '펄', '로터스', '선셋', '베이븐'];

    // Extract unique values for filters based on selected game
    const filterOptions = useMemo(() => {
        const gamePosts = selectedGame ? posts.filter(p => p.game === selectedGame) : [];
        
        const situations = [...new Set(gamePosts.map(p => p.situation).filter(Boolean))];
        const maps = selectedGame === '리그 오브 레전드' 
            ? allLolMaps
            : selectedGame === '발로란트'
                ? allValorantMaps
                : [];
        const champions = selectedGame === '리그 오브 레전드' 
            ? allChampions
            : [];
        const agents = selectedGame === '발로란트'
            ? allAgents
            : [];
        const tags = [...new Set(gamePosts.flatMap(p => p.tags))];
        
        return { situations, maps, champions, agents, tags };
    }, [posts, selectedGame]);

    // Filter posts based on active filters
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            // Game filter first
            if (selectedGame && post.game !== selectedGame) {
                return false;
            }
            
            // Situation filter
            if (activeFilters.situation.length > 0 && !activeFilters.situation.includes(post.situation)) {
                return false;
            }
            
            // Map filter
            if (activeFilters.map.length > 0 && !activeFilters.map.includes(post.map)) {
                return false;
            }
            
            // Champion filter
            if (activeFilters.champion.length > 0) {
                const hasChampion = post.champions?.some(champ => 
                    activeFilters.champion.includes(champ)
                );
                if (!hasChampion) return false;
            }
            
            // Agent filter
            if (activeFilters.agent.length > 0) {
                const hasAgent = post.agents?.some(agent => 
                    activeFilters.agent.includes(agent)
                );
                if (!hasAgent) return false;
            }
            
            // Tag filter
            if (activeFilters.tag.length > 0) {
                const hasTag = post.tags.some(tag => 
                    activeFilters.tag.includes(tag)
                );
                if (!hasTag) return false;
            }
            
            return true;
        });
    }, [posts, activeFilters, selectedGame]);

    const toggleFilter = (category, value) => {
        setActiveFilters(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(v => v !== value)
                : [...prev[category], value]
        }));
    };

    const getTierClass = (tier) => {
        const tierName = tier.split(' ')[0].toLowerCase();
        const tierMap = {
            '아이언': 'tier-iron',
            '브론즈': 'tier-bronze',
            '실버': 'tier-silver',
            '골드': 'tier-gold',
            '플래티넘': 'tier-platinum',
            '다이아몬드': 'tier-diamond',
            '마스터': 'tier-master',
            '그랜드마스터': 'tier-grandmaster',
            '챌린저': 'tier-challenger',
            '불멸': 'tier-불멸',
            '레이디언트': 'tier-레이디언트'
        };
        return tierMap[tierName] || 'tier-badge bg-gray-500 text-white';
    };

    const getTagClass = (tag) => {
        // Categorize tags
        if (['바론', '드래곤', '오브젝트'].includes(tag)) return 'tag-accent';
        if (['소환사의 협곡', '칼바람 나락'].includes(tag)) return 'tag-secondary';
        if (['탑', '정글', '미드', '원딜', '서포터'].includes(tag)) return 'tag-primary';
        return 'tag-default';
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, var(--neutral-50), rgba(30, 136, 229, 0.05))' }}>
            <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
                {/* Header */}
                <div className="card" style={{ 
                    borderRadius: 'var(--radius-lg)', 
                    padding: 'var(--spacing-2xl)', 
                    marginBottom: 'var(--spacing-2xl)',
                    border: '1px solid var(--neutral-100)' 
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--spacing-lg)' }}>
                        <div>
                            <h1 style={{ 
                                background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                marginBottom: 'var(--spacing-sm)'
                            }}>
                                문철 게시판
                            </h1>
                            <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>리그 오브 레전드 & 발로란트 상황 판단 커뮤니티</p>
                        </div>
                        <button 
                            onClick={() => {
                                requireAuth(() => router.push('/community/upload'), setShowLoginModal);
                            }}
                            className="btn btn-primary" 
                            style={{ 
                                borderRadius: '9999px',
                                boxShadow: 'var(--shadow-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-sm)'
                            }}
                        >
                            <span>📹</span>
                            <span>영상 업로드</span>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="card" style={{ 
                    borderRadius: 'var(--radius-lg)', 
                    padding: 'var(--spacing-2xl)', 
                    marginBottom: 'var(--spacing-2xl)',
                    border: '1px solid var(--neutral-100)' 
                }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                        <span style={{ marginRight: 'var(--spacing-sm)' }}>🔍</span>
                        필터링
                    </h3>
                    
                    {/* Game Selection */}
                    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>게임 선택</h4>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <button
                                onClick={() => {
                                    setSelectedGame('');
                                    setActiveFilters({ situation: [], map: [], champion: [], agent: [], tag: [] });
                                }}
                                className={`filter-button ${
                                    !selectedGame ? 'filter-button-active' : 'filter-button-inactive'
                                }`}
                                style={{ minWidth: '120px' }}
                            >
                                전체
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedGame('리그 오브 레전드');
                                    setActiveFilters({ situation: [], map: [], champion: [], agent: [], tag: [] });
                                }}
                                className={`filter-button ${
                                    selectedGame === '리그 오브 레전드' ? 'filter-button-active' : 'filter-button-inactive'
                                }`}
                                style={{ minWidth: '120px' }}
                            >
                                리그 오브 레전드
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedGame('발로란트');
                                    setActiveFilters({ situation: [], map: [], champion: [], agent: [], tag: [] });
                                }}
                                className={`filter-button ${
                                    selectedGame === '발로란트' ? 'filter-button-active' : 'filter-button-inactive'
                                }`}
                                style={{ minWidth: '120px' }}
                            >
                                발로란트
                            </button>
                        </div>
                    </div>
                    
                    {/* Other filters only show when game is selected */}
                    {selectedGame && (
                        <>
                            {/* Situation Filters */}
                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>상황별</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                                    {filterOptions.situations.map(situation => (
                                        <button
                                            key={situation}
                                            onClick={() => toggleFilter('situation', situation)}
                                            className={`filter-button ${
                                                activeFilters.situation.includes(situation)
                                                    ? 'filter-button-active'
                                                    : 'filter-button-inactive'
                                            }`}
                                        >
                                            {situation}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Map Filters */}
                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>맵별</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                                    {filterOptions.maps.map(map => (
                                        <button
                                            key={map}
                                            onClick={() => toggleFilter('map', map)}
                                            className={`filter-button ${
                                                activeFilters.map.includes(map)
                                                    ? 'filter-button-active'
                                                    : 'filter-button-inactive'
                                            }`}
                                        >
                                            {map}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Champion Filters */}
                            {filterOptions.champions.length > 0 && (
                                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                    <h4 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>챔피언별 (LOL)</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                                        {(showAllChampions ? filterOptions.champions : filterOptions.champions.slice(0, 20)).map(champion => (
                                            <button
                                                key={champion}
                                                onClick={() => toggleFilter('champion', champion)}
                                                className={`filter-button ${
                                                    activeFilters.champion.includes(champion)
                                                        ? 'filter-button-active'
                                                        : 'filter-button-inactive'
                                                }`}
                                            >
                                                {champion}
                                            </button>
                                        ))}
                                        {filterOptions.champions.length > 20 && (
                                            <button
                                                onClick={() => setShowAllChampions(!showAllChampions)}
                                                className="filter-button"
                                                style={{ 
                                                    backgroundColor: 'transparent',
                                                    color: 'var(--accent)',
                                                    border: '1px dashed var(--accent)',
                                                    fontWeight: 500
                                                }}
                                            >
                                                {showAllChampions ? '접기' : `더보기 (+${filterOptions.champions.length - 20})`}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Agent Filters */}
                            {filterOptions.agents.length > 0 && (
                                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                    <h4 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>요원별 (발로란트)</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                                        {(showAllAgents ? filterOptions.agents : filterOptions.agents.slice(0, 12)).map(agent => (
                                            <button
                                                key={agent}
                                                onClick={() => toggleFilter('agent', agent)}
                                                className={`filter-button ${
                                                    activeFilters.agent.includes(agent)
                                                        ? 'filter-button-active'
                                                        : 'filter-button-inactive'
                                                }`}
                                            >
                                                {agent}
                                            </button>
                                        ))}
                                        {filterOptions.agents.length > 12 && (
                                            <button
                                                onClick={() => setShowAllAgents(!showAllAgents)}
                                                className="filter-button"
                                                style={{ 
                                                    backgroundColor: 'transparent',
                                                    color: 'var(--accent)',
                                                    border: '1px dashed var(--accent)',
                                                    fontWeight: 500
                                                }}
                                            >
                                                {showAllAgents ? '접기' : `더보기 (+${filterOptions.agents.length - 12})`}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Active filters count */}
                            {Object.values(activeFilters).flat().length > 0 && (
                                <div style={{ marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--neutral-200)' }}>
                                    <button
                                        onClick={() => setActiveFilters({ situation: [], map: [], champion: [], agent: [], tag: [] })}
                                        style={{ 
                                            fontSize: '14px', 
                                            color: 'var(--accent)', 
                                            fontWeight: 500,
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: 0
                                        }}
                                    >
                                        필터 초기화 ({Object.values(activeFilters).flat().length}개 선택됨)
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Posts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                    {filteredPosts.length === 0 ? (
                        <div className="card" style={{ 
                            textAlign: 'center', 
                            padding: 'var(--spacing-4xl)', 
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--neutral-100)' 
                        }}>
                            <div style={{ fontSize: '60px', marginBottom: 'var(--spacing-lg)' }}>📭</div>
                            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>선택한 필터에 해당하는 게시글이 없습니다.</p>
                        </div>
                    ) : (
                        filteredPosts.map(post => {
                            const totalVotes = post.votes.a + post.votes.b;
                            const percentage = totalVotes > 0 ? Math.round((post.votes.a / totalVotes) * 100) : 0;
                            
                            return (
                                <Link
                                    key={post.id}
                                    href={`/community/${post.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className="card-interactive" style={{ 
                                        padding: 'var(--spacing-2xl)', 
                                        borderRadius: 'var(--radius-lg)',
                                        border: '1px solid var(--neutral-100)' 
                                    }}>
                                        {/* Post Header */}
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'flex-start', 
                                            marginBottom: 'var(--spacing-lg)',
                                            gap: 'var(--spacing-lg)' 
                                        }}>
                                            <h2 style={{ 
                                                fontSize: '24px', 
                                                fontWeight: 700, 
                                                color: 'var(--text-primary)', 
                                                flex: 1,
                                                transition: 'color var(--transition-fast)' 
                                            }}>
                                                {post.title}
                                            </h2>
                                            <span className="badge badge-info" style={{ 
                                                whiteSpace: 'nowrap',
                                                backgroundColor: 'var(--neutral-100)',
                                                color: 'var(--text-secondary)' 
                                            }}>
                                                {post.createdAt}
                                            </span>
                                        </div>
                                        
                                        {/* Post Content */}
                                        <p style={{ 
                                            color: 'var(--text-secondary)', 
                                            marginBottom: 'var(--spacing-xl)', 
                                            fontSize: '16px', 
                                            lineHeight: '1.6',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical' 
                                        }}>{post.content}</p>
                                        
                                        {/* Tags */}
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                                            {post.tags.map(tag => (
                                                <span key={tag} className={`tag ${getTagClass(tag)}`}>
                                                    {tag}
                                                </span>
                                            ))}
                                            {post.champions?.map(champion => (
                                                <span key={champion} className="tag tag-primary">
                                                    {champion}
                                                </span>
                                            ))}
                                            {post.agents?.map(agent => (
                                                <span key={agent} className="tag tag-accent">
                                                    {agent}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        {/* Post Footer */}
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'space-between', 
                                            paddingTop: 'var(--spacing-xl)', 
                                            borderTop: '1px solid var(--neutral-200)',
                                            flexWrap: 'wrap',
                                            gap: 'var(--spacing-lg)' 
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                                    <div style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        background: 'linear-gradient(to right, #a855f7, #ec4899)',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <span style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>
                                                            {post.author.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 0 }}>{post.author}</p>
                                                        <span className={`tier-badge ${getTierClass(post.tier)}`}>
                                                            {post.tier}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    gap: 'var(--spacing-md)', 
                                                    backgroundColor: 'var(--neutral-50)', 
                                                    padding: 'var(--spacing-sm) var(--spacing-lg)', 
                                                    borderRadius: 'var(--radius-md)' 
                                                }}>
                                                    <span style={{ color: '#10b981', fontWeight: 600 }}>👍 {post.votes.a}</span>
                                                    <span style={{ color: 'var(--text-secondary)' }}>vs</span>
                                                    <span style={{ color: '#ef4444', fontWeight: 600 }}>👎 {post.votes.b}</span>
                                                </div>
                                                <span className="badge badge-info" style={{ fontWeight: 500 }}>
                                                    💬 {post.comments}
                                                </span>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    background: 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(30, 136, 229, 0.1))', 
                                                    padding: 'var(--spacing-sm) var(--spacing-lg)', 
                                                    borderRadius: 'var(--radius-md)' 
                                                }}>
                                                    <div style={{ 
                                                        width: '96px', 
                                                        backgroundColor: 'var(--neutral-300)', 
                                                        borderRadius: '9999px', 
                                                        height: '12px', 
                                                        marginRight: 'var(--spacing-md)', 
                                                        overflow: 'hidden' 
                                                    }}>
                                                        <div style={{ 
                                                            background: 'linear-gradient(to right, #10b981, #059669)', 
                                                            height: '12px', 
                                                            borderRadius: '9999px', 
                                                            transition: 'all var(--transition-normal)',
                                                            width: `${percentage}%` 
                                                        }} />
                                                    </div>
                                                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{percentage}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
            
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={() => {
                    setShowLoginModal(false);
                    router.push('/community/upload');
                }}
            />
        </div>
    );
}