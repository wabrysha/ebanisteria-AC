export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'muebles' | 'celulares' | 'electrodomesticos';
  image: string;
  description: string;
  isPromo?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentFrequency = 'semanal' | 'quincenal' | 'mensual';

export interface CreditFormData {
  fullName: string;
  idNumber: string;
  phone: string;
  address: string;
  employmentStatus: string;
  monthlyIncome: string;
  familyRef1: string;
  familyRef2: string;
  paymentMethod: 'contra-entrega' | 'transferencia';
  idPhoto: string | null;
}
