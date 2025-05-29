'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function MentorDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [mentor, setMentor] = useState(null);
    const [activeTab, setActiveTab] = useState('intro');
    const [showContactModal, setShowContactModal] = useState(false);

    useEffect(() => {
        const mockMentor = {
            id: parseInt(params.id),
            name: "다이아정글러",
            tier: "다이아몬드 1",
            position: "정글",
            champions: ["그레이브즈", "니달리", "킨드레드", "카직스", "렝가"],
            specialties: ["갱킹 루트", "오브젝트 컨트롤", "카정", "정글 클리어"],
            rating: 4.8,
            responseTime: "30분",
            recentAnswers: 45,
            totalAnswers: 234,
            responseRate: 95,
            introduction: "안녕하세요! 시즌11부터 다이아 티어를 유지하고 있는 정글러입니다. 갱킹 타이밍과 오브젝트 판단에 자신있어요! 특히 초반 정글링과 갱킹 루트 최적화를 통해 게임을 캐리하는 방법을 알려드릴 수 있습니다.",
            tags: ["친절함", "상세설명", "빠른답변"],
            recentActivities: [
                {
                    id: 1,
                    type: "답변",
                    title: "초반 갱킹 타이밍에 대해 질문드립니다",
                    content: "3레벨 갱킹은 상대방의 와드 상황을 보고 판단하세요. 특히 강타 쿨타임과 상대 정글러 위치를 확인하는 것이 중요합니다.",
                    timestamp: "2시간 전",
                    likes: 12
                },
                {
                    id: 2,
                    type: "투표",
                    title: "바론 스틸 vs 팀파이트 선택 상황",
                    content: "바론 스틸을 시도하는 것이 더 나은 선택입니다. 상대팀의 시야가 없고 정글러가 스마이트를 가지고 있다면 성공 확률이 높아요.",
                    timestamp: "3시간 전",
                    likes: 23,
                    voteChoice: "바론 스틸 시도"
                },
                {
                    id: 3,
                    type: "답변",
                    title: "바론 타이밍 질문",
                    content: "바론은 상대팀이 리스폰되기 30초 전에 시작하는 것이 안전합니다. 미드 우선권도 고려해야 해요.",
                    timestamp: "5시간 전",
                    likes: 8
                },
                {
                    id: 4,
                    type: "댓글",
                    title: "탑 라인전 갱킹 타이밍 판정",
                    content: "3분 30초 갱킹이 맞습니다. 상대 탑이 웨이브를 밀고 있고 플래시도 없는 상황이니까요.",
                    timestamp: "8시간 전",
                    likes: 5
                },
                {
                    id: 5,
                    type: "답변",
                    title: "정글 루트 최적화",
                    content: "레드 사이드에서는 블루-그롬프-늑대 순서로 도는 것이 갱킹 타이밍을 빠르게 만들어줍니다.",
                    timestamp: "1일 전",
                    likes: 15
                },
                {
                    id: 6,
                    type: "투표",
                    title: "미드 로밍 vs 라인 유지 판단",
                    content: "라인을 밀고 로밍가는게 맞습니다. 상대 미드가 기지에 갔고 봇이 갱킹 각이 나온 상황이라면 더욱 그렇죠.",
                    timestamp: "2일 전",
                    likes: 18,
                    voteChoice: "로밍"
                }
            ],
            reviews: [
                {
                    id: 1,
                    author: "브론즈탈출",
                    rating: 5,
                    content: "정말 친절하게 알려주셨어요! 갱킹 루트 설명이 특히 도움이 되었습니다.",
                    timestamp: "3일 전"
                },
                {
                    id: 2,
                    author: "실버정글",
                    rating: 5,
                    content: "오브젝트 타이밍에 대해 자세히 설명해주셔서 바로 게임에 적용할 수 있었어요.",
                    timestamp: "1주 전"
                },
                {
                    id: 3,
                    author: "골드유저",
                    rating: 4,
                    content: "답변이 빨라서 좋았어요. 다음에도 질문드릴게요!",
                    timestamp: "2주 전"
                }
            ]
        };

        setMentor(mockMentor);
    }, [params.id]);

    const handleContact = () => {
        setShowContactModal(true);
    };

    if (!mentor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p>로딩 중...</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, var(--color-surface), rgba(30, 136, 229, 0.02))' }}>
            <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
                <button
                    onClick={() => router.back()}
                    className="btn btn-ghost"
                    style={{ marginBottom: 'var(--spacing-xl)' }}
                >
                    <span>←</span>
                    <span>돌아가기</span>
                </button>

                <div className="card" style={{ 
                    borderRadius: 'var(--radius-lg)', 
                    padding: 'var(--spacing-2xl)', 
                    marginBottom: 'var(--spacing-xl)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-background)'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: 'var(--shadow-lg)',
                                    marginBottom: 'var(--spacing-lg)'
                                }}>
                                    <span style={{ color: 'white', fontWeight: 700, fontSize: '48px' }}>
                                        {mentor.name[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={handleContact}
                                    className="btn btn-primary"
                                    style={{ 
                                        borderRadius: 'var(--radius-full)', 
                                        minWidth: '160px',
                                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                                        boxShadow: 'var(--shadow-md)'
                                    }}
                                >
                                    <span style={{ marginRight: 'var(--spacing-xs)' }}>💬</span>
                                    멘토 상담하기
                                </button>
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                    <h1 style={{ 
                                        fontSize: 'var(--font-size-3xl)', 
                                        fontWeight: 700, 
                                        marginBottom: 'var(--spacing-sm)',
                                        background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>{mentor.name}</h1>
                                    <p style={{ 
                                        color: 'var(--color-primary)', 
                                        fontWeight: 600, 
                                        fontSize: 'var(--font-size-xl)',
                                        marginBottom: 'var(--spacing-xs)'
                                    }}>{mentor.tier}</p>
                                    <p style={{ 
                                        color: 'var(--color-text-secondary)', 
                                        fontSize: 'var(--font-size-lg)' 
                                    }}>{mentor.position} 전문</p>
                                </div>

                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                                    gap: 'var(--spacing-lg)', 
                                    marginBottom: 'var(--spacing-xl)' 
                                }}>
                                    <div className="card" style={{ 
                                        padding: 'var(--spacing-lg)', 
                                        textAlign: 'center',
                                        background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, rgba(250, 204, 21, 0.05) 100%)',
                                        border: '1px solid rgba(250, 204, 21, 0.2)'
                                    }}>
                                        <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: '#f59e0b' }}>⭐ {mentor.rating}</div>
                                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>평점</div>
                                    </div>
                                    <div className="card" style={{ 
                                        padding: 'var(--spacing-lg)', 
                                        textAlign: 'center',
                                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                                        border: '1px solid rgba(59, 130, 246, 0.2)'
                                    }}>
                                        <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-primary)' }}>{mentor.responseTime}</div>
                                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>평균 응답</div>
                                    </div>
                                    <div className="card" style={{ 
                                        padding: 'var(--spacing-lg)', 
                                        textAlign: 'center',
                                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                                        border: '1px solid rgba(34, 197, 94, 0.2)'
                                    }}>
                                        <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: '#22c55e' }}>{mentor.responseRate}%</div>
                                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>답변률</div>
                                    </div>
                                    <div className="card" style={{ 
                                        padding: 'var(--spacing-lg)', 
                                        textAlign: 'center',
                                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
                                        border: '1px solid rgba(168, 85, 247, 0.2)'
                                    }}>
                                        <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: '#a855f7' }}>{mentor.totalAnswers}</div>
                                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>총 답변</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', marginBottom: 'var(--spacing-lg)' }}>
                                    {mentor.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="badge badge-success"
                                            style={{ fontSize: 'var(--font-size-sm)' }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                    <div>
                                        <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>전문 챔피언: </span>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)', marginTop: 'var(--spacing-xs)' }}>
                                            {mentor.champions.map(champion => (
                                                <span
                                                    key={champion}
                                                    className="tag tag-primary"
                                                >
                                                    {champion}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>전문 분야: </span>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)', marginTop: 'var(--spacing-xs)' }}>
                                            {mentor.specialties.map(specialty => (
                                                <span
                                                    key={specialty}
                                                    className="tag tag-secondary"
                                                >
                                                    {specialty}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ 
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-background)'
                }}>
                    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <nav style={{ display: 'flex' }}>
                            <button
                                onClick={() => setActiveTab('intro')}
                                className={`btn ${activeTab === 'intro' ? 'btn-primary' : 'btn-ghost'}`}
                                style={{ 
                                    borderRadius: '0', 
                                    borderBottom: activeTab === 'intro' ? '3px solid var(--color-primary)' : 'none',
                                    flex: 1,
                                    padding: 'var(--spacing-lg)'
                                }}
                            >
                                <span style={{ marginRight: 'var(--spacing-xs)' }}>👋</span>
                                소개
                            </button>
                            <button
                                onClick={() => setActiveTab('activities')}
                                className={`btn ${activeTab === 'activities' ? 'btn-primary' : 'btn-ghost'}`}
                                style={{ 
                                    borderRadius: '0', 
                                    borderBottom: activeTab === 'activities' ? '3px solid var(--color-primary)' : 'none',
                                    flex: 1,
                                    padding: 'var(--spacing-lg)'
                                }}
                            >
                                <span style={{ marginRight: 'var(--spacing-xs)' }}>📝</span>
                                최근 활동
                            </button>
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`btn ${activeTab === 'reviews' ? 'btn-primary' : 'btn-ghost'}`}
                                style={{ 
                                    borderRadius: '0', 
                                    borderBottom: activeTab === 'reviews' ? '3px solid var(--color-primary)' : 'none',
                                    flex: 1,
                                    padding: 'var(--spacing-lg)'
                                }}
                            >
                                <span style={{ marginRight: 'var(--spacing-xs)' }}>⭐</span>
                                리뷰
                            </button>
                        </nav>
                    </div>

                    <div style={{ padding: 'var(--spacing-2xl)' }}>
                        {activeTab === 'intro' && (
                            <div>
                                <h3 style={{ 
                                    fontSize: 'var(--font-size-xl)', 
                                    fontWeight: 600, 
                                    marginBottom: 'var(--spacing-lg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)'
                                }}>
                                    <span style={{ fontSize: '24px' }}>✨</span>
                                    멘토 소개
                                </h3>
                                <p style={{ 
                                    color: 'var(--color-text-secondary)', 
                                    lineHeight: '1.8',
                                    fontSize: 'var(--font-size-lg)'
                                }}>{mentor.introduction}</p>
                            </div>
                        )}

                        {activeTab === 'activities' && (
                            <div>
                                <h3 style={{ 
                                    fontSize: 'var(--font-size-xl)', 
                                    fontWeight: 600, 
                                    marginBottom: 'var(--spacing-lg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)'
                                }}>
                                    <span style={{ fontSize: '24px' }}>📊</span>
                                    최근 활동 ({mentor.recentActivities.length})
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                    {mentor.recentActivities.map(activity => (
                                        <div key={activity.id} className="card" style={{ 
                                            padding: 'var(--spacing-lg)',
                                            border: '1px solid var(--color-border)',
                                            transition: 'all var(--transition-fast)'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                                                <h4 style={{ 
                                                    fontWeight: 600, 
                                                    color: 'var(--color-text-primary)',
                                                    fontSize: 'var(--font-size-lg)'
                                                }}>{activity.title}</h4>
                                                <span className="badge badge-secondary">{activity.timestamp}</span>
                                            </div>
                                            <p style={{ 
                                                color: 'var(--color-text-secondary)', 
                                                marginBottom: 'var(--spacing-md)',
                                                lineHeight: '1.6'
                                            }}>{activity.content}</p>
                                            {activity.voteChoice && (
                                                <p style={{ 
                                                    color: 'var(--color-primary)', 
                                                    fontWeight: 500,
                                                    marginBottom: 'var(--spacing-md)',
                                                    fontSize: 'var(--font-size-sm)'
                                                }}>
                                                    ✅ 선택: {activity.voteChoice}
                                                </p>
                                            )}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                                <span className="badge badge-info">
                                                    <span style={{ marginRight: 'var(--spacing-xs)' }}>👍</span>
                                                    {activity.likes} 도움됨
                                                </span>
                                                <span className={`badge ${
                                                    activity.type === '투표' ? 'badge-primary' : 
                                                    activity.type === '댓글' ? 'badge-warning' : 
                                                    'badge-success'
                                                }`}>
                                                    {activity.type === '투표' && '🗳️ '}
                                                    {activity.type === '댓글' && '💬 '}
                                                    {activity.type === '답변' && '✍️ '}
                                                    {activity.type}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <h3 style={{ 
                                    fontSize: 'var(--font-size-xl)', 
                                    fontWeight: 600, 
                                    marginBottom: 'var(--spacing-lg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)'
                                }}>
                                    <span style={{ fontSize: '24px' }}>💬</span>
                                    리뷰 ({mentor.reviews.length})
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                    {mentor.reviews.map(review => (
                                        <div key={review.id} className="card" style={{ 
                                            padding: 'var(--spacing-lg)',
                                            border: '1px solid var(--color-border)'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                                    <div style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <span style={{ color: 'white', fontWeight: 600 }}>
                                                            {review.author.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{review.author}</span>
                                                        <div style={{ color: '#f59e0b' }}>
                                                            {'⭐'.repeat(review.rating)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="badge badge-secondary">{review.timestamp}</span>
                                            </div>
                                            <p style={{ 
                                                color: 'var(--color-text-secondary)',
                                                lineHeight: '1.6'
                                            }}>{review.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showContactModal && (
                <div style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 50 
                }}>
                    <div className="card" style={{ 
                        maxWidth: '500px', 
                        width: '90%', 
                        padding: 'var(--spacing-2xl)',
                        boxShadow: 'var(--shadow-2xl)'
                    }}>
                        <h3 style={{ 
                            fontSize: 'var(--font-size-xl)', 
                            fontWeight: 600, 
                            marginBottom: 'var(--spacing-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)'
                        }}>
                            <span style={{ fontSize: '24px' }}>💬</span>
                            멘토에게 상담하기
                        </h3>
                        <p style={{ 
                            color: 'var(--color-text-secondary)', 
                            marginBottom: 'var(--spacing-lg)' 
                        }}>
                            {mentor.name} 멘토에게 질문을 남겨보세요. 평균 {mentor.responseTime} 내에 답변을 받으실 수 있습니다.
                        </p>
                        <textarea
                            className="form-textarea"
                            rows="5"
                            placeholder="질문 내용을 입력해주세요..."
                            style={{ marginBottom: 'var(--spacing-lg)' }}
                        />
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <button
                                onClick={() => setShowContactModal(false)}
                                className="btn btn-ghost"
                                style={{ flex: 1 }}
                            >
                                취소
                            </button>
                            <button
                                onClick={() => {
                                    setShowContactModal(false);
                                    alert('질문이 전송되었습니다! 멘토님이 곧 답변해주실 예정입니다.');
                                }}
                                className="btn btn-primary"
                                style={{ flex: 1 }}
                            >
                                전송하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}