export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  companyName: string;
  position: string;
}

export interface PagedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}
