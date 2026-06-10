export interface KlapCreateOrderInput {
  referenceId: string;
  description: string;
  amount: number;
  guestEmail: string;
  guestPhone: string;
  guestFirstName: string;
  guestLastName: string;
}

export interface KlapOrderResponse {
  status?: string;
  order_id: string;
  redirect_url?: string;
  reference_id?: string;
  amount?: {
    currency: string;
    total: number;
  };
}

export interface KlapWebhookConfirmPayload {
  order_id: string;
  reference_id: string;
  mc_code?: string;
  token_id?: string;
  card_type?: string;
  brand?: string;
  bin?: string;
  last_digits?: string;
  payment_method?: string;
  amount?: string;
  quotas_number?: string;
  quotas_type?: string;
}

export interface KlapWebhookRejectPayload {
  order_id: string;
  reference_id: string;
  code?: string;
  message?: string;
}

export interface KlapInitOptions {
  useBinLookup?: boolean;
  onCardIdentified?: (card: { CardType?: string }) => void;
}
