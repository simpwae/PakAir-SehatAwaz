import { useState } from "react";

export default function HealthGuidance() {
  const [active, setActive] = useState("general");
  const tabs = [
    { key: "general", label: "General Advice" },
    { key: "parents", label: "Parents & Children" },
    { key: "elderly", label: "Elderly & Sensitive" },
  ];

  const Tab = ({ t }) => (
    <button
      onClick={() => setActive(t.key)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active === t.key
          ? "bg-green-600 text-white shadow-sm"
          : "bg-white text-gray-600 hover:bg-green-50 hover:text-green-700 border"
      }`}
    >
      {t.label}
    </button>
  );

  const Section = ({ title, items, type = "do" }) => (
    <div className="bg-white rounded-lg p-4 shadow border">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${type === "do" ? "bg-green-500" : "bg-red-500"}`} />
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={`mt-1 ${type === "do" ? "text-green-500" : "text-red-500"}`}>
              {type === "do" ? "✔" : "✘"}
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const body = () => {
    if (active === "general")
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Section
            title="Do's"
            type="do"
            items={["Wear a N95 mask outdoors", "Keep windows closed during high AQI hours", "Use air purifiers indoors", "Stay hydrated"]}
          />
          <Section
            title="Don'ts"
            type="dont"
            items={["Avoid jogging in heavy smog", "Don't burn trash", "Avoid outdoor exercise near traffic", "Ignore persistent symptoms"]}
          />
        </div>
      );
    if (active === "parents")
      return <Section title="Tips for parents" items={["Limit outdoor play during red alerts", "Use child masks", "Monitor school advisories"]} />;
    return <Section title="Sensitive groups" items={["Keep inhalers handy", "Consult physician if symptoms persist", "Avoid peak hours outdoors"]} />;
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-2">Health Guidance</h1>
      <div className="bg-red-50 text-red-700 text-sm border border-red-200 rounded-md p-3 mb-4">
        Current AQI: 182 (Unhealthy). Keep outdoor time limited.
      </div>
      <div className="flex flex-wrap gap-2 mb-6">{tabs.map((t) => <Tab key={t.key} t={t} />)}</div>
      {body()}
    </div>
  );
}
