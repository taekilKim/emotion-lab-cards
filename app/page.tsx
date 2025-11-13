"use client";

import { useEffect, useState } from "react";
import { EmotionCard } from "@/lib/types";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const [todayCard, setTodayCard] = useState<EmotionCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // 인증 상태 확인
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // 오늘 날짜를 키로 사용하여 매일 같은 카드가 나오도록 설정
    const fetchTodayCard = async () => {
      const today = new Date().toISOString().split("T")[0];
      const savedCard = localStorage.getItem(`card-${today}`);

      if (savedCard) {
        setTodayCard(JSON.parse(savedCard));
        setIsLoading(false);
      } else {
        try {
          const response = await fetch("/api/cards?random=true");
          const randomCard = await response.json();
          setTodayCard(randomCard);
          localStorage.setItem(`card-${today}`, JSON.stringify(randomCard));
        } catch (error) {
          console.error("Failed to fetch card:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTodayCard();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  if (isLoading || !todayCard) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-2xl w-full text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto mb-8"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl w-full">
        {/* 상단 네비게이션 */}
        <div className="flex justify-end mb-4 gap-2">
          {user ? (
            <>
              <Link
                href="/history"
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:shadow-md transition-all text-sm font-medium border border-gray-200 dark:border-gray-700"
              >
                내 기록
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:shadow-md transition-all text-sm font-medium border border-gray-200 dark:border-gray-700"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:shadow-md transition-all text-sm font-medium border border-gray-200 dark:border-gray-700"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow hover:shadow-md transition-all text-sm font-medium"
              >
                회원가입
              </Link>
            </>
          )}
        </div>

        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
            감정 실험 카드
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            하루 한 번, 나를 관찰하는 감정 실험
          </p>
          {user && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {user.email}님 환영합니다
            </p>
          )}
        </div>

        {/* 오늘의 카드 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-3xl">
          {/* 카테고리 배지 */}
          <div className="flex justify-center mb-6">
            <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-semibold">
              {todayCard.category}
            </span>
          </div>

          {/* 카드 제목 */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            {todayCard.title}
          </h2>

          {/* 카드 설명 */}
          <p className="text-lg md:text-xl text-center text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {todayCard.instruction}
          </p>

          {/* 예상 시간 */}
          <div className="flex items-center justify-center gap-2 mb-8 text-gray-600 dark:text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">예상 시간: {todayCard.expectedDuration}분</span>
          </div>

          {/* 시작 버튼 */}
          <div className="flex justify-center">
            <Link
              href={`/experiment/${todayCard.id}`}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 text-lg"
            >
              실험 시작하기
            </Link>
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>매일 새로운 카드가 준비됩니다</p>
        </div>
      </div>
    </main>
  );
}
