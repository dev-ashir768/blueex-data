import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface OrioPayload {
  acno: string;
  total_cod: string;
  delivered_cod: string;
  inprocess_cod: string;
  payable_cod: string;
}

export interface OrioResponse {
  status: number;
  message: string;
  payload: OrioPayload[];
}

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

export const useDashboardData = () => {
  const orioQuery = useQuery<OrioResponse>({
    queryKey: ["orio-data"],
    queryFn: async () => {
      const response = await axios.get(
        "https://oms.getorio.com/api/v1/backoffice/blx_3pl_cod",
      );
      return response.data;
    },
    staleTime: THREE_HOURS_MS,
    gcTime: THREE_HOURS_MS,
    refetchInterval: THREE_HOURS_MS,
  });

  const aggregateData = () => {
    if (!orioQuery.data?.payload)
      return {
        total_cod: 0,
        delivered_cod: 0,
        inprocess_cod: 0,
        payable_cod: 0,
      };

    const parseNum = (str: string) => {
      if (!str) return 0;
      // Remove commas and parse as float
      return parseFloat(str.replace(/,/g, ""));
    };

    return orioQuery.data.payload.reduce(
      (acc, curr) => ({
        total_cod: acc.total_cod + parseNum(curr.total_cod),
        delivered_cod: acc.delivered_cod + parseNum(curr.delivered_cod),
        inprocess_cod: acc.inprocess_cod + parseNum(curr.inprocess_cod),
        payable_cod: acc.payable_cod + parseNum(curr.payable_cod),
      }),
      {
        total_cod: 0,
        delivered_cod: 0,
        inprocess_cod: 0,
        payable_cod: 0,
      },
    );
  };

  const totals = aggregateData();

  return {
    totals,
    isLoading: orioQuery.isLoading,
    error: orioQuery.error,
  };
};

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export interface OrioPayload {
//   acno: string;
//   total_arrival_cod: string;
//   arrival_dv_cod: string;
//   arrival_not_dv_cod: string;
//   arrival_payable_cod: string;
// }

// export interface OrioResponse {
//   status: number;
//   message: string;
//   payload: OrioPayload[];
// }

// const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

// export const useDashboardData = () => {
//   const orioQuery = useQuery<OrioResponse>({
//     queryKey: ["orio-data"],
//     queryFn: async () => {
//       const response = await axios.get(
//         "https://oms.getorio.com/api/backoffice/blx_3pl_cod"
//       );
//       return response.data;
//     },
//     staleTime: THREE_HOURS_MS,
//     gcTime: THREE_HOURS_MS,
//     refetchInterval: THREE_HOURS_MS,
//   });

//   const aggregateData = () => {
//     if (!orioQuery.data?.payload)
//       return {
//         total_arrival_cod: 0,
//         arrival_dv_cod: 0,
//         arrival_not_dv_cod: 0,
//         arrival_payable_cod: 0,
//       };

//     const parseNum = (str: string) => {
//       if (!str) return 0;
//       // Remove commas and parse as float
//       return parseFloat(str.replace(/,/g, ""));
//     };

//     return orioQuery.data.payload.reduce(
//       (acc, curr) => ({
//         total_arrival_cod:
//           acc.total_arrival_cod + parseNum(curr.total_arrival_cod),
//         arrival_dv_cod: acc.arrival_dv_cod + parseNum(curr.arrival_dv_cod),
//         arrival_not_dv_cod:
//           acc.arrival_not_dv_cod + parseNum(curr.arrival_not_dv_cod),
//         arrival_payable_cod:
//           acc.arrival_payable_cod + parseNum(curr.arrival_payable_cod),
//       }),
//       {
//         total_arrival_cod: 0,
//         arrival_dv_cod: 0,
//         arrival_not_dv_cod: 0,
//         arrival_payable_cod: 0,
//       }
//     );
//   };

//   const totals = aggregateData();

//   return {
//     totals,
//     isLoading: orioQuery.isLoading,
//     error: orioQuery.error,
//   };
// };
