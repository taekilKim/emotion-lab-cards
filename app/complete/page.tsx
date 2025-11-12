"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CompletePage() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl w-full text-center">
        {/* 성공 아이콘 */}
        <div className="mb-8 flex justify-center">
          <div
            className={`w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center transition-all duration-500 ${
              showConfetti ? "scale-100" : "scale-0"
            }`}
          >
            <svg
              className="w-12 h-12 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            실험 완료!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            오늘의 감정 실험을 완료했습니다.
            <br />
            스스로를 관찰한 시간이 쌓여갑니다.
          </p>

          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              홈으로 돌아가기
            </Link>

            <Link
              href="/history"
              className="block w-full px-8 py-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-all"
            >
              나의 기록 보기
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          내일 다시 만나요 ✨
        </div>
      </div>
    </main>
  );
}
