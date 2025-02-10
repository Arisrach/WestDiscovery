import Layout from '../components/Layout';
import GoogleSheetMain from "../components/GoogleSheetMain";
import GoogleSheetMusala from "../components/GoogleSheetMusala";
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* <h1 className="text-2xl font-bold text-center mb-6">Welcome to Your Dashboard</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-0 ">
        {/* Card 1: Main Balance */}
        <div className="bg-white border-2 border-black p-6 rounded-lg shadow-[8px_8px_0px_#000]">
          <h2 className="text-md font-semibold font-brutal text-stone-500">Main Balance</h2>
          <div className="text-3xl font-bold mt-1"><GoogleSheetMain /></div>
          <div className="mt-4 flex flex-nowrap gap-3">
            <button className="w-full bg-green-400 text-black font-bold border-2 border-black px-4 py-2 rounded-md shadow-[4px_4px_0px_#000] hover:bg-green-600">
              Transfer
            </button>
            <Link href="/reportMain" className="text-center w-full bg-red-400 text-black font-bold border-2 border-black px-4 py-2 rounded-md shadow-[4px_4px_0px_#000] hover:bg-red-600">
              Report
            </Link>
          </div>
        </div>

        {/* Card 2: Savings Balance */}
        <div className="bg-white border-2 border-black p-6 rounded-lg shadow-[8px_8px_0px_#000]">
          <h2 className="text-md font-semibold font-brutal text-stone-500">Musala</h2>
          <div className="text-3xl font-bold mt-1"><GoogleSheetMusala /></div>
          <div className="mt-4 flex gap-3">
            <button className="w-full bg-green-400 text-black font-bold border-2 border-black px-4 py-2 rounded-md shadow-[4px_4px_0px_#000] hover:bg-green-600">
              Transfer
            </button>
            <button className="w-full bg-red-400 text-black font-bold border-2 border-black px-4 py-2 rounded-md shadow-[4px_4px_0px_#000] hover:bg-red-600">
              Report
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
