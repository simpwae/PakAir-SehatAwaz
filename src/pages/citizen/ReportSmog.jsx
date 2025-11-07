import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reportsAPI } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

export default function ReportSmog() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    useCurrentLocation: true,
    address: "",
    latitude: "",
    longitude: "",
    city: "",
    province: "",
    description: "",
    title: "",
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [locationError, setLocationError] = useState("");

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
        setIsLoading(false);
      },
      (error) => {
        setLocationError("Unable to retrieve your location. Please enter manually.");
        setIsLoading(false);
      }
    );
  };

  // Handle file selection
  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      if (f.size > 20 * 1024 * 1024) {
        setError("File size must be less than 20MB");
        return;
      }
      setFile(f);
      setFileName(f.name);
      setError("");
    }
  };

  const onBrowse = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      if (f.size > 20 * 1024 * 1024) {
        setError("File size must be less than 20MB");
        return;
      }
      setFile(f);
      setFileName(f.name);
      setError("");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Check authentication
    if (!isAuthenticated) {
      setError("Please login to submit a report");
      navigate("/citizen/login");
      return;
    }

    // Validate file
    if (!file) {
      setError("Please upload an image or video");
      return;
    }

    // Validate location
    if (formData.useCurrentLocation) {
      if (!formData.latitude || !formData.longitude) {
        setError("Please enable location access or enter location manually");
        return;
      }
    } else {
      if (!formData.address && (!formData.latitude || !formData.longitude)) {
        setError("Please enter an address or coordinates");
        return;
      }
    }

    setIsLoading(true);

    try {
      // Create FormData
      const submitData = new FormData();
      submitData.append("media", file);
      submitData.append("description", formData.description);
      submitData.append("title", formData.title || "Air Quality Report");
      submitData.append("useCurrentLocation", formData.useCurrentLocation.toString());
      submitData.append("address", formData.address);
      submitData.append("latitude", formData.latitude || "0");
      submitData.append("longitude", formData.longitude || "0");
      submitData.append("city", formData.city);
      submitData.append("province", formData.province);

      // Submit report
      const response = await reportsAPI.createReport(submitData);

      if (response.success) {
        setSuccess(true);
        setFile(null);
        setFileName("");
        setFormData({
          useCurrentLocation: true,
          address: "",
          latitude: "",
          longitude: "",
          city: "",
          province: "",
          description: "",
          title: "",
        });
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError(response.message || "Failed to submit report");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to submit report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get location when checkbox is checked
  const handleLocationToggle = (e) => {
    const checked = e.target.checked;
    setFormData({ ...formData, useCurrentLocation: checked });
    if (checked) {
      getCurrentLocation();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-2">Report Your Local Conditions</h1>
      <p className="text-sm text-gray-500 mb-6">Upload a photo or short video (max 20MB).</p>

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          Report submitted successfully! It will be reviewed by officials.
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="text-5xl mb-2">☁️</div>
          <p className="text-sm text-gray-600 mb-3">
            Drag and drop files here, or
            <button
              className="mx-1 text-green-700 underline"
              onClick={() => inputRef.current?.click()}
              type="button"
            >
              click to browse
            </button>
          </p>
          <p className="text-xs text-gray-400">Supported: JPG, PNG, MP4. Max 20MB</p>
          {fileName && (
            <div className="mt-3 text-xs text-gray-600 font-medium">Selected: {fileName}</div>
          )}
          <input
            ref={inputRef}
            onChange={onBrowse}
            type="file"
            accept="image/*,video/mp4"
            hidden
            required
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="useCurrentLocation"
              className="rounded"
              checked={formData.useCurrentLocation}
              onChange={handleLocationToggle}
            />
            Use Current Location
          </label>

          {formData.useCurrentLocation && (
            <div className="text-xs text-gray-600">
              {formData.latitude && formData.longitude ? (
                <span className="text-green-600">
                  Location: {formData.latitude}, {formData.longitude}
                </span>
              ) : (
                <span className="text-orange-600">Getting your location...</span>
              )}
              {locationError && (
                <div className="text-red-600 mt-1">{locationError}</div>
              )}
            </div>
          )}

          {!formData.useCurrentLocation && (
            <>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border rounded-md text-sm"
                placeholder="Enter address..."
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-md text-sm"
                  placeholder="Latitude"
                />
                <input
                  name="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-md text-sm"
                  placeholder="Longitude"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-md text-sm"
                  placeholder="City (optional)"
                />
                <input
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-md text-sm"
                  placeholder="Province (optional)"
                />
              </div>
            </>
          )}

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border rounded-md text-sm"
            placeholder="Report Title (optional)"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border rounded-md text-sm"
            rows={3}
            placeholder="Describe the conditions... (optional)"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
          >
            {isLoading ? "Submitting..." : "Submit Report / جمع کروائیں"}
          </button>
        </div>
      </form>

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
  );
}
