import { ordersData } from '../services/api';

const cloneOrders = orders =>
    orders.map(order => ({
        ...order,
        items: Array.isArray(order.items)
            ? order.items.map(item => ({ ...item }))
            : [],
    }));

export const initialState = {
    orders: cloneOrders(ordersData),
};

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'MARK_ORDER_DELIVERED': {
            const targetOrderId = action.payload;

            return {
                ...state,
                orders: state.orders.map(order => {
                    if (String(order.orderId) !== String(targetOrderId)) {
                        return order;
                    }

                    const currentStatus = String(order.status ?? '').trim().toLowerCase();

                    if (!currentStatus || currentStatus === 'delivered' || currentStatus === 'cancelled') {
                        return order;
                    }

                    return {
                        ...order,
                        status: 'Delivered',
                    };
                }),
            };
        }

        default:
            return state;
    }
};