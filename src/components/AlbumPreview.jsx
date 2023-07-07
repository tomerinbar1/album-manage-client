export const AlbumPreview = ({
  album,
  onRemoveAlbum,
  onEditAlbum,
  onOpenModal,
}) => {
  return (
    //!   If you are using a div here without a class or use. Try to use a React.Fragment like this:
    //!   <> Your content </>
    <div>
      <h2>{album.title}</h2>
      <img
        src={album.thumbnailUrl}
        alt="album thumbnail"
        /* I don't like the way that you need to know via hard coded what model should be open*/
        onClick={e => onOpenModal(e, 'preview')}
      />
      <div className="action-btns">
        <button
          onClick={e => {
            onEditAlbum(e, album.id)
          }}
          /* You don't need to open a scope
         onClick={e => onEditAlbum(e, album.id)
          }
         */
        >
          Edit
        </button>
        <button onClick={() => onRemoveAlbum(album.id)}>Delete</button>
      </div>
    </div>
  )
}
