import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { getAnalytics } from '../services/api';

const Stats = () => {
  const { state } = useContext(AppContext);
  const { totalOrders, deliveredOrders, cancelledOrders } = getAnalytics(state.orders);

  useEffect(() => {
    window.appState = {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
    };
  }, [totalOrders, deliveredOrders, cancelledOrders]);

  return (
    <main className="page-shell">
      <section className="page-header">
        <p className="section-kicker">Question 5</p>
        <h2>Analytics Dashboard</h2>
        <p>Counts are computed dynamically from valid orders only.</p>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total valid orders</span>
          <strong data-testid="total-orders">{totalOrders}</strong>
        </article>
        <article className="stat-card">
          <span>Delivered orders</span>
          <strong data-testid="delivered-orders">{deliveredOrders}</strong>
        </article>
        <article className="stat-card">
          <span>Cancelled orders</span>
          <strong data-testid="cancelled-orders">{cancelledOrders}</strong>
        </article>
      </section>
    </main>
  );
};

export default Stats;