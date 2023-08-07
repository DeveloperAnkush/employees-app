export interface Data {
  employeeName: string;
  email: string;
  age: number;
  city: string;
  actions: JSX.Element[];
  id: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDeleteDialog: () => void;
  handleAdd: () => void;
}

export interface Employees {
  id?: string;
  employeeName: string;
  email: string;
  age: number;
  city: string;
}

export interface TableData {
  id: string;
  employeeName: string;
  email: string;
  age: number;
  city: string;
}

export interface DeleteTableHeadCell {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
}

export interface DeleteTableEnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => void;
  order: Order;
  orderBy: string;
}
