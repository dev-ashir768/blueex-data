import axios from "axios";

export interface ShipmentsV2AgeingPayload {
  start_date: string;
  end_date: string;
  courier_id: number;
  customers_acno: ["OR-01362", "OR-01914", "OR-01886"];
}

export interface ShipmentV2AgeingItem {
  id: string;
  acno: string;
  order_ref: string;
  consigment_no: string;
  courier_id: string;
  courier_name: string;
  payment_type: string;
  order_amount: string;
  inprocess_cod_amount: string;
  order_last_status_id: string;
  last_mile_status: string;
  booking_date: string;
  last_mile_status_date: string;
  tpl_invoice_settle_date: string;
  tpl_invoice_receiving_date: string;
  statement_id: string;
  invoice_no: string;
  statement_date: string;
  mark_payment_paid_date: string;
  ageing_days: string;
  courier_ageing_days: string;
  sales_person_id: string;
  sales_person_name: string;
}

export interface ShipmentsV2AgeingResponse {
  status: number;
  message: string;
  payload: {
    details: ShipmentV2AgeingItem[];
    summary: {
      total_bookings: number;
      total_cod: string;
      total_inprocess: number;
      total_inprocess_cod: string;
      total_delivered_orders: number;
      total_delivered_cod: string;
      total_returned_orders: number;
      ageing_avg: number;
      courier_ageing_avg: number;
    };
  };
}

export const getShipmentsV2Ageing = async (
  payload: ShipmentsV2AgeingPayload,
) => {
  try {
    const modifiedPayload = {
      ...payload,
      customers_acno: ["OR-01362", "OR-01914", "OR-01886"],
    };
    const response = await axios.post<ShipmentsV2AgeingResponse>(
      "https://oms.getorio.com/api/v1/backoffice/shipments_ageing",
      modifiedPayload,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shipments ageing:", error);
    throw error;
  }
};
