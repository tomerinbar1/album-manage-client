import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import imgNotFound from '../assets/img/image-not-found.png'

export const EditAlbumModal = ({
  album,
  editModalIsOpen,
  onCloseModal,
  onSaveAlbum,
  onAddImg,
}) => {
  const [title, setTitle] = useState(album?.title || '')
  const [thumbnailUrl, setThumbnailUrl] = useState(
    album?.thumbnailUrl || imgNotFound
  )

  useEffect(() => {
    setTitle(album?.title || '')
    setThumbnailUrl(album?.thumbnailUrl || '')
  }, [album])

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleThumbnailUrlChange = event => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setThumbnailUrl(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('id', album.id)
    formData.append('title', title)
    onSaveAlbum(formData)
    onCloseModal()
  }

  if (!editModalIsOpen) return null
  return (
    <Modal
      isOpen={editModalIsOpen}
      onRequestClose={onCloseModal}
      className="EditModal"
      overlayClassName="Overlay"
    >
      <form className="edit-form">
        <input
          className="title-input"
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
          rows={2}
        />
        <img src={thumbnailUrl} alt="img" />
        <div className="img-upload-actions">
          <input
            className="upload-input"
            type="file"
            name="file"
            onChange={handleThumbnailUrlChange}
          />
          <button
            className="upload-btn"
            onClick={e => onAddImg(e, album.id, thumbnailUrl)}
            type="submit"
          >
            Add new Image
          </button>
        </div>

        <div className="action-btns">
          <button onClick={handleSubmit} type="submit">
            Save
          </button>
          <button onClick={() => onCloseModal()}>Cancel</button>
        </div>
      </form>
    </Modal>
  )
}
