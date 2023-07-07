import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  loadAlbums,
  removeAlbum,
  getById,
  editAlbum,
  addNewImg,
} from '../store/app.actions'
import { AlbumsList } from '../components/AlbumsList'
import { AlbumModal } from '../components/AlbumModal'
import { EditAlbumModal } from '../components/EditAlbumModal'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { UserMsg } from '../components/UserMsg'

export const AppIndex = () => {
  //!  The name AppIndex is not good, I will prefer to use AppPage or App, AlbumPage or AlbumApp etc...
  const albums = useSelector(state => state.appModule.albums)
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [album, setAlbum] = useState({})
  const [img, setImg] = useState('')

  useEffect(() => {
    loadAlbums()
    //! For what the eslint-disable-next-line?
    // eslint-disable-next-line
  }, [])

  const onOpenModal = (event, modal) => {
    //! I don't like the way that you need to know via hard coded what model should be open
    //! Why not to create 2 functions for each modal?, you aren't saved any code here.

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
    //! I prefer always to use the opposite of the condition.
    //! Like this:
    //! setPreviewModalIsOpen(!previewModalIsOpen)
  }

  const onRemoveAlbum = albumId => {
    try {
      removeAlbum(albumId)
      showSuccessMsg('Album removed successfully')
    } catch (error) {
      showErrorMsg('Album remove failed')
    }
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
    const { id, title } = Object.fromEntries(formData.entries())
    try {
      await editAlbum(id, title)
      showSuccessMsg('Album saved successfully')
    } catch (error) {
      showErrorMsg('Album save failed')
    }
  }

  const onAddImg = async (e, albumId, thumbnailUrl) => {
    e.preventDefault()
    try {
      await addNewImg(albumId, thumbnailUrl)
      showSuccessMsg('Image added successfully')
    } catch (error) {}
  }

  if (!albums?.length) {
    return <div>Loading...</div>
  }

  //! I will build one component that is a modal and I'll render inside of it the children, And I'll not need to create the Modal of react again.
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
          onAddImg={onAddImg}
        />
        <UserMsg />
      </div>
    </section>
  )
}
