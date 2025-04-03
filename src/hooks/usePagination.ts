import { useQuery } from '@tanstack/react-query';
import { BinhLuanQueryParams, getBinhLuanWithPagination, getLoaiTinWithPagination, getNhomTinWithPagination, getTinWithPagination, LoaiTinQueryParams, NhomTinQueryParams, TinQueryParams } from '@/lib/api';

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