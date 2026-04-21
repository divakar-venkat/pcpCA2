import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="topbar">
      <div>
        <p className="topbar__label">Food Delivery Orders Management</p>
        <h1 className="topbar__title">Live order control center</h1>
      </div>

      <div className="topbar__links">
        <Link to="/orders">Orders</Link>
        <Link to="/filter">Filter</Link>
        <Link to="/stats">Stats</Link>
      </div>
    </nav>
  );
};

export default Navbar;