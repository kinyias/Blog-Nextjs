import API from './axios-client';
export type NhomTinType = {
  id_nhomtin: number;
  ten_nhomtin: string;
  trangthai: boolean;
  loai_tin: LoaiTinType[];
};

export type PaginatedNhomTinResponse = {
  data: NhomTinType[];
  meta: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type NhomTinQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  trangthai?: boolean;
};
export type LoaiTinType = {
  id_loaitin: string;
  ten_loaitin: string;
  trangthai: boolean;
  id_nhomtin: number;
  tin: TinType[];
};
export type PaginatedLoaiTinResponse = {
  data: LoaiTinType[];
  meta: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type LoaiTinQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  trangthai?: boolean;
  id_nhomtin?: number;
};
export type TinType = {
  id_tin: number;
  tieude: string;
  hinhdaidien: string;
  mota: string;
  noidung: string;
  ngaydangtin: Date;
  tacgia: string;
  solanxem: number;
  tinhot: boolean;
  trangthai: boolean;
  id_loaitin: string;
  loai_tin?: LoaiTinType;
};
export type PaginatedTinResponse = {
  data: TinType[];
  meta: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type TinQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  tinhot?: boolean;
  trangthai?: boolean;
  id_loaitin?: number;
};
export type TinViewCountResponse = {
  success: boolean;
  message: string;
  data: {
    id_tin: number;
    tieude: string;
    solanxem: number;
  };
};
export type BinhLuanType = {
  id_binhluan: number;
  email: string;
  thoigian: Date;
  noidung: string;
  trangthai: boolean;
  id_tin: number;
  tin?: TinType;
};
export type PaginatedBinhLuanResponse = {
  data: BinhLuanType[];
  meta: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type BinhLuanQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  trangthai?: boolean;
};
export type BinhLuanStatisticsType = {
  total: number;
  approved: number;
  pending: number;
};

export type TinStatusUpdateType = {
  trangthai: boolean;
};
export type NhomTinStatusUpdateType = {
  trangthai: boolean;
};
export type LoaiTinStatusUpdateType = {
  trangthai: boolean;
};
export type BinhLuanStatusUpdateType = {
  trangthai: boolean;
};
// Nhom_tin routes
export const getNhomTinWithPagination = async (
  params: NhomTinQueryParams = {}
): Promise<PaginatedNhomTinResponse> => {
  // Set default values
  const defaultParams = {
    page: 1,
    limit: 10,
    sortBy: 'id_nhomtin',
    sortOrder: 'asc',
    ...params,
  };

  const response = await API.get<PaginatedNhomTinResponse>('/nhom-tin/paginated', { 
    params: defaultParams 
  });
  return response.data;
};
export const getAllNhomTin = async (): Promise<NhomTinType[]> => {
  const response = await API.get<NhomTinType[]>('/nhom-tin');
  return response.data;
};

export const getNhomTinById = async (id: number): Promise<NhomTinType> => {
  const response = await API.get<NhomTinType>(`/nhom-tin/${id}`);
  return response.data;
};

export const createNhomTin = async (data: Omit<NhomTinType, 'id_nhomtin'>): Promise<NhomTinType> => {
  const response = await API.post<NhomTinType>('/nhom-tin', data);
  return response.data;
};

export const updateNhomTin = async (id: number, data: Partial<NhomTinType>): Promise<NhomTinType> => {
  const response = await API.put<NhomTinType>(`/nhom-tin/${id}`, data);
  return response.data;
};

export const deleteNhomTin = async (id: number): Promise<void> => {
  await API.delete(`/nhom-tin/${id}`);
};
export const updateNhomTinStatus = async (
  id: number,
  status: NhomTinStatusUpdateType
): Promise<NhomTinType> => {
  const response = await API.patch<NhomTinType>(`/nhom-tin/${id}/status`, status);
  return response.data;
};
// Loai_tin routes
export const getAllLoaiTin = async (): Promise<LoaiTinType[]> => {
  const response = await API.get<LoaiTinType[]>('/loai-tin');
  return response.data;
};

