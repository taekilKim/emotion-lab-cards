"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EmotionCard } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { createRecord } from "@/lib/api/records";

type ExperimentStep = "before" | "doing" | "after" | "memo";

export default function ExperimentPage() {
  const params = useParams();
  const router = useRouter();
  const [card, setCard] = useState<EmotionCard | null>(null);
  const [step, setStep] = useState<ExperimentStep>("before");
  const [emotionBefore, setEmotionBefore] = useState<number>(5);
  const [emotionAfter, setEmotionAfter] = useState<number>(5);
  const [memo, setMemo] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchCard = async () => {
      const cardId = params.id as string;
      try {
        const response = await fetch(`/api/cards/${cardId}`);
        if (response.ok) {
          const foundCard = await response.json();
          setCard(foundCard);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to fetch card:", error);
        router.push("/");
      }
    };

    fetchCard();
  }, [params.id, router]);

  const handleSave = async () => {
    if (!card || saving) return;
    setSaving(true);

    try {
      // 사용자 인증 확인
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // 로그인 상태: Supabase에 저장
        const { error } = await createRecord({
          cardId: card.id,
          date: new Date().toISOString(),
          emotionBefore,
          emotionAfter,
          memo,
          completed: true,
        });

        if (error) {
          console.error("Failed to save record:", error);
          alert("기록 저장에 실패했습니다.");
          setSaving(false);
          return;
        }
      } else {
        // 비로그인 상태: localStorage에 저장
        const record = {
          id: `record-${Date.now()}`,
          cardId: card.id,
          date: new Date().toISOString(),
          emotionBefore,
          emotionAfter,
          memo,
          completed: true,
        };

        const existingRecords = JSON.parse(
          localStorage.getItem("emotion-records") || "[]"
        );
        existingRecords.push(record);
        localStorage.setItem("emotion-records", JSON.stringify(existingRecords));
      }

      // 완료 페이지로 이동
      router.push("/complete");
    } catch (error) {
      console.error("Error saving record:", error);
      alert("기록 저장 중 오류가 발생했습니다.");
      setSaving(false);
    }
  };

  if (!card) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="animate-pulse text-xl">로딩 중...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl w-full">
        {/* 진행 표시 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">진행 단계</span>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {step === "before" && "1/4"}
              {step === "doing" && "2/4"}
              {step === "after" && "3/4"}
              {step === "memo" && "4/4"}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{
                width:
                  step === "before"
                    ? "25%"
                    : step === "doing"
                    ? "50%"
                    : step === "after"
                    ? "75%"
                    : "100%",
              }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          {/* Step 1: 실험 전 감정 */}
          {step === "before" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  실험 전 감정 체크
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  지금 이 순간, 당신의 기분은 어떤가요?
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>매우 나쁨</span>
                  <span>매우 좋음</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={emotionBefore}
                  onChange={(e) => setEmotionBefore(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
                />
                <div className="text-center">
                  <span className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
                    {emotionBefore}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400"> / 10</span>
                </div>
              </div>

              <button
                onClick={() => setStep("doing")}
                className="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-all"
              >
                다음
              </button>
            </div>
          )}

          {/* Step 2: 실험 수행 */}
          {step === "doing" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-semibold mb-4">
                  {card.category}
                </span>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {card.title}
                </h2>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                  실험 방법
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {card.instruction}
                </p>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
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
                  <span>예상 시간: {card.expectedDuration}분</span>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                  관찰 포인트
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {card.prompt}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("before")}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-all"
                >
                  이전
                </button>
                <button
                  onClick={() => setStep("after")}
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-all"
                >
                  실험 완료
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 실험 후 감정 */}
          {step === "after" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  실험 후 감정 체크
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  실험을 마친 지금, 기분이 어떤가요?
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>매우 나쁨</span>
                  <span>매우 좋음</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={emotionAfter}
                  onChange={(e) => setEmotionAfter(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
                />
                <div className="text-center">
                  <span className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
                    {emotionAfter}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400"> / 10</span>
                </div>
              </div>

              {/* 변화 표시 */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  감정 변화
                </p>
                <p className="text-2xl font-bold">
                  {emotionAfter > emotionBefore && (
                    <span className="text-green-600 dark:text-green-400">
                      +{emotionAfter - emotionBefore} ↑
                    </span>
                  )}
                  {emotionAfter < emotionBefore && (
                    <span className="text-red-600 dark:text-red-400">
                      {emotionAfter - emotionBefore} ↓
                    </span>
                  )}
                  {emotionAfter === emotionBefore && (
                    <span className="text-gray-600 dark:text-gray-400">
                      변화 없음
                    </span>
                  )}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("doing")}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-all"
                >
                  이전
                </button>
                <button
                  onClick={() => setStep("memo")}
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-all"
                >
                  다음
                </button>
              </div>
            </div>
          )}

          {/* Step 4: 메모 작성 */}
          {step === "memo" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  경험 기록하기
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  실험하면서 느낀 점을 자유롭게 적어보세요
                </p>
              </div>

              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="예: 호흡을 관찰하니 생각보다 마음이 차분해졌어요..."
                className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />

              <div className="text-sm text-gray-500 dark:text-gray-400">
                선택사항입니다. 건너뛰어도 됩니다.
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("after")}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-all"
                >
                  이전
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "저장 중..." : "저장하고 완료"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
