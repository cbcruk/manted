import { useCallback, useEffect, useMemo } from 'react'
import { useAtom } from 'jotai'
import { fetchJobsAtom } from '../../atoms/job'
import { handleMarkerAtom } from '../../atoms/marker'
import { CLUSTER_SCALE } from './constants'
import {
  createCustomOverlay,
  createMap,
  createMarkerClusterer,
  createMarkers,
  findJobsByBounds,
} from './helper'

function Maps() {
  const [jobs] = useAtom(fetchJobsAtom)
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
    const map = createMap()
    const markers = () =>
      createMarkers(findJobsByBounds(jobs, map.getBounds()), {
        onClick(item) {
          handleMarker({
            selected: item,
          })
        },
      })
    const markerClusterer = createMarkerClusterer(markers(), {
      map,
      styles: CLUSTER_SCALE,
    })

    kakao.maps.event.addListener(map, 'idle', () => {
      setCustomOverlay(null)

      markerClusterer.clear()
      markerClusterer.addMarkers(markers())

      handleMarker({
        expanded: [],
      })
    })

    kakao.maps.event.addListener(markerClusterer, 'clusterclick', (cluster) => {
      const markers = cluster.getMarkers()

      if (markers.length === 0) {
        return
      }

      const projection = map.getProjection()
      const { x, y } = projection.pointFromCoords(cluster.getCenter())
      const point = new kakao.maps.Point(x, y + 35)
      const overlayPosition = projection.coordsFromPoint(point)

      setCustomOverlay(map)
      customOverlay.setPosition(overlayPosition)

      handleMarker({
        expanded: markers.map((marker) =>
          jobs.find((job) => job.id === marker.id)
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
