import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';

export const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const filteredProducts = PRODUCTS.filter(
    (p) => p.category === categoryId
  );

  const categoryTitles: Record<string, string> = {
    muebles: 'MUEBLES & DISEÑO',
    celulares: 'TECNOLOGÍA MÓVIL',
    electrodomesticos: 'ELECTRODOMÉSTICOS',
  };

  const categoryDescriptions: Record<string, string> = {
    muebles: 'Piezas exclusivas que combinan confort y elegancia para cada rincón de tu hogar.',
    celulares: 'Lo último en smartphones de alta gama con el respaldo de las mejores marcas.',
    electrodomesticos: 'Eficiencia y tecnología superior para facilitar tu vida diaria.',
  };

  return (
    <main className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-accent font-display font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Explorar Colección
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-8 uppercase">
              {categoryTitles[categoryId || ''] || 'CATEGORÍA'}
            </h1>
            <p className="text-lg text-ink/60 leading-relaxed">
              {categoryDescriptions[categoryId || ''] || ''}
            </p>
          </motion.div>
        </header>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass">
            <p className="text-ink/40 uppercase tracking-widest font-bold">No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </div>
    </main>
  );
};
