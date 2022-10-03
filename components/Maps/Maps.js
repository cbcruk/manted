import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { handleMarkerAtom } from '../../atoms/marker'
import { CLUSTER_SCALE, DEFAULT_MARKER_SIZE } from './constants'
import {
  createCustomOverlay,
  createMap,
  createMarkerClusterer,
  createMarkers,
} from './helper'

function Maps({ companies: companiesData }) {
  const mapRef = useRef(null)
  const markerClustererRef = useRef(null)
  const [companies] = useState(companiesData)
  const [, handleMarker] = useAtom(handleMarkerAtom)
  const customOverlay = useMemo(() => createCustomOverlay(), [])
  const setCustomOverlay = useCallback(
    (map) => {
      customOverlay.setMap(map)
    },
    [customOverlay]
  )

  useEffect(() => {
    const { kakao } = window
    const markers = () =>
      createMarkers(companies, {
        onClick(item) {
          handleMarker({
            selected: item,
          })
        },
      })

    if (!mapRef.current) {
      mapRef.current = createMap()
      markerClustererRef.current = createMarkerClusterer(markers(), {
        map: mapRef.current,
        styles: CLUSTER_SCALE,
      })
    }

    const map = mapRef.current
    const markerClusterer = markerClustererRef.current

    kakao.maps.event.addListener(map, 'idle', () => {
      setCustomOverlay(null)

      markerClusterer.clear()
      markerClusterer.addMarkers(markers())

      const nextState = {
        expanded: [],
      }

      if (!window.matchMedia('(min-width: 768px)').matches) {
        nextState.selected = null
      }

      handleMarker(nextState)
    })

    kakao.maps.event.addListener(markerClusterer, 'clusterclick', (cluster) => {
      const markers = cluster.getMarkers()

      if (markers.length === 0) {
        return
      }

      const projection = map.getProjection()
      const { x, y } = projection.pointFromCoords(cluster.getCenter())
      const point = new kakao.maps.Point(x, y + DEFAULT_MARKER_SIZE)
      const overlayPosition = projection.coordsFromPoint(point)

      setCustomOverlay(map)
      customOverlay.setPosition(overlayPosition)

      handleMarker({
        expanded: markers.map((marker) =>
          companies.find((company) => company.id === marker.id)
        ),
      })
    })
  }, [])

  return (
    <div
      id="map"
      className="h-screen w-screen"
      suppressHydrationWarning={true}
      onClick={(e) => {
        if (e.target.tagName === 'svg') {
          setCustomOverlay(null)
        }
      }}
    ></div>
  )
}

export default Maps
