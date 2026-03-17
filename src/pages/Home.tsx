import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';

export const Home = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
            alt="Hero"
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="text-accent font-display font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
              Nueva Colección 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold leading-[0.9] mb-8 text-balance">
              DISEÑO QUE <br />
              <span className="text-accent">INSPIRA</span> TU VIDA
            </h1>
            <p className="text-lg text-ink/70 mb-10 max-w-lg leading-relaxed">
              Muebles de autor, tecnología de punta y electrodomésticos premium. Todo con crédito inmediato y entrega garantizada.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/categoria/muebles" className="btn-primary flex items-center gap-2">
                Ver Colección <ArrowRight size={18} />
              </Link>
              <Link to="/categoria/celulares" className="btn-outline">
                Tecnología
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <CreditCard className="text-accent" />, title: "Crédito Inmediato", desc: "Aprobación en minutos con solo tu cédula." },
            { icon: <Truck className="text-accent" />, title: "Entrega Express", desc: "Recibe tus productos en menos de 24 horas." },
            { icon: <ShieldCheck className="text-accent" />, title: "Garantía Total", desc: "Respaldo directo de fábrica en todas tus compras." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <div className="w-12 h-12 glass flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-bold">{feature.title}</h3>
              <p className="text-ink/60 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-accent font-display font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
                Selección Premium
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold">DESTACADOS</h2>
            </div>
            <Link to="/categoria/muebles" className="text-sm font-bold uppercase tracking-widest border-b-2 border-accent pb-1 hover:text-accent transition-colors">
              Ver Todo
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto glass p-12 md:p-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 group-hover:opacity-30 transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
              alt="Promo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8 leading-tight">
              ¿BUSCAS <span className="text-accent">CRÉDITO</span>?
            </h2>
            <p className="text-lg text-ink/70 mb-10 leading-relaxed">
              No esperes más para renovar tu hogar. Solicita tu crédito hoy mismo y paga en cómodas cuotas mensuales.
            </p>
            <Link to="/carrito" className="btn-primary inline-block">
              Solicitar Ahora
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
