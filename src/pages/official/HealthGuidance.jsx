import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/PageHeader";

const AQI_LEVELS = [
  {
    key: "good",
    label: "Good",
    range: [0, 50],
    color: "bg-green-500",
    text: "Good",
  },
  {
    key: "moderate",
    label: "Moderate",
    range: [51, 100],
    color: "bg-yellow-400",
    text: "Moderate",
  },
  {
    key: "usg",
    label: "Unhealthy for Sensitive Groups",
    range: [101, 150],
    color: "bg-orange-500",
    text: "Unhealthy for Sensitive Groups",
  },
  {
    key: "unhealthy",
    label: "Unhealthy",
    range: [151, 200],
    color: "bg-red-600",
    text: "Unhealthy",
  },
  {
    key: "very_unhealthy",
    label: "Very Unhealthy / Hazardous",
    range: [201, 1000],
    color: "bg-purple-700",
    text: "Very Unhealthy / Hazardous",
  },
];

const GUIDANCE = {
  good: {
    dos: [
      "Enjoy outdoor activities — air quality is good.",
      "Keep windows open for ventilation when comfortable.",
      "Maintain regular physical activity routines.",
      "Continue usual precautions for chronic conditions.",
      "Monitor air quality updates occasionally.",
    ],
    donts: [
      "No special precautions needed.",
      "Don't assume air quality will remain the same — check updates.",
      "Avoid complacency if symptoms arise.",
      "Don't ignore local advisories.",
      "Avoid burning waste even in good AQI to keep it that way.",
    ],
  },
  moderate: {
    dos: [
      "Limit prolonged outdoor exertion, especially near traffic.",
      "Prefer indoor activities during peak traffic hours.",
      "Keep windows closed if outdoor air appears dusty or smoky.",
      "Use a simple cloth mask if you feel irritated outdoors.",
      "Check air quality for your local area in Peshawar regularly.",
    ],
    donts: [
      "Don't engage in long outdoor workouts.",
      "Avoid open burning and smoke-producing activities.",
      "Don't ignore symptoms like throat irritation or cough.",
      "Avoid staying near heavy traffic for long periods.",
      "Don't assume indoor air is always safe — ventilate carefully.",
    ],
  },
  usg: {
    dos: [
      "Sensitive individuals should reduce time spent outdoors.",
      "Use air purifiers indoors if available.",
      "Keep windows and doors closed during high AQI hours.",
      "Have medications (inhalers) ready if prescribed.",
      "Consider wearing a properly fitted N95 mask when outside.",
    ],
    donts: [
      "Don't let children play outdoors for long periods.",
      "Avoid vigorous outdoor exercise.",
      "Don't burn trash or wood.",
      "Avoid open kitchen ventilation if outdoor smoke is heavy.",
      "Don't ignore persistent breathing issues — see a doctor.",
    ],
  },
  unhealthy: {
    dos: [
      "Avoid all strenuous outdoor activity.",
      "Stay indoors and use air purification where possible.",
      "Ensure windows and doors are sealed to reduce infiltration.",
      "Use N95/KN95 masks if you must go outside.",
      "Stay hydrated and follow doctor’s advice if you have conditions.",
    ],
    donts: [
      "Don't exercise outdoors.",
      "Avoid taking children or elderly outside unnecessarily.",
      "Don't burn any waste or use open fires.",
      "Don't ignore severe symptoms — seek medical help.",
      "Avoid busy roads and highly polluted areas.",
    ],
  },
  very_unhealthy: {
    dos: [
      "Remain indoors with doors and windows closed.",
      "Use air purifiers and keep activity levels low.",
      "Seek medical advice if you have difficulty breathing.",
      "Use masks (N95/KN95) if you must go out for emergencies.",
      "Help neighbors who may be vulnerable (elderly/children).",
    ],
    donts: [
      "Don't go outside unless absolutely necessary.",
      "Avoid all outdoor exercise.",
      "Don't expose children, elderly or people with lung disease.",
      "Don't use unvented fuel-burning appliances indoors.",
      "Avoid travelling through heavily polluted zones.",
    ],
  },
};

function getLevelFromAQI(aqi) {
  if (aqi == null || isNaN(aqi)) return null;
  for (const lvl of AQI_LEVELS) {
    if (aqi >= lvl.range[0] && aqi <= lvl.range[1]) return lvl.key;
  }
  return null;
}

export default function HealthGuidance() {
  const [active, setActive] = useState("general");
  const tabs = [
    { key: "general", label: "General Advice" },
    { key: "parents", label: "Parents & Children" },
    { key: "elderly", label: "Elderly & Sensitive" },
    { key: "outdoor", label: "Outdoor Photos" },
  ];

  const [aqi, setAqi] = useState(() => {
    const stored = localStorage.getItem("current_aqi");
    if (stored) return Number(stored);
    return 132;
  });

  const levelKey = useMemo(() => getLevelFromAQI(aqi), [aqi]);

  useEffect(() => {
    if (!isNaN(aqi)) localStorage.setItem("current_aqi", String(aqi));
  }, [aqi]);

  const Section = ({ title, items, type = "do" }) => (
    <div className="bg-white rounded-lg p-4 shadow border">
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`w-2 h-2 rounded-full ${
            type === "do" ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className={`mt-1 ${
                type === "do" ? "text-green-500" : "text-red-500"
              }`}
            >
              {type === "do" ? "✔" : "✘"}
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderBody = () => {
    if (active === "general") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Section
            title="Do's"
            type="do"
            items={GUIDANCE[levelKey || "moderate"].dos}
          />
          <Section
            title="Don'ts"
            type="dont"
            items={GUIDANCE[levelKey || "moderate"].donts}
          />
        </div>
      );
    }

    if (active === "parents") {
      return (
        <div className="space-y-3">
          <Section
            title="Tips for parents"
            items={[
              "Limit outdoor playtime during red alerts",
              "Use fitted child masks when outdoors",
              "Monitor school advisories and transport routes",
            ]}
          />
        </div>
      );
    }

    if (active === "elderly") {
      return (
        <div className="space-y-3">
          <Section
            title="Sensitive groups"
            items={[
              "Keep rescue inhalers and meds accessible",
              "Consult physicians if symptoms persist",
              "Avoid peak traffic hours for errands",
            ]}
          />
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-6 shadow border">
        <p className="text-sm text-gray-600">
          Share outdoor photos responsibly. Avoid personal data and faces.
        </p>
      </div>
    );
  };

  const currentLevel =
    AQI_LEVELS.find((l) => l.key === levelKey) || AQI_LEVELS[1];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <PageHeader mainTabs={tabs} activeTab={active} onTabSelect={setActive} />

      <div className="flex items-center justify-between gap-4 mt-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`${currentLevel.color} w-3 h-3 rounded-full`} />
          <div>
            <div className="text-sm text-gray-600">Current AQI — Peshawar</div>
            <div className="text-lg font-bold">
              {isNaN(aqi) ? "—" : aqi}{" "}
              <span className="text-sm font-normal ml-2 text-gray-500">
                ({currentLevel.text})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Adjust AQI</label>
          <input
            type="number"
            value={aqi}
            onChange={(e) => setAqi(Number(e.target.value))}
            className="w-24 px-2 py-1 border rounded-md"
          />
        </div>
      </div>

      <div className="mt-6">{renderBody()}</div>
    </div>
  );
}
