export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">감정 실험 카드</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          하루 한 번, 나를 관찰하는 감정 실험
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <p className="text-xl mb-4">오늘의 실험 카드를 준비하고 있습니다...</p>
        </div>
      </div>
    </main>
  );
}
