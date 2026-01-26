import { FC } from "react";
import { DataTable } from "../datatable/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { ShipmentAgeingItem } from "@/helperfunctions/courierlistFunction";

interface CourierListDatatableProps {
  data: ShipmentAgeingItem[];
  columns: ColumnDef<ShipmentAgeingItem>[];
}

const CourierListDatatable: FC<CourierListDatatableProps> = ({
  data,
  columns,
}) => {
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default CourierListDatatable;
