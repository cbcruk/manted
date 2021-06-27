import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useAtom } from 'jotai'
import sortBy from 'lodash/sortBy'
import { handleMarkerAtom } from '../../atoms/marker'

function Overlay() {
  const customOverlayElem = document.getElementById('custom-overlay')
  const [{ expanded }, handleMarker] = useAtom(handleMarkerAtom)
  const squareWidth = useMemo(() => {
    const root = Math.ceil(Math.sqrt(expanded.length))
    const width = root * 30 + 4 * 2 + root * 4

    return width
  }, [expanded])

  if (expanded.length === 0) {
    return null
  }

  if (!customOverlayElem) {
    return null
  }

  return createPortal(
    <div
      className="-translate-x-2/4 -translate-y-1/4 absolute bg-white flex flex-wrap gap-1 p-1 rounded-3xl shadow-2xl transform border-2 border-dashed"
      style={{
        width: squareWidth,
      }}
    >
      {sortBy(expanded, ['company_id']).map((marker) => (
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
