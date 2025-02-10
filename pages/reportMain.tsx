import Layout from '../components/Layout';
import GoogleSheetCard from "@/components/GoogleSheetCard";
import GoogleSheetMain from "../components/GoogleSheetMain";
import Link from 'next/link';

export default function reportMain() {
  return (
    <Layout>
      <div className="bg-white border-2 border-black p-6 rounded-lg shadow-[8px_8px_0px_#000] mb-4">
          <h2 className="text-md font-semibold font-brutal text-stone-500">Paguyuban Balance</h2>
          <div className="text-3xl font-bold mt-1 mb-5"><GoogleSheetMain /></div>
          <Link href="https://docs.google.com/spreadsheets/d/1vC8htlm9EsqeUDsyS0CNgveHgZf-fEC0o8-R-oWx4BM/edit" className="text-center w-full bg-yellow-400 text-black font-bold border-2 border-black px-4 py-2 rounded-md shadow-[4px_4px_0px_#000] hover:bg-yellow-600">
              Details
            </Link>
        </div>
      <GoogleSheetCard />
    </Layout>
  );
}