import {
  DEFAULT_CENTER,
  DEFAULT_MARKER_CLUSTERER_OPTIONS,
  DEFAULT_MARKER_SIZE,
  DEFAULT_ZOOM_LEVEL,
} from './constants'

export function createMap() {
  const { kakao } = window
  const [lat, lng] = DEFAULT_CENTER
  const map = new kakao.maps.Map(document.getElementById('map'), {
    center: new kakao.maps.LatLng(lat, lng),
    level: DEFAULT_ZOOM_LEVEL,
  })

  map.setMinLevel(2)

  window.kakaoMap = map

  return map
}

export function createMarkers(items, { onClick }) {
  const { kakao } = window
  const markers = items.map((item) => {
    const { lat, lng, name, logo_img_thumb } = item
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      title: name,
      image: new kakao.maps.MarkerImage(
        logo_img_thumb,
        new kakao.maps.Size(DEFAULT_MARKER_SIZE, DEFAULT_MARKER_SIZE)
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
  const { kakao } = window
  const clusterer = new kakao.maps.MarkerClusterer({
    ...DEFAULT_MARKER_CLUSTERER_OPTIONS,
    ...options,
  })

  if (markers) {
    clusterer.addMarkers(markers)
  }

  return clusterer
}

export function createCustomOverlay() {
  const { kakao } = window
  const customOverlay = new kakao.maps.CustomOverlay({
    content: '<div id="custom-overlay" />',
  })

  return customOverlay
}

export function findJobsByBounds(jobs, bounds) {
  const { kakao } = window
  return jobs.filter((job) => {
    const latlng = new kakao.maps.LatLng(job.lat, job.lng)

    return bounds.contain(latlng)
  })
}
