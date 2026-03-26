/**
 * Wedding RSVP → Google Sheet
 *
 * Setup:
 * 1. Open your Google Sheet. Row 1 headers: Timestamp | Name | Attendance
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL into .env as VITE_GOOGLE_SHEETS_SCRIPT_URL
 *
 * Submissions are appended as new rows. POST as application/x-www-form-urlencoded
 * (name, attendance) to avoid CORS preflight issues from the browser.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var name =
      e.parameter && e.parameter.name ? String(e.parameter.name).trim() : "";
    var attendance =
      e.parameter && e.parameter.attendance
        ? String(e.parameter.attendance).trim()
        : "";

    if (!name) {
      return jsonResponse({ ok: false, error: "Name is required" });
    }
    if (attendance !== "yes" && attendance !== "no") {
      return jsonResponse({ ok: false, error: "Attendance must be yes or no" });
    }

    var timestamp = new Date();
    var attendanceLabel =
      attendance === "yes" ? "Joyfully Accept" : "Regretfully Decline";
    sheet.appendRow([timestamp, name, attendanceLabel]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: String(err && err.message ? err.message : err),
    });
  }
}

/** Optional: open the Web App URL in browser to verify deployment */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      message: "RSVP endpoint is live. Use POST with name and attendance.",
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function jsonResponse(obj) {
  // Apps Script Web App returns 200; client checks obj.ok for validation errors.
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
