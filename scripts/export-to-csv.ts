/**
 * 카드 데이터를 CSV로 내보내기
 * Airtable 임포트용
 */

import { emotionCards } from "../lib/cards";
import * as fs from "fs";
import * as path from "path";

function escapeCSV(value: string | number): string {
  if (typeof value === "number") return value.toString();
  // 따옴표나 쉼표가 있으면 따옴표로 감싸기
  if (value.includes('"') || value.includes(",") || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function exportToCSV() {
  // CSV 헤더
  const headers = [
    "id",
    "category",
    "title",
    "instruction",
    "prompt",
    "expectedDuration",
  ];

  // CSV 행 생성
  const rows = emotionCards.map((card) => {
    return [
      escapeCSV(card.id),
      escapeCSV(card.category),
      escapeCSV(card.title),
      escapeCSV(card.instruction),
      escapeCSV(card.prompt),
      escapeCSV(card.expectedDuration),
    ].join(",");
  });

  // CSV 내용
  const csvContent = [headers.join(","), ...rows].join("\n");

  // 파일로 저장
  const outputPath = path.join(process.cwd(), "airtable-cards-sample.csv");
  fs.writeFileSync(outputPath, csvContent, "utf-8");

  console.log(`✅ CSV 파일 생성 완료: ${outputPath}`);
  console.log(`📊 총 ${emotionCards.length}개의 카드 데이터`);
}

exportToCSV();
