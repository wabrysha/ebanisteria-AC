import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col glass overflow-hidden"
    >
      {/* Image Container */}
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.isPromo && (
          <div className="absolute top-4 left-4 bg-accent text-surface text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            Oferta
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-col gap-1 mb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
            {product.category}
          </span>
          <h3 className="text-lg font-display font-bold leading-tight group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </div>
        
        <p className="text-sm text-ink/60 line-clamp-2 mb-6 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-display font-extrabold text-accent">
            {formattedPrice}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="w-10 h-10 flex items-center justify-center bg-accent text-surface transition-all hover:scale-110 active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
