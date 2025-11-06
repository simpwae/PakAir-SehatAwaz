import { useEffect, useRef } from "react";

// Expected site shape: { id, name, lat, lon, aqi }
export default function MapWithSites({ sites = [], height = 520 }) {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);

  // Helper: AQI -> color
  const getAQIColor = (aqi) => {
    if (aqi == null || Number.isNaN(aqi)) return "#9ca3af"; // gray
    if (aqi <= 50) return "#22c55e"; // green
    if (aqi <= 100) return "#eab308"; // yellow
    if (aqi <= 150) return "#f97316"; // orange
    if (aqi <= 200) return "#ef4444"; // red
    if (aqi <= 300) return "#7c3aed"; // purple
    return "#6b21a8"; // maroon
  };

  useEffect(() => {
    const L = window.L;
    if (!L) return;

    // Initialize map once
    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current, {
        center: [30.35, 69.35], // Pakistan approx center
        zoom: 5,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(leafletMapRef.current);
    }

    const map = leafletMapRef.current;

    // Clear existing layer group if any
    let group = L.layerGroup();

    (sites || []).forEach((s, i) => {
      const lat = Number(s.lat ?? s.latitude ?? s.Latitude);
      const lon = Number(s.lon ?? s.lng ?? s.longitude ?? s.Longitude);
      if (Number.isNaN(lat) || Number.isNaN(lon)) return;
      const aqi = Number(s.aqi ?? s.AQI ?? s.aqi_value);
      const color = getAQIColor(aqi);

      // Add small deterministic jitter so overlapping points are visible
      const jitterLat = lat + ((i % 5) - 2) * 0.003;
      const jitterLon = lon + (((i * 3) % 5) - 2) * 0.003;

      const circle = L.circleMarker([jitterLat, jitterLon], {
        radius: 8,
        color,
        weight: 1.5,
        opacity: 0.8,
        fillColor: color,
        fillOpacity: 0.45,
      });
      const baseName = s.name || s.site || s.University || s.Campus;
      const name = baseName || `Site ${s.id ?? ""}`;
      const popup = `<div style="font-size:12px"><strong>${name}</strong><br/>AQI: ${
        aqi ?? "N/A"
      }</div>`;
      circle.bindPopup(popup);
      group.addLayer(circle);
    });

    group.addTo(map);

    // Fit bounds if we have sites
    try {
      if (sites && sites.length) {
        const bounds = group.getBounds();
        if (bounds && bounds.isValid()) map.fitBounds(bounds.pad(0.2));
      }
    } catch {}

    // Cleanup on rerender: remove layer group
    return () => {
      try { map.removeLayer(group); } catch {}
    };
  }, [sites]);

  return (
    <div className="relative">
      <div ref={mapRef} style={{ width: "100%", height }} />
      {/* Legend */}
      <div className="absolute right-4 bottom-4 bg-white/90 rounded-md p-3 text-xs shadow">
        <div className="font-semibold mb-2">AQI Levels</div>
        <ul className="space-y-1">
          <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{background:'#22c55e'}}/> Good (0-50)</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{background:'#eab308'}}/> Moderate (51-100)</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{background:'#f97316'}}/> Unhealthy-SG (101-150)</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{background:'#ef4444'}}/> Unhealthy (151-200)</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{background:'#7c3aed'}}/> Very Unhealthy (201-300)</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{background:'#6b21a8'}}/> Hazardous (300+)</li>
        </ul>
      </div>
    </div>
  );
}
