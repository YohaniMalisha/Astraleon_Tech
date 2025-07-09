// admin/src/features/orders/components/OrderTable.tsx
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import StatusBadge from './StatusBadge';

export default function OrderTable() {
  const { data: orders } = useQuery(['admin-orders'], async () => {
    const { data } = await api.get('/admin/orders');
    return data.orders;
  });

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Package</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map(order => (
          <tr key={order._id}>
            <td>{order._id.slice(-6)}</td>
            <td>{order.user.name}</td>
            <td>{order.package.name}</td>
            <td><StatusBadge status={order.status} /></td>
            <td>
              <button>View</button>
              <button>Update</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}