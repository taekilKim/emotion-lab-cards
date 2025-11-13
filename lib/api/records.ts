/**
 * 사용자 실험 기록 API
 */

import { createClient } from "@/lib/supabase/client";
import { EmotionRecord } from "@/lib/types";

/**
 * 새 기록 생성
 */
export async function createRecord(
  record: Omit<EmotionRecord, "id">
): Promise<{ data: EmotionRecord | null; error: any }> {
  const supabase = createClient();

  // 현재 사용자 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error("User not authenticated") };
  }

  const { data, error } = await supabase
    .from("records")
    .insert({
      user_id: user.id,
      card_id: record.cardId,
      date: record.date,
      emotion_before: record.emotionBefore,
      emotion_after: record.emotionAfter,
      memo: record.memo,
      completed: record.completed,
    })
    .select()
    .single();

  if (error) return { data: null, error };

  return {
    data: {
      id: data.id,
      cardId: data.card_id,
      date: data.date,
      emotionBefore: data.emotion_before,
      emotionAfter: data.emotion_after,
      memo: data.memo,
      completed: data.completed,
    },
    error: null,
  };
}

/**
 * 사용자의 모든 기록 가져오기
 */
export async function getRecords(): Promise<{
  data: EmotionRecord[] | null;
  error: any;
}> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error("User not authenticated") };
  }

  const { data, error } = await supabase
    .from("records")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (error) return { data: null, error };

  return {
    data: data.map((record) => ({
      id: record.id,
      cardId: record.card_id,
      date: record.date,
      emotionBefore: record.emotion_before,
      emotionAfter: record.emotion_after,
      memo: record.memo,
      completed: record.completed,
    })),
    error: null,
  };
}

/**
 * 특정 날짜 범위의 기록 가져오기
 */
export async function getRecordsByDateRange(
  startDate: string,
  endDate: string
): Promise<{ data: EmotionRecord[] | null; error: any }> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error("User not authenticated") };
  }

  const { data, error } = await supabase
    .from("records")
    .select("*")
    .eq("user_id", user.id)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: false });

  if (error) return { data: null, error };

  return {
    data: data.map((record) => ({
      id: record.id,
      cardId: record.card_id,
      date: record.date,
      emotionBefore: record.emotion_before,
      emotionAfter: record.emotion_after,
      memo: record.memo,
      completed: record.completed,
    })),
    error: null,
  };
}

/**
 * 최근 N개의 기록 가져오기
 */
export async function getRecentRecords(
  limit: number = 10
): Promise<{ data: EmotionRecord[] | null; error: any }> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error("User not authenticated") };
  }

  const { data, error } = await supabase
    .from("records")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(limit);

  if (error) return { data: null, error };

  return {
    data: data.map((record) => ({
      id: record.id,
      cardId: record.card_id,
      date: record.date,
      emotionBefore: record.emotion_before,
      emotionAfter: record.emotion_after,
      memo: record.memo,
      completed: record.completed,
    })),
    error: null,
  };
}
