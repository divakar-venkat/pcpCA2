import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { formatCurrency, isCancelledOrder, isDeliveredOrder } from '../services/api';

const OrderCard = ({ order }) => {
  const { dispatch } = useContext(AppContext);
  const customerName = order.customerName?.trim() ? order.customerName : 'Unknown';
  const status = order.status?.trim() ? order.status : 'Unknown';
  const canMarkDelivered = !isDeliveredOrder(order) && !isCancelledOrder(order);

  return (
    <article className="order-card" data-testid="order-item">
      <div className="order-card__header">
        <div>
          <p className="order-card__eyebrow">{order.restaurant || 'Restaurant'}</p>
          <h3>{customerName}</h3>
        </div>
        <span className={`status-pill status-pill--${status.toLowerCase().replace(/\s+/g, '-')}`}>
          {status}
        </span>
      </div>

      <p className="order-card__meta">Order ID: {order.orderId}</p>
      <p className="order-card__meta">Delivery time: {order.deliveryTime || 'Not available'}</p>
      <p className="order-card__meta">Total: {formatCurrency(order.totalAmount)}</p>

      <div className="order-card__actions">
        <Link to={`/orders/${order.orderId}`} className="button button--secondary">
          View Details
        </Link>

        {canMarkDelivered ? (
          <button
            type="button"
            className="button"
            onClick={() => dispatch({ type: 'MARK_ORDER_DELIVERED', payload: order.orderId })}
          >
            Mark Delivered
          </button>
        ) : null}
      </div>

      {typeof order.rating === 'number' && Number.isFinite(order.rating) ? (
        <p className="order-card__meta">Rating: {order.rating}</p>
      ) : null}
    </article>
  );
};

export default OrderCard;