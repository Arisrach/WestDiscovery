import { useEffect, useState } from "react";

const SHEET_ID = "1_TkZ4zo8HvIABAx6eYFEW2l0805Z_hNxFbmvdkVOMKw";
const SHEET_NAME = "Saldo Bank";
const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

export default function GoogleSheetMusala() {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const text = await response.text();

         // Konversi CSV ke array
        const rows = text.split("\n").map((row) => row.split(","));

        // Ambil nilai dari D16 (baris ke-16, kolom ke-4)
        const rawValue = rows[0]?.[7] ?? "Tidak ditemukan"; // D16 ada di index [15][3]

        // Menghapus huruf dan tanda baca, hanya menyisakan angka
        const numericValue = rawValue.replace(/[^\d]/g, ""); 

        // Konversi ke angka
        const numberValue = Number(numericValue);

        // Format ke Rupiah
        const formattedRupiah = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 2,
        }).format(numberValue);

        setValue(formattedRupiah);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        setValue("Error fetching data");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>{value}</p>
    </div>
  );
}
