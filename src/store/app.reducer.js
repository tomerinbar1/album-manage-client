import { storageService } from '../services/storage.service.js'
export const SET_ALBUMS = 'SET_ALBUMS'
export const ADD_ALBUM = 'ADD_ALBUM'
export const UPDATE_ALBUM = 'UPDATE_ALBUM'
export const REMOVE_ALBUM = 'REMOVE_ALBUM'

const initialState = {
  albums: [],
}

export function appReducer(state = initialState, action) {
  let albums

  switch (action.type) {
    case SET_ALBUMS:
      if (!action.albums) action.albums = storageService.load('albums') || []
      return { ...state, albums: action.albums }

    case REMOVE_ALBUM:
      const updatedAlbums = state.albums.filter(
        album => album.id !== action.albumId
      )
      return { ...state, albums: updatedAlbums }

    case ADD_ALBUM:
      albums = [...state.albums, action.album]
      return { ...state, albums }

    case UPDATE_ALBUM:
      albums = state.albums.map(album =>
        album.id === action.album.id ? action.album : album
      )
      return { ...state, albums }

    default:
      return state
  }
}
