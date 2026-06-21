---
description: Scrape Google Maps business listings for a query + city (drives the google-maps-scraper skill)
argument-hint: <business type> in <city, ST> [depth]
---
The user wants to scrape Google Maps business listings. Query: **$ARGUMENTS**

Use the `google-maps-scraper` skill. Execute:

1. **Health-check** the API: `curl -s http://localhost:8080/api/v1/jobs`. If it's down, run `docker compose up -d` from the kit root, wait ~10s, and retry.
2. **Parse** the business type and city from the query. Look up the city's **latitude/longitude** (as strings).
3. **Create the job** (`POST /api/v1/jobs`) with the required fields — `keywords` (location baked into each term), `lat`/`lon` (strings), `max_time` (seconds, default `300`), and `depth` (use the number in the query, else `5`).
4. **Poll to completion in the BACKGROUND** (the Bash tool blocks foreground `sleep` — use `run_in_background: true` and read the output file when notified). Then download the CSV.
5. **Present ONLY money-useful lead fields** in a clean markdown table: `name (title), phone, emails, website, category, address, review_rating, review_count`. **Drop everything else** — especially `latitude`/`longitude`, IDs, hours, images, review blobs. Save to a file on disk; do NOT dump the full 34-column CSV into chat. (Include dropped fields only if the user explicitly asks.)

**Warn, don't block:** if the request is high-volume (high `depth`, many keywords, or repeated runs),
print ONE short warning that over-use can get their IP temporarily rate-limited by Google and suggest
adding proxies — then **proceed with the scrape anyway**. Do not gate or demand confirmation just for a
big job. Only refuse outright for clearly abusive use (surveilling individuals, spam/harassment). Also
remind the user about PII / Google ToS if they'll store or contact the data.
