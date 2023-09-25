import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDcZa5uO9BnHS7YuaoaJUOnTG2D92rXX2g",
  authDomain: "movie-search-application-f10e1.firebaseapp.com",
  projectId: "movie-search-application-f10e1",
  storageBucket: "movie-search-application-f10e1.appspot.com",
  messagingSenderId: "748850868287",
  appId: "1:748850868287:web:96b0b78bc1175731bb488a",
//   measurementId: "G-9RRJTLL8XM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;