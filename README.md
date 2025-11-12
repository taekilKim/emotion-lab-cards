# 감정 실험 카드 (Emotion Lab Cards)

하루 한 번, 나를 관찰하는 감정 실험 도구

## 프로젝트 개요

감정 실험 카드는 감정 인식과 자기 관찰을 돕기 위한 디지털 심리 실험 도구입니다.
사용자는 하루에 1장의 카드를 선택해, 짧고 간단한 감정 실험을 수행하며 자신의 상태를 관찰하고 기록할 수 있습니다.

## 주요 기능

- 📇 200장의 감정 실험 카드 (8개 카테고리)
- 🎯 매일 무작위로 제시되는 1장의 카드
- 📝 실험 전후 감정 상태 기록
- 💾 Airtable 기반 데이터 저장

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Airtable
- **Deployment**: Vercel

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
```

## 프로젝트 구조

```
emotion-lab-cards/
├── app/                 # Next.js App Router
│   ├── page.tsx        # 메인 페이지
│   ├── layout.tsx      # 레이아웃
│   └── globals.css     # 글로벌 스타일
├── components/         # React 컴포넌트
├── lib/               # 유틸리티 및 라이브러리
└── public/            # 정적 파일
```

## 개발자

김태길 (2025)
