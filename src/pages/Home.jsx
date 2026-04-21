import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import MovieForm from '../components/MovieForm';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const { state } = useContext(AppContext);

  const moviesList = Array.isArray(state.movies) ? state.movies : [];

  return (
    <div>
      <h1>Movie Wishlist</h1>
      <MovieForm />
      <div>
        {moviesList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;