export const getLoaiTinById = async (id: string): Promise<LoaiTinType> => {
  const response = await API.get<LoaiTinType>(`/loai-tin/${id}`);
  return response.data;
};
export const getLoaiTinWithPagination = async (
  params: LoaiTinQueryParams = {}
): Promise<PaginatedLoaiTinResponse> => {
  // Set default values
  const defaultParams = {
    page: 1,
    limit: 10,
    sortBy: 'id_loaitin',
    sortOrder: 'asc',
    ...params,
  };

  const response = await API.get<PaginatedLoaiTinResponse>('/loai-tin/paginated', { 
    params: defaultParams 
  });
  return response.data;
};
export const createLoaiTin = async (data: LoaiTinType): Promise<LoaiTinType> => {
  const response = await API.post<LoaiTinType>('/loai-tin', data);
  return response.data;
};

export const updateLoaiTin = async (id: string, data: Partial<LoaiTinType>): Promise<LoaiTinType> => {
  const response = await API.put<LoaiTinType>(`/loai-tin/${id}`, data);
  return response.data;
};

export const deleteLoaiTin = async (id: string): Promise<void> => {
  await API.delete(`/loai-tin/${id}`);
};
export const updateLoaiTinStatus = async (
  id: string,
  status: LoaiTinStatusUpdateType
): Promise<LoaiTinType> => {
  const response = await API.patch<LoaiTinType>(`/loai-tin/${id}/status`, status);
  return response.data;
};
// Tin routes
export const getAllTin = async (): Promise<TinType[]> => {
  const response = await API.get<TinType[]>('/tin');
  return response.data;
};
export const getTinWithPagination = async (
  params: TinQueryParams
): Promise<PaginatedTinResponse> => {
  const response = await API.get<PaginatedTinResponse>('/tin/paginated', { params });
  return response.data;
};
export const getTinById = async (id: number): Promise<TinType> => {
  const response = await API.get<TinType>(`/tin/${id}`);
  return response.data;
};

export const createTin = async (data: Omit<TinType, 'id_tin'>): Promise<TinType> => {
  const response = await API.post<TinType>('/tin', data);
  return response.data;
};

export const updateTin = async (id: number, data: Partial<TinType>): Promise<TinType> => {
  const response = await API.put<TinType>(`/tin/${id}`, data);
  return response.data;
};

export const deleteTin = async (id: number): Promise<void> => {
  await API.delete(`/tin/${id}`);
};
export const incrementTinViews = async (
  id: number
): Promise<TinViewCountResponse> => {
  const response = await API.patch<TinViewCountResponse>(`/tin/${id}/views`);
  return response.data;
};
export const updateTinStatus = async (
  id: number,
  status: TinStatusUpdateType
): Promise<TinType> => {
  const response = await API.patch<TinType>(`/tin/${id}/status`, status);
  return response.data;
};
export const getBinhLuanWithPagination = async (
  params: BinhLuanQueryParams
): Promise<PaginatedBinhLuanResponse> => {
  const response = await API.get<PaginatedBinhLuanResponse>('/binh-luan/paginated', { params });
  return response.data;
};
export const getBinhLuanByTinId = async (
  params: BinhLuanQueryParams,
  id: number
): Promise<PaginatedBinhLuanResponse> => {
  const response = await API.get<PaginatedBinhLuanResponse>(`/binh-luan/tin/${id}`, { params });
  return response.data;
};
// Binh_luan routes
export const getAllBinhLuan = async (): Promise<BinhLuanType[]> => {
  const response = await API.get<BinhLuanType[]>('/binh-luan');
  return response.data;
};

export const getBinhLuanById = async (id: number): Promise<BinhLuanType> => {
  const response = await API.get<BinhLuanType>(`/binh-luan/${id}`);
  return response.data;
};

export const createBinhLuan = async (data: Omit<BinhLuanType, 'id_binhluan'>): Promise<BinhLuanType> => {
  const response = await API.post<BinhLuanType>('/binh-luan', data);
  return response.data;
};

export const updateBinhLuan = async (id: number, data: Partial<BinhLuanType>): Promise<BinhLuanType> => {
  const response = await API.put<BinhLuanType>(`/binh-luan/${id}`, data);
  return response.data;
};

export const deleteBinhLuan = async (id: number): Promise<void> => {
  await API.delete(`/binh-luan/${id}`);
};
export const updateBinhLuanStatus = async (
  id: number,
  status: BinhLuanStatusUpdateType
): Promise<BinhLuanType> => {
  const response = await API.patch<BinhLuanType>(`/binh-luan/${id}/status`, status);
  return response.data;
};
// Binh_luan statistics route
export const getBinhLuanStatistics = async (): Promise<BinhLuanStatisticsType> => {
  const response = await API.get<BinhLuanStatisticsType>('/binh-luan/statistics');
  return response.data;
};