import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GoogleSheetCard from "@/components/GoogleSheetCard";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
    //   <header className="bg-white border-2 border-black p-4 shadow-[8px_8px_0px_#000] sticky top-0 z-50 rounded-md mx-4 my-4">
      <header className=" border-black p-0 mx-0 mt-4 mb-1">
        <link href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Germania+One&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Calistoga&display=swap" rel="stylesheet" />
        <nav className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center gap-0">
            {/* <Image src="/logo.png" alt="Logo" width={40} height={40} className="p-1 rounded-md" /> */}
            <Link href="/" className="text-4xl tracking-wide font-extrabold p-0 font-gothic">
             <span className="text-black font-extrabold">West</span> Discovery
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button 
            className="focus:outline-none border-2 border-black p-2 rounded-full bg-white hover:bg-yellow-400 transition-all duration-300 shadow-[4px_4px_0px_#000]" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
  
        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }} 
              transition={{ duration: 0.3 }}
              className="bg-blue-500 mt-4 text-white text-sm font-extrabold text-center py-0 border-2 border-black rounded-md mx-4 shadow-[4px_4px_0px_#000]"
            >
              <Link href="/" className="block py-2 border-b-2 border-black hover:bg-blue-800">Home</Link>
              <Link href="/about" className="block py-2 border-b-2 border-black hover:bg-blue-800">About</Link>
              <Link href="/contact" className="block py-2 hover:bg-blue-800">Contact</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  };
  

export default Header;
