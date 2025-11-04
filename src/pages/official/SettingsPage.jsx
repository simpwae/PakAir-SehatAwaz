const styles = {
  page: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 24,
    fontFamily:
      "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    color: "#0f172a",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 16,
  },
  section: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  h3: {
    fontSize: 18,
    fontWeight: 600,
    margin: 0,
  },
  hr: {
    border: 0,
    height: 1,
    background: "#e2e8f0",
    margin: "12px 0 16px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 12,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    outline: "none",
    background: "#f8fafc",
  },
  select: {
    width: 260,
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    background: "#f8fafc",
    outline: "none",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 12,
    color: "#475569",
    fontWeight: 600,
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    color: "#0f172a",
  },
};

function SettingsPage() {
  return (
    <>
      <div style={styles.page}>
        <h1 style={styles.title}>Official Title</h1>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.h3}>Profile</h3>
          </div>
          <hr style={styles.hr} />
          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label htmlFor="officialName" style={styles.label}>
                Full name
              </label>
              <input
                style={styles.input}
                type="text"
                placeholder="Dr. Ahmad Hassan"
                name="officialName"
                id="officialName"
              />
            </div>
            <div style={styles.field}>
              <label htmlFor="officialTitle" style={styles.label}>
                Title
              </label>
              <input
                style={styles.input}
                type="text"
                name="officialTitle"
                id="officialTitle"
                placeholder="Director General"
              />
            </div>
            <div style={styles.field}>
              <label htmlFor="officialDepartment" style={styles.label}>
                Department
              </label>
              <input
                style={styles.input}
                type="text"
                name="officialDepartment"
                id="officialDepartment"
                placeholder="Punjab EPA"
              />
            </div>
            <div style={styles.field}>
              <label htmlFor="officialEmail" style={styles.label}>
                Official email
              </label>
              <input
                style={styles.input}
                type="email"
                name="officialEmail"
                id="officialEmail"
                placeholder="ahmadhassan@epa.gov.pk"
              />
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.h3}>Language</h3>
          </div>
          <hr style={styles.hr} />
          <select name="language" id="language" style={styles.select}>
            <option value="English">English</option>
            <option value="Urdu">Urdu</option>
          </select>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.h3}>Alert Preferences</h3>
          </div>
          <hr style={styles.hr} />
          <p style={{ marginBottom: 10, color: "#334155" }}>
            Send me email notifications for:
          </p>
          <div style={styles.checkboxGroup}>
            <label htmlFor="alerts-new-reports" style={styles.checkboxLabel}>
              <input type="checkbox" id="alerts-new-reports" name="alerts" />
              <span>New citizen reports in my region</span>
            </label>
            <label htmlFor="alerts-critical-aqi" style={styles.checkboxLabel}>
              <input type="checkbox" id="alerts-critical-aqi" name="alerts" />
              <span>Critical AQI forecasts (&gt;200)</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;

