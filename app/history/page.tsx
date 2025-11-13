"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EmotionRecord, EmotionCard } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { getRecords } from "@/lib/api/records";

export default function HistoryPage() {
  const [records, setRecords] = useState<EmotionRecord[]>([]);
  const [cards, setCards] = useState<Map<string, EmotionCard>>(new Map());
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // 사용자 인증 확인
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // 로그인 상태: Supabase에서 가져오기
          const { data, error } = await getRecords();
          if (!error && data) {
            setRecords(data);
          }
        } else {
          // 비로그인 상태: localStorage에서 가져오기
          const savedRecords = JSON.parse(
            localStorage.getItem("emotion-records") || "[]"
          );
          const sortedRecords = savedRecords.sort(
            (a: EmotionRecord, b: EmotionRecord) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setRecords(sortedRecords);
        }
      } catch (error) {
        console.error("Failed to fetch records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    // 카드 정보 가져오기
    const fetchCards = async () => {
      const uniqueCardIds = [...new Set(records.map((r) => r.cardId))];
      const cardMap = new Map<string, EmotionCard>();

      for (const cardId of uniqueCardIds) {
        try {
          const response = await fetch(`/api/cards/${cardId}`);
          if (response.ok) {
            const card = await response.json();
            cardMap.set(cardId, card);
          }
        } catch (error) {
          console.error(`Failed to fetch card ${cardId}:`, error);
        }
      }

      setCards(cardMap);
    };

    if (records.length > 0) {
      fetchCards();
    }
  }, [records]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-pulse text-xl">로딩 중...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-4"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            홈으로
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
            나의 감정 기록
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            지금까지 {records.length}번의 실험을 완료했습니다
          </p>
        </div>

        {/* 기록 목록 */}
        {records.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              아직 기록이 없습니다
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              첫 실험 시작하기
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record) => {
              const card = cards.get(record.cardId);
              if (!card) return null;

              const emotionChange = record.emotionAfter - record.emotionBefore;

              return (
                <div
                  key={record.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-xs font-semibold">
                          {card.category}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(record.date)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {card.title}
                      </h3>
                      {record.memo && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                          {record.memo}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      {/* 감정 변화 */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          감정 변화
                        </div>
                        <div className="text-2xl font-bold">
                          {emotionChange > 0 && (
                            <span className="text-green-600 dark:text-green-400">
                              +{emotionChange} ↑
                            </span>
                          )}
                          {emotionChange < 0 && (
                            <span className="text-red-600 dark:text-red-400">
                              {emotionChange} ↓
                            </span>
                          )}
                          {emotionChange === 0 && (
                            <span className="text-gray-600 dark:text-gray-400">
                              0
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 점수 표시 */}
                      <div className="flex items-center gap-2 text-sm">
                        <div className="text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            전
                          </div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {record.emotionBefore}
                          </div>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            후
                          </div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {record.emotionAfter}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
