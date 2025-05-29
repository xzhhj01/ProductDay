'use client';

import { useState } from 'react';
import Link from 'next/link';
import { requireAuth } from '@/app/utils/auth-check';
import { useRouter } from 'next/navigation';
import LoginModal from '@/app/components/LoginModal';

export default function MentorPage() {
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState('all');
    const [selectedPosition, setSelectedPosition] = useState('all');
    const [selectedChampion, setSelectedChampion] = useState('all');
    const [selectedTier, setSelectedTier] = useState('all');

    const [mentors] = useState([
        {
            id: 1,
            name: "다이아정글러",
            game: "롤",
            tier: "다이아몬드 1",
            position: "정글",
            champions: ["그레이브즈", "니달리", "킨드레드"],
            specialties: ["갱킹 루트", "오브젝트 컨트롤", "카정"],
            rating: 4.8,
            responseTime: "30분",
            recentAnswers: 45,
            introduction: "시즌11부터 다이아 유지중인 정글러입니다. 갱킹 타이밍과 오브젝트 판단에 자신있어요!",
            tags: ["친절함", "상세설명", "빠른답변"]
        },
        {
            id: 2,
            name: "마스터미드",
            game: "롤",
            tier: "마스터",
            position: "미드",
            champions: ["아지르", "오리아나", "신드라"],
            specialties: ["라인전", "로밍", "팀파이트"],
            rating: 4.9,
            responseTime: "1시간",
            recentAnswers: 67,
            introduction: "마스터 티어 미드 라이너입니다. 라인전 디테일과 로밍 타이밍을 알려드릴게요.",
            tags: ["프로급", "체계적", "심화설명"]
        },
        {
            id: 3,
            name: "챌린저서폿",
            game: "롤",
            tier: "챌린저",
            position: "서포터",
            champions: ["레오나", "나미", "룰루"],
            specialties: ["비전 컨트롤", "로밍", "원딜 보호"],
            rating: 5.0,
            responseTime: "2시간",
            recentAnswers: 23,
            introduction: "현재 챌린저 서포터입니다. 비전 컨트롤과 맵 리딩을 중점적으로 가르쳐드려요.",
            tags: ["최고급", "비전마스터", "전략적"]
        },
        {
            id: 4,
            name: "그마원딜",
            game: "롤",
            tier: "그랜드마스터",
            position: "원딜",
            champions: ["케이틀린", "징크스", "바루스"],
            specialties: ["포지셔닝", "딜량 최적화", "라인전"],
            rating: 4.7,
            responseTime: "45분",
            recentAnswers: 34,
            introduction: "그마 원딜러입니다. 포지셔닝과 딜링에 대해 알려드릴게요!",
            tags: ["포지셔닝마스터", "딜량최적화", "실전위주"]
        },
        {
            id: 5,
            name: "레디언트제트",
            game: "발로란트",
            tier: "레디언트",
            position: "듀얼리스트",
            champions: ["제트", "레이나", "레이즈"],
            specialties: ["엔트리", "플릭샷", "오퍼레이터"],
            rating: 4.9,
            responseTime: "40분",
            recentAnswers: 52,
            introduction: "레디언트 제트 원트릭입니다. 엔트리와 오퍼레이터 운용을 가르쳐드려요!",
            tags: ["에임신", "전략적", "친절함"]
        },
        {
            id: 6,
            name: "이모탈오멘",
            game: "발로란트",
            tier: "이모탈 3",
            position: "컨트롤러",
            champions: ["오멘", "바이퍼", "아스트라"],
            specialties: ["스모크 타이밍", "맵 컨트롤", "포지션"],
            rating: 4.8,
            responseTime: "1시간",
            recentAnswers: 38,
            introduction: "이모탈 컨트롤러 메인입니다. 스모크 타이밍과 맵 컨트롤을 알려드릴게요.",
            tags: ["전문적", "상세설명", "팀플레이"]
        }
    ]);

    const gameFilters = {
        롤: {
            positions: ['all', '탑', '정글', '미드', '원딜', '서포터'],
            champions: ['all', '아지르', '그레이브즈', '레오나', '케이틀린', '니달리', '오리아나', '신드라', '징크스'],
            tiers: ['all', '아이언', '브론즈', '실버', '골드', '플래티넘', '다이아몬드', '마스터', '그랜드마스터', '챌린저']
        },
        발로란트: {
            positions: ['all', '듀얼리스트', '컨트롤러', '이니시에이터', '센티넬'],
            champions: ['all', '제트', '레이나', '오멘', '바이퍼', '소바', '사이퍼', '세이지', '브리치'],
            tiers: ['all', '아이언', '브론즈', '실버', '골드', '플래티넘', '다이아몬드', '어센던트', '이모탈', '레디언트']
        }
    };

    const getCurrentFilters = () => {
        if (selectedGame === 'all') {
            return {
                positions: ['all'],
                champions: ['all'],
                tiers: ['all']
            };
        }
        return gameFilters[selectedGame] || { positions: ['all'], champions: ['all'], tiers: ['all'] };
    };

    const filteredMentors = mentors.filter(mentor => {
        const gameMatch = selectedGame === 'all' || mentor.game === selectedGame;
        const positionMatch = selectedPosition === 'all' || mentor.position === selectedPosition;
        const championMatch = selectedChampion === 'all' || mentor.champions.includes(selectedChampion);
        const tierMatch = selectedTier === 'all' || mentor.tier.includes(selectedTier);
        return gameMatch && positionMatch && championMatch && tierMatch;
    });

    const recommendedMentors = mentors.slice(0, 3);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
            <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                    <h1 style={{ marginBottom: 'var(--spacing-md)' }}>🎓 멘토 매칭</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>고수들에게 직접 조언을 구해보세요</p>
                    <div style={{ marginTop: 'var(--spacing-xl)' }}>
                        <button 
                            onClick={() => {
                                requireAuth(() => router.push('/mentor/create'), setShowLoginModal);
                            }}
                            className="btn btn-primary" 
                            style={{
                                padding: 'var(--spacing-md) var(--spacing-2xl)',
                                fontSize: '16px',
                                fontWeight: 600,
                                borderRadius: 'var(--radius-full)',
                                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                                boxShadow: '0 10px 20px -5px rgba(147, 51, 234, 0.3)'
                            }}
                        >
                            <span style={{ marginRight: 'var(--spacing-sm)' }}>✨</span>
                            멘토로 등록하기
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: 'var(--spacing-lg)' }}>🌟 추천 멘토</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
                        {recommendedMentors.map(mentor => (
                            <Link
                                key={mentor.id}
                                href={`/mentor/${mentor.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="card" style={{ 
                                    padding: 'var(--spacing-lg)', 
                                    border: '2px solid rgba(30, 136, 229, 0.2)',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-normal)' 
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            backgroundColor: 'var(--accent)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: 700
                                        }}>
                                            {mentor.name[0]}
                                        </div>
                                        <div>
                                            <h3 style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: 'var(--spacing-xs)' }}>{mentor.name}</h3>
                                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 0 }}>{mentor.tier}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span style={{ color: 'var(--accent)' }}>⭐ {mentor.rating}</span>
                                        <span style={{ color: 'var(--text-secondary)' }}>📞 평균 {mentor.responseTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="card" style={{ 
                    padding: 'var(--spacing-xl)', 
                    marginBottom: 'var(--spacing-xl)',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
                    border: '1px solid var(--color-border)'
                }}>
                    <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: 600, 
                        marginBottom: 'var(--spacing-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)'
                    }}>
                        <span style={{ fontSize: '20px' }}>🎮</span>
                        게임 선택
                    </h3>
                    <div style={{ 
                        display: 'flex', 
                        gap: 'var(--spacing-md)', 
                        marginBottom: 'var(--spacing-xl)' 
                    }}>
                        <button
                            onClick={() => {
                                setSelectedGame('all');
                                setSelectedPosition('all');
                                setSelectedChampion('all');
                                setSelectedTier('all');
                            }}
                            className={`btn ${selectedGame === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                            style={{ 
                                borderRadius: 'var(--radius-full)',
                                padding: 'var(--spacing-sm) var(--spacing-lg)'
                            }}
                        >
                            전체 게임
                        </button>
                        <button
                            onClick={() => {
                                setSelectedGame('롤');
                                setSelectedPosition('all');
                                setSelectedChampion('all');
                                setSelectedTier('all');
                            }}
                            className={`btn ${selectedGame === '롤' ? 'btn-primary' : 'btn-ghost'}`}
                            style={{ 
                                borderRadius: 'var(--radius-full)',
                                padding: 'var(--spacing-sm) var(--spacing-lg)',
                                background: selectedGame === '롤' ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' : ''
                            }}
                        >
                            <span style={{ marginRight: 'var(--spacing-xs)' }}>⚔️</span>
                            리그 오브 레전드
                        </button>
                        <button
                            onClick={() => {
                                setSelectedGame('발로란트');
                                setSelectedPosition('all');
                                setSelectedChampion('all');
                                setSelectedTier('all');
                            }}
                            className={`btn ${selectedGame === '발로란트' ? 'btn-primary' : 'btn-ghost'}`}
                            style={{ 
                                borderRadius: 'var(--radius-full)',
                                padding: 'var(--spacing-sm) var(--spacing-lg)',
                                background: selectedGame === '발로란트' ? 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' : ''
                            }}
                        >
                            <span style={{ marginRight: 'var(--spacing-xs)' }}>🎯</span>
                            발로란트
                        </button>
                    </div>

                    {selectedGame !== 'all' && (
                        <>
                            <h4 style={{ 
                                fontSize: '16px', 
                                fontWeight: 500, 
                                marginBottom: 'var(--spacing-md)',
                                color: 'var(--color-text-secondary)'
                            }}>필터 옵션</h4>
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                                gap: 'var(--spacing-md)' 
                            }}>
                                <div>
                                    <label style={{ 
                                        display: 'block', 
                                        marginBottom: 'var(--spacing-xs)', 
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-secondary)',
                                        fontWeight: 500
                                    }}>포지션</label>
                                    <select
                                        value={selectedPosition}
                                        onChange={(e) => setSelectedPosition(e.target.value)}
                                        className="select-field"
                                        style={{ 
                                            width: '100%',
                                            padding: 'var(--spacing-sm) var(--spacing-md)',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--color-border)',
                                            background: 'var(--color-background)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {getCurrentFilters().positions.map(position => (
                                            <option key={position} value={position}>
                                                {position === 'all' ? '전체 포지션' : position}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ 
                                        display: 'block', 
                                        marginBottom: 'var(--spacing-xs)', 
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-secondary)',
                                        fontWeight: 500
                                    }}>{selectedGame === '롤' ? '챔피언' : '요원'}</label>
                                    <select
                                        value={selectedChampion}
                                        onChange={(e) => setSelectedChampion(e.target.value)}
                                        className="select-field"
                                        style={{ 
                                            width: '100%',
                                            padding: 'var(--spacing-sm) var(--spacing-md)',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--color-border)',
                                            background: 'var(--color-background)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {getCurrentFilters().champions.map(champion => (
                                            <option key={champion} value={champion}>
                                                {champion === 'all' ? `전체 ${selectedGame === '롤' ? '챔피언' : '요원'}` : champion}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ 
                                        display: 'block', 
                                        marginBottom: 'var(--spacing-xs)', 
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-secondary)',
                                        fontWeight: 500
                                    }}>티어</label>
                                    <select
                                        value={selectedTier}
                                        onChange={(e) => setSelectedTier(e.target.value)}
                                        className="select-field"
                                        style={{ 
                                            width: '100%',
                                            padding: 'var(--spacing-sm) var(--spacing-md)',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--color-border)',
                                            background: 'var(--color-background)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {getCurrentFilters().tiers.map(tier => (
                                            <option key={tier} value={tier}>
                                                {tier === 'all' ? '전체 티어' : tier}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    {filteredMentors.map(mentor => (
                        <Link
                            key={mentor.id}
                            href={`/mentor/${mentor.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="card" style={{ padding: 'var(--spacing-xl)', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)', flex: '0 0 auto' }}>
                                        <div style={{
                                            width: '64px',
                                            height: '64px',
                                            backgroundColor: 'var(--accent)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '20px',
                                            fontWeight: 700
                                        }}>
                                            {mentor.name[0]}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: 'var(--spacing-xs)' }}>{mentor.name}</h3>
                                            <p style={{ color: 'var(--accent)', fontWeight: 500, marginBottom: 'var(--spacing-xs)' }}>{mentor.tier}</p>
                                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 0 }}>
                                                <span className="badge badge-secondary" style={{ marginRight: 'var(--spacing-xs)' }}>{mentor.game}</span>
                                                {mentor.position}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                        <p style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>{mentor.introduction}</p>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)' }}>
                                            <div>
                                                <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>전문 챔피언</p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                                                    {mentor.champions.map(champion => (
                                                        <span
                                                            key={champion}
                                                            className="badge"
                                                            style={{ backgroundColor: 'var(--neutral-100)', color: 'var(--text-secondary)', fontSize: '12px' }}
                                                        >
                                                            {champion}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>전문 분야</p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                                                    {mentor.specialties.map(specialty => (
                                                        <span
                                                            key={specialty}
                                                            className="badge badge-info"
                                                            style={{ fontSize: '12px' }}
                                                        >
                                                            {specialty}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--spacing-sm)', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)', fontSize: '14px' }}>
                                                <span style={{ color: '#eab308' }}>⭐ {mentor.rating}</span>
                                                <span style={{ color: 'var(--text-secondary)' }}>📞 평균 {mentor.responseTime}</span>
                                                <span style={{ color: 'var(--text-secondary)' }}>📝 {mentor.recentAnswers}개 답변</span>
                                            </div>
                                            
                                            <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                                                {mentor.tags.map(tag => (
                                                    <span
                                                        key={tag}
                                                        className="badge badge-success"
                                                        style={{ fontSize: '12px' }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredMentors.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl) 0' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>해당 조건의 멘토가 없습니다.</p>
                    </div>
                )}
            </div>
            
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={() => {
                    setShowLoginModal(false);
                    router.push('/mentor/create');
                }}
            />
        </div>
    );
}