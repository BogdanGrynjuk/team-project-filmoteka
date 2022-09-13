import { Film } from '../film/film';

export function actionWatch(evt, filmData) {
  evt.target.classList.add('remove-watched-btn');
  //   console.log(evt.target.dataset.action);
  if (evt.target.dataset.action === 'add') {
    if (localStorage.getItem('userData') !== null) {
      const currentUserName = JSON.parse(
        localStorage.getItem('userData')
      ).userName;
      Film.createWithtAuth(filmData, 'watchedFilms', currentUserName);
      evt.target.textContent = 'Remove from watched';
      evt.target.dataset.action = 'remove';
    } else {
      Film.createWithoutAuth(filmData, 'watchedFilms');
      evt.target.textContent = 'Remove from watched';
      evt.target.dataset.action = 'remove';
    }
  } else {
    if (localStorage.getItem('userData') !== null) {
      const currentUserName = JSON.parse(
        localStorage.getItem('userData')
      ).userName;
      Film.removeWithAuth(filmData.id, 'watchedFilms', currentUserName);
      Film.renderWatchedFilms('watchedFilms', 'watched');

      evt.target.textContent = 'Add to queue';
      evt.target.dataset.action = 'add';
    } else {
      Film.removeWithoutAuth(filmData.id, 'watchedFilms');
      Film.renderWatchedFilms('watchedFilms', 'watched');
      evt.target.textContent = 'Add to watched';
      evt.target.dataset.action = 'add';
    }
  }
}

export function actionQueue(evt, filmData) {
  evt.target.classList.add('remove-queue-btn');
  if (evt.target.dataset.action === 'add') {
    if (localStorage.getItem('userData') !== null) {
      const currentUserName = JSON.parse(
        localStorage.getItem('userData')
      ).userName;
      Film.createWithtAuth(filmData, 'queueFilms', currentUserName);
      evt.target.textContent = 'Remove from queue';
      evt.target.dataset.action = 'remove';
    } else {
      Film.createWithoutAuth(filmData, 'queueFilms');
      evt.target.textContent = 'Remove from queue';
      evt.target.dataset.action = 'remove';
    }
  } else {
    if (localStorage.getItem('userData') !== null) {
      const currentUserName = JSON.parse(
        localStorage.getItem('userData')
      ).userName;
      Film.removeWithAuth(filmData.id, 'queueFilms', currentUserName);
      Film.renderWatchedFilms('queueFilms', 'scheduled');
      evt.target.textContent = 'Add to queue';
      evt.target.dataset.action = 'add';
    } else {
      Film.removeWithoutAuth(filmData.id, 'queueFilms');
      Film.renderWatchedFilms('queueFilms', 'scheduled');
      evt.target.textContent = 'Add to queue';
      evt.target.dataset.action = 'add';
    }
  }
}
