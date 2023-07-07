import { AlbumPreview } from './AlbumPreview'

export function AlbumsList({
  albums,
  onRemoveAlbum,
  onEditAlbum,
  onOpenModal,
}) {
  return (
    <ul className="albums-list">
      {/* Why are you using reverse? */}
      {albums.reverse().map(album => (
        <li className="album-preview" key={album.id}>
          <AlbumPreview
            album={album}
            onRemoveAlbum={onRemoveAlbum}
            onOpenModal={onOpenModal}
            onEditAlbum={onEditAlbum}
          />
        </li>
      ))}
    </ul>
  )
}
