'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PostDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [userVote, setUserVote] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockPost = {
            id: parseInt(params.id),
            title: "바론 스틸 vs 팀파이트 선택 상황",
            content: "바론을 치고 있는데 상대팀이 5명이 다 오는 상황입니다. 바론을 끝까지 치고 스틸을 노릴지, 아니면 바론을 포기하고 팀파이트를 할지 판정 부탁드립니다.",
            author: "정글러123",
            votes: { a: 45, b: 23 },
            tags: ["바론", "팀파이트", "정글"],
            createdAt: "2024-01-15T10:30:00Z",
            videoUrl: "/api/placeholder/video.mp4"
        };

        const mockComments = [
            {
                id: 1,
                author: "다이아정글",
                content: "바론 체력이 3000 이하면 스미트로 스틸 가능성이 높으니까 끝까지 치는게 맞는 것 같아요",
                likes: 12,
                createdAt: "1시간 전"
            },
            {
                id: 2,
                author: "프로관전러",
                content: "상대팀 조합 보고 판단해야죠. 상대가 포킹 조합이면 바론 포기하고 싸우는게 나을수도",
                likes: 8,
                createdAt: "45분 전"
            },
            {
                id: 3,
                author: "탑솔러",
                content: "바론 스틸 확률은 50:50인데 팀파이트는 100% 질것같으면 바론 치는게 맞지",
                likes: 5,
                createdAt: "30분 전"
            }
        ];

        setPost(mockPost);
        setComments(mockComments);
        setLoading(false);
    }, [params.id]);

    const handleVote = async (choice) => {
        if (userVote === choice) return;
        
        setUserVote(choice);
        setPost(prev => ({
            ...prev,
            votes: {
                ...prev.votes,
                [choice]: prev.votes[choice] + 1,
                ...(userVote && { [userVote]: prev.votes[userVote] - 1 })
            }
        }));
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            id: Date.now(),
            author: "현재사용자",
            content: newComment,
            likes: 0,
            createdAt: "방금 전"
        };

        setComments(prev => [comment, ...prev]);
        setNewComment('');
    };

    const handleCommentLike = (commentId) => {
        setComments(prev => prev.map(comment => 
            comment.id === commentId 
                ? { ...comment, likes: comment.likes + 1 }
                : comment
        ));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p>로딩 중...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p>게시글을 찾을 수 없습니다.</p>
            </div>
        );
    }

    const totalVotes = post.votes.a + post.votes.b;
    const aPercentage = totalVotes > 0 ? Math.round((post.votes.a / totalVotes) * 100) : 0;

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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-lg)', gap: 'var(--spacing-lg)' }}>
                        <h1 style={{ 
                            fontSize: 'var(--font-size-3xl)', 
                            fontWeight: 700, 
                            color: 'var(--color-text-primary)', 
                            flex: 1,
                            background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>{post.title}</h1>
                        <span className="badge badge-secondary" style={{ whiteSpace: 'nowrap' }}>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 'var(--shadow-md)'
                            }}>
                                <span style={{ color: 'white', fontWeight: 700, fontSize: '20px' }}>
                                    {post.author.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 0 }}>{post.author}</p>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 0 }}>커뮤니티 멤버</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                            {post.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="tag tag-primary"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <div style={{ 
                            width: '100%', 
                            height: '400px', 
                            backgroundColor: '#0f172a', 
                            borderRadius: 'var(--radius-lg)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                            }}></div>
                            <div style={{ 
                                fontSize: '60px', 
                                background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                            }}>▶️</div>
                        </div>
                    </div>

                    <p style={{ 
                        fontSize: 'var(--font-size-lg)', 
                        color: 'var(--color-text-secondary)', 
                        marginBottom: 'var(--spacing-2xl)', 
                        lineHeight: '1.8' 
                    }}>{post.content}</p>

                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-xl)' }}>
                        <h3 style={{ 
                            fontSize: 'var(--font-size-xl)', 
                            fontWeight: 600, 
                            marginBottom: 'var(--spacing-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)'
                        }}>
                            <span style={{ fontSize: '24px' }}>⚖️</span>
                            어떤 선택이 맞다고 생각하시나요?
                        </h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                            <button
                                onClick={() => handleVote('a')}
                                className="card"
                                style={{ 
                                    cursor: 'pointer',
                                    padding: 'var(--spacing-xl)',
                                    border: userVote === 'a' ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                                    backgroundColor: userVote === 'a' ? 'rgba(37, 99, 235, 0.05)' : 'var(--color-background)',
                                    transition: 'all var(--transition-fast)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {userVote === 'a' && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 'var(--spacing-sm)',
                                        right: 'var(--spacing-sm)',
                                        backgroundColor: 'var(--color-primary)',
                                        color: 'white',
                                        padding: '2px 8px',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: 'var(--font-size-xs)',
                                        fontWeight: 600
                                    }}>선택됨</div>
                                )}
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-md)' }}>🎯</div>
                                    <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>바론 스틸 시도</div>
                                    <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-primary)' }}>{post.votes.a}표</div>
                                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-xs)' }}>({aPercentage}%)</div>
                                </div>
                            </button>

                            <button
                                onClick={() => handleVote('b')}
                                className="card"
                                style={{ 
                                    cursor: 'pointer',
                                    padding: 'var(--spacing-xl)',
                                    border: userVote === 'b' ? '2px solid var(--color-error)' : '2px solid var(--color-border)',
                                    backgroundColor: userVote === 'b' ? 'rgba(239, 68, 68, 0.05)' : 'var(--color-background)',
                                    transition: 'all var(--transition-fast)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {userVote === 'b' && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 'var(--spacing-sm)',
                                        right: 'var(--spacing-sm)',
                                        backgroundColor: 'var(--color-error)',
                                        color: 'white',
                                        padding: '2px 8px',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: 'var(--font-size-xs)',
                                        fontWeight: 600
                                    }}>선택됨</div>
                                )}
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-md)' }}>⚔️</div>
                                    <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>팀파이트 선택</div>
                                    <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-error)' }}>{post.votes.b}표</div>
                                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-xs)' }}>({100 - aPercentage}%)</div>
                                </div>
                            </button>
                        </div>

                        <div style={{ 
                            width: '100%', 
                            backgroundColor: 'var(--color-border)', 
                            borderRadius: 'var(--radius-full)', 
                            height: '12px',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <div
                                style={{ 
                                    background: `linear-gradient(to right, var(--color-primary) ${aPercentage}%, var(--color-error) ${aPercentage}%)`,
                                    height: '12px', 
                                    borderRadius: 'var(--radius-full)', 
                                    transition: 'all var(--transition-slow)',
                                    width: '100%'
                                }}
                            ></div>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: `${aPercentage}%`,
                                transform: 'translate(-50%, -50%)',
                                width: '2px',
                                height: '20px',
                                backgroundColor: 'white',
                                boxShadow: '0 0 4px rgba(0,0,0,0.2)'
                            }}></div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ 
                    borderRadius: 'var(--radius-lg)', 
                    padding: 'var(--spacing-2xl)', 
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-background)'
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
                        댓글 ({comments.length})
                    </h3>
                    
                    <form onSubmit={handleCommentSubmit} style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="form-textarea"
                            style={{ 
                                minHeight: '100px',
                                marginBottom: 'var(--spacing-sm)'
                            }}
                            rows="3"
                            placeholder="의견을 남겨주세요 (최대 200자)"
                            maxLength={200}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>{newComment.length}/200</span>
                            <button
                                type="submit"
                                disabled={!newComment.trim()}
                                className="btn btn-primary"
                                style={{ borderRadius: 'var(--radius-full)' }}
                            >
                                댓글 작성
                            </button>
                        </div>
                    </form>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                        {comments.map(comment => (
                            <div key={comment.id} style={{ 
                                borderBottom: '1px solid var(--color-border)', 
                                paddingBottom: 'var(--spacing-lg)' 
                            }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <span style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>
                                            {comment.author.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{comment.author}</span>
                                            <span className="badge badge-secondary">{comment.createdAt}</span>
                                        </div>
                                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)', lineHeight: '1.6' }}>{comment.content}</p>
                                        <button
                                            onClick={() => handleCommentLike(comment.id)}
                                            className="btn btn-ghost btn-sm"
                                            style={{ 
                                                padding: 'var(--spacing-xs) var(--spacing-md)',
                                                gap: 'var(--spacing-xs)'
                                            }}
                                        >
                                            <span>👍</span>
                                            <span>{comment.likes}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}