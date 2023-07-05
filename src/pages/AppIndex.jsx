import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  loadAlbums,
  removeAlbum,
  getById,
  editAlbum,
} from '../store/app.actions'
import { AlbumsList } from '../components/AlbumsList'
import { AlbumModal } from '../components/AlbumModal'
import { EditAlbumModal } from '../components/EditAlbumModal'

export const AppIndex = () => {
  const albums = useSelector(state => state.appModule.albums)
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [album, setAlbum] = useState({})
  const [img, setImg] = useState('')

  useEffect(() => {
    loadAlbums()
    // eslint-disable-next-line
  }, [])

  const onOpenModal = (event, modal) => {
    event.preventDefault()
    if (modal === 'preview') {
      setImg(event.target.src)
    }
    setPreviewModalIsOpen(modal === 'preview')
    setEditModalIsOpen(modal === 'edit' || modal === 'add')
    if (modal === 'add') {
      setAlbum({})
    }
  }

  const onCloseModal = () => {
    setPreviewModalIsOpen(false)
    setEditModalIsOpen(false)
  }

  const onRemoveAlbum = albumId => {
    removeAlbum(albumId)
  }

  const onEditAlbum = async (event, albumId) => {
    try {
      const album = await getById(albumId)
      setAlbum(album)
      onOpenModal(event, 'edit')
    } catch (error) {
      console.log(error)
    }
  }

  const onSaveAlbum = async formData => {
    const { id, title, thumbnailUrl } = Object.fromEntries(formData.entries())
    await editAlbum( id, title, thumbnailUrl )
  }

  if (!albums?.length) {
    return <div>Loading...</div>
  }

  return (
    <section className="albums-grid">
      <AlbumsList
        albums={albums}
        onRemoveAlbum={onRemoveAlbum}
        onOpenModal={onOpenModal}
        onEditAlbum={onEditAlbum}
      />
      <div className="modal-container">
        <AlbumModal
          previewModalIsOpen={previewModalIsOpen}
          onCloseModal={onCloseModal}
          img={img}
        />
        <EditAlbumModal
          editModalIsOpen={editModalIsOpen}
          onCloseModal={onCloseModal}
          album={album}
          onEditAlbum={onEditAlbum}
          onSaveAlbum={onSaveAlbum}
        />
      </div>
    </section>
  )
}
