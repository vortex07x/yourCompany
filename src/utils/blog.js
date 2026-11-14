// "2026-06-04" -> "04-Jun-2026". UTC so the day never shifts with the viewer's timezone.
export const formatDate = (iso) =>
  new Date(iso)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })
    .replaceAll(" ", "-");