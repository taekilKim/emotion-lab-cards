import { NextResponse } from "next/server";
import { getAllCards, getRandomCard } from "@/lib/airtable";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const random = searchParams.get("random");

  try {
    if (random === "true") {
      const card = await getRandomCard();
      return NextResponse.json(card);
    } else {
      const cards = await getAllCards();
      return NextResponse.json(cards);
    }
  } catch (error) {
    console.error("Error fetching cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch cards" },
      { status: 500 }
    );
  }
}
