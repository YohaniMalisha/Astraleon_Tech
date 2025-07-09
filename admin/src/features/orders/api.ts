// features/orders/api.ts
import api from '@/lib/api';

export const getOrderStatus = async (orderId: string) => {
  const { data } = await api.get(`/orders/${orderId}/status`);
  return data;
};

export const updateOrderStatus = async (orderId: string, status: string, message?: string) => {
  const { data } = await api.patch(`/orders/${orderId}/status`, { status, message });
  return data;
};