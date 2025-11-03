import PageHeader from "../components/PageHeader";

export default function LiveMap() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <PageHeader />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">
          Live Map & Stats (placeholder)
        </h2>
        <p className="text-sm text-gray-600">
          Map and statistics will render here.
        </p>
      </div>
    </div>
  );
}
