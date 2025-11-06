// Simple Nominatim geocoder with localStorage caching
// Usage: const sites2 = await geocodeUniversities(sites)

const NOMINATIM = "https://nominatim.openstreetmap.org/search";

function cacheGet(key) {
  try {
    const v = localStorage.getItem(key);
    if (!v) return null;
    return JSON.parse(v);
  } catch {
    return null;
  }
}

function cacheSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function buildQuery(site) {
  const uni = site.University || site.name || site.site || "";
  const campus = site.Campus || "";
  const q = [uni, campus, "Pakistan"].filter(Boolean).join(", ");
  return q;
}

export async function geocodeUniversities(sites = [], { force = true } = {}) {
  const out = [];
  for (const s of sites) {
    // If lat/lon are already valid and not identical placeholders, keep them
    const lat = Number(s.lat ?? s.latitude ?? s.Latitude);
    const lon = Number(s.lon ?? s.lng ?? s.longitude ?? s.Longitude);

    // Heuristic: if coords are missing or many entries duplicate a single point,
    // we will geocode using the university+campus name.
    let needsGeocode = force || Number.isNaN(lat) || Number.isNaN(lon);

    const q = buildQuery(s);
    const cacheKey = `gc:${q}`;

    let useLat = lat;
    let useLon = lon;

    if (!needsGeocode) {
      // If all entries shared the exact same coords originally, caller can still force geocode
      // by passing a flag; here we simply prefer existing coordinates.
    } else {
      const cached = cacheGet(cacheKey);
      if (cached?.lat && cached?.lon) {
        useLat = cached.lat;
        useLon = cached.lon;
      } else if (q) {
        try {
          const url = `${NOMINATIM}?format=json&q=${encodeURIComponent(q)}&limit=1&addressdetails=0`;
          const res = await fetch(url, {
            headers: {
              "Accept": "application/json",
              // Identify the app politely per Nominatim usage policy
              "User-Agent": "PakAir-SehatAwaz/1.0 (educational)"
            }
          });
          const data = await res.json();
          if (Array.isArray(data) && data[0]) {
            useLat = Number(data[0].lat);
            useLon = Number(data[0].lon);
            cacheSet(cacheKey, { lat: useLat, lon: useLon });
          }
        } catch {}
      }
    }

    out.push({ ...s, lat: useLat, lon: useLon, aqi: s.aqi ?? s.AQI ?? s.aqi_value });
  }
  return out;
}
