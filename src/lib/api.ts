import API from './axios-client';
export type NhomTinType = {
  id_nhomtin: number;
  ten_nhomtin: string;
  trangthai: string;
};

export type LoaiTinType = {
  id_loaitin: number;
  ten_loaitin: string;
  trangthai: string;
  id_nhomtin: number;
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
  id_loaitin: number;
};

export type BinhLuanType = {
  id_binhluan: number;
  email: string;
  thoigian: Date;
  noidung: string;
  trangthai: string;
  id_tin: number;
};

// Nhom_tin routes
export const getAllNhomTin = async (): Promise<NhomTinType[]> => {
  const response = await API.get<NhomTinType[]>('/nhomtin');
  return response.data;
};

export const getNhomTinById = async (id: number): Promise<NhomTinType> => {
  const response = await API.get<NhomTinType>(`/nhomtin/${id}`);
  return response.data;
};

export const createNhomTin = async (data: Omit<NhomTinType, 'id_nhomtin'>): Promise<NhomTinType> => {
  const response = await API.post<NhomTinType>('/nhomtin', data);
  return response.data;
};

export const updateNhomTin = async (id: number, data: Partial<NhomTinType>): Promise<NhomTinType> => {
  const response = await API.put<NhomTinType>(`/nhomtin/${id}`, data);
  return response.data;
};

export const deleteNhomTin = async (id: number): Promise<void> => {
  await API.delete(`/nhomtin/${id}`);
};

// Loai_tin routes
export const getAllLoaiTin = async (): Promise<LoaiTinType[]> => {
  const response = await API.get<LoaiTinType[]>('/loaitin');
  return response.data;
};

export const getLoaiTinById = async (id: number): Promise<LoaiTinType> => {
  const response = await API.get<LoaiTinType>(`/loaitin/${id}`);
  return response.data;
};

export const createLoaiTin = async (data: Omit<LoaiTinType, 'id_loattin'>): Promise<LoaiTinType> => {
  const response = await API.post<LoaiTinType>('/loaitin', data);
  return response.data;
};

export const updateLoaiTin = async (id: number, data: Partial<LoaiTinType>): Promise<LoaiTinType> => {
  const response = await API.put<LoaiTinType>(`/loaitin/${id}`, data);
  return response.data;
};

export const deleteLoaiTin = async (id: number): Promise<void> => {
  await API.delete(`/loaitin/${id}`);
};
// Tin routes
export const getAllTin = async (): Promise<TinType[]> => {
  const response = await API.get<TinType[]>('/tin');
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
// Binh_luan routes
export const getAllBinhLuan = async (): Promise<BinhLuanType[]> => {
  const response = await API.get<BinhLuanType[]>('/binhluan');
  return response.data;
};

export const getBinhLuanById = async (id: number): Promise<BinhLuanType> => {
  const response = await API.get<BinhLuanType>(`/binhluan/${id}`);
  return response.data;
};

export const createBinhLuan = async (data: Omit<BinhLuanType, 'id_binhluan'>): Promise<BinhLuanType> => {
  const response = await API.post<BinhLuanType>('/binhluan', data);
  return response.data;
};

export const updateBinhLuan = async (id: number, data: Partial<BinhLuanType>): Promise<BinhLuanType> => {
  const response = await API.put<BinhLuanType>(`/binhluan/${id}`, data);
  return response.data;
};

export const deleteBinhLuan = async (id: number): Promise<void> => {
  await API.delete(`/binhluan/${id}`);
};