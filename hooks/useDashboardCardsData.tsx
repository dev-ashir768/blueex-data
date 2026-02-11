import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface OrioPayload {
  acno: string;
  total_orders: string;
  total_cod: string;
  dv_rt_orders: string;
  delivered_cod: string;
  inprocess_orders: string;
  inprocess_cod: string;
  payable_orders: string;
  payable_cod: string;
}

interface OrioResponse {
  status: number;
  message: string;
  payload: OrioPayload;
}

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

const useDashboardCardsData = () => {
  const orioQuery = useQuery<OrioResponse>({
    queryKey: ["orio-data"],
    queryFn: async () => {
      const response = await axios.post(
        "https://oms.getorio.com/api/v1/backoffice/tpl_cod_summary",
        {
          filter_customers: ["OR-01362", "OR-01914", "OR-01886"],
          filter_couriers: [3, 12, 24, 18, 37],
        },
      );
      return response.data;
    },
    staleTime: THREE_HOURS_MS,
    refetchInterval: THREE_HOURS_MS,
  });

  const data = orioQuery.data?.payload || {
    acno: "",
    total_orders: "0",
    total_cod: "0",
    dv_rt_orders: "0",
    delivered_cod: "0",
    inprocess_orders: "0",
    inprocess_cod: "0",
    payable_orders: "0",
    payable_cod: "0",
  };

  return {
    data,
    isLoading: orioQuery.isLoading,
    isError: orioQuery.isError,
    error: orioQuery.error,
  };
};

export default useDashboardCardsData;
