export default function Profile() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                        <div>
                            <h1 className="text-2xl font-bold">Hide on bush</h1>
                            <p className="text-gray-600">레벨 387</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                            <div className="text-xl font-bold">골드 II</div>
                            <div className="text-sm text-gray-600">현재 티어</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold">52%</div>
                            <div className="text-sm text-gray-600">승률</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold">3.2</div>
                            <div className="text-sm text-gray-600">평균 KDA</div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-4">최근 게임</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="font-medium">아칼리</span>
                                        <span className="text-gray-600 ml-2">12/3/7</span>
                                    </div>
                                    <span className="text-blue-600 font-medium">승리</span>
                                </div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="font-medium">야스오</span>
                                        <span className="text-gray-600 ml-2">4/7/2</span>
                                    </div>
                                    <span className="text-red-600 font-medium">패배</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 