// Placar público (Firestore, banco "sudoku-pokemon"): top 10 por dificuldade,
// entre todos os jogadores. Cada vitória vira um registro novo (não é
// substituído/atualizado) — o placar mostra as melhores pontuações entre
// todas as tentativas de todos os jogadores, não uma entrada por jogador.

import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '../firebase'

const SCORES_COLLECTION = 'scores'
const TOP_N = 10

export async function getTopScores(difficulty, count = TOP_N) {
  const q = query(
    collection(db, SCORES_COLLECTION),
    where('difficulty', '==', difficulty),
    orderBy('score', 'desc'),
    orderBy('elapsedSeconds', 'asc'),
    limit(count),
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// Grava a pontuação e retorna a lista atualizada do top 10 junto com um
// sinalizador indicando se essa jogada entrou no ranking.
export async function submitScore({ uid, playerName, difficulty, score, elapsedSeconds }) {
  await addDoc(collection(db, SCORES_COLLECTION), {
    uid,
    playerName,
    difficulty,
    score,
    elapsedSeconds,
    createdAt: serverTimestamp(),
  })

  const entries = await getTopScores(difficulty)
  const isNewRecord = entries.some(
    (e) => e.uid === uid && e.score === score && e.elapsedSeconds === elapsedSeconds,
  )
  return { isNewRecord, entries }
}
