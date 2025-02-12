const SHEET_ID = "1vC8htlm9EsqeUDsyS0CNgveHgZf-fEC0o8-R-oWx4BM";
const SHEET_NAME = "PENERIMAAN";
const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

export async function fetchPayments() {
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
    "No", "Nama", "Alamat", "Januari", "Februari", "Maret", "April", "Mei",
    "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  return filteredRows.map((row) => {
    let entry: any = {};
    headers.forEach((header, index) => {
      entry[header] = row[index] || ""; // Isi kosong jika tidak ada nilai
    });
    return entry;
  });
}
