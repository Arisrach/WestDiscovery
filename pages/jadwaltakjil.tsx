import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Search } from 'lucide-react';

const GOOGLE_SHEET_URL = "https://gsx2json.com/api?id=1c8AsstuSmTMPh6zzzjhs0DOsoC7z8kT1PIzpYnp6HkU&sheet=Sheet1";

interface JadwalItem {
  tanggal: string;
  jadwal: { noRumah: string; nama: string }[];
}

interface GoogleSheetRow {
  Tanggal?: string;
  "No Rumah"?: string;
  Nama?: string;
}

const JadwalTakjil: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [takjilSchedule, setTakjilSchedule] = useState<JadwalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GOOGLE_SHEET_URL)
      .then(response => response.json())
      .then(data => {
        if (!data.rows || !Array.isArray(data.rows)) return;
        
        const parsedData: JadwalItem[] = [];
        (data.rows as GoogleSheetRow[]).forEach(row => {
          const tanggal = row.Tanggal?.trim() || "";
          const noRumah = row["No Rumah"]?.trim() || "";
          const nama = row.Nama?.trim() || "";
          
          if (!tanggal || !noRumah || !nama) return;
          
          const existingDate = parsedData.find(item => item.tanggal === tanggal);
          if (existingDate) {
            existingDate.jadwal.push({ noRumah, nama });
          } else {
            parsedData.push({ tanggal, jadwal: [{ noRumah, nama }] });
          }
        });
        
        setTakjilSchedule(parsedData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const filteredSchedule = takjilSchedule.filter(item =>
    item.jadwal.some(person =>
      person.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.noRumah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tanggal.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Layout>
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl border-2 border-black rounded-md shadow-[8px_8px_0px_#000] text-center mb-6 bg-yellow-400 px-2 py-1 font-bold font-gothic text-black max-w-[200px] ">Jadwal Takjil</h2>
      <div className="relative w-full">
        <Search className="absolute left-3 top-3 text-black" size={30} />
        <input
          type="text"
          placeholder="Cari nama, no rumah, atau tanggal"
          className="w-full p-3 pl-14 mb-4 border-2 border-black bg-white text-black font-light rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <p className="text-center text-black font-bold">Loading...</p>
      ) : (
      <table className="w-full rounded-md border-collapse text-left border-2 border-black">
        <thead>
          <tr className="bg-black text-white">
            <th className="border-2 border-black p-3">Tanggal</th>
            <th className="border-2 border-black p-3">No Rumah</th>
            <th className="border-2 border-black p-3">Nama</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchedule.map((item, index) => (
            <React.Fragment key={index}>
              {item.jadwal.map((person, idx) => (
                <tr key={idx} className="text-left border-t border-2 border-black bg-white">
                  {idx === 0 && (
                    <td rowSpan={item.jadwal.length} className="border-2 border-black p-3">
                      {item.tanggal}
                    </td>
                  )}
                  <td className="border-2 border-black p-3 text-bold">{person.noRumah}</td>
                  <td className="border-2 border-black p-3">{person.nama}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
          )}
    </div>
    </Layout>
  );
};

export default JadwalTakjil;
