// Frontend feature flags - read from environment or backend

export const FEATURES = {
  ENABLE_CLAUDE_HAIKU: import.meta.env.VITE_ENABLE_CLAUDE_HAIKU === "true",
};

export const isClaudeHaikuEnabled = () => {
  return FEATURES.ENABLE_CLAUDE_HAIKU === true;
};

// Fetch feature status from backend
export const fetchFeatureStatus = async () => {
  try {
    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
    const response = await fetch(`${API_BASE_URL}/features/status`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch feature status:", error);
    return { features: FEATURES, error: true };
  }
};

export default FEATURES;
