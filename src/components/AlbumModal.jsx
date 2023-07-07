import Modal from 'react-modal'

export const AlbumModal = ({ img, previewModalIsOpen, onCloseModal }) => {
  return (
    <Modal
      isOpen={previewModalIsOpen}
      onRequestClose={onCloseModal}
      className="Modal"
      overlayClassName="Overlay"
    >
      {/*
      I will prefer to use here {children} instead of your content, because you can use this component for other things.
      */}
      <button className='close-btn' onClick={() => onCloseModal()}>X</button>
      <img src={img} alt="img" />
    </Modal>
  )
}
