var mapa1 = L.map("mapa", {
 // layer:MQ.mapLayer(),
  center: [-17.9647, -67.106],
  zoom: 15,
});
// console.log(L); 
// L.Locate({enableHighAccuracy:true});
// mapa1.on('locationFound',e=>{
//     console.log(e);
// });
// controles
L.control.locate().addTo(mapa1);
console.log(L.control.locate());
// L.Control.geocoder().addTo(mapa1);

// busqueda
// const searchLayer=L.geoJSON(puntosT,{
//   onEachFeature:function(feature,layer){
//     layer.bindPopup(feature.properties.nombre);
//   }
// }).addTo(mapa1);
//  const searchControl=new L.control.Search({
//   layer:searchLayer,
//   propertyName:'Lugares'
//  });
//  mapa1=addControl(searchControl);
//Función para acercamiento
function zoom_capa(objeto) {
  mapa1.fitBounds(objeto.target.getBounds());
}
// resalta una zona hidrologica
function resaltar_capa(objeto) {
  const layer = objeto.target;
  layer.setStyle({
    weight: 5,
    color: " #FFB300 ",
    dashArray: "",
    fillOpacity: 0.3,
  });
}
// retoma los valores por defecto de una zona hidrologica
function qresaltar_capa(objeto) {
  lugares.resetStyle(objeto.target);
}

var osm = L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
).addTo(mapa1);
var google = L.tileLayer("https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}");
var opentopomap = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
);
var cartocdn = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
);

var mapasBase = {
  OpenStreet: osm,
  Google: google,
  Open: opentopomap,
  Carto: cartocdn,
};
// minimapa
// var carto_light=L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
var minimap=new L.control.minimap(cartocdn,
  {
    toggleDisplay:true,
    minimized:false,
    position:"bottomleft",
  }).addTo(mapa1);
  // escala
  new L.control.scale({imperial:false}).addTo(mapa1);
var cajerosOruro = L.geoJSON(cajerosOruro, {
  onEachFeature: function (feature, layer) {
    const popupContent =
      "<b>Cajero " +
      feature.properties.nombre +
      "</b> <br> Tipo: " +
      feature.properties.tipo +
      "<br>Billetaje:" +
      feature.properties.billetaje;
    layer.bindPopup(popupContent);
  },
});
 var comidas = L.geoJSON(comidasTur, {
   onEachFeature: function (feature, layer) {
     const popupContent =
       "<b>Punto de Comida " +
       feature.properties.nombre +
       "</b> <br> Tipo: " +
      feature.properties.tipo +
      "<br> <b> horario: </b>"+
      feature.properties.horario; 
     layer.bindPopup(popupContent);
   },
 });
var oruro = L.geoJSON(munOruro, {
  onEachFeature: function (feature, layer) {
    const popupContent =
      "<b>Municipio de " + feature.properties.NOM_MUN + "<br>";
    layer.bindPopup(popupContent).on({ click: zoom_capa });
  },
});
var lugares = L.geoJSON(lugares, {
  onEachFeature: function (feature, layer) {
    const popupContent =
      "<b>Lugar Turistico: " +
      feature.properties.nombre +
      "</b><br>" +
      feature.properties.descrip;
    layer.bindPopup(popupContent).on({
      click: zoom_capa,
      mouseover: resaltar_capa,
      mouseout: qresaltar_capa,
    });
  },
}).addTo(mapa1);
var puntosT = L.geoJSON(puntosT, {
  onEachFeature: function (feature, layer) {
    const popupContent =
      "<b>Lugar Turistico: " +
      feature.properties.nombre +
      "</b><br>" +
      feature.properties.descrip;
    layer.bindPopup(popupContent).on({
      click: zoom_capa,
      mouseover: resaltar_capa,
      mouseout: qresaltar_capa,
    });
  },
}).addTo(mapa1);
var mapas = {
  "Cajeros": cajerosOruro,
  "Oruro": oruro,
  "Lugares Turisticos": lugares,
  "Puntos Turisticos": puntosT,
  "Comidas Turisticas":comidas

};

//CONTROL DE LOS MAPAS BASE Y CAPAS DE NUESTRO MAPA
L.control
  .layers(mapasBase, mapas, {
    position: "topright", // 'topleft', 'bottomleft', 'bottomright'
    collapsed: true, // true
  })
  .addTo(mapa1);
