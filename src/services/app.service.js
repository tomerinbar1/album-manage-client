export async function getAlbums(limit = 100) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
  )
  const data = await response.json()

  const modifiedData = data.map(({ id, title, thumbnailUrl }) => ({
    id,
    title,
    thumbnailUrl,
  }))

  return modifiedData
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

export async function updateAlbum(id, title) {
  return await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      title,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(data => data)
}

export async function createAlbum(title, img) {
  return fetch('https://jsonplaceholder.typicode.com/photos', {
    method: 'POST',
    body: JSON.stringify({
      title,
      thumbnailUrl: img,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(data => data)
}
