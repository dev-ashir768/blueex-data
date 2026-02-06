import { FC } from "react";
import { DataTable } from "../datatable/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { ShipmentV2AgeingItem } from "@/helperfunctions/shipmentsFunction";

interface ShipmentsListDatatableProps {
  data: ShipmentV2AgeingItem[];
  columns: ColumnDef<ShipmentV2AgeingItem>[];
}

const ShipmentsListDatatable: FC<ShipmentsListDatatableProps> = ({
  data,
  columns,
}) => {
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default ShipmentsListDatatable;
