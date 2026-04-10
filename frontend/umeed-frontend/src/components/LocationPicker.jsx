import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Leaflet default icon fix
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function PinDropper({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export default function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]) // India center

  const handleGPS = () => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setPosition([lat, lng])
        setMapCenter([lat, lng])
        onLocationSelect(lat, lng)
        setLoading(false)
      },
      () => {
        alert('Location access denied! Please allow location or pin manually.')
        setLoading(false)
      }
    )
  }

  const handleMapClick = (lat, lng) => {
    setPosition([lat, lng])
    onLocationSelect(lat, lng)
  }

  return (
    <div style={styles.wrapper}>
      <button
        type="button"
        style={styles.gpsBtn}
        onClick={handleGPS}
        disabled={loading}
      >
        {loading ? '📡 Getting location...' : '📍 Use My Current Location'}
      </button>

      <p style={styles.hint}>Or click on the map to drop a pin manually</p>

      <div style={styles.mapWrapper}>
        <MapContainer
          center={mapCenter}
          zoom={5}
          style={{ height: '300px', width: '100%', borderRadius: '12px' }}
          key={mapCenter.toString()}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <PinDropper onLocationSelect={handleMapClick} />
          {position && <Marker position={position} />}
        </MapContainer>
      </div>

      {position && (
        <p style={styles.coords}>
          ✅ Location selected: {position[0].toFixed(4)}, {position[1].toFixed(4)}
        </p>
      )}
    </div>
  )
}

const styles = {
  wrapper: { marginBottom: '16px' },
  gpsBtn: {
    width: '100%', padding: '12px',
    backgroundColor: '#0ea5e9', color: 'white',
    border: 'none', borderRadius: '8px',
    fontSize: '14px', cursor: 'pointer',
    fontWeight: 'bold', marginBottom: '8px',
  },
  hint: {
    fontSize: '12px', color: '#6b7280',
    textAlign: 'center', marginBottom: '8px',
  },
  mapWrapper: {
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #d1d5db',
  },
  coords: {
    fontSize: '12px', color: '#16a34a',
    textAlign: 'center', marginTop: '8px',
  },
}