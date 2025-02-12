import { useState } from "react";
import Layout from "../components/Layout";
import GoogleSheetMain from "../components/GoogleSheetMain";
import GoogleSheetMusala from "../components/GoogleSheetMusala";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const events = [
  {
    date: "13 feb",
    image: "/kebun.jpg",
    title: "Malam Nisfu Sya'ban",
    description:
      "Mari manfaatkan malam istimewa ini dengan doa, dzikir, dan ibadah. Semoga Allah melimpahkan rahmat dan keberkahan bagi kita semua!",
    time: "18:00",
  },
  {
    date: "16 feb",
    image: "/kebun.jpg",
    title: "Gotong Royong Warga: Bersih, Rapi, dan Nyaman",
    description:
      "Saatnya bersatu! Mari ikut kerja bakti bersama warga untuk lingkungan yang lebih bersih, sehat, dan nyaman bagi kita semua.",
    time: "07:00",
  },
  {
    date: "16 feb",
    image: "/poplin.jpg",
    title: "Alhamdulillah! Poplin Dukung Musala Kita",
    description:
      "kegiatan dari team poplin pembersihan musola kita dan dukung musala kita semoga membawa manfaat bagi banyak orang!",
    time: "-",
  },
  {
    date: "1 - 28 Mar",
    image: "/mengaji.png",
    title: "Malam Penuh Berkah: Tadarus Bersama",
    description:
      "Raih pahala dan ketenangan hati dengan tadarus Al-Qur’an. Mari mendekatkan diri kepada Allah di bulan suci ini!",
    time: "-",
  },
  {
    date: "1 - 28 Mar",
    image: "/ibadah.webp",
    title: "Cahaya Ramadan: Tarawih Berjamaah",
    description: "Jadikan malam Ramadan lebih bermakna dengan mendirikan shalat tarawih. Yuk, bersama-sama meraih keberkahan!",
    time: "-",
  },
  {
    date: "1 - 28 Mar",
    image: "/kurmaj.webp",
    title: "Berbagi Berkah: Sedekah Takjil Ramadan",
    description: "Mari tebarkan kebaikan dengan berbagi takjil untuk saudara kita yang berpuasa. Satu kebaikan kecil, pahala berlipat ganda!",
    time: "-",
  },
  {
    date: "8 Mar",
    image: "/takjil.jpeg",
    title: "Buka Bersama & Kajian: Meraih Berkah Ramadan",
    description:
      "Nikmati kebersamaan dalam buka puasa bersama dan kajian inspiratif bersama Ustad Hasan.",
    time: "16:00",
  },
  {
    date: "22 Mar",
    image: "/takjil.jpeg",
    title: "Berkah Ramadan: Buka Bersama & Kajian Spesial",
    description:
      "Jangan lewatkan kesempatan emas untuk berbuka bersama dan menyimak kajian penuh hikmah dari Ustad Hasan.",
    time: "16:00",
  },
];

// Mengelompokkan event berdasarkan tanggal
const groupedEvents = events.reduce((acc, event) => {
  acc[event.date] = acc[event.date] || [];
  acc[event.date].push(event);
  return acc;
}, {} as Record<string, typeof events>);

