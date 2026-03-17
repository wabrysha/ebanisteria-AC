import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, Send, ShoppingBag, Camera, Upload, Truck, Landmark, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CreditFormData, PaymentFrequency } from '../types';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [frequency, setFrequency] = useState<PaymentFrequency>('mensual');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<CreditFormData>({
    fullName: '',
    idNumber: '',
    phone: '',
    address: '',
    employmentStatus: 'Empleado',
    monthlyIncome: '',
    familyRef1: '',
    familyRef2: '',
    paymentMethod: 'contra-entrega',
    idPhoto: null,
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const initialPayment = subtotal * 0.3;
  const remainingBalance = subtotal - initialPayment;
  
  // Calculation logic
  const getInstallmentValue = () => {
    const interestMultiplier = 1.08; // 8% interest
    let periods = 10; // Default monthly
    if (frequency === 'quincenal') periods = 20;
    if (frequency === 'semanal') periods = 40;
    
    return (remainingBalance * interestMultiplier) / periods;
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(price);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, idPhoto: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemsList = cart
      .map((item) => `- ${item.name} (x${item.quantity}): ${formatPrice(item.price * item.quantity)}`)
      .join('%0A');
    
    const message = `*SOLICITUD DE CRÉDITO - MUEBLERÍA C*%0A%0A` +
      `*Datos del Cliente:*%0A` +
      `- Nombre: ${formData.fullName}%0A` +
      `- Cédula: ${formData.idNumber}%0A` +
      `- Teléfono: ${formData.phone}%0A` +
      `- Dirección: ${formData.address}%0A` +
      `- Ref 1: ${formData.familyRef1}%0A` +
      `- Ref 2: ${formData.familyRef2}%0A` +
      `- Método: ${formData.paymentMethod}%0A` +
      `- Frecuencia: ${frequency.toUpperCase()}%0A%0A` +
      `*Plan de Crédito:*%0A` +
      `- Cuota Inicial (30%): ${formatPrice(initialPayment)}%0A` +
      `- Valor de Cuota: ${formatPrice(getInstallmentValue())}%0A%0A` +
      `*Pedido:*%0A${itemsList}%0A%0A` +
      `*Total:* ${formatPrice(subtotal)}`;

    const whatsappUrl = `https://wa.me/573147227216?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <main className="pt-40 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 glass flex items-center justify-center mb-8 text-ink/20">
          <ShoppingBag size={40} />
        </div>
        <h1 className="text-4xl font-display font-extrabold mb-4 uppercase">TU CARRITO ESTÁ VACÍO</h1>
        <p className="text-ink/60 mb-10 max-w-md">Explora nuestra colección y añade tus productos favoritos para solicitar tu crédito.</p>
        <a href="/" className="btn-primary">Volver a la Tienda</a>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Cart & Summary */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <section>
            <h1 className="text-4xl font-display font-extrabold mb-8 uppercase">CARRITO DE COMPRAS</h1>
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="glass p-4 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-muted rounded-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-grow">
                    <h3 className="text-base font-display font-bold">{item.name}</h3>
                    <p className="text-xs text-ink/40 mb-2">{item.description.split('.')[0]}</p>
                    <p className="text-accent font-bold">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeFromCart(item.id)} className="text-ink/20 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center glass px-1 py-0.5 scale-90">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1"><Minus size={12} /></button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1"><Plus size={12} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass p-8">
            <h2 className="text-2xl font-display font-extrabold mb-8 uppercase">Resumen de Inversión</h2>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Subtotal Productos</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Envío Express</span>
                <span className="text-emerald-500 font-bold">Gratis</span>
              </div>
              <div className="pt-4 border-t border-glass-border flex justify-between items-center">
                <span className="text-xl font-bold uppercase">Total Venta</span>
                <span className="text-3xl font-display font-extrabold">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-4">Frecuencia de Pago</p>
              <div className="grid grid-cols-3 gap-2">
                {(['semanal', 'quincenal', 'mensual'] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className={`py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                      frequency === freq ? 'bg-accent text-surface' : 'glass hover:bg-white/5'
                    }`}
                  >
                    {freq === 'quincenal' ? 'Cada 15 días' : freq}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 p-6 rounded-sm">
              <div className="flex items-center gap-2 text-accent mb-4">
                <Wallet size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Plan de Crédito Sugerido</span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-ink/40 mb-1">Cuota Inicial (30%)</p>
                  <p className="text-2xl font-display font-extrabold text-ink">{formatPrice(initialPayment)}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-ink/40 mb-1">Valor de Cuota</p>
                  <p className="text-2xl font-display font-extrabold text-accent">{formatPrice(getInstallmentValue())}</p>
                </div>
              </div>
              <p className="text-[9px] italic text-ink/40 mt-4 leading-relaxed">
                *Cálculo aproximado basado en la frecuencia seleccionada. Sujeto a estudio de crédito instantáneo.
              </p>
            </div>
          </section>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-5">
          <div className="glass p-8 sticky top-32">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/60">Nombre Completo</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-muted/50 border border-glass-border p-3 focus:border-accent outline-none transition-colors text-sm"
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-ink/60">Cédula (ID)</label>
                  <input
                    required
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className="bg-muted/50 border border-glass-border p-3 focus:border-accent outline-none transition-colors text-sm"
                    placeholder="12345678"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-ink/60">Teléfono</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-muted/50 border border-glass-border p-3 focus:border-accent outline-none transition-colors text-sm"
                    placeholder="300 000 0000"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/60">Dirección de Residencia</label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="bg-muted/50 border border-glass-border p-3 focus:border-accent outline-none transition-colors text-sm"
                  placeholder="Calle 123 #45-67"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/60">Referencias Familiares</label>
                <div className="flex flex-col gap-2">
                  <input
                    required
                    type="text"
                    name="familyRef1"
                    value={formData.familyRef1}
                    onChange={handleInputChange}
                    className="bg-muted/50 border border-glass-border p-3 focus:border-accent outline-none transition-colors text-sm"
                    placeholder="Nombre y Teléfono Ref 1"
                  />
                  <input
                    required
                    type="text"
                    name="familyRef2"
                    value={formData.familyRef2}
                    onChange={handleInputChange}
                    className="bg-muted/50 border border-glass-border p-3 focus:border-accent outline-none transition-colors text-sm"
                    placeholder="Nombre y Teléfono Ref 2"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="flex flex-col gap-2">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-glass-border p-8 rounded-sm flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-accent/50 transition-colors bg-white/5"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange}
                  />
                  {formData.idPhoto ? (
                    <img src={formData.idPhoto} alt="ID Preview" className="w-full h-32 object-contain" />
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-accent text-surface rounded-sm flex items-center justify-center">
                        <Camera size={20} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-widest mb-1">Carga o Toma tu Foto</p>
                        <p className="text-[9px] text-ink/40 uppercase tracking-widest">Asegúrate de que tus datos sean legibles</p>
                      </div>
                      <div className="btn-primary py-2 px-4 text-[10px] flex items-center gap-2">
                        <Upload size={14} /> Cargar o Tomar Foto
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, paymentMethod: 'contra-entrega' }))}
                  className={`flex flex-col items-center gap-2 p-4 border transition-all ${
                    formData.paymentMethod === 'contra-entrega' ? 'border-accent bg-accent/10' : 'border-glass-border glass'
                  }`}
                >
                  <Truck size={20} className={formData.paymentMethod === 'contra-entrega' ? 'text-accent' : 'text-ink/40'} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Contra entrega</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, paymentMethod: 'transferencia' }))}
                  className={`flex flex-col items-center gap-2 p-4 border transition-all ${
                    formData.paymentMethod === 'transferencia' ? 'border-accent bg-accent/10' : 'border-glass-border glass'
                  }`}
                >
                  <Landmark size={20} className={formData.paymentMethod === 'transferencia' ? 'text-accent' : 'text-ink/40'} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Transferencia</span>
                </button>
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3 mt-4 py-4">
                Solicitar Crédito vía WhatsApp <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
