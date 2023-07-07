import { storageService } from '../services/storage.service'

export async function getAlbums(limit = 100) {
  const albums = storageService.load('albums') || []
  if (!albums || !albums.length) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
    )
    const data = await response.json()

    const updatedAlbums = data.map(({ id, title, thumbnailUrl }) => ({
      id,
      title,
      thumbnailUrl: [thumbnailUrl],
    }))

    storageService.store('albums', updatedAlbums)
    return updatedAlbums
  }
  return albums
}

export async function getAlbumById(id) {
  return await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then(response => response.json())
    .then(data => data)
}

export async function deleteAlbum(id) {
  return await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => data)
}

export async function updateAlbum(id, title, thumbnailUrl) {
  return await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      title,
      thumbnailUrl,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(data => data)
}

export async function addImg(img) {
  return fetch(`https://jsonplaceholder.typicode.com/photos`, {
    method: 'POST',
    body: JSON.stringify({
      thumbnailUrl: [img],
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(data => data)
}
