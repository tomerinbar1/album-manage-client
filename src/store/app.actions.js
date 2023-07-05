import {
  getAlbums,
  deleteAlbum,
  updateAlbum,
  getAlbumById,
} from '../services/app.service.js'
import { storageService } from '../services/storage.service.js'
import { store } from './store.js'
import { SET_ALBUMS, UPDATE_ALBUM, REMOVE_ALBUM } from './app.reducer.js'

export async function loadAlbums() {
  try {
    let albums = storageService.load('albums') || []
    if (!albums || !albums.length) {
      albums = await getAlbums()
      storageService.store('albums', albums)
    }
    store.dispatch({ type: SET_ALBUMS, albums })
    return albums
  } catch (err) {
    console.log('app action -> Cannot load albums', err)
    throw err
  }
}

export async function removeAlbum(albumId) {
  try {
    await deleteAlbum(albumId)
    let albums = storageService.load('albums') || []
    albums = albums.filter(album => album.id !== albumId)
    storageService.store('albums', albums)
    store.dispatch({ type: REMOVE_ALBUM, albumId })
  } catch (err) {
    console.log('app action -> Cannot remove album', err)
    throw err
  }
}

export async function editAlbum(id, title, thumbnailUrl) {
  try {
    const updatedAlbum = await updateAlbum(id, title, thumbnailUrl)
    const storedAlbums = storageService.load('albums') || []
    const albumIndex = storedAlbums.findIndex(
      album => album.id === updatedAlbum.id
    )
    if (albumIndex !== -1) {
      storedAlbums[albumIndex] = updatedAlbum
    } else {
      storedAlbums.unshift(updatedAlbum)
    }
    storageService.store('albums', storedAlbums)
    store.dispatch({ type: UPDATE_ALBUM, album: updatedAlbum })
  } catch (err) {
    console.log('app action -> Cannot update album', err)
    throw err
  }
}

export async function getById(id) {
  try {
    const storedAlbum = storageService.load('albums', [])
    const album = storedAlbum.find(album => album.id === id)
    if (album) {
      return album
    } else {
      const getAlbum = await getAlbumById(id)
      return getAlbum
    }
  } catch (err) {
    console.log('app action -> Cannot get album', err)
    throw err
  }
}
