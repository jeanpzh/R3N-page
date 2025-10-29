"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import AnnotatedText from "@/components/annotated-text";
import Legend from "@/components/legend";
import EntityList from "@/components/entity-list";
import { usePredict } from "@/hooks/use-prediction";

const EXAMPLE_TEXTS = [
  {
    title: "Tratamiento CMV",
    text: "Cidofovir is used to treat CMV retinitis in patients with AIDS. The drug has shown significant efficacy in reducing viral load.",
  },
  {
    title: "Diabetes y Metformina",
    text: "Metformin is a first-line medication for type 2 diabetes mellitus. It helps reduce blood glucose levels and improves insulin sensitivity in patients with metabolic syndrome.",
  },
  {
    title: "Cáncer y Quimioterapia",
    text: "Doxorubicin is commonly used in chemotherapy for breast cancer and lymphoma. The drug can cause cardiotoxicity and requires careful monitoring during treatment.",
  },
];

export default function Home() {
  const {
    mutateAsync: predict,
    data: results,
    isPending: loading,
    isSuccess: analyzed,
  } = usePredict();
  const [text, setText] = useState("");

  const analyzeText = async (textToAnalyze: string) => {
    try {
      await predict(textToAnalyze);
    } catch (error) {
      console.error("Error analyzing text:", error);
    }
  };

  const handleExampleClick = (exampleText: string) => {
    setText(exampleText);
    analyzeText(exampleText);
  };

  return (
    <div className="min-h-screen w-full relative bg-background text-text-muted">
      <main className="min-h-screen relative z-10 p-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-medium text-text mb-2">NER</h1>
              <p>
                Analiza texto médico para identificar Químicos y Enfermedades
                automáticamente.
              </p>
            </div>
            <ModeToggle />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-text">
              Ejemplos Rápidos
            </h2>
            <div className="flex justify-around gap-4 flex-wrap">
              {EXAMPLE_TEXTS.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => handleExampleClick(example.text)}
                  className="flex-1 min-w-[250px] p-4 bg-light rounded-lg cursor-pointer border-border hover:bg-light/60"
                >
                  <p className="font-semibold mb-2 text-text">
                    {example.title}
                  </p>
                  <p className="text-sm line-clamp-2">{example.text}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Input
              </h2>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="'Cidofovir is used to treat CMV retinitis in patients with AIDS.'"
                className="w-full h-64 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-light border-border"
              />
              <Button
                onClick={() => analyzeText(text)}
                disabled={loading || !text.trim()}
                variant={"primary"}
                className="text-white dark:text-black font-medium"
              >
                {loading ? "Analizando..." : "Analizar Texto"}
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-text mb-4">
                Resultados
              </h2>
              {!analyzed ? (
                <div className=" text-center py-12">
                  Los resultados del análisis aparecerán aquí.
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-text mb-2">
                      Texto Anotado
                    </h3>
                    <AnnotatedText
                      analyzed={analyzed}
                      results={results.predictions}
                      text={text}
                    />
                  </div>

                  {results.predictions.length > 0 && (
                    <>
                      <Legend />
                      <EntityList results={results.predictions} />
                    </>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
