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
      <DataTable
        title="Courier List"
        columns={columns}
        data={data}
        enableColumnVisibility={true}
        enableExport={true}
        enableGlobalFilter={true}
      />
    </>
  );
};

export default CourierListDatatable;
