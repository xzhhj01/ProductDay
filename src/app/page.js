import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <main className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">OP.GG Community</h1>
                    <p className="text-gray-600">게임 정보 공유 및 실력 향상을 위한 커뮤니티</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/community" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-bold mb-2">커뮤니티</h2>
                        <p className="text-gray-600">다른 플레이어들과 정보를 공유하고 소통하세요</p>
                    </Link>

                    <Link href="/feedback" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-bold mb-2">플레이 피드백</h2>
                        <p className="text-gray-600">게임 플레이를 분석하고 피드백을 받아보세요</p>
                    </Link>

                    <Link href="/profile" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-bold mb-2">프로필</h2>
                        <p className="text-gray-600">나의 게임 전적과 통계를 확인하세요</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
