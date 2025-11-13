# 감정 실험 카드 설정 가이드

이 문서는 Airtable과 Supabase를 설정하는 방법을 안내합니다.

## 1. Airtable 설정 (카드 데이터 관리)

### 1.1 Base 생성
1. [Airtable](https://airtable.com)에 로그인
2. "Create a base" 클릭
3. "Start from scratch" 선택
4. Base 이름: "감정실험카드"

### 1.2 Cards 테이블 생성

다음 필드를 가진 테이블을 생성하세요:

| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | Single line text | 카드 고유 ID (예: body-001) |
| category | Single select | 카테고리 (신체감각, 자동적 사고, 감정, 외부 자극, 관점 전환, 창의적 실험, 이완, 성찰) |
| title | Single line text | 카드 제목 |
| instruction | Long text | 실험 방법 설명 |
| prompt | Long text | 관찰 포인트/질문 |
| expectedDuration | Number | 예상 소요 시간 (분) |

### 1.3 샘플 데이터 임포트

1. 프로젝트의 `airtable-cards-sample.csv` 파일을 다운로드
2. Airtable에서 "Import data" → "CSV file" 선택
3. CSV 파일 업로드
4. 필드 매핑 확인 후 Import

### 1.4 API 키 발급

1. [Airtable Account](https://airtable.com/account) 페이지로 이동
2. "Generate API key" 클릭
3. API key 복사

### 1.5 Base ID 확인

1. Airtable에서 생성한 Base 열기
2. "Help" → "API documentation" 클릭
3. URL에서 Base ID 확인 (예: `https://airtable.com/appXXXXXXXXXXXXXX/api/docs`)
4. `appXXXXXXXXXXXXXX` 부분이 Base ID

---

## 2. Supabase 설정 (사용자 데이터 관리)

### 2.1 프로젝트 생성

1. [Supabase](https://supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: `emotion-lab-cards`
   - Database Password: 안전한 비밀번호 설정
   - Region: `Northeast Asia (Seoul)`

### 2.2 데이터베이스 스키마 생성

Supabase Dashboard → SQL Editor에서 다음 SQL 실행:

```sql
-- Users 테이블 (Supabase Auth와 연동)
-- 이미 auth.users 테이블이 있으므로, profiles 테이블만 추가

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) 활성화
alter table public.profiles enable row level security;

-- Profiles 정책: 자신의 프로필만 읽기/쓰기 가능
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Records 테이블 (실험 기록)
create table public.records (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  card_id text not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  emotion_before integer check (emotion_before >= 1 and emotion_before <= 10) not null,
  emotion_after integer check (emotion_after >= 1 and emotion_after <= 10) not null,
  memo text,
  completed boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS 활성화
alter table public.records enable row level security;

-- Records 정책: 자신의 기록만 읽기/쓰기 가능
create policy "Users can view own records"
  on public.records for select
  using (auth.uid() = user_id);

create policy "Users can insert own records"
  on public.records for insert
  with check (auth.uid() = user_id);

create policy "Users can update own records"
  on public.records for update
  using (auth.uid() = user_id);

create policy "Users can delete own records"
  on public.records for delete
  using (auth.uid() = user_id);

-- 인덱스 생성 (성능 최적화)
create index records_user_id_idx on public.records(user_id);
create index records_date_idx on public.records(date);
create index records_card_id_idx on public.records(card_id);

-- 프로필 자동 생성 트리거
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 2.3 인증 설정

1. Supabase Dashboard → Authentication → Providers
2. Email Provider 활성화 (기본적으로 활성화되어 있음)
3. 원하는 경우 Google, GitHub 등 추가 OAuth 제공자 설정

### 2.4 API 키 확인

1. Supabase Dashboard → Settings → API
2. 다음 정보 복사:
   - Project URL
   - `anon` `public` key

---

## 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열어서 다음 값 입력:

```env
# Airtable Configuration
NEXT_PUBLIC_AIRTABLE_API_KEY=your_airtable_api_key
NEXT_PUBLIC_AIRTABLE_BASE_ID=your_airtable_base_id

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 4. 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

---

## 5. 배포 (Vercel)

1. [Vercel](https://vercel.com)에 로그인
2. GitHub 레포지토리 연결
3. Environment Variables 설정:
   - `NEXT_PUBLIC_AIRTABLE_API_KEY`
   - `NEXT_PUBLIC_AIRTABLE_BASE_ID`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy 클릭

---

## 문제 해결

### Airtable 연결 오류
- API 키가 올바른지 확인
- Base ID가 올바른지 확인
- 테이블 이름이 "Cards"인지 확인

### Supabase 연결 오류
- Project URL이 올바른지 확인
- Anon key가 올바른지 확인
- RLS 정책이 올바르게 설정되었는지 확인

### 인증 오류
- Supabase Auth 설정 확인
- Email confirmation 설정 확인 (개발 중에는 비활성화 가능)
