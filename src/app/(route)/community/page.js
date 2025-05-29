'use client';

import { useEffect, useState } from "react";
import { getPosts } from "@/app/services/community/community.service"; 

export default function CommunityPost() {
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                const result = await getPosts("title1"); // 고정된 title 사용, 필요 시 동적 처리 가능
                if (result.isSuccess && result.data) {
                    setPost(result.data);
                }
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
            }
        }

        fetchPost();
    }, []);

    return (
        <div className="min-h-screen p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">게시글 조회</h1>
            {post ? (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="mt-2 text-gray-700">{post.content}</p>
                    <div className="mt-2 text-sm text-gray-500">ID: {post.id}</div>
                </div>
            ) : (
                <p className="text-gray-500">게시글을 불러오는 중입니다...</p>
            )}
        </div>
    );
}
