import getGenres from './fetches/getGenres';
import API_KEY from './apiKey';

const cardCollection = document.querySelector('.card__colection');

function listMovies(list) {
  getGenres(API_KEY).then(genres => {
    cardCollection.innerHTML = '';
    const movies = list
      .map(movie => {
        const imgError =  require('../images/no-images-found.png');
        const imgSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : imgError;
        const genresName = movie.genre_ids
          .map(genreId => genres.filter(el => el.id === genreId)[0])
          .map(el => el.name);
        const genresNameDotted =
          genresName.length > 2
            ? genresName.slice(0, 2).join(', ') + ' ...'
            : genresName.join(', ');
        const year = movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : '0000';
        return `<li class="card__film" >
        <div class="thumb" data-id='${movie.id}'>
          <img src="${imgSrc}" alt="${
          movie.title
        }" onerror='this.src="${imgError}"'/>
        </div>
        <h2 class="card__title">${movie.title}</h2>
        <p class="card__text">
          <span class="genres">${
            genresNameDotted.length > 0 ? genresNameDotted : 'No genres'
          }</span> | <span class="release">${year}</span> <span
            class="card__vote_average">${movie.vote_average.toFixed(1)}</span>
        </p>
      </li>`;
      })
      .join('');
    cardCollection.insertAdjacentHTML('beforeend', movies);
  });
}
export default listMovies;
