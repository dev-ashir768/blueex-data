// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export interface OrioPayload {
//   acno: string;
//   total_orders: string;
//   total_cod: string;
//   dv_rt_orders: string;
//   delivered_cod: string;
//   inprocess_orders: string;
//   inprocess_cod: string;
//   // dv_outstanding_cod: string;
//   payable_orders: string;
//   payable_cod: string;
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
//         "https://oms.getorio.com/api/v1/backoffice/blx_3pl_cod.php",
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
//         total_orders: 0,
//         total_cod: 0,
//         dv_rt_orders: 0,
//         delivered_cod: 0,
//         inprocess_orders: 0,
//         inprocess_cod: 0,
//         // dv_outstanding_cod: 0,
//         payable_orders: 0,
//         payable_cod: 0,
//       };

//     const parseNum = (str: string) => {
//       if (!str) return 0;
//       // Remove commas and parse as float
//       return parseFloat(str.replace(/,/g, ""));
//     };

//     return orioQuery.data.payload.reduce(
//       (acc, curr) => ({
//         total_orders: acc.total_orders + parseNum(curr.total_orders),
//         total_cod: acc.total_cod + parseNum(curr.total_cod),
//         dv_rt_orders: acc.dv_rt_orders + parseNum(curr.dv_rt_orders),
//         delivered_cod: acc.delivered_cod + parseNum(curr.delivered_cod),
//         inprocess_orders: acc.inprocess_orders + parseNum(curr.inprocess_orders),
//         inprocess_cod: acc.inprocess_cod + parseNum(curr.inprocess_cod),
//         // dv_outstanding_cod:
//         //   acc.dv_outstanding_cod + parseNum(curr.dv_outstanding_cod),
//         payable_orders: acc.payable_orders + parseNum(curr.payable_orders),
//         payable_cod: acc.payable_cod + parseNum(curr.payable_cod),
//       }),
//       {
//         total_orders: 0,
//         total_cod: 0,
//         dv_rt_orders: 0,
//         delivered_cod: 0,
//         inprocess_orders: 0,
//         inprocess_cod: 0,
//         // dv_outstanding_cod: 0,
//         payable_orders: 0,
//         payable_cod: 0,
//       },
//     );
//   };

//   const totals = aggregateData();

//   return {
//     totals,
//     isLoading: orioQuery.isLoading,
//     error: orioQuery.error,
//   };
// };

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
