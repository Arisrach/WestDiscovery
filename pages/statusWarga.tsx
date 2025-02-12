import { useEffect, useState } from "react";
import { DataStatusWarga } from "@/lib/getDataStatusWarga";
import PenghuniTetapCard from "../components/penghuniTetapCard";
import PenghuniKontrakCard from "../components/penghuniKontrakCard";
import PenghuniSinggahCard from "../components/penghuniSinggahCard";
import PenghuniBelumCard from "../components/penghuniBelumCard";
import PenghuniTidakCard from "../components/penghuniTidakCard";
import PenghuniTotalWargaCard from "../components/penghuniTotalWargaCard";
import Layout from "../components/Layout";
import { Search } from 'lucide-react';

export default function StatusWarga() {
  const [payments, setPayments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStatus() {
      try {
        const data = await DataStatusWarga();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStatus();
  }, []);

  // Fungsi untuk filter data berdasarkan nama atau alamat
  const filteredPayments = payments.filter(
    (payment) =>
      payment.Nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.Alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.Status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 px-0 mb-5">
      <PenghuniTotalWargaCard />
      <PenghuniTetapCard />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 px-0 mb-6">
      <PenghuniKontrakCard />
      <PenghuniSinggahCard />
      <PenghuniBelumCard />
      <PenghuniTidakCard />
      </div>
      <h2 className="text-xl border-2 border-black rounded-md shadow-[8px_8px_0px_#000] text-center mb-2 bg-yellow-400 px-2 py-1 font-bold font-gothic text-black max-w-[200px]">
        Status Warga
      </h2>
      <div className="mt-5">
      <div className="relative w-full">
        <Search className="absolute left-3 top-3 text-black" size={30} />
        <input
          type="text"
          placeholder="Cari nama atau no rumah"
          className="w-full p-3 pl-14 mb-4 border-2 border-black bg-white text-black font-light rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        {/* Tampilkan loading jika data masih di-fetch */}
        {loading ? (
          <div className="text-center py-4">
            <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
            <p className="mt-2 text-gray-600">Loading data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full rounded-md border-collapse text-left border-2 border-black">
              <thead>
                <tr className="bg-black text-white">
                  {payments.length > 0 &&
                    Object.keys(payments[0]).map((header) => (
                      <th key={header} className="border-2 border-black p-3">
                        {header}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {Object.values(row).map((value, index) => (
                      <td key={index} className="border-2 border-black p-3">
                        {value !== null && value !== undefined ? value.toString() : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
