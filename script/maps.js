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
    zoom:20,
    center: alegre
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsRenderer.setMap(map);

  // Chamar a função para obter a localização do usuário ao carregar a página
  getUserLocation();

  document.getElementById("geoLocationBtn").addEventListener("click", getUserLocation);
  document.getElementById("routeForm").addEventListener("submit", calculateRoute);
}

function calculateRoute(event) {
    event.preventDefault();
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;

    const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING // Modo de viagem 
    };

    directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
        } else {
            window.alert("Não foi possível calcular a rota.");
        }
    });
}
function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
    origin:start,
    destination:end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(response);
    }
  });
}

