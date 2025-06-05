"use client";

import { useRouter } from "next/navigation";
import CommunityHeader from "@/app/components/CommunityHeader";
import PostForm from "@/app/components/PostForm";

export default function ValorantCommunityWritePage() {
    const router = useRouter();

    const handleSubmit = (formData) => {
        try {
            console.log("발로란트 게시글 작성:", formData);

            // 새 게시글 객체 생성
            const newPost = {
                id: Date.now(), // 간단한 ID 생성
                title: formData.title,
                gameType: "valorant",
                author: {
                    nickname: "현재사용자", // 실제로는 로그인한 사용자 정보
                    tier: "Diamond",
                },
                content: formData.content,
                tags: [
                    ...(formData.selectedTags?.maps || []),
                    ...(formData.selectedTags?.agents || []),
                    ...(formData.selectedTags?.situations || []),
                ],
                selectedTags: formData.selectedTags,
                voteOptions: formData.voteOptions,
                allowNeutral: formData.allowNeutral,
                voteDeadline: formData.voteDeadline,
                videoFile: formData.videoFile?.name || null,
                videoAnalysis: formData.videoAnalysis,
                votes: 0,
                views: 0,
                commentCount: 0,
                createdAt: new Date().toISOString(),
            };

            // 기존 게시글 불러오기
            let existingPosts = [];
            try {
                const saved = localStorage.getItem("judgegg_posts");
                if (saved) {
                    existingPosts = JSON.parse(saved);
                }
            } catch (error) {
                console.error("기존 게시글 로드 실패:", error);
            }

            // 새 게시글 추가
            const updatedPosts = [newPost, ...existingPosts];

            // localStorage에 저장
            localStorage.setItem("judgegg_posts", JSON.stringify(updatedPosts));

            console.log("게시글 저장 완료:", newPost);

            // 성공 알림
            alert("재판이 성공적으로 등록되었습니다!");

            // 커뮤니티 페이지로 이동
            router.push("/valorant/community");
        } catch (error) {
            console.error("게시글 저장 실패:", error);
            alert("게시글 저장에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Community Header */}
            <CommunityHeader
                gameType="valorant"
                title="발로란트 법원"
                description="전술적 FPS에서 발생한 분쟁을 공정하게 심판합니다"
            />

            <div className="mt-8">
                <PostForm
                    gameType="valorant"
                    mode="create"
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}
