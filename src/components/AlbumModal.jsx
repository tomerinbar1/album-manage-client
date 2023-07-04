import Modal from 'react-modal'

export const AlbumModal = ({ img, previewModalIsOpen, onCloseModal }) => {
  return (
    <Modal
      isOpen={previewModalIsOpen}
      onRequestClose={onCloseModal}
      className="Modal"
      overlayClassName="Overlay"
    >
      <button className='close-btn' onClick={() => onCloseModal()}>X</button>
      <img src={img} alt="img" />
    </Modal>
  )
}
