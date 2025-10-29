import { useMutation } from "@tanstack/react-query";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

interface ApiResponse {
  predictions: Entity[];
}
const fetchPrediction = async (textToAnalyze: string) => {
  if (!textToAnalyze.trim()) return;

  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: textToAnalyze }),
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const usePredict = () => {
  return useMutation<ApiResponse, Error, string>({
    mutationKey: ["predict"],
    mutationFn: (text: string) => fetchPrediction(text),
  });
};
