import React from "react";
const ENTITY_COLORS: Record<string, string> = {
  Chemical:
    "bg-info text-white dark:bg-info/50 dark:text-white dark:border dark:border-info",
  Disease:
    "bg-warning text-white dark:bg-warning/50 dark:text-white dark:border dark:border-warning",
};

export default function Legend() {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-text">Leyenda</h3>
      <div className="flex gap-4 flex-wrap">
        {Object.entries(ENTITY_COLORS).map(([entity, color]) => (
          <div key={entity} className="flex items-center gap-2">
            <span className={`${color} px-3 py-1 rounded text-sm font-medium`}>
              {entity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
