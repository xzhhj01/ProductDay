export default function LoLPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-lol-50 to-lol-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <div className="flex justify-center mb-8">
                        <img
                            src="/logo-lol.svg"
                            alt="League of Legends"
                            className="h-20 w-20"
                        />
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        리그 오브 레전드
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        소환사의 협곡에서 발생하는 모든 분쟁을 공정하게
                        해결합니다. Judge.gg와 함께 더 깨끗한 게임 환경을
                        만들어보세요.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {/* 법원 카드 */}
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-lol-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    법원
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    게임 내 분쟁을 신고하고 해결받으세요
                                </p>
                                <a
                                    href="/lol/community"
                                    className="inline-block bg-lol-500 text-white px-4 py-2 rounded-lg hover:bg-lol-600 transition-colors"
                                >
                                    바로가기
                                </a>
                            </div>
                        </div>

                        {/* 챔피언 가이드 카드 */}
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-lol-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    챔피언 가이드
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    각 챔피언별 전략과 팁을 확인하세요
                                </p>
                                <button className="inline-block bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed">
                                    준비중
                                </button>
                            </div>
                        </div>

                        {/* 전략 분석 카드 */}
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-lol-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    전략 분석
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    메타 분석과 승률 통계를 확인하세요
                                </p>
                                <button className="inline-block bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed">
                                    준비중
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
