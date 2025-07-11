// Inicializar mapa
const map = L.map('map', {
  center: [50.5, 8.5],
  zoom: 6,
  minZoom: 5,
  maxZoom: 18,
  zoomControl: true
});

// Capas base
const baseOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const openRail = L.tileLayer('https://tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
  attribution: '© OpenRailwayMap',
  opacity: 0.7
});

const baseDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© CartoDB Dark Matter'
});

// Cargar GeoJSON del itinerario ferroviario
fetch('itinerario_ritual.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: feature => ({
        color: feature.properties.stroke || '#00FF66',
        weight: feature.properties['stroke-width'] || 3
      }),
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: feature.properties['marker-color'] || '#00FF66',
          color: '#000',
          weight: 1,
          fillOpacity: 0.9
        }).bindPopup(`<strong>${feature.properties.name}</strong><br>${feature.properties.description}`);
      }
    }).addTo(map);
  });

// Cargar GeoJSON del Ritualkreis
fetch('ritualkreis_oberstdorf.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: feature => ({
        color: feature.properties.stroke || '#8844FF',
        weight: feature.properties['stroke-width'] || 3
      }),
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: feature.properties['marker-color'] || '#8844FF',
          color: '#000',
          weight: 1,
          fillOpacity: 0.9
        }).bindPopup(`<strong>${feature.properties.name}</strong><br>${feature.properties.description}`);
      }
    }).addTo(map);
  });

// Control de capas
const baseLayers = {
  "🗺️ OpenStreetMap": baseOSM,
  "🌑 Mapa Oscuro": baseDark
};

const overlayLayers = {
  "🚆 OpenRailwayMap": openRail
};

L.control.layers.expanded(baseLayers, overlayLayers, {
  collapsed: false,
  position: 'topright'
}).addTo(map);
