export default function Community() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">커뮤니티</h1>
                <div className="space-y-4">
                    {/* 임시 게시물 데이터 */}
                    <div className="p-4 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-semibold">정글링 팁 공유</h3>
                        <p className="text-gray-600 mt-2">시즌14 정글링 루트와 팁을 공유합니다...</p>
                        <div className="mt-2 text-sm text-gray-500">작성자: 정글러 • 조회수: 128</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-semibold">미드 챔피언 추천</h3>
                        <p className="text-gray-600 mt-2">현재 메타에서 좋은 미드 챔피언 추천드립니다...</p>
                        <div className="mt-2 text-sm text-gray-500">작성자: 미드장인 • 조회수: 256</div>
                    </div>
                </div>
            </div>
        </div>
    );
} 