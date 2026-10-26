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
  price: string; // vem como string '50.00'
  barber_id: string | null; // snake_case, como vem da API
}
/*export interface ServiceProps {
  id: string;
  name: string;
  duration: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  price: number;
  barberId: string | null;
}*/

export interface AgendamentoProps {
  id: string;
  client_id: string;
  barber_id: string;
  date_agend: string;
  service_ids: string[];
  date_finish?: string;
  tipo: string;
  status: Status;
  client_phone?: string; // Adicionado (opcional)
  total_price?: number; // Adicionado (opcional)
}
export interface ClientsProps {
  name: string;
  client_phone: string;
  barbearia_id: string;
}

export enum Status {
  agendado = 'AGENDADO',
  em_atendimento = 'EM_ATENDIMENTO',
  finalizado = 'FINALIZADO',
  cancelado = 'CANCELADO',
  aguardando = 'AGUARDANDO',
}
