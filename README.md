# 🚀 프론트엔드 개발 가이드

## 💡 개발 순서
1. git clone
2. 지라에 티켓 만들기 > 진행 중으로 티켓 옮기기 > (pd-숫자) 확인
3. "pd-숫자-기능"으로 브랜치 만들기 (ex) git checkout -b pd-7-login
4. git add, commit, push 후 pr 날리기
5. 메인 병합 후 로컬,원격 브랜치 삭제 + main pull + 지라에서 완료로 티켓 옮기기


## 🐛 커밋 메세지 예시
1. feat: 로그인 기능 추가 (PD-7)
2. fix: 로그인 버그 수정 (PD-15)
3. style: 로그인 페이지 코드 스타일 변경 (PD-31)
4. refactor: login.js 코드 리팩토링 (PD-42)


## 📁 프로젝트 구조 이해하기

```
📦 프로젝트 루트
├── 📁 public/                 # 정적 파일 (이미지, 아이콘 등)
├── 📁 src/
│   ├── 📁 app/               # Next.js 13+ App Router 페이지
│   │   ├── 📁 (route)/       # 라우트 그룹 (URL에 영향 없음)
│   │   │    ├── 📁 community/     # 커뮤니티 페이지(예시)
│   │   │    ├── 📁 feedback/      # 피드백 페이지
│   │   │    └── 📁 profile/       # 프로필 페이지
│   │   ├── 📁 assets/img/        # 이미지 에셋
│   │   ├── 📁 components/        # 재사용 가능한 컴포넌트 - 헤더,푸터,버튼
│   │   ├── 📁 services/          # API 호출 및 비즈니스 로직
│   │   │    ├── 📁 auth/          # 인증 관련 서비스
│   │   │    ├── 📁 community/     # 커뮤니티 관련 서비스
│   │   │    └── 📁 lolAPI/        # LoL API 관련 서비스
│   │   └── 📁 utils/http/        # HTTP 유틸리티 함수들 - 어려우면 크게 신경 안써도 됨. api요청할 때 사용.
├── 📄 .env                   # 환경 변수
```

### 📁 주요 디렉토리 설명

- **`public/`**: 브라우저에서 직접 접근 가능한 정적 파일
- **`src/app/`**: Next.js 13+의 App Router 시스템, 파일 기반 라우팅
- **`src/components/`**: Header, Footer 등 재사용 가능한 UI 컴포넌트
- **`src/services/`**: API 호출과 데이터 처리 로직을 분리
- **`src/utils/`**: 공통으로 사용되는 유틸리티 함수들

## 🛠️ 개발 환경 설정

### 1. 필수 도구 설치
```bash
# Node.js 18+ 버전 확인
node --version

# 프로젝트 의존성 설치
npm install
# 또는
yarn install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 필요한 환경 변수를 설정하세요:

```env
노션에서 붙여넣기
```

### 3. 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

## 🌐 API 요청 방법 가이드
![image](https://github.com/user-attachments/assets/5996d95b-bc7a-4cd1-af13-7af033c935ad)

### 기본 API 설정

#### 1. ui 페이지

**`page.js`** - 예시 페이지 함수:
```javascript
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


```

**`community.service.js`** - api 요청:use server:
```javascript
'use server';

import { instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
//예시 코드 1
export async function getPosts(title) {
  console.log(`${API_PATH}/post/info/${title}`);
  const response = await instance.get(`${API_PATH}/post/info/${title}`);
  
  return {
    isSuccess: true,
    isFailure: true,
    data: response.data
  };
}

//이 밑으로 작성
```

## 🎨 스타일링 가이드 (Tailwind CSS)
다 수정 가능능
### 전역 스타일 (`globals.css`)
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

### Tailwind CSS 클래스

#### 자주 사용하는 Tailwind 클래스들
```javascript
// 레이아웃
className="container mx-auto px-4"           // 중앙 정렬 컨테이너
className="flex items-center justify-between" // 플렉스 레이아웃
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" // 그리드

// 색상 (다크모드 대응)
className="bg-white dark:bg-gray-900"        // 배경색
className="text-gray-900 dark:text-gray-100" // 텍스트 색상
className="border-gray-200 dark:border-gray-800" // 테두리

// 타이포그래피
className="text-3xl font-bold"               // 큰 제목
className="text-lg font-medium"              // 중간 제목
className="text-sm text-gray-600 dark:text-gray-400" // 작은 텍스트

// 간격
className="p-6"     // 패딩
className="m-4"     // 마진
className="space-y-4" // 세로 간격
className="gap-6"   // 그리드/플렉스 간격

// 버튼 스타일
className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
```


## 💡 마지막 팁

1. **작은 단위로 개발**: 기능별로 나누어 개발하고 테스트
2. **코드 리뷰**: 동료와 코드를 공유하고 피드백 받기
3. **문서화**: 복잡한 로직은 주석으로 설명
4. **버전 관리**: Git을 활용한 체계적인 코드 관리
5. **테스트**: 중요한 기능은 테스트 코드 작성
