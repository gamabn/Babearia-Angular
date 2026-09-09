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
   public_id:string;
}

export interface BarberShopResponse {
  barbershop: BarberShopProps;
  subscription: SubscriptionProps;
}


export interface BarberShopProps{
    id?: string;
   name: string;
   phone: string;
   image_url: string;
   email: string;
   neighborhood: string;
   city: string;
   street: string;
   number: string;
   public_id:string;
}

export interface SubscriptionProps {
  status: "trialing" | "active" | "past_due" | "canceled";
  end_date: string | null;
  trial_end_date: string;
  days_left: number;
}