import { useContext, useState } from 'react';
import OrderCard from '../components/ActivityCard';
import { AppContext } from '../context/AppContext';
import { getRestaurantMatches } from '../services/api';

const Filter = () => {
  const { state } = useContext(AppContext);
  const [restaurantName, setRestaurantName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = event => {
    setRestaurantName(event.target.value);
    setSubmitted(false);
  };

  const searchResults = restaurantName.trim() ? getRestaurantMatches(state.orders, restaurantName) : [];
  const showNoResults = submitted && restaurantName.trim() && searchResults.length === 0;
  const showEmptyError = submitted && !restaurantName.trim();

  return (
    <main className="page-shell">
      <section className="page-header">
        <p className="section-kicker">Question 3</p>
        <h2>Filter Orders by Restaurant</h2>
        <p>Type a restaurant name. The search is case-insensitive and only valid orders are used.</p>
      </section>

      <section className="filter-panel">
        <label className="filter-field" htmlFor="restaurant-filter">
          Restaurant name
          <input
            id="restaurant-filter"
            type="text"
            data-testid="filter-input"
            value={restaurantName}
            onChange={handleChange}
            placeholder="Search restaurant"
          />
        </label>

        <button type="button" className="button" onClick={() => setSubmitted(true)}>
          Search
        </button>
      </section>

      {showEmptyError ? <p className="form-message form-message--error">Input cannot be empty</p> : null}

      {showNoResults ? <p className="empty-state">No results found</p> : null}

      {!showEmptyError && !showNoResults && restaurantName.trim() ? (
        <section className="grid-list">
          {searchResults.map(order => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </section>
      ) : null}
    </main>
  );
};

export default Filter;