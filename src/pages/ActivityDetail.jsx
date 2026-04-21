import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { formatCurrency, getItemSubtotal } from '../services/api';

const ActivityDetail = () => {
  const { id } = useParams();
  const { state } = useContext(AppContext);
  const order = state.orders.find(item => String(item.orderId) === String(id));

  if (!order) {
    return (
      <main className="page-shell">
        <section className="empty-state">Order not found</section>
      </main>
    );
  }

  const customerName = order.customerName?.trim() ? order.customerName : 'Unknown';
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <main className="page-shell">
      <section className="detail-card">
        <p className="section-kicker">Question 2</p>
        <h2>{customerName}</h2>
        <div className="detail-grid">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Restaurant:</strong> {order.restaurant || 'Unknown'}</p>
          <p><strong>Status:</strong> {order.status || 'Unknown'}</p>
          <p><strong>Delivery Time:</strong> {order.deliveryTime || 'Not available'}</p>
          <p><strong>Total Amount:</strong> {formatCurrency(order.totalAmount)}</p>
          {typeof order.rating === 'number' && Number.isFinite(order.rating) ? (
            <p><strong>Rating:</strong> {order.rating}</p>
          ) : null}
        </div>

        <div className="items-list">
          <h3>Items</h3>
          {items.map((item, index) => {
            const subtotal = getItemSubtotal(item);

            return (
              <article key={`${order.orderId}-${item.name ?? 'item'}-${index}`} className="item-row">
                <div>
                  <p className="item-row__title">{item.name || 'Unnamed item'}</p>
                  <p className="item-row__meta">
                    Price: {formatCurrency(item.price)} | Quantity: {Number(item.quantity) || 0}
                  </p>
                </div>
                <p className="item-row__subtotal">Subtotal: {formatCurrency(subtotal)}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ActivityDetail;