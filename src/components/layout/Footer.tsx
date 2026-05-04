import Link from "next/link";
import { Leaf, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050505] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold tracking-tight text-white">
                EcoLoop <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400">
              Transforming industrial waste into intelligent, tradable resources for a sustainable future.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/classification" className="text-sm text-zinc-400 hover:text-white transition-colors">AI Classification</Link></li>
              <li><Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors">Analytics Dashboard</Link></li>
              <li><Link href="/marketplace" className="text-sm text-zinc-400 hover:text-white transition-colors">Waste Marketplace</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} EcoLoop AI. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-zinc-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
