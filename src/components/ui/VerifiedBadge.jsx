export default function VerifiedBadge({ className = "" }) {
  return (
    <span
      className={`px-2 py-0.5 bg-green-600 text-white text-xs font-medium rounded-full flex items-center gap-1 ${className}`}
    >
      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Verified
    </span>
  );
}
