/**
 * 감정 실험 카드 타입 정의
 */

export type CardCategory =
  | "신체감각"
  | "자동적 사고"
  | "감정"
  | "외부 자극"
  | "관점 전환"
  | "창의적 실험"
  | "이완"
  | "성찰";

export interface EmotionCard {
  id: string;
  category: CardCategory;
  title: string;
  instruction: string;
  prompt: string;
  expectedDuration: number; // 예상 소요 시간 (분)
}

export interface EmotionRecord {
  id: string;
  cardId: string;
  date: string;
  emotionBefore: number; // 1-10
  emotionAfter: number; // 1-10
  memo: string;
  completed: boolean;
}
