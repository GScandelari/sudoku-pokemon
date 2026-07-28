import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Config pública do Firebase — não é segredo (a segurança vem das regras do
// Firestore/Auth, não de esconder esta chave). App "sudoku-pokemon" dedicado,
// dentro do mesmo projeto do site principal (website-scandelari).
const firebaseConfig = {
  projectId: 'website-scandelari',
  appId: '1:832571491877:web:d23c17059cd87e4ca661cc',
  storageBucket: 'website-scandelari.firebasestorage.app',
  apiKey: 'AIzaSyDq6mTMrp12oQXsGr9uf6WVZ-rRcKLO9tw',
  authDomain: 'website-scandelari.firebaseapp.com',
  messagingSenderId: '832571491877',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
// Banco isolado "sudoku-pokemon", separado do banco do site principal.
export const db = getFirestore(firebaseApp, 'sudoku-pokemon')
