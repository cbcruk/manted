import React from 'react'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
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

const { kakao } = window

function Maps() {
  const [jobs] = useAtom(fetchJobsAtom)
  const [, handleMarker] = useAtom(handleMarkerAtom)

  useEffect(() => {
    const customOverlay = createCustomOverlay()
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
      customOverlay.setMap(null)

      markerClusterer.clear()
      markerClusterer.addMarkers(markers())

      handleMarker({
        expanded: [],
      })
    })

    kakao.maps.event.addListener(markerClusterer, 'clusterover', (cluster) => {
      if (map.getLevel() !== 2) {
        return
      }

      const markers = cluster.getMarkers()

      if (markers.length === 0) {
        return
      }

      const projection = map.getProjection()
      const { x, y } = projection.pointFromCoords(cluster.getCenter())
      const point = new kakao.maps.Point(x, y + 35)
      const overlayPosition = projection.coordsFromPoint(point)

      customOverlay.setMap(map)
      customOverlay.setPosition(overlayPosition)

      handleMarker({
        expanded: markers.map((marker) =>
          jobs.find((job) => job.id === marker.id)
        ),
      })
    })
  }, [])

  return <div id="map" className="h-screen w-screen" />
}

export default Maps
