import { useState } from "react";
import PageHeader from "../../components/PageHeader";

export default function HealthGuidance() {
  const [active, setActive] = useState("general");

  const tabs = [
    { key: "general", label: "General Advice" },
    { key: "parents", label: "Parents & Children" },
    { key: "elderly", label: "Elderly & Sensitive" },
    { key: "outdoor", label: "Outdoor Photos" },
  ];

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
            <span className={`mt-1 ${type === "do" ? "text-green-500" : "text-red-500"}`}>
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
            items={[
              "Wear a N95 mask outdoors",
              "Keep windows closed during high AQI hours",
              "Use air purifiers indoors",
              "Stay hydrated throughout the day",
            ]}
          />
          <Section
            title="Don'ts"
            type="dont"
            items={[
              "Avoid jogging in heavy smog",
              "Don't smoke or perform incense burning indoors",
              "Avoid outdoor exercise near high-traffic areas",
              "Ignore persistent cough or irritation",
            ]}
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <PageHeader
        mainTabs={tabs}
        activeTab={active}
        onTabSelect={setActive}
      />

      <div className="bg-red-50 text-red-700 text-sm border border-red-200 rounded-md p-3">
        Current AQI: 182 (Unhealthy). Keep outdoor time limited.
      </div>

      <div className="mt-6">{renderBody()}</div>
    </div>
  );
}
