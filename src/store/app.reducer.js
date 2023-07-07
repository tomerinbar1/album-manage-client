import { storageService } from '../services/storage.service.js'
export const SET_ALBUMS = 'SET_ALBUMS'
export const ADD_ALBUM = 'ADD_ALBUM'
export const UPDATE_ALBUM = 'UPDATE_ALBUM'
export const REMOVE_ALBUM = 'REMOVE_ALBUM'
export const ADD_IMG = 'ADD_IMG'

const initialState = {
  albums: [],
}

export function appReducer(state = initialState, action) {
  let albums
  const key = 'albums'

  switch (action.type) {
    case SET_ALBUMS:
      if (!action.albums) action.albums = storageService.load(key) || []
      return { ...state, albums: action.albums }

    case REMOVE_ALBUM:
      const updatedAlbums = [...state.albums]
      const idx = updatedAlbums.findIndex(album => album.id === action.albumId)
      updatedAlbums.splice(idx, 1)
      return { ...state, albums: updatedAlbums }

    case UPDATE_ALBUM:
      albums = state.albums.map(album =>
        album.id === action.album.id ? action.album : album
      )
      return { ...state, albums }

    case ADD_IMG:
      albums = state.albums.map(album =>
        album.id === action.album.id ? action.album : album
      )
      return { ...state, albums }

    default:
      return state
  }
}
