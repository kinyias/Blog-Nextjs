import { useQuery } from '@tanstack/react-query';
import { AdvancedTinSearchParams, BinhLuanQueryParams, getAllLoaiTin, getBinhLuanWithPagination, getLoaiTinById, getLoaiTinWithPagination, getNhomTinById, getNhomTinWithPagination, getTinWithPagination, LoaiTinQueryParams, NhomTinQueryParams, searchTinAdvanced, TinQueryParams } from '@/lib/api';

export const useTinPagination = (params: TinQueryParams) => {
  return useQuery({
    queryKey: ['tin', params],
    queryFn: () => getTinWithPagination(params),
    placeholderData: (previousData) => previousData, // Smooth transitions between pages
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};


export const usePaginatedBinhLuan = (params: BinhLuanQueryParams = {}) => {
  return useQuery({
    queryKey: ['paginated-binh-luan', params],
    queryFn: () => getBinhLuanWithPagination(params),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const usePaginatedNhomTin = (params: NhomTinQueryParams = {}) => {
  return useQuery({
    queryKey: ['paginated-nhom-tin', params],
    queryFn: () => getNhomTinWithPagination(params),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const usePaginatedLoaiTin = (params: LoaiTinQueryParams = {}) => {
  return useQuery({
    queryKey: ['paginated-loai-tin', params],
    queryFn: () => getLoaiTinWithPagination(params),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useHotTin = () => {
  return useQuery({
    queryKey: ['tin-hot'],
    queryFn: () => getTinWithPagination({ 
      limit: 5, 
      tinhot: true,
      trangthai: true,
      sortBy: 'ngaydangtin',
      sortOrder: 'desc' 
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};
export const useFeatureTin = () => {
  return useQuery({
    queryKey: ['tin-feature'],
    queryFn: () => getTinWithPagination({ 
      limit: 1, 
      tinhot: true,
      trangthai: true,
      sortBy: 'solanxem',
      sortOrder: 'desc' 
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};
export const useAllLoaiTin = () => {
  return useQuery({
    queryKey: ['all-loai-tin'],
    queryFn: getAllLoaiTin,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useTinByLoaiTin = (id_loaitin: string, params: TinQueryParams = {}) => {
  return useQuery({
    queryKey: ['tin-by-loai-tin', id_loaitin, params],
    queryFn: () => getTinWithPagination({ 
      ...params,
      id_loaitin: id_loaitin,
      trangthai: true 
    }),
    enabled: !!id_loaitin,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useLoaiTin = (id: string) => {
  return useQuery({
    queryKey: ['loai-tin', id],
    queryFn: () => getLoaiTinById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useLoaiTinByNhomTin = (id_nhomtin: string, params: LoaiTinQueryParams = {}) => {
  return useQuery({
    queryKey: ['loai-tin-by-nhom-tin', id_nhomtin, params],
    queryFn: () => getLoaiTinWithPagination({ 
      ...params,
      id_nhomtin: Number(id_nhomtin),
      trangthai: true 
    }),
    enabled: !!id_nhomtin,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useNhomTin = (id: string) => {
  return useQuery({
    queryKey: ['nhom-tin', id],
    queryFn: () => getNhomTinById(Number(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useAdvancedSearch = (params: AdvancedTinSearchParams) => {
  return useQuery({
    queryKey: ['advanced-search', params],
    queryFn: () => searchTinAdvanced(params),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};