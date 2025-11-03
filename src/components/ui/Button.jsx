export default function CustomButton({
  children,
  variant = "default",
  onClick,
  className = "",
}) {
  const baseStyles =
    "px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2";

  const variants = {
    default: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-white/10 text-white hover:bg-white/20",
    icon: "p-2 hover:bg-green-50 rounded-lg text-gray-600 hover:text-green-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
