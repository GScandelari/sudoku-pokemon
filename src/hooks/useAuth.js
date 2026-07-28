import { useCallback, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase'
import { getDisplayName } from '../game-logic/playerIdentity'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return unsubscribe
  }, [])

  const signInGoogle = useCallback(async () => {
    setAuthError(null)
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (err) {
      console.error(err)
      setAuthError('Não foi possível entrar com Google. Tente de novo.')
    }
  }, [])

  const signInGuest = useCallback(async () => {
    setAuthError(null)
    try {
      await signInAnonymously(auth)
    } catch (err) {
      console.error(err)
      setAuthError('Não foi possível continuar como convidado. Tente de novo.')
    }
  }, [])

  const logOut = useCallback(() => signOut(auth), [])

  return {
    user,
    authLoading,
    authError,
    isSignedIn: !!user,
    displayName: getDisplayName(user),
    signInGoogle,
    signInGuest,
    logOut,
  }
}
