'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { requireAuth } from '@/app/utils/auth-check';
import { useRouter } from 'next/navigation';
import LoginModal from '@/app/components/LoginModal';
import { communityService } from '@/app/services/community/community.service';
import { allChampions,allAgents,allLolMaps,allValorantMaps,tierMap } from '@/app/utils/gamedata/data';
import { timeAgo } from '@/app/utils/timeAgo';

export default function CommunityPage() {
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [posts, setPosts] = useState([]);

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

   // Load posts from API
    useEffect(() => {
        communityService.getPosts()
            .then(data => setPosts(data))
            .catch(err => console.error('Failed to load posts', err));
    }, []);

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
                                                {timeAgo(post.createdAt)}
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