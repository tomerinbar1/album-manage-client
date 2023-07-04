import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import defaultImg from '../assets/img/default.png'

export const EditAlbumModal = ({
  album,
  editModalIsOpen,
  onSaveAlbum,
  onCloseModal,
}) => {
  const [title, setTitle] = useState(null)

  useEffect(() => {
    if (album && album.title) {
      setTitle(album.title)
    } else {
      setTitle('')
    }
  }, [album])

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (album.id) {
      onSaveAlbum(title)
      onCloseModal()
    } else {
      onSaveAlbum(title, defaultImg)
      onCloseModal()
    }
  }

  if (!editModalIsOpen) return null

  return (
    <Modal
      isOpen={editModalIsOpen}
      onRequestClose={onCloseModal}
      className="EditModal"
      overlayClassName="Overlay"
    >
      <button className="close-btn" onClick={() => onCloseModal()}>
        X
      </button>
      {album.id ? (
        <form className="edit-form">
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          <img src={album.thumbnailUrl} alt="img" />
          <button onClick={e => handleSubmit(e)} type="submit">
            Save
          </button>
        </form>
      ) : (
        <form className="add-form">
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          <img src={defaultImg} alt="img" />
          <button onClick={e => handleSubmit(e)} type="submit">
            Save
          </button>
        </form>
      )}
    </Modal>
  )
}
