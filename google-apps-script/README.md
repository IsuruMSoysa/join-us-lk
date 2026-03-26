# Google Apps Script (RSVP → Sheet)

1. Create a Google Sheet with headers in row 1:
   - **A1**: Timestamp
   - **B1**: Name
   - **C1**: Attendance

2. In the sheet: **Extensions → Apps Script**.

3. Replace the default code with the contents of `Code.gs` in this folder, then **Save** (disk icon).

4. **Deploy → New deployment**:
   - Select type: **Web app**
   - **Execute as**: Me
   - **Who has access**: **Anyone** (so guests can submit without signing in)

5. **Authorize** when prompted (first time only).

6. Copy the **Web app URL** and add to your project `.env`:

   ```env
   GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
   ```

7. On Vercel, add the same variable in **Project → Settings → Environment Variables**.

Redeploy the web app after script changes (**Deploy → Manage deployments → Edit** → new version).
