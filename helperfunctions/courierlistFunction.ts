import axios from "axios";

export interface ShipmentsAgeingPayload {
  start_date: string;
  end_date: string;
  courier_id: number;
  customers_acno: ["OR-01362", "OR-01914", "OR-01886"];
  status_type: "1" | "2";
}

export interface ShipmentAgeingItem {
  id: string;
  acno: string;
  consigment_no: string;
  courier_id: string;
  courier_name: string;
  payment_type: string;
  order_amount: string;
  order_last_status_id: string;
  last_mile_status: string;
  booking_date: string;
  last_mile_status_date: string;
  statement_id: string;
  invoice_no: string;
  statement_date: string;
  tpl_invoice_receiving_date: string;
  tpl_invoice_settle_date: string;
  ageing_days: string;
  sales_person_id: string;
  sales_person_name: string;
}

export interface ShipmentsAgeingResponse {
  status: number;
  message: string;
  payload: {
    details: ShipmentAgeingItem[];
    summary: {
      total_amount: string;
      total_count: string;
    };
  };
}

export const getShipmentsAgeing = async (payload: ShipmentsAgeingPayload) => {
  try {
    const modifiedPayload = {
      ...payload,
      customers_acno: ["OR-01362", "OR-01914", "OR-01886"],
    };
    const response = await axios.post<ShipmentsAgeingResponse>(
      "https://oms.getorio.com/api/backoffice/shipments_ageing",
      modifiedPayload,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shipments ageing:", error);
    throw error;
  }
};
