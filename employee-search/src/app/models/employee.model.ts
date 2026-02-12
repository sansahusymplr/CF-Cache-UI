export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  companyName: string;
  position: string;
  department?: string;
  tenantName?: string;
}

export interface PagedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}
