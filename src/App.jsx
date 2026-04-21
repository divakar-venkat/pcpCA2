import { AppProvider, AppContext } from './context/AppContext';
import { AppRouter } from './router/AppRouter';
import { useContext } from 'react';
import './App.css';

const MainApp = () => {
  return <AppRouter />;
};

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;