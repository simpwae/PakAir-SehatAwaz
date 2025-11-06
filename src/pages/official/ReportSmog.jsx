import { useRef, useState } from "react";
import PageHeader from "../../components/PageHeader";

export default function ReportSmog() {
  const inputRef = useRef(null);
  const [useCurrent, setUseCurrent] = useState(true);
  const [fileName, setFileName] = useState("");

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) setFileName(f.name);
  };

  const onBrowse = (e) => {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <PageHeader mainTabs={[{ key: "report-smog", label: "Report Smog" }]} />

      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-semibold mb-1">Report Your Local Conditions</h2>
        <p className="text-sm text-gray-500 mb-6">Upload a photo or short video (max 20MB).</p>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50"
        >
          <div className="text-5xl mb-2">☁️</div>
          <p className="text-sm text-gray-600 mb-3">
            Drag and drop files here, or
            <button
              className="mx-1 text-primary-600 underline"
              onClick={() => inputRef.current?.click()}
              type="button"
            >
              click to browse
            </button>
          </p>
          <p className="text-xs text-gray-400">Supported: JPG, PNG, MP4. Max 20MB</p>
          {fileName && (
            <div className="mt-3 text-xs text-gray-600">Selected: {fileName}</div>
          )}
          <input ref={inputRef} onChange={onBrowse} type="file" accept="image/*,video/mp4" hidden />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="rounded"
              checked={useCurrent}
              onChange={(e) => setUseCurrent(e.target.checked)}
            />
            Use Current Location
          </label>
          <input
            className="w-full px-3 py-2 bg-gray-50 border rounded-md text-sm"
            placeholder="Enter address or coordinates..."
          />
          <textarea
            className="w-full px-3 py-2 bg-gray-50 border rounded-md text-sm"
            rows={3}
            placeholder="Describe the conditions... (optional)"
          />

          <button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm w-full sm:w-auto">
            Submit Report / جمع کروائیں
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-3">Add Private AQI Station</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="px-3 py-2 bg-gray-50 border rounded-md text-sm" placeholder="Station Name (optional)" />
            <input className="px-3 py-2 bg-gray-50 border rounded-md text-sm" placeholder="Model (e.g., PurpleAir)" />
            <input className="px-3 py-2 bg-gray-50 border rounded-md text-sm" placeholder="Latitude" />
            <input className="px-3 py-2 bg-gray-50 border rounded-md text-sm" placeholder="Longitude" />
          </div>
          <button className="mt-3 px-4 py-2 rounded-md bg-green-600 text-white text-sm">
            Submit Station for Verification
          </button>
        </div>
      </div>
    </div>
  );
}
