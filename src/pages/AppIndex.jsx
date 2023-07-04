import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  loadAlbums,
  removeAlbum,
  getById,
  addAlbum,
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
    console.log('Removing album:', albumId);
    removeAlbum(albumId)
  }

  const onEditAlbum = async (event, albumId) => {
    try {
      if (albumId) {
        const album = await getById(albumId)
        setAlbum(album)
        onOpenModal(event, 'edit')
      } else {
        onOpenModal(event, 'add')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSaveAlbum = async (title, img) => {
    try {
      await addAlbum(title, img)
    } catch (error) {
      console.log('Error saving album:', error)
    }
  }

  if (!albums?.length) {
    return <div>Loading...</div>;
  }

  return (
    <section className="albums-grid">
      <button className="add-btn" onClick={e => onEditAlbum(e)}>
        Add album
      </button>
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
          onSaveAlbum={onSaveAlbum}
          onEditAlbum={onEditAlbum}
        />
      </div>
    </section>
  )
}
