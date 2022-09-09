import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import regValidation from './regValidation';

const firebaseConfig = {
  apiKey: 'AIzaSyBdaR4YLCQNbvL0nBLOVIY9QfiBV8jMBN8',
  authDomain: 'filmoteka-152c6.firebaseapp.com',
  databaseURL:
    'https://filmoteka-152c6-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-152c6',
  storageBucket: 'filmoteka-152c6.appspot.com',
  messagingSenderId: '913255222211',
  appId: '1:913255222211:web:4a70b19211bfd9fa790b76',
};

const app = initializeApp(firebaseConfig);

export function registration(evt) {
  evt.preventDefault();
  const userName = document.getElementById('reg-user-name');
  const email = document.getElementById('modal-email');
  const password = document.getElementById('modal-password');
  if (!regValidation(userName.value, email.value, password.value)) {
    // return Notiflix.Notify.warning('You filled form uncorrect');
    return alert('You filled form uncorrect');
  }
  const db = getDatabase();
  const dbRef = ref(db);

  get(child(dbRef, 'UsersList/' + userName.value)).then(snapshot => {
    if (snapshot.exists()) {
      //   Notiflix.Notify.warning('User already exist !');
      alert('User already exist !');
    } else {
      set(ref(db, 'UsersList/' + userName.value), {
        userName: userName.value,
        email: email.value,
        password: password.value,
      })
        // .then(Notiflix.Notify.success('User Successfuly registraited'))
        .then(alert('User Successfuly registraited !'))
        .then(document.getElementById('authorization-form').reset())
        .catch(console.log);
    }
  });
}

export function autentification(evt) {
  evt.preventDefault();
  const db = getDatabase();
  const userName = document.getElementById('reg-user-name');
  const password = document.getElementById('modal-password');
  const dbRef = ref(db);

  get(child(dbRef, 'UsersList/' + userName.value)).then(snapshot => {
    if (snapshot.exists()) {
      let dbpas = snapshot.val().password;
      if (dbpas === password.value) {
        alert(`You Successfuly enter in your accaunt  ${userName.value} !`);
        // Notiflix.Notify.success(
        //   `You Successfuly enter in your accaunt  ${userName.value} !`
        // );
        // Film.renderCurrentUserFilmList(userName.value);
        logIn(snapshot.val());
      }
    } else {
      return alert('User not exist yet !');
      //   return Notiflix.Notify.warning('User not exist yet !');
    }
  });
}

function logIn(userData) {
  sessionStorage.setItem('userData', JSON.stringify(userData));
  document.querySelector('.close-btn').click();
  renderCurrentUserName();
  //   addEventListenerOnExitBtn();
}

function renderCurrentUserName() {
  const userNikName = JSON.parse(sessionStorage.getItem('userData')).userName;
  const navUserName = document.getElementById('user-name-contain');

  const html = `
            <button
            type="button"
            id="sign-out-btn"
          >Sign Out
          </button>
          <p>Hello ,${userNikName} !</p>
    `;
  navUserName.innerHTML = html;
  document.querySelector('.modal-open-btn').classList.add('hidden');
}

// export function addEventListenerOnExitBtn() {
//   const exitBtn = document.getElementById('sign-out-btn');
//   exitBtn.addEventListener('click', exitBtnHandler);
// }
