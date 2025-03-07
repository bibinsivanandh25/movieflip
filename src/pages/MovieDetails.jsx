import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, API_OPTIONS } from '../constants';
import { convertRuntime, formatNumber } from '../utils';
import { useMoveBack } from '../hooks/useMoveBack';
import axios from 'axios';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [trailerKey, setTrailerKey] = useState(null);
  const { id } = useParams();
  const moveBack = useMoveBack();

  const {
    title,
    vote_average,
    release_date,
    runtime,
    original_language,
    poster_path,
    genres,
    overview,
    tagline,
    status,
    spoken_languages,
    production_companies,
    revenue,
    budget,
    production_countries,
  } = movieDetails;

  const fetchMovieDetails = async (id) => {
    try {
      const endpoint = `${API_BASE_URL}/movie/${id}`;
      const { data } = await axios.get(endpoint, API_OPTIONS);
      // const data = await res.json();

      setMovieDetails(data);
    } catch (error) {
      console.error(`Error fetching movie details: ${error.message}`);
    }
  };

  const fetchMovieTrailer = async (movie_id) => {
    try {
      const endpoint = `${API_BASE_URL}/movie/${movie_id}/videos?language=en-US`;
      const { data } = await axios.get(endpoint, API_OPTIONS);

      // const data = await res.json();
      const trailer = data.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );
      setTrailerKey(trailer ? trailer.key : null);
    } catch (error) {
      console.error(`Error fetching movie trailer: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchMovieDetails(id);
    fetchMovieTrailer(id);
  }, [id]);

  return (
    <section className="movie-details">
      <div className="movie-card p-10">
        <div className="back-btn">
          <button className="btn" onClick={moveBack}>
            Visit Homepage{' '}
            <img src="/arrowRight.svg" alt="arrow icon" className="w-3 h-3" />
          </button>
        </div>
        <div className="title-section">
          <h2>{title}</h2>
          <div className="rating rating-bg">
            <img src="/star.svg" alt="star icon" />
            <p>
              {vote_average ? vote_average.toFixed(1) : 'N/A'}/
              <span className="text-gray-100">10</span>
            </p>
          </div>
        </div>
        <div className="content">
          <p className="year">
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="runtime">{convertRuntime(runtime)}</p>
        </div>

        <div className="poster-section">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : '/no-movie.png'
            }
            alt={title}
          />

          {trailerKey && (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allowFullScreen
            />
          )}
        </div>

        <div className="movie-details-section">
          <div className="items-center">
            <h3>Genres</h3>
            <ul>
              {genres?.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>

          <div className="overview">
            <h3>Overview</h3>
            <p>{overview}</p>
          </div>

          <div className="release-date">
            <h3>Release Date</h3>
            <p>{`${release_date} (Worldwide)`}</p>
          </div>

          <div className="status">
            <h3>Status</h3>
            <p>{status}</p>
          </div>

          <div className="countries">
            <h3>Countries</h3>
            <div>
              {production_countries?.map((country, index) => (
                <Fragment key={country.name}>
                  <p>{country.name}</p>
                  {index !== production_countries.length - 1 && (
                    <span className="text-sm">•</span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="lang">
            <h3>Language</h3>
            <div>
              {spoken_languages?.map((lang, index) => (
                <Fragment key={lang.english_name}>
                  <p>{lang.english_name}</p>
                  {index !== spoken_languages.length - 1 && (
                    <span className="text-sm">•</span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="budget">
            <h3>Budget</h3>
            <p>{formatNumber(budget)}</p>
          </div>

          <div className="revenue">
            <h3>Revenue</h3>
            <p>{formatNumber(revenue)}</p>
          </div>

          <div className="tagline">
            <h3>Tagline</h3>
            <p>{tagline ? tagline : 'N/A'}</p>
          </div>

          <div className="production-company">
            <h3>Production Companies</h3>
            <div>
              {production_companies?.map((comp, index) => (
                <Fragment key={comp.id}>
                  <p>{comp.name}</p>
                  {index !== production_companies.length - 1 && (
                    <span className="text-sm">•</span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
