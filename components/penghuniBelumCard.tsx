import { useEffect, useState } from "react";
import { UserMinus } from "lucide-react";

const SHEET_ID = "11IR_tvKKpxjYS7QMEANMVlFGHjEQgyzEGlm_EcZhy48";
const SHEET_NAME = "Sheet1";
const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

export default function penghuniBelumCard() {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const text = await response.text();

         // Konversi CSV ke array
        const rows = text.split("\n").map((row) => row.split(","));

        // Ambil nilai dari D16 (baris ke-16, kolom ke-4)
        const rawValue = rows[137]?.[2] ?? "Tidak ditemukan"; // D16 ada di index [15][3]

        // Menghapus huruf dan tanda baca, hanya menyisakan angka
        const numericValue = rawValue.replace(/[^\d]/g, ""); 

        // Konversi ke angka
        const numberValue = Number(numericValue);

        // Format ke Rupiah
        const formattedRupiah = new Intl.NumberFormat("id-ID", {}).format(numberValue);

        setValue(formattedRupiah);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        setValue("Error fetching data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center p-4 bg-white border-2 border-black rounded-md shadow-[8px_8px_0px_#000]">
      <div className="p-3 bg-stone-100 rounded-full">
        <UserMinus className="w-6 h-6 text-stone-600" />
      </div>
      <div className="ml-4">
        <h2 className="text-md font-thin text-gray-500">Belum Menetap</h2>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
