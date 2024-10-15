import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK2tnMGKgL_Cg4SXQ2YjSfYvR49qvWFH0",
  authDomain: "clash-royale-4289e.firebaseapp.com",
  projectId: "clash-royale-4289e",
  storageBucket: "clash-royale-4289e.appspot.com",
  messagingSenderId: "570363405664",
  appId: "1:570363405664:web:6b7f6d783f608477172a05",
  measurementId: "G-LPCF9DC1G7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private httpClient = inject(HttpClient);

  constructor(@Inject('BASE_URL') private baseUrl: string) { }

  getNames() {
    return this.httpClient.get<string[]>(this.baseUrl + '/home');
  }
}
