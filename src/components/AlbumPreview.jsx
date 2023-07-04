export const AlbumPreview = ({
  album,
  onRemoveAlbum,
  onEditAlbum,
  onOpenModal,
}) => {
  return (
    <div>
      <h2>{album.title}</h2>
      <img
        src={album.thumbnailUrl}
        alt="album thumbnail"
        onClick={e => onOpenModal(e, 'preview')}
      />
      <div className="action-btns">
        <button
          onClick={e => {
            onEditAlbum(e, album.id)
          }}
        >
          Edit
        </button>
        <button onClick={() => onRemoveAlbum(album.id)}>Delete</button>
      </div>
    </div>
  )
}
