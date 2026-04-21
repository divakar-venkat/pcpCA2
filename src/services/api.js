const rawOrders = [
  {
    orderId: 'ORD-1001',
    customerName: 'Aisha Khan',
    restaurant: 'Spice Route',
    items: [
      { name: 'Paneer Wrap', price: 180, quantity: 2 },
      { name: 'Mint Cooler', price: 60, quantity: 1 },
    ],
    totalAmount: 420,
    status: 'Pending',
    deliveryTime: '25 mins',
    rating: 4.6,
  },
  {
    orderId: 'ORD-1002',
    customerName: 'Rohan Mehta',
    restaurant: 'Burger Box',
    items: [
      { name: 'Cheese Burger', price: 220, quantity: 1 },
      { name: 'Fries', price: 90, quantity: 2 },
    ],
    totalAmount: 400,
    status: 'Delivered',
    deliveryTime: '18 mins',
    rating: 4.8,
  },
  {
    orderId: 'ORD-1003',
    customerName: 'Neha Sharma',
    restaurant: 'Tandoor Tales',
    items: [
      { name: 'Chicken Biryani', price: 320, quantity: 1 },
      { name: 'Raita', price: 50, quantity: 1 },
    ],
    totalAmount: 370,
    status: 'Cancelled',
    deliveryTime: '32 mins',
  },
  {
    orderId: 'ORD-1004',
    customerName: '',
    restaurant: 'Green Bowl',
    items: [
      { name: 'Quinoa Salad', price: 240, quantity: 1 },
    ],
    totalAmount: 240,
    status: 'Pending',
    deliveryTime: '20 mins',
  },
  {
    orderId: 'ORD-1005',
    customerName: 'Kabir Ali',
    restaurant: 'Pizza Palace',
    items: [],
    totalAmount: 520,
    status: 'Pending',
    deliveryTime: '40 mins',
    rating: 4.2,
  },
  {
    orderId: 'ORD-1006',
    customerName: 'Meera Iyer',
    restaurant: 'Noodle Nest',
    items: [
      { name: 'Veg Hakka Noodles', price: 190, quantity: 0 },
    ],
    totalAmount: 190,
    status: 'Pending',
    deliveryTime: '28 mins',
  },
  {
    orderId: 'ORD-1007',
    customerName: 'Arjun Patel',
    restaurant: 'Cafe Cloud',
    items: [
      { name: 'Cold Coffee', price: 140, quantity: 1 },
      { name: 'Sandwich', price: 150, quantity: 2 },
    ],
    totalAmount: 'invalid',
    status: 'Delivered',
    deliveryTime: '22 mins',
    rating: 4.1,
  },
  {
    orderId: 'ORD-1008',
    customerName: 'Farah Noor',
    restaurant: 'Urban Sushi',
    items: [
      { name: 'Sushi Combo', price: 640, quantity: 1 },
    ],
    totalAmount: 640,
    status: 'Preparing',
    deliveryTime: '35 mins',
  },
  {
    orderId: 'ORD-1009',
    customerName: 'Ishaan Roy',
    restaurant: 'Spice Route',
    items: [
      { name: 'Paneer Tikka', price: 260, quantity: 1 },
    ],
    totalAmount: 260,
    deliveryTime: '19 mins',
    rating: 4.9,
  },
];

const cloneItems = items =>
  items.map(item => ({
    name: item?.name ?? 'Item',
    price: Number(item?.price),
    quantity: Number(item?.quantity),
  }));

export const ordersData = rawOrders.map(order => ({
  ...order,
  items: Array.isArray(order.items) ? cloneItems(order.items) : [],
}));

export const isValidOrder = order => {
  if (!order || !Array.isArray(order.items) || order.items.length === 0) {
    return false;
  }

  const hasPositiveItemQuantity = order.items.every(item => Number(item?.quantity) > 0);
  const hasValidTotal = Number.isFinite(Number(order.totalAmount)) && Number(order.totalAmount) > 0;

  return hasPositiveItemQuantity && hasValidTotal;
};

export const isDeliveredOrder = order => String(order?.status ?? '').trim().toLowerCase() === 'delivered';

export const isCancelledOrder = order => String(order?.status ?? '').trim().toLowerCase() === 'cancelled';

export const getValidOrders = orders => orders.filter(isValidOrder);

export const getPendingOrders = orders => getValidOrders(orders).filter(order => !isDeliveredOrder(order));

export const getRestaurantMatches = (orders, restaurantName) => {
  const query = String(restaurantName ?? '').trim().toLowerCase();

  return getPendingOrders(orders).filter(order =>
    String(order.restaurant ?? '').toLowerCase().includes(query)
  );
};

export const getItemSubtotal = item => Number(item?.price ?? 0) * Number(item?.quantity ?? 0);

export const getAnalytics = orders =>
  getValidOrders(orders).reduce(
    (accumulator, order) => {
      const status = String(order.status ?? '').trim().toLowerCase();

      if (!status) {
        return accumulator;
      }

      accumulator.totalOrders += 1;

      if (status === 'delivered') {
        accumulator.deliveredOrders += 1;
      }

      if (status === 'cancelled') {
        accumulator.cancelledOrders += 1;
      }

      return accumulator;
    },
    {
      totalOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
    }
  );

export const formatCurrency = amount => {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericAmount);
};