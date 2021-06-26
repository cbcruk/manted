import { DEFAULT_CENTER, DEFAULT_ZOOM_LEVEL } from './constants'

const { kakao } = window

export function createMap() {
  const mapElem = document.getElementById('map')
  const map = new kakao.maps.Map(mapElem, {
    center: new kakao.maps.LatLng(DEFAULT_CENTER[0], DEFAULT_CENTER[1]),
    level: DEFAULT_ZOOM_LEVEL,
  })

  map.setMinLevel(2)

  return map
}

export function createMarkers(items, { onClick }) {
  const markers = items.map((item) => {
    const { lat, lng, name, logo_img_thumb } = item
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      title: name,
      image: new kakao.maps.MarkerImage(
        logo_img_thumb,
        new kakao.maps.Size(35, 35)
      ),
    })
    marker.id = item.id

    kakao.maps.event.addListener(marker, 'click', () => {
      onClick(item)
    })

    kakao.maps.event.addListener(marker, 'mouseover', () => {
      marker.setZIndex(marker.getZIndex() + 1)
    })

    kakao.maps.event.addListener(marker, 'mouseout', () => {
      marker.setZIndex(marker.getZIndex() - 1)
    })

    return marker
  })

  return markers
}

export function createMarkerClusterer(markers, options = {}) {
  const clusterer = new kakao.maps.MarkerClusterer({
    averageCenter: true,
    minLevel: 2,
    gridSize: 30,
    disableClickZoom: true,
    ...options,
  })

  if (markers) {
    clusterer.addMarkers(markers)
  }

  return clusterer
}

export function createCustomOverlay() {
  const customOverlay = new kakao.maps.CustomOverlay({
    content: '<div id="custom-overlay"></div>',
  })

  return customOverlay
}

export function findJobsByBounds(jobs, bounds) {
  return jobs.filter((job) => {
    const latlng = new kakao.maps.LatLng(job.lat, job.lng)

    return bounds.contain(latlng)
  })
}
