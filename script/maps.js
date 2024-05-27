const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("myModal");
const closeModal = document.getElementsByClassName("close")[0];

// Abrir a janela modal ao clicar no botão "Rota"
openModalBtn.onclick = function() {
    modal.style.display = "block";
}

// Fechar a janela modal ao clicar no botão de fechar
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Fechar a janela modal ao clicar fora dela
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//----------------------------------------------------------------------

let map;
let directionsService;
let directionsRenderer;
let marker; // Para armazenar o marcador de destino

initMap();

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15, // Zoom inicial
      center: { lat: -23.5505, lng: -46.6333 } // Localização inicial
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  var alegre = new google.maps.LatLng(-20.75829, -41.53501);
  var mapOptions = {
    zoom: 20,
    center: alegre
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsRenderer.setMap(map);

  // Chamar a função para obter a localização do usuário ao carregar a página
  getUserLocation();

  // Adicionar listener para clique no mapa
  map.addListener('click', function(event) {
    placeMarker(event.latLng);
  });

  document.getElementById("routeForm").addEventListener("submit", calculateRoute);
}

function calculateRoute(event) {
    event.preventDefault();
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;

    geocodeAddress(destination, function(latLng) {
        if (latLng) {
            const request = {
                origin: origin,
                destination: latLng,
                travelMode: google.maps.TravelMode.DRIVING // Modo de viagem fixo para Dirigindo
            };

            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(response);
                    modal.style.display = "none"; // Fechar o modal após calcular a rota
                } else {
                    window.alert("Não foi possível calcular a rota. Status: " + status);
                }
            });
        } else {
            window.alert("Endereço inválido.");
        }
    });
}

function placeMarker(location) {
  if (marker) {
    marker.setPosition(location);
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }

  const lat = location.lat();
  const lng = location.lng();
  document.getElementById('destination').value = `${lat},${lng}`;
}

function geocodeAddress(address, callback) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            callback(results[0].geometry.location);
        } else {
            callback(null);
        }
    });
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
            new google.maps.Marker({
                position: pos,
                map: map,
                title: "Você está aqui!"
            });
        });
    } else {
        window.alert("Geolocalização não suportada pelo seu navegador.");
    }
}
