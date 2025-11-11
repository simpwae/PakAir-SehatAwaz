import { isClaudeHaikuEnabled } from "../utils/featureFlags";

export function ClaudeHaikuFeature() {
  if (!isClaudeHaikuEnabled()) {
    return null; // Feature is disabled, don't render
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-blue-900">
        ✨ Claude Haiku 4.5 Enabled
      </h3>
      <p className="text-xs text-blue-700 mt-1">
        Advanced AI features powered by Claude Haiku are now available.
      </p>
    </div>
  );
}

export default ClaudeHaikuFeature;
