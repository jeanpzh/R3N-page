import React from "react";
const ENTITY_COLORS: Record<string, string> = {
  Chemical:
    "bg-info text-white dark:bg-info/50 dark:text-white dark:border dark:border-info",
  Disease:
    "bg-warning text-white dark:bg-warning/50 dark:text-white dark:border dark:border-warning",
};

export default function AnnotatedText({
  analyzed,
  results,
  text,
}: {
  analyzed: boolean;
  results: Entity[];
  text: string;
}) {
  if (!analyzed) return null;

  if (results.length === 0) {
    return (
      <div className="p-4 rounded-lg">
        Análisis completado. No se encontraron entidades de Químicos o
        Enfermedades en el texto.
      </div>
    );
  }

  let lastIndex = 0;
  const elements = [];

  results.sort((a, b) => a.start - b.start);

  results.forEach((entity, idx) => {
    if (lastIndex < entity.start) {
      elements.push(
        <span key={`text-${idx}`}>
          {text.substring(lastIndex, entity.start)}
        </span>
      );
    }

    const colorClass = ENTITY_COLORS[entity.entity_group];
    elements.push(
      <mark
        key={`entity-${idx}`}
        className={`${colorClass} px-1 rounded cursor-help`}
        title={`${entity.entity_group} (${(entity.score * 100).toFixed(1)}%)`}
      >
        {text.substring(entity.start, entity.end)}
      </mark>
    );

    lastIndex = entity.end;
  });

  if (lastIndex < text.length) {
    elements.push(<span key="text-end">{text.substring(lastIndex)}</span>);
  }

  return <div className="p-4 rounded-lg leading-relaxed">{elements}</div>;
}
