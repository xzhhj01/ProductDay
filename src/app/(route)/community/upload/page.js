'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        game: '',
        situation: '',
        champions: [],
        agents: [],
        tags: [],
        file: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoPreview, setVideoPreview] = useState(null);
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
        '요네', '요릭', '우디르', '우르곳', '워입', '유미', '이렐리아', '이블린', '이즈리얼', '일라오이',
        '자르반 4세', '자야', '자이라', '자크', '잔나', '잭스', '제드', '제라스', '제리', '제이스',
        '조이', '직스', '진', '질리언', '징크스', '초가스', '카르마', '카밀', '카사딘', '카서스',
        '카시오페아', '카이사', '카직스', '카타리나', '칼리스타', '케넨', '케이틀린', '케인', '케일', '코그모',
        '코르키', '퀸', '크산테', '클레드', '키아나', '킨드레드', '타릭', '탈론', '탈리야', '탐 켄치',
        '트런들', '트리스타나', '트린다미어', '트위스티드 페이트', '트위치', '티모', '파이크', '판테온', '피들스틱', '피오라',
        '피즈', '하이머딩거', '헤카림', '흐웨이'
    ].sort();
    
    const allAgents = [
        '게코', '네온', '데드락', '레이나', '레이즈', '멘', '바이퍼', '브리치', '브림스톤',
        '세이지', '소바', '스카이', '아스트라', '아이소', '오멘', '요루', '제트', '체임버',
        '케이오', '킬조이', '페이드', '페닉스', '하버'
    ].sort();

    const suggestedTags = [
        { name: '바론', emoji: '👑', category: 'objective' },
        { name: '드래곤', emoji: '🐉', category: 'objective' },
        { name: '갱킹', emoji: '⚔️', category: 'action' },
        { name: '라인전', emoji: '🛡️', category: 'action' },
        { name: '팀파이트', emoji: '⚡', category: 'action' },
        { name: '탑', emoji: '🗻', category: 'position' },
        { name: '정글', emoji: '🌲', category: 'position' },
        { name: '미드', emoji: '⚡', category: 'position' },
        { name: '원딜', emoji: '🏹', category: 'position' },
        { name: '서포터', emoji: '💙', category: 'position' },
        { name: '로밍', emoji: '🔄', category: 'action' },
        { name: '백도어', emoji: '🚪', category: 'action' },
        { name: '오브젝트', emoji: '🎯', category: 'objective' },
        { name: '포지셔닝', emoji: '📍', category: 'action' }
    ];

    const groupedTags = suggestedTags.reduce((acc, tag) => {
        if (!acc[tag.category]) acc[tag.category] = [];
        acc[tag.category].push(tag);
        return acc;
    }, {});

    const categoryNames = {
        objective: '오브젝트',
        action: '플레이',
        position: '포지션'
    };

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            if (file.size > 100 * 1024 * 1024) {
                setError('파일 크기는 100MB 이하여야 합니다.');
                return;
            }
            
            const video = document.createElement('video');
            video.preload = 'metadata';
            
            video.onloadedmetadata = function() {
                if (video.duration > 60) {
                    setError('영상 길이는 1분 이하여야 합니다.');
                    return;
                }
                
                setFormData(prev => ({ ...prev, file }));
                setError('');
                
                // 비디오 프리뷰 설정
                const previewUrl = URL.createObjectURL(file);
                setVideoPreview(previewUrl);
                
                // 업로드 진행률 시뮬레이션
                setUploadProgress(0);
                const interval = setInterval(() => {
                    setUploadProgress(prev => {
                        if (prev >= 100) {
                            clearInterval(interval);
                            return 100;
                        }
                        return prev + Math.random() * 30;
                    });
                }, 200);
            };
            
            video.src = URL.createObjectURL(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.mov', '.avi', '.webm']
        },
        maxFiles: 1,
        maxSize: 100 * 1024 * 1024 // 100MB
    });

    const handleTagToggle = (tagName) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tagName)
                ? prev.tags.filter(t => t !== tagName)
                : [...prev.tags, tagName].slice(0, 5)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.file) {
            setError('영상 파일을 업로드해주세요.');
            return;
        }
        
        if (!formData.title.trim()) {
            setError('제목을 입력해주세요.');
            return;
        }

        if (formData.tags.length === 0) {
            setError('최소 1개의 태그를 선택해주세요.');
            return;
        }

        setLoading(true);
        
        try {
            const uploadFormData = new FormData();
            uploadFormData.append('file', formData.file);
            uploadFormData.append('title', formData.title);
            uploadFormData.append('description', formData.description);
            uploadFormData.append('game', formData.game);
            uploadFormData.append('situation', formData.situation);
            uploadFormData.append('champions', JSON.stringify(formData.champions));
            uploadFormData.append('agents', JSON.stringify(formData.agents));
            uploadFormData.append('tags', JSON.stringify(formData.tags));

            const response = await fetch('/api/posts/upload', {
                method: 'POST',
                body: uploadFormData
            });

            if (response.ok) {
                router.push('/community');
            } else {
                setError('업로드에 실패했습니다.');
            }
        } catch (err) {
            setError('업로드 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* 헤더 */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg shadow-orange-500/30">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M8 2h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V3a1 1 0 011-1z" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4">
                        영상 업로드
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        플레이 영상을 공유하고 커뮤니티의 전문적인 판정을 받아보세요.
                        <br className="hidden sm:block" />
                        <span className="text-yellow-400 font-medium">최대 100MB, 1분 이내</span>의 영상을 업로드할 수 있습니다.
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 파일 업로드 영역 */}
                    <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl shadow-black/50">
                        <div
                            {...getRootProps()}
                            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 overflow-hidden group ${
                                isDragActive 
                                    ? 'border-yellow-400 bg-yellow-400/10' 
                                    : isDragReject
                                        ? 'border-red-400 bg-red-400/10'
                                        : formData.file 
                                            ? 'border-green-400 bg-green-400/5'
                                            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/30'
                            }`}
                        >
                            <input {...getInputProps()} />
                            
                            {/* 배경 애니메이션 */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className={`absolute -inset-10 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-3xl transition-opacity duration-500 ${
                                    isDragActive ? 'opacity-100' : 'opacity-0'
                                }`}></div>
                            </div>
                            
                            {formData.file ? (
                                <div className="relative space-y-6">
                                    {/* 비디오 프리뷰 */}
                                    {videoPreview && (
                                        <div className="max-w-md mx-auto mb-6">
                                            <video 
                                                src={videoPreview} 
                                                className="w-full rounded-lg shadow-2xl"
                                                controls
                                            />
                                        </div>
                                    )}
                                    
                                    <div className="text-center">
                                        <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-full mb-3">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            업로드 완료
                                        </div>
                                        <p className="text-white font-medium text-lg">{formData.file.name}</p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            {(formData.file.size / (1024 * 1024)).toFixed(1)}MB
                                        </p>
                                    </div>
                                    
                                    {uploadProgress > 0 && uploadProgress < 100 && (
                                        <div className="max-w-md mx-auto">
                                            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-300"
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-sm text-gray-400 mt-2 text-center">처리 중... {Math.round(uploadProgress)}%</p>
                                        </div>
                                    )}
                                    
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFormData(prev => ({ ...prev, file: null }));
                                            setVideoPreview(null);
                                            setUploadProgress(0);
                                        }}
                                        className="text-gray-400 hover:text-gray-300 text-sm underline"
                                    >
                                        다른 영상 선택
                                    </button>
                                </div>
                            ) : (
                                <div className="relative space-y-6 py-8">
                                    <div className="flex justify-center">
                                        <div className={`w-36 h-36 rounded-full bg-gradient-to-br from-yellow-400/10 to-orange-500/10 backdrop-blur-sm border border-yellow-400/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-yellow-400/50 ${
                                            isDragActive ? 'scale-125 border-yellow-400' : 'scale-100'
                                        }`}>
                                            <svg className="w-20 h-20 text-yellow-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-3">
                                            {isDragActive ? '✨ 여기에 놓으세요!' : '영상을 드래그하거나 클릭하세요'}
                                        </h3>
                                        <p className="text-gray-400 mb-6 text-lg">
                                            지원 형식: MP4, WebM, MOV
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                                            <button type="button" className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full hover:shadow-lg hover:shadow-orange-500/30 transform hover:scale-105 transition-all duration-300 text-lg">
                                                파일 선택
                                            </button>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>최대 100MB, 1분 이내</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 기본 정보 */}
                    <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 space-y-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white">기본 정보</h3>
                        </div>
                        
                        {/* 제목 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                제목 <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-yellow-400 focus:bg-gray-900/70 focus:outline-none transition-all text-lg"
                                placeholder="상황을 간단히 설명해주세요"
                                maxLength={100}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>명확하고 구체적인 제목이 더 많은 관심을 받습니다</span>
                                <span className={formData.title.length > 80 ? 'text-yellow-400' : ''}>{formData.title.length}/100</span>
                            </div>
                        </div>

                        {/* 설명 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                상황 설명
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-yellow-400 focus:bg-gray-900/70 focus:outline-none transition-all resize-none text-lg"
                                rows="4"
                                placeholder="구체적인 상황을 설명해주세요 (선택사항)"
                                maxLength={500}
                            />
                            <div className="text-xs text-gray-500 mt-2 text-right">
                                <span className={formData.description.length > 400 ? 'text-yellow-400' : ''}>{formData.description.length}/500</span>
                            </div>
                        </div>
                    </div>

                    {/* 게임 정보 */}
                    <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white">게임 정보</h3>
                        </div>
                        
                        {/* 게임 선택 */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                게임 선택 <span className="text-red-400">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, game: '리그 오브 레전드', champions: [], agents: [] }))}
                                    className={`px-6 py-4 rounded-lg font-medium transition-all ${
                                        formData.game === '리그 오브 레전드'
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600'
                                    }`}
                                >
                                    <div className="text-2xl mb-1">⚔️</div>
                                    리그 오브 레전드
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, game: '발로란트', champions: [], agents: [] }))}
                                    className={`px-6 py-4 rounded-lg font-medium transition-all ${
                                        formData.game === '발로란트'
                                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30'
                                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600'
                                    }`}
                                >
                                    <div className="text-2xl mb-1">🎯</div>
                                    발로란트
                                </button>
                            </div>
                        </div>
                        
                        {/* 상황 선택 */}
                        {formData.game && (
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    상황 선택 <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={formData.situation}
                                    onChange={(e) => setFormData(prev => ({ ...prev, situation: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
                                >
                                    <option value="">상황을 선택하세요</option>
                                    <option value="라인전">라인전</option>
                                    <option value="팀파이트">팀파이트</option>
                                    <option value="오브젝트">오브젝트</option>
                                    <option value="로밍">로밍</option>
                                    <option value="갱킹">갱킹</option>
                                    <option value="백도어">백도어</option>
                                    {formData.game === '발로란트' && (
                                        <>
                                            <option value="사이트 진입">사이트 진입</option>
                                            <option value="사이트 방어">사이트 방어</option>
                                            <option value="리테이크">리테이크</option>
                                            <option value="얼티메이트">얼티메이트</option>
                                        </>
                                    )}
                                    {formData.game === '리그 오브 레전드' && (
                                        <>
                                            <option value="아이템빌드">아이템빌드</option>
                                            <option value="스킬빌드">스킬빌드</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        )}
                        
                        {/* Champion/Agent Selection */}
                        {formData.game === '리그 오브 레전드' && (
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    챔피언 선택
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {(showAllChampions ? allChampions : allChampions.slice(0, 20)).map(champion => (
                                        <button
                                            key={champion}
                                            type="button"
                                            onClick={() => {
                                                if (formData.champions.includes(champion)) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        champions: prev.champions.filter(c => c !== champion)
                                                    }));
                                                } else if (formData.champions.length < 5) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        champions: [...prev.champions, champion]
                                                    }));
                                                }
                                            }}
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                                                formData.champions.includes(champion)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600'
                                            } ${
                                                !formData.champions.includes(champion) && formData.champions.length >= 5
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                            }`}
                                            disabled={!formData.champions.includes(champion) && formData.champions.length >= 5}
                                        >
                                            {champion}
                                        </button>
                                    ))}
                                    {allChampions.length > 20 && (
                                        <button
                                            type="button"
                                            onClick={() => setShowAllChampions(!showAllChampions)}
                                            className="px-3 py-1.5 rounded-md text-sm font-medium bg-transparent text-yellow-400 border border-dashed border-yellow-400 hover:bg-yellow-400/10"
                                        >
                                            {showAllChampions ? '접기' : `더보기 (+${allChampions.length - 20})`}
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">최대 5개까지 선택 가능 ({formData.champions.length}/5)</p>
                            </div>
                        )}
                        
                        {formData.game === '발로란트' && (
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    요원 선택
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {(showAllAgents ? allAgents : allAgents.slice(0, 12)).map(agent => (
                                        <button
                                            key={agent}
                                            type="button"
                                            onClick={() => {
                                                if (formData.agents.includes(agent)) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        agents: prev.agents.filter(a => a !== agent)
                                                    }));
                                                } else if (formData.agents.length < 5) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        agents: [...prev.agents, agent]
                                                    }));
                                                }
                                            }}
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                                                formData.agents.includes(agent)
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600'
                                            } ${
                                                !formData.agents.includes(agent) && formData.agents.length >= 5
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                            }`}
                                            disabled={!formData.agents.includes(agent) && formData.agents.length >= 5}
                                        >
                                            {agent}
                                        </button>
                                    ))}
                                    {allAgents.length > 12 && (
                                        <button
                                            type="button"
                                            onClick={() => setShowAllAgents(!showAllAgents)}
                                            className="px-3 py-1.5 rounded-md text-sm font-medium bg-transparent text-yellow-400 border border-dashed border-yellow-400 hover:bg-yellow-400/10"
                                        >
                                            {showAllAgents ? '접기' : `더보기 (+${allAgents.length - 12})`}
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">최대 5개까지 선택 가능 ({formData.agents.length}/5)</p>
                            </div>
                        )}
                    </div>

                    {/* 태그 선택 */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">
                                태그 선택 <span className="text-red-400">*</span>
                            </h3>
                            <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                                {formData.tags.length}/5
                            </span>
                        </div>
                        
                        <div className="space-y-5">
                            {Object.entries(groupedTags).map(([category, tags]) => (
                                <div key={category}>
                                    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                                        {categoryNames[category]}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map(tag => (
                                            <button
                                                key={tag.name}
                                                type="button"
                                                onClick={() => handleTagToggle(tag.name)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                    formData.tags.includes(tag.name)
                                                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg'
                                                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600'
                                                }`}
                                                disabled={!formData.tags.includes(tag.name) && formData.tags.length >= 5}
                                            >
                                                <span className="mr-1">{tag.emoji}</span>
                                                {tag.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 오류 메시지 */}
                    {error && (
                        <div className="bg-red-500/10 backdrop-blur-xl border-2 border-red-500/30 rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-red-300 font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* 제출 버튼 */}
                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 px-8 py-4 bg-gray-700/50 backdrop-blur-sm border-2 border-gray-600 hover:bg-gray-700/70 hover:border-gray-500 text-white rounded-2xl font-semibold transition-all text-lg"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !formData.file || !formData.title.trim() || formData.tags.length === 0}
                            className="flex-1 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black disabled:text-gray-400 rounded-2xl font-bold transition-all shadow-2xl shadow-orange-500/25 disabled:shadow-none hover:shadow-orange-500/40 hover:scale-[1.02] disabled:scale-100 text-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    업로드 중...
                                </span>
                            ) : (
                                '영상 업로드 하기'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}