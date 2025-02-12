const SHEET_ID = "11IR_tvKKpxjYS7QMEANMVlFGHjEQgyzEGlm_EcZhy48";
const SHEET_NAME = "Sheet1";
const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

export async function DataStatusWarga() {
  const res = await fetch(URL);
  const text = await res.text();

  // Pisahkan setiap baris CSV
  const rows = text.split("\n").map((row) =>
    row.split(",").map((cell) => cell.replace(/["\r\n]/g, "").trim())
  );

  // Pastikan mulai dari A3 (index ke-2) hingga A135 (index ke-134)
  const filteredRows = rows.slice(1, 133);

  // Header yang diharapkan
  const headers = [
    "No", "Nama","Keterangan", "Alamat", "Status"];

  return filteredRows.map((row) => {
    let entry: any = {};
    headers.forEach((header, index) => {
      entry[header] = row[index] || ""; // Isi kosong jika tidak ada nilai
    });
    return entry;
  });


}
