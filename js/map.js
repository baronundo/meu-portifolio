
const DEFAULT_COORDS = [-23.5505, -46.6333]; // São Paulo, SP — localização padrão
const DEFAULT_ZOOM = 12;
const USER_ZOOM = 15;

let mapInstance = null;
let userMarker = null;

function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;

  mapInstance = L.map('map', {
    scrollWheelZoom: false
  }).setView(DEFAULT_COORDS, DEFAULT_ZOOM);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(mapInstance);

  initGeoBanner();
  initLocateButton();
}

function initGeoBanner() {
  const banner = document.getElementById('geoBanner');
  const allowBtn = document.getElementById('geoAllowBtn');
  const denyBtn = document.getElementById('geoDenyBtn');
  if (!banner || !allowBtn || !denyBtn) return;

  if (!('geolocation' in navigator)) {
    hideBanner(banner);
    setMapFeedback('Seu navegador não suporta geolocalização. Exibindo localização padrão.', false);
    return;
  }

  allowBtn.addEventListener('click', () => {
    hideBanner(banner);
    requestUserLocation();
  });

  denyBtn.addEventListener('click', () => {
    hideBanner(banner);
    setMapFeedback('Sem problemas — exibindo localização padrão.', true);
  });
}

function hideBanner(banner) {
  banner.classList.add('is-hidden');
}

function requestUserLocation() {
  if (!('geolocation' in navigator) || !mapInstance) return;

  setMapFeedback('Obtendo sua localização...', true);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      centerMapOnUser(latitude, longitude);
      setMapFeedback('Você está aqui.', true);
    },
    (error) => {
      handleGeoError(error);
    },
    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000
    }
  );
}

function centerMapOnUser(lat, lng) {
  if (!mapInstance) return;

  mapInstance.setView([lat, lng], USER_ZOOM);

  if (userMarker) {
    userMarker.setLatLng([lat, lng]);
  } else {
    userMarker = L.marker([lat, lng]).addTo(mapInstance);
  }

  userMarker.bindPopup('Você está aqui').openPopup();
}

function handleGeoError(error) {
  const messages = {
    1: 'Permissão de localização negada. Exibindo localização padrão.',
    2: 'Localização indisponível no momento. Exibindo localização padrão.',
    3: 'Tempo esgotado ao tentar obter sua localização. Tente novamente.'
  };

  const message = messages[error.code] || 'Não foi possível obter sua localização. Exibindo localização padrão.';
  setMapFeedback(message, false);
}

function initLocateButton() {
  const btn = document.getElementById('locateBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    requestUserLocation();
  });
}

function setMapFeedback(message, success) {
  const feedback = document.getElementById('mapFeedback');
  if (!feedback) return;

  feedback.textContent = message;
  feedback.classList.toggle('is-success', success);
  feedback.classList.toggle('is-error', !success);
}
