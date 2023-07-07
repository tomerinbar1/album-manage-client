import {
  getAlbums,
  deleteAlbum,
  updateAlbum,
  getAlbumById,
  addImg,
} from '../services/app.service.js'
import { storageService } from '../services/storage.service.js'
import { store } from './store.js'
import {
  SET_ALBUMS,
  UPDATE_ALBUM,
  REMOVE_ALBUM,
  ADD_IMG,
} from './app.reducer.js'

export async function loadAlbums() {
  let albums
  try {
    albums = await getAlbums()
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
    store.dispatch({ type: REMOVE_ALBUM, albumId })
  } catch (err) {
    console.log('app action -> Cannot remove album', err)
    throw err
  }
}

//! I don't think you succeeded to implement this function, so remove it.
export async function editAlbum(id, title) {
  try {
    const updatedAlbum = await updateAlbum(id, title)
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
    return album
  } catch (err) {
    console.error('app action -> Cannot get album', err)
    throw err
  }
}

export async function addNewImg(id, img) {
  try {
    const {
      thumbnailUrl: [thumbnailUrl],
    } = await addImg(img)
    const album = await getById(id)
    album.thumbnailUrl.push(thumbnailUrl)
    storageService.store('albums', album)
    store.dispatch({ type: ADD_IMG, album })
  } catch (err) {
    console.error('app action -> Cannot add img', err)
    throw err
  }
}
