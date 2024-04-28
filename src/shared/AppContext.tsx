import React, { createContext, useState, useEffect } from "react"

type AppStateProps = {
  userName: string
  userEmail: string
  favorites: string[]
  addFavorite: (path: string) => void
  removeFavorite: (path: string) => void
  isFavorite: (path: string) => boolean
}

const GLOBAL_STATE: AppStateProps = {
  userName: "Guest User",
  userEmail: "guest.user@jithin.com",
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
}

export const AppContext = React.createContext<AppStateProps>(GLOBAL_STATE)

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [appState, setAppState] = useState<AppStateProps>(GLOBAL_STATE)

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setAppState((prevState) => ({
        ...prevState,
        favorites: JSON.parse(storedFavorites),
      }))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(appState.favorites))
  }, [appState.favorites])

  const addFavorite = (path: string) => {
    setAppState((prevState) => ({
      ...prevState,
      favorites: [...prevState.favorites, path],
    }))
  }

  const removeFavorite = (path: string) => {
    setAppState((prevState) => ({
      ...prevState,
      favorites: prevState.favorites.filter((favorite) => favorite !== path),
    }))
  }

  const isFavorite = (path: string) => appState.favorites.includes(path)

  const contextValue: AppStateProps = {
    ...appState,
    addFavorite,
    removeFavorite,
    isFavorite,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
