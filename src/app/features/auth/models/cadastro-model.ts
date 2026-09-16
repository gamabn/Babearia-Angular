export interface CadastroModel {
  id?: string;
  name: string;
  phone: string;
  image_url: string;
  email: string;
  neighborhood: string;
  city: string;
  street: string;
  number: string;
  public_id: string;
}

export interface BarberShopResponse {
  barbershop: BarberShopProps;
  subscription: SubscriptionProps;
}
export interface BarberProps {
  id: string;
  name: string;
  barber_phone: string;
  img_url: string;
  public_id: string;
  barbearia_id: string;
}

export interface BarberShopProps {
  id?: string;
  name: string;
  phone: string;
  image_url: string;
  email: string;
  neighborhood: string;
  city: string;
  street: string;
  number: string;
  public_id: string;
}

export interface SubscriptionProps {
  status: 'trialing' | 'active' | 'past_due' | 'canceled';
  end_date: string | null;
  trial_end_date: string;
  days_left: number;
}

export interface ServiceProps {
  id: string;
  name: string;
  duration: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  price: number;
  barberId: string | null;
}
