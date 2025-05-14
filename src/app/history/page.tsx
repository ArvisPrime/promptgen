"use client";
import { useHistoryStore } from '@/store/store';

export default function HistoryPage() {
  const history = useHistoryStore((state) => state.history);
  const clearHistory = useHistoryStore((state) => state.clearHistory);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Prompt History</h1>
      {history.length === 0 ? (
        <p className="text-gray-600">No saved prompts yet.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li key={item.id} className="border p-4 rounded">
              <div className="text-sm text-gray-500">
                {new Date(item.timestamp).toLocaleString()}
              </div>
              <div className="mt-1">
                <strong>Raw Input:</strong> {item.rawInput}
              </div>
              <div className="mt-1">
                <strong>Refined Prompt:</strong>
                <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
                  {item.refinedPrompt}
                </pre>
              </div>
            </li>
          ))}
        </ul>
      )}
      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear History
        </button>
      )}
    </div>
  );
}