export default function Home() {
  const [activeTab, setActiveTab] = useState("event");

  return (
    <Layout>
      <div className="relative w-full max-w-2xl mx-auto mt-5 mb-5 p-6 border-2 border-black rounded-md shadow-[8px_8px_0px_#000] bg-yellow-400 flex items-center">
      <div className="flex-1">
        <h2 className="text-xl text-gray-800">Cek <span className="font-bold">jadwal<br></br>takjil</span> mu!</h2>
        <div className="mt-4">
          <Link href="/jadwaltakjil">
            <div className="px-6 py-1 w-2/6 text-lg flex items-center justify-center gap-2 bg-blue-600 font-bold text-white border-2 border-black rounded-md shadow-[8px_8px_0px_#000] hover:bg-blue-700">
              Lihat
            </div>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 md:w-40 lg:w-48">
        <Image 
          src="/artamal.png" 
          alt="Orang menyiapkan takjil" 
          width={200} 
          height={200} 
          className="object-cover"
        />
      </div>
    </div>
      {/* Tab Bar */}
      <div className="w-full flex space-x-2 mb-6">
        {["event", "balance"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-2 text-center px-4 py-1 rounded-full border-2 border-black font-semibold transition-all ${
              activeTab === tab
                ? "bg-black text-white"
                : "bg-gray-100 border-black text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Event */}
      {activeTab === "event" && (
        <div className="flex flex-col space-y-4 px-2 max-w-md mx-auto">
         {Object.entries(groupedEvents).map(([date, events]) => (
  <div key={date} className="grid grid-cols-[auto_1fr] gap-4 items-start">
    <div className="text-sm font-semibold border-2 border-black bg-red-500 px-2 py-1 rounded-full text-white min-w-[50px]">
      {date}
    </div>
    <div className="flex flex-col space-y-4 w-full">
      {events.map((event, index) => (
        <div key={index} className="w-full border-2 border-black rounded-md shadow-[8px_8px_0px_#000] bg-white overflow-hidden">
          <div className="p-4 flex flex-col gap-2">
            {/* <Image
              src={event.image}
              alt="Event Image"
              width={300}
              height={200}
              className="rounded-lg object-cover w-full"
            /> */}
            <h3 className="text-sm font-bold text-gray-700">{event.title}</h3>
            <p className="text-sm text-gray-700">{event.description}</p>
            {event.time !== "-" && (
            <div className="text-sm text-white font-bold bg-black py-1 w-3/6 text-center rounded-full">Jam : {event.time}</div>
            )}
            {/* Ganti Tombol dengan Link */}
            {event.title === "Berbagi Berkah: Sedekah Takjil Ramadan" && (
              <Link
                href="/jadwaltakjil" // Ganti dengan link tujuan
                className="mt-2 w-full border-2 border-black bg-blue-500 text-white font-bold px-4 py-2 rounded-md shadow-[4px_4px_0px_#000] hover:bg-blue-700 text-center"
              >
                Lihat Jadwal
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
))}


        </div>
      )}

      {/* Tab Balance */}
      {activeTab === "balance" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-0">
          {/* Card 1: Main Balance */}
          <div className="bg-white border-2 border-black p-6 rounded-lg shadow-[8px_8px_0px_#000]">
            <h2 className="text-md font-semibold text-stone-500">Paguyuban Balance</h2>
            <div className="text-3xl font-bold mt-1">
              <GoogleSheetMain />
            </div>
            <div className="mt-4 flex gap-3">
              <button className="w-full bg-green-400 text-black font-bold border-2 border-black px-4 py-2 rounded-md shadow-[4px_4px_0px_#000] hover:bg-green-600">
                Transfer
              </button>
              <Link
                href="/reportMain"
                className="w-full text-center bg-red-400 text-black font-bold border-2 border-black px-4 py-2 rounded-md shadow-[4px_4px_0px_#000] hover:bg-red-600"
              >
                Report
              </Link>
            </div>
          </div>

          {/* Card 2: Musala Balance */}
          <div className="bg-white border-2 border-black p-6 rounded-lg shadow-[8px_8px_0px_#000]">
            <h2 className="text-md font-semibold text-stone-500">Musala Balance</h2>
            <div className="text-3xl font-bold mt-1">
              <GoogleSheetMusala />
            </div>
            <div className="mt-4 flex gap-3">
              <button className="w-full bg-green-400 text-black font-bold border-2 border-black px-4 py-2 rounded-md shadow-[4px_4px_0px_#000] hover:bg-green-600">
                Transfer
              </button>
              <Link
                href="https://docs.google.com/spreadsheets/d/1_TkZ4zo8HvIABAx6eYFEW2l0805Z_hNxFbmvdkVOMKw/edit?usp=sharing"
                className="w-full text-center bg-yellow-400 text-black font-bold border-2 border-black px-4 py-2 rounded-md shadow-[4px_4px_0px_#000] hover:bg-yellow-600"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
