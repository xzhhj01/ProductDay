export default function Feedback() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">플레이 피드백</h1>
                
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">게임 분석 요청하기</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">소환사 이름</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="소환사 이름을 입력하세요" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">게임 ID</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="분석받고 싶은 게임 ID를 입력하세요" />
                        </div>
                        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            분석 요청하기
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">최근 피드백</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium">아칼리 vs 야스오 매치업</h3>
                                    <p className="text-sm text-gray-600 mt-1">레벨 6 이후 교전 타이밍을 더 신중하게 잡아야 할 것 같습니다...</p>
                                </div>
                                <span className="text-sm text-gray-500">2시간 전</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 