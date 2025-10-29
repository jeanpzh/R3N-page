const ENTITY_COLORS: Record<string, string> = {
  Chemical:
    "bg-info text-white dark:bg-info/50 dark:text-white dark:border dark:border-info",
  Disease:
    "bg-warning text-white dark:bg-warning/50 dark:text-white dark:border dark:border-warning",
};

export default function EntityList({ results }: { results: Entity[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-text">Entidades Encontradas</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {results.map((entity, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg ${ENTITY_COLORS[entity.entity_group]}`}
          >
            <p className="font-semibold">{entity.word}</p>
            <p className="text-sm opacity-75">
              {entity.entity_group} • Confianza:{" "}
              {(entity.score * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
