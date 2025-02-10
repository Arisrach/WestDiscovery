import Layout from '../components/Layout';
import Image from 'next/image';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <Layout>
 
      <div className="flex justify-center invisible">
        <div className="bg-white border-2 border-black p-9 rounded-lg shadow-[8px_8px_0px_#000] max-w-sm text-center">
               <h1 className="text-2xl font-bold text-center mb-2">Contact Me</h1>
          {/* Foto Profil */}
          <div className="flex justify-center">
            <Image
              src="/profile.jpeg" // Ganti dengan foto profil
              alt="Profile Picture"
              width={100}
              height={100}
              className="border-2 border-black rounded-full shadow-[4px_4px_0px_#000]"
            />
          </div>
          {/* Nama & Jabatan */}
          {/* <h2 className="text-xl font-brutal mt-4 border-b-2 border-black pb-2">Arisrach</h2>
          <p className="text-gray-700 mt-2">Frontend Developer | Next.js & Tailwind</p> */}
          {/* Tombol Sosial Media */}
          <div className="flex gap-3 mt-4">
            <a href="" className="w-full bg-black text-white flex items-center justify-center gap-2 px-4 py-2 border-2 border-black rounded-md shadow-[4px_4px_0px_#000] hover:bg-gray-800">
              <Github size={20} /> GitHub
            </a>
            <a href="" className="w-full bg-blue-600 text-white flex items-center justify-center gap-2 px-4 py-2 border-2 border-black rounded-md shadow-[4px_4px_0px_#000] hover:bg-blue-700">
              <Linkedin size={20} /> LinkedIn
            </a>
          </div>
          {/* Email */}
          <a href="" className="mt-3 block bg-red-500 text-black font-bold px-4 py-2 border-2 border-black rounded-md shadow-[4px_4px_0px_#000] hover:bg-red-600">
            <Mail className="inline-block mr-2" size={20} /> Email Me
          </a>
        </div>
      </div>
    </Layout>
  );
}
