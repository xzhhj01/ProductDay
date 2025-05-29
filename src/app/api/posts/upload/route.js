import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const description = formData.get('description');
    const tags = JSON.parse(formData.get('tags') || '[]');

    if (!file) {
      return NextResponse.json(
        { error: '파일이 필요합니다.' },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { error: '제목이 필요합니다.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);

    await writeFile(filePath, buffer);

    const post = {
      id: Date.now(),
      title,
      description,
      tags,
      videoUrl: `/uploads/${fileName}`,
      author: "현재사용자",
      votes: { a: 0, b: 0 },
      comments: 0,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      message: '업로드가 완료되었습니다.',
      post
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: '업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}