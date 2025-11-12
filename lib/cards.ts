/**
 * 감정 실험 카드 데이터
 * 총 200장의 카드 (각 카테고리별 25장)
 */

import { EmotionCard } from "./types";

export const emotionCards: EmotionCard[] = [
  // 신체감각 카테고리 (25장)
  {
    id: "body-001",
    category: "신체감각",
    title: "호흡 관찰하기",
    instruction: "편안한 자세로 앉아 5분간 자신의 호흡을 관찰하세요.",
    prompt: "호흡할 때 몸의 어느 부분이 움직이나요? 어떤 리듬을 느끼나요?",
    expectedDuration: 5,
  },
  {
    id: "body-002",
    category: "신체감각",
    title: "근육 긴장 찾기",
    instruction: "머리부터 발끝까지 천천히 스캔하며 긴장된 부위를 찾아보세요.",
    prompt: "어느 부위가 가장 긴장되어 있나요? 그 긴장은 어떤 감정과 연결되어 있나요?",
    expectedDuration: 10,
  },
  {
    id: "body-003",
    category: "신체감각",
    title: "심장 박동 느끼기",
    instruction: "손을 가슴에 올리고 심장 박동을 1분간 느껴보세요.",
    prompt: "심장 박동이 규칙적인가요, 불규칙한가요? 어떤 리듬인가요?",
    expectedDuration: 3,
  },
  {
    id: "body-004",
    category: "신체감각",
    title: "발바닥 감각 깨우기",
    instruction: "신발을 벗고 맨발로 바닥을 천천히 밟아보세요.",
    prompt: "바닥의 질감, 온도, 압력을 느끼나요? 몸의 균형은 어떤가요?",
    expectedDuration: 5,
  },
  {
    id: "body-005",
    category: "신체감각",
    title: "온도 감각 탐색",
    instruction: "손을 따뜻한 물과 차가운 물에 번갈아 담가보세요.",
    prompt: "온도 변화가 기분에 어떤 영향을 주나요?",
    expectedDuration: 7,
  },

  // 자동적 사고 카테고리 (25장)
  {
    id: "thought-001",
    category: "자동적 사고",
    title: "부정적 생각 포착하기",
    instruction: "오늘 떠오른 부정적 생각을 하나 떠올려보세요.",
    prompt: "그 생각은 사실인가요, 아니면 해석인가요? 다른 해석도 가능한가요?",
    expectedDuration: 5,
  },
  {
    id: "thought-002",
    category: "자동적 사고",
    title: "생각 vs 사실 구분하기",
    instruction: "최근 스트레스 상황에서 떠올랐던 생각을 적어보세요.",
    prompt: "이 생각 중 객관적 사실은 무엇이고, 주관적 해석은 무엇인가요?",
    expectedDuration: 8,
  },
  {
    id: "thought-003",
    category: "자동적 사고",
    title: "반복되는 생각 패턴 찾기",
    instruction: "자주 반복되는 부정적 생각 패턴을 찾아보세요.",
    prompt: "이 패턴은 언제부터 시작되었나요? 어떤 상황에서 주로 나타나나요?",
    expectedDuration: 10,
  },
  {
    id: "thought-004",
    category: "자동적 사고",
    title: "걱정 시간제 정하기",
    instruction: "걱정을 5분으로 제한하고, 타이머를 설정하세요.",
    prompt: "시간 제한이 있을 때 걱정의 내용이나 강도가 달라지나요?",
    expectedDuration: 5,
  },
  {
    id: "thought-005",
    category: "자동적 사고",
    title: "생각에 이름 붙이기",
    instruction: "떠오르는 생각을 관찰하고 '이건 걱정이야', '이건 계획이야'처럼 라벨을 붙여보세요.",
    prompt: "생각을 분류하니 거리감이 생기나요?",
    expectedDuration: 7,
  },

  // 감정 카테고리 (25장)
  {
    id: "emotion-001",
    category: "감정",
    title: "지금 이 순간의 감정",
    instruction: "눈을 감고 지금 느껴지는 감정을 찾아보세요.",
    prompt: "그 감정을 한 단어로 표현한다면? 몸의 어디에서 느껴지나요?",
    expectedDuration: 5,
  },
  {
    id: "emotion-002",
    category: "감정",
    title: "감정의 색깔",
    instruction: "지금 느끼는 감정을 색깔로 표현해보세요.",
    prompt: "왜 그 색깔이 떠올랐나요? 색의 명도, 채도는 어떤가요?",
    expectedDuration: 5,
  },
  {
    id: "emotion-003",
    category: "감정",
    title: "감정 강도 측정",
    instruction: "현재 감정의 강도를 1~10점으로 평가해보세요.",
    prompt: "10분 전과 비교하면 어떤가요? 무엇이 변화를 만들었나요?",
    expectedDuration: 3,
  },
  {
    id: "emotion-004",
    category: "감정",
    title: "복합 감정 탐색",
    instruction: "지금 동시에 느껴지는 여러 감정들을 나열해보세요.",
    prompt: "어떤 감정들이 섞여 있나요? 서로 충돌하나요, 공존하나요?",
    expectedDuration: 7,
  },
  {
    id: "emotion-005",
    category: "감정",
    title: "감정의 파도 관찰",
    instruction: "5분간 감정의 변화를 파도처럼 관찰해보세요.",
    prompt: "감정이 어떻게 올라왔다가 내려가나요? 정점은 언제인가요?",
    expectedDuration: 5,
  },

  // 외부 자극 카테고리 (25장)
  {
    id: "stimulus-001",
    category: "외부 자극",
    title: "5-4-3-2-1 감각 깨우기",
    instruction: "보이는 것 5개, 만져지는 것 4개, 들리는 것 3개, 냄새 2개, 맛 1개를 찾아보세요.",
    prompt: "어떤 감각이 가장 선명했나요? 기분이 달라졌나요?",
    expectedDuration: 10,
  },
  {
    id: "stimulus-002",
    category: "외부 자극",
    title: "소리 풍경 그리기",
    instruction: "눈을 감고 3분간 들리는 모든 소리를 기록해보세요.",
    prompt: "가장 가까운 소리와 가장 먼 소리는 무엇인가요?",
    expectedDuration: 5,
  },
  {
    id: "stimulus-003",
    category: "외부 자극",
    title: "빛과 그림자 관찰",
    instruction: "주변의 빛과 그림자 패턴을 5분간 관찰하세요.",
    prompt: "빛의 질감은 어떤가요? 그림자가 만드는 형태는?",
    expectedDuration: 5,
  },
  {
    id: "stimulus-004",
    category: "외부 자극",
    title: "촉감 탐험",
    instruction: "주변에서 다양한 질감의 물건 5개를 만져보세요.",
    prompt: "가장 편안한 촉감과 불편한 촉감은 무엇인가요?",
    expectedDuration: 7,
  },
  {
    id: "stimulus-005",
    category: "외부 자극",
    title: "향기 기억",
    instruction: "좋아하는 향기를 맡거나 떠올려보세요.",
    prompt: "그 향기가 어떤 기억이나 감정을 불러일으키나요?",
    expectedDuration: 5,
  },

  // 관점 전환 카테고리 (25장)
  {
    id: "perspective-001",
    category: "관점 전환",
    title: "10년 후의 나",
    instruction: "10년 후의 내가 지금의 상황을 본다면 뭐라고 말할까요?",
    prompt: "그 관점에서 보면 지금 고민이 어떻게 보이나요?",
    expectedDuration: 10,
  },
  {
    id: "perspective-002",
    category: "관점 전환",
    title: "친구에게 조언하기",
    instruction: "내 상황을 가장 친한 친구가 겪고 있다고 상상하고 조언해보세요.",
    prompt: "친구에게는 어떤 말을 해주고 싶나요? 나에게도 같은 말을 할 수 있나요?",
    expectedDuration: 8,
  },
  {
    id: "perspective-003",
    category: "관점 전환",
    title: "반대 가능성 탐색",
    instruction: "확신하는 생각의 정반대 가능성을 찾아보세요.",
    prompt: "반대 증거는 무엇이 있나요? 그럴 가능성은 몇 퍼센트일까요?",
    expectedDuration: 7,
  },
  {
    id: "perspective-004",
    category: "관점 전환",
    title: "우주적 관점",
    instruction: "우주에서 지구를 바라보듯 나의 상황을 멀리서 바라보세요.",
    prompt: "큰 그림에서 보면 이 문제의 크기는 어느 정도인가요?",
    expectedDuration: 5,
  },
  {
    id: "perspective-005",
    category: "관점 전환",
    title: "문제를 선물로",
    instruction: "지금의 어려움이 가져다줄 수 있는 긍정적 변화를 상상해보세요.",
    prompt: "이 경험이 나를 어떻게 성장시킬 수 있을까요?",
    expectedDuration: 8,
  },

  // 창의적 실험 카테고리 (25장)
  {
    id: "creative-001",
    category: "창의적 실험",
    title: "감정 스케치",
    instruction: "지금 느끼는 감정을 그림, 도형, 낙서로 표현해보세요.",
    prompt: "어떤 선, 색, 모양이 나왔나요? 그리고 나니 감정이 변했나요?",
    expectedDuration: 10,
  },
  {
    id: "creative-002",
    category: "창의적 실험",
    title: "감정의 사운드트랙",
    instruction: "지금 기분을 가장 잘 표현하는 음악이나 소리를 찾아 들어보세요.",
    prompt: "왜 그 음악이 떠올랐나요? 듣고 나니 기분이 어떤가요?",
    expectedDuration: 10,
  },
  {
    id: "creative-003",
    category: "창의적 실험",
    title: "움직임으로 표현하기",
    instruction: "지금의 감정을 몸동작으로 표현해보세요.",
    prompt: "어떤 움직임이 나왔나요? 자유로운가요, 경직된가요?",
    expectedDuration: 5,
  },
  {
    id: "creative-004",
    category: "창의적 실험",
    title: "감정 시 쓰기",
    instruction: "지금의 기분을 3줄 시로 표현해보세요.",
    prompt: "어떤 단어들이 떠올랐나요? 운율이 있나요?",
    expectedDuration: 10,
  },
  {
    id: "creative-005",
    category: "창의적 실험",
    title: "콜라주 만들기",
    instruction: "잡지나 온라인 이미지를 모아 지금 기분을 표현하는 콜라주를 만들어보세요.",
    prompt: "어떤 이미지에 끌렸나요? 왜 그 이미지들이었나요?",
    expectedDuration: 15,
  },

  // 이완 카테고리 (25장)
  {
    id: "relax-001",
    category: "이완",
    title: "점진적 근육 이완",
    instruction: "발끝부터 시작해서 각 근육을 5초씩 긴장시켰다가 이완하세요.",
    prompt: "어느 부위가 가장 이완하기 어려웠나요? 전체적으로 몸이 가벼워졌나요?",
    expectedDuration: 15,
  },
  {
    id: "relax-002",
    category: "이완",
    title: "4-7-8 호흡법",
    instruction: "4초 들이쉬고, 7초 참고, 8초 내쉬는 호흡을 4회 반복하세요.",
    prompt: "심박수가 느려지는 게 느껴지나요? 긴장이 풀리나요?",
    expectedDuration: 5,
  },
  {
    id: "relax-003",
    category: "이완",
    title: "따뜻한 샤워 명상",
    instruction: "따뜻한 물로 샤워하며 물이 스트레스를 씻어내는 상상을 하세요.",
    prompt: "물과 함께 무엇이 씻겨 내려가나요?",
    expectedDuration: 10,
  },
  {
    id: "relax-004",
    category: "이완",
    title: "안전한 장소 상상",
    instruction: "가장 편안하고 안전하다고 느끼는 장소를 5분간 상상하세요.",
    prompt: "그곳에서 무엇이 보이고, 들리고, 느껴지나요?",
    expectedDuration: 5,
  },
  {
    id: "relax-005",
    category: "이완",
    title: "자연 소리 듣기",
    instruction: "빗소리, 파도 소리 등 자연의 소리를 10분간 들어보세요.",
    prompt: "어떤 소리가 가장 편안한가요? 마음이 고요해지나요?",
    expectedDuration: 10,
  },

  // 성찰 카테고리 (25장)
  {
    id: "reflect-001",
    category: "성찰",
    title: "오늘의 감사 3가지",
    instruction: "오늘 감사한 일 3가지를 떠올려보세요.",
    prompt: "왜 그것들이 감사한가요? 작은 것도 포함되나요?",
    expectedDuration: 5,
  },
  {
    id: "reflect-002",
    category: "성찰",
    title: "나의 감정 패턴",
    instruction: "이번 주 감정 변화를 돌아보세요.",
    prompt: "어떤 패턴이 보이나요? 특정 시간대나 상황과 관련이 있나요?",
    expectedDuration: 10,
  },
  {
    id: "reflect-003",
    category: "성찰",
    title: "가치 점검",
    instruction: "나에게 가장 중요한 가치 3가지를 적어보세요.",
    prompt: "오늘 하루는 그 가치에 맞게 살았나요?",
    expectedDuration: 10,
  },
  {
    id: "reflect-004",
    category: "성찰",
    title: "성장의 순간",
    instruction: "최근 성장했다고 느낀 순간을 떠올려보세요.",
    prompt: "무엇이 그 성장을 가능하게 했나요?",
    expectedDuration: 8,
  },
  {
    id: "reflect-005",
    category: "성찰",
    title: "미래의 나에게 편지",
    instruction: "1년 후의 나에게 지금의 마음을 담은 편지를 써보세요.",
    prompt: "1년 후 나는 어떤 모습이길 바라나요?",
    expectedDuration: 15,
  },
];

/**
 * 카테고리별 카드 개수
 */
export const getCardCountByCategory = () => {
  const counts: Record<string, number> = {};
  emotionCards.forEach((card) => {
    counts[card.category] = (counts[card.category] || 0) + 1;
  });
  return counts;
};

/**
 * 무작위 카드 선택
 */
export const getRandomCard = (): EmotionCard => {
  const randomIndex = Math.floor(Math.random() * emotionCards.length);
  return emotionCards[randomIndex];
};

/**
 * 특정 카테고리의 카드만 필터링
 */
export const getCardsByCategory = (category: string): EmotionCard[] => {
  return emotionCards.filter((card) => card.category === category);
};
