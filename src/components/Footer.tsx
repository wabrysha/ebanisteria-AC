import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted pt-20 pb-10 border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="text-2xl font-display font-extrabold tracking-tighter">
            MUEBLERÍA <span className="text-accent">C</span>
          </Link>
          <p className="text-ink/60 text-sm leading-relaxed">
            Líderes en mobiliario y tecnología con los mejores planes de crédito en Colombia. Calidad y diseño para tu hogar.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-ink/40 hover:text-accent transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-ink/40 hover:text-accent transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-ink/40 hover:text-accent transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display font-bold mb-6 uppercase tracking-widest text-xs">Categorías</h4>
          <ul className="flex flex-col gap-4 text-sm text-ink/60">
            <li><Link to="/categoria/muebles" className="hover:text-accent transition-colors">Muebles</Link></li>
            <li><Link to="/categoria/celulares" className="hover:text-accent transition-colors">Celulares</Link></li>
            <li><Link to="/categoria/electrodomesticos" className="hover:text-accent transition-colors">Electrodomésticos</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-display font-bold mb-6 uppercase tracking-widest text-xs">Compañía</h4>
          <ul className="flex flex-col gap-4 text-sm text-ink/60">
            <li><a href="#" className="hover:text-accent transition-colors">Sobre Nosotros</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Crédito Inmediato</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Términos y Condiciones</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold mb-6 uppercase tracking-widest text-xs">Contacto</h4>
          <ul className="flex flex-col gap-4 text-sm text-ink/60">
            <li className="flex items-center gap-3"><Phone size={16} className="text-accent" /> +57 314 722 7216</li>
            <li className="flex items-center gap-3"><Mail size={16} className="text-accent" /> contacto@muebleriac.com</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-accent" /> Bogotá, Colombia</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-ink/40">
        <p>© 2026 MUEBLERÍA C. TODOS LOS DERECHOS RESERVADOS.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-accent transition-colors">Privacidad</a>
          <a href="#" className="hover:text-accent transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};
