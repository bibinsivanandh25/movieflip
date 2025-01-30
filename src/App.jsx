import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/movie" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
