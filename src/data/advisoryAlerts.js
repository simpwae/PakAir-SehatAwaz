export const advisoryAlerts = [
  {
    id: 1,
    type: "HIGH-RISK",
    severity: "high",
    location: "Peshawar",
    observation:
      "AQI is forecasted to be >200 (Very Unhealthy) for the next 48 hours. 28 schools and 3 hospitals are in the hot-zone.",
    recommendation:
      "Issue a public health advisory for school closures and advise hospitals to prepare for an increase in respiratory cases.",
    stats: {
      schools: 28,
      hospitals: 3,
      aqi: 205,
    },
  },
  {
    id: 2,
    type: "MODERATE ALERT",
    severity: "medium",
    location: "University Town",
    observation:
      "AQI levels have remained above 150 (Unhealthy for Sensitive Groups) for 72 consecutive hours. 42 schools and 8 hospitals affected.",
    recommendation:
      "Recommend limiting outdoor activities for sensitive groups. Distribute masks to schools and increase medical staff at hospitals.",
    stats: {
      schools: 42,
      hospitals: 8,
      aqi: 178,
    },
  },
  {
    id: 3,
    type: "WATCH ALERT",
    severity: "low",
    location: "Hayatabad",
    observation:
      "Current AQI is 142 (Unhealthy for Sensitive Groups) with forecasted increase to 175 within 24 hours.",
    recommendation:
      "Pre-emptively alert schools and hospitals. Monitor situation closely for potential escalation.",
    stats: {
      schools: 35,
      hospitals: 5,
      aqi: 142,
    },
  },
];
