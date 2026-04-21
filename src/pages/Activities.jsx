import { useContext } from 'react';
import OrderCard from '../components/ActivityCard';
import { AppContext } from '../context/AppContext';
import { getPendingOrders } from '../services/api';

const Activities = () => {
  const { state } = useContext(AppContext);
  const pendingOrders = getPendingOrders(state.orders);

  return (
    <main className="page-shell">
      <section className="page-header">
        <p className="section-kicker">Question 1 and 4</p>
        <h2>Pending Orders</h2>
        <p>Only valid orders are shown here. Delivered orders disappear automatically.</p>
      </section>

      <section className="grid-list">
        {pendingOrders.length > 0 ? (
          pendingOrders.map(order => <OrderCard key={order.orderId} order={order} />)
        ) : (
          <p className="empty-state">No pending orders found.</p>
        )}
      </section>
    </main>
  );
};

export default Activities;