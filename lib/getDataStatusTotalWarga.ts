const SHEET_ID = "11IR_tvKKpxjYS7QMEANMVlFGHjEQgyzEGlm_EcZhy48";
const SHEET_NAME = "Sheet1";
const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

export async function fetchStatusTotalData() {
  const res = await fetch(URL);
  const text = await res.text();

  // Pisahkan setiap baris CSV
  const rows = text.split("\n").map((row) =>
    row.split(",").map((cell) => cell.replace(/["\r\n]/g, "").trim())
  );

  // Ambil hanya baris yang relevan (A3:A135 → index 2 hingga 134)
  const filteredRows = rows.slice(2, 135);

  // Ambil hanya kolom 'Status' (kolom ke-4 dengan index 4)
  const statusCounts = new Map<string, number>();

  filteredRows.forEach((row) => {
    const status = row[4] || "Tanpa Status"; // Jika kosong, beri label "Tanpa Status"
    statusCounts.set(status, (statusCounts.get(status) || 0) + 1);
  });

  // Konversi hasil ke dalam array objek
  return Array.from(statusCounts, ([status, jumlah]) => ({ status, jumlah }));
}
