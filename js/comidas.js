traerDatos();
function traerDatos() {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "../data/capas/comida_wgs84.geojson", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      let datos = JSON.parse(this.responseText);
      console.log(datos.features);
      let res = document.querySelector("#select-comidas");
      res.innerHTML = `<option value="-1" selected>Seleccione un punto de Comida</option>`;
      for (let item of datos.features) {
        console.log(item.properties.nombre);
        res.innerHTML += `
                
                <option value="${item.properties.Y},${item.properties.X}">${item.properties.nombre}</option>
                `;
      }
    }
  };
}
document
  .getElementById("select-comidas")
  .addEventListener("change", function (e) {
    let coords = e.target.value.split(",");
    mapa1.flyTo(coords, 18);
  });
