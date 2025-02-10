import { useEffect, useState } from "react";
import { Triangle } from "lucide-react"; // Import ikon segitiga
import { h1 } from "framer-motion/client";

export default function GoogleSheetCards() {
  const [data, setData] = useState<Array<[string, number, number]>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetUrl = `https://docs.google.com/spreadsheets/d/1vC8htlm9EsqeUDsyS0CNgveHgZf-fEC0o8-R-oWx4BM/gviz/tq?tqx=out:csv`;
        const response = await fetch(sheetUrl);
        const text = await response.text();

        console.log("🔍 Raw CSV Data:\n", text);

        // Deteksi pemisah (bisa koma `,` atau tab `\t`)
        const delimiter = text.includes("\t") ? "\t" : ",";

        // Parsing CSV ke array
        const rows = text.split("\n").map((row) => row.split(delimiter));

        console.log("✅ Parsed Rows:", rows);

        // Ambil data dari A5:D16 (Baris 5-16, Kolom A-D)
        const selectedData: Array<[string, number, number]> = rows
          .slice(2, 14)
          .map((row) => {
            const bulan = row[0] ? row[0].replace(/[^\w\s]/gi, "").trim() : "No Data";
            const masuk = formatRupiahToNumber(row[1]);
            const keluar = formatRupiahToNumber(row[3]);
            return [bulan, masuk, keluar];
          });

        console.log("🎯 Selected Data:", selectedData);

        setData(selectedData);
      } catch (error) {
        console.error("🚨 Error fetching Google Sheets data:", error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  // Fungsi membersihkan format "Rp2.689.700,00" jadi angka
  const formatRupiahToNumber = (value: string | undefined): number => {
    if (!value) return 0;
    return parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-0">
      {data.map((row, index) => (
        <div key={index}>
          <h2 className="text-lg font-bold text-gray-700">{row[0]}</h2>
          <div className="mt-1 flex flex-nowrap gap-3">
          <div className="bg-white border-2 w-full border-black p-6 rounded-lg shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-2 text-green-600 font-bold">
            <span>Rp {row[1].toLocaleString("id-ID")}</span>
            <Triangle size={16} className="fill-green-500 stroke-green-500 rotate-0" />
          </div>
        </div>
          <div className="bg-white border-2 w-full border-black p-6 rounded-lg shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-2 text-red-600 font-bold">
            <span>Rp {row[2].toLocaleString("id-ID")}</span>
            <Triangle size={16} className="fill-red-500 stroke-red-500 rotate-180" />
          </div>
        </div>
        </div>
        </div>
      ))}
    </div>
  );
}
