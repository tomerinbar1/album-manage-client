import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import imgNotFound from '../assets/img/image-not-found.png'

export const EditAlbumModal = ({
  album,
  editModalIsOpen,
  onCloseModal,
  onSaveAlbum,
}) => {
  const [title, setTitle] = useState(null)
  const [thumbnailUrl, setThumbnailUrl] = useState(null)

  useEffect(() => {
    if (album && album.title && album.thumbnailUrl) {
      setTitle(album.title)
      setThumbnailUrl(album.thumbnailUrl)
    } else {
      setTitle('')
      setThumbnailUrl(imgNotFound)
    }
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
    formData.append('thumbnailUrl', thumbnailUrl)
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
        <textarea className='title-input'
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
          rows={2}
        />
        <img src={thumbnailUrl} alt="img" />
        <input className='upload-input' type="file" name="file" onChange={handleThumbnailUrlChange} />
        <div className="action-btns">
          <button onClick={e => handleSubmit(e)} type="submit">
            Save
          </button>
          <button onClick={() => onCloseModal()}>Cancel</button>
        </div>
      </form>
    </Modal>
  )
}
