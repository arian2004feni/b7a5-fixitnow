import { Booking } from "./booking";
import { PaymentProvider, PaymentStatus } from "./enums";

export interface Payment {
  id: string;

  bookingId: string;
  bookings?: Booking

  amount: number;
  provider: PaymentProvider;

  status: PaymentStatus;
  transactionId: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentRequest {
  bookingId: string;
}

export interface CreatePaymentResponse {
  paymentUrl?: string;
  checkoutUrl?: string;
  sessionId?: string;
  transactionId?: string;
}