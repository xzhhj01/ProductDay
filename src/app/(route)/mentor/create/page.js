'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateMentorPost() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        game: '',
        rank: '',
        specialties: [],
        availability: [],
        price: '',
        contact: '',
        experience: ''
    });

    const games = ['리그 오브 레전드', '발로란트'];
    const ranks = {
        '리그 오브 레전드': ['아이언', '브론즈', '실버', '골드', '플래티넘', '에메랄드', '다이아몬드', '마스터', '그랜드마스터', '챌린저'],
        '발로란트': ['아이언', '브론즈', '실버', '골드', '플래티넘', '다이아몬드', '어센던트', '이모탈', '레디언트']
    };
    const specialtyOptions = {
        '리그 오브 레전드': ['라인전', '정글링', '로밍', '팀파이트', '오브젝트 관리', '빌드/룬', '챔피언 숙련도'],
        '발로란트': ['에임', '포지셔닝', '유틸 활용', '맵 리딩', '팀플레이', '전략/전술', '에이전트 숙련도']
    };
    const availabilityOptions = ['평일 오전', '평일 오후', '평일 저녁', '주말 오전', '주말 오후', '주말 저녁'];

    const handleSpecialtyToggle = (specialty) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties.includes(specialty)
                ? prev.specialties.filter(s => s !== specialty)
                : [...prev.specialties, specialty]
        }));
    };

    const handleAvailabilityToggle = (time) => {
        setFormData(prev => ({
            ...prev,
            availability: prev.availability.includes(time)
                ? prev.availability.filter(t => t !== time)
                : [...prev.availability, time]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // TODO: API 호출로 멘토 게시글 생성
            console.log('멘토 게시글 데이터:', formData);
            
            // 성공 시 멘토 페이지로 이동
            router.push('/mentor');
        } catch (error) {
            console.error('Error creating mentor post:', error);
            alert('게시글 작성에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* 헤더 */}
                <div className="mb-8">
                    <Link href="/mentor" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        멘토 목록으로
                    </Link>
                    
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mb-6 shadow-lg shadow-purple-500/30">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>
                        <h1 className="text-5xl font-bold text-white mb-4">
                            멘토 등록하기
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            당신의 게임 실력과 경험을 공유하고, 다른 플레이어들의 성장을 도와주세요.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 기본 정보 */}
                    <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white">기본 정보</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    제목 <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-purple-400 focus:bg-gray-900/70 focus:outline-none transition-all text-lg"
                                    placeholder="예: 챌린저 미드라이너가 알려주는 라인전 마스터하기"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    자기소개 <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-purple-400 focus:bg-gray-900/70 focus:outline-none transition-all resize-none text-lg"
                                    rows="4"
                                    placeholder="자신의 게임 경력, 강점, 코칭 스타일 등을 자유롭게 소개해주세요"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        게임 선택 <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={formData.game}
                                        onChange={(e) => setFormData(prev => ({ 
                                            ...prev, 
                                            game: e.target.value,
                                            rank: '',
                                            specialties: []
                                        }))}
                                        className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white focus:border-purple-400 focus:bg-gray-900/70 focus:outline-none transition-all text-lg appearance-none"
                                        required
                                    >
                                        <option value="">게임을 선택하세요</option>
                                        {games.map(game => (
                                            <option key={game} value={game}>{game}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        현재 랭크 <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={formData.rank}
                                        onChange={(e) => setFormData(prev => ({ ...prev, rank: e.target.value }))}
                                        className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white focus:border-purple-400 focus:bg-gray-900/70 focus:outline-none transition-all text-lg appearance-none"
                                        required
                                        disabled={!formData.game}
                                    >
                                        <option value="">랭크를 선택하세요</option>
                                        {formData.game && ranks[formData.game]?.map(rank => (
                                            <option key={rank} value={rank}>{rank}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 전문 분야 */}
                    {formData.game && (
                        <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white">전문 분야</h2>
                            </div>

                            <p className="text-gray-400 mb-6">가르칠 수 있는 분야를 모두 선택해주세요</p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {specialtyOptions[formData.game]?.map(specialty => (
                                    <button
                                        key={specialty}
                                        type="button"
                                        onClick={() => handleSpecialtyToggle(specialty)}
                                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
                                            formData.specialties.includes(specialty)
                                                ? 'bg-purple-500 text-white border-2 border-purple-400'
                                                : 'bg-gray-800/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                                        }`}
                                    >
                                        {specialty}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 코칭 정보 */}
                    <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white">코칭 정보</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    코칭 가능 시간 <span className="text-red-400">*</span>
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {availabilityOptions.map(time => (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => handleAvailabilityToggle(time)}
                                            className={`px-4 py-3 rounded-xl font-medium transition-all ${
                                                formData.availability.includes(time)
                                                    ? 'bg-green-500 text-white border-2 border-green-400'
                                                    : 'bg-gray-800/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    시간당 가격 <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                        className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-green-400 focus:bg-gray-900/70 focus:outline-none transition-all text-lg pr-16"
                                        placeholder="20000"
                                        required
                                    />
                                    <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400">원</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">첫 상담은 무료로 진행하는 것을 권장합니다</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    연락 방법 <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.contact}
                                    onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                                    className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-green-400 focus:bg-gray-900/70 focus:outline-none transition-all text-lg"
                                    placeholder="Discord: username#1234 또는 오픈카톡 링크"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    코칭 경험
                                </label>
                                <textarea
                                    value={formData.experience}
                                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                                    className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-green-400 focus:bg-gray-900/70 focus:outline-none transition-all resize-none text-lg"
                                    rows="3"
                                    placeholder="이전 코칭 경험이나 성과가 있다면 작성해주세요 (선택사항)"
                                />
                            </div>
                        </div>
                    </div>

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
                            disabled={loading || !formData.title || !formData.description || !formData.game || !formData.rank || formData.specialties.length === 0 || formData.availability.length === 0 || !formData.price || !formData.contact}
                            className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white disabled:text-gray-400 rounded-2xl font-bold transition-all shadow-2xl shadow-purple-500/25 disabled:shadow-none hover:shadow-purple-500/40 hover:scale-[1.02] disabled:scale-100 text-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    등록 중...
                                </span>
                            ) : (
                                '멘토로 등록하기'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}