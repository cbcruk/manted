import React from 'react'
import { createPortal } from 'react-dom'
import { useAtom } from 'jotai'
import { handleMarkerAtom } from '../../atoms/marker'

function Overlay() {
  const customOverlayElem = document.getElementById('custom-overlay')
  const [{ expanded }, handleMarker] = useAtom(handleMarkerAtom)

  if (expanded.length === 0) {
    return null
  }

  if (!customOverlayElem) {
    return null
  }

  return createPortal(
    <div className="-translate-x-2/4 -translate-y-1/4 absolute bg-white flex gap-1 p-1 rounded-3xl shadow-2xl transform border-2 border-dashed">
      {expanded.map((marker) => (
        <a
          key={marker.id}
          className="block cursor-pointer"
          style={{
            width: 30,
            height: 30,
          }}
          onClick={() => {
            handleMarker({
              selected: marker,
            })
          }}
        >
          <img
            src={marker.logo_img_thumb}
            alt={marker.name}
            title={`${marker.name} - ${marker.position}`}
          />
        </a>
      ))}
    </div>,
    customOverlayElem
  )
}

export default Overlay
