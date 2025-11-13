/**
 * Airtable API 연동
 * 카드 데이터 관리
 */

import Airtable from "airtable";
import { EmotionCard } from "./types";

// Airtable 초기화
const airtable = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
});

const base = airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");

/**
 * 모든 카드 가져오기
 */
export async function getAllCards(): Promise<EmotionCard[]> {
  try {
    const records = await base("Cards").select().all();

    return records.map((record) => ({
      id: record.get("id") as string,
      category: record.get("category") as EmotionCard["category"],
      title: record.get("title") as string,
      instruction: record.get("instruction") as string,
      prompt: record.get("prompt") as string,
      expectedDuration: record.get("expectedDuration") as number,
    }));
  } catch (error) {
    console.error("Error fetching cards from Airtable:", error);
    throw error;
  }
}

/**
 * 카드 ID로 특정 카드 가져오기
 */
export async function getCardById(cardId: string): Promise<EmotionCard | null> {
  try {
    const records = await base("Cards")
      .select({
        filterByFormula: `{id} = '${cardId}'`,
        maxRecords: 1,
      })
      .all();

    if (records.length === 0) return null;

    const record = records[0];
    return {
      id: record.get("id") as string,
      category: record.get("category") as EmotionCard["category"],
      title: record.get("title") as string,
      instruction: record.get("instruction") as string,
      prompt: record.get("prompt") as string,
      expectedDuration: record.get("expectedDuration") as number,
    };
  } catch (error) {
    console.error("Error fetching card from Airtable:", error);
    return null;
  }
}

/**
 * 카테고리별 카드 가져오기
 */
export async function getCardsByCategory(
  category: string
): Promise<EmotionCard[]> {
  try {
    const records = await base("Cards")
      .select({
        filterByFormula: `{category} = '${category}'`,
      })
      .all();

    return records.map((record) => ({
      id: record.get("id") as string,
      category: record.get("category") as EmotionCard["category"],
      title: record.get("title") as string,
      instruction: record.get("instruction") as string,
      prompt: record.get("prompt") as string,
      expectedDuration: record.get("expectedDuration") as number,
    }));
  } catch (error) {
    console.error("Error fetching cards by category from Airtable:", error);
    throw error;
  }
}

/**
 * 무작위 카드 1장 가져오기
 */
export async function getRandomCard(): Promise<EmotionCard> {
  const cards = await getAllCards();
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}
