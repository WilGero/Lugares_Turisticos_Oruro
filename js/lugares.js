select_lugar();
function select_lugar() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "../data/capas/lugaresTur_WGS84.geojson", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      let datos = JSON.parse(this.responseText);
      console.log(datos.features);
      let res = document.querySelector("#select-lugar");
      res.innerHTML = `<option value="-1" selected>Seleccione un lugar</option>`;
      for (let item of datos.features) {
        console.log(item.properties.nombre);
        res.innerHTML += `
                  <option value="${item.properties.Y},${item.properties.X}">${item.properties.id}.-${item.properties.nombre}</option>
                  `;
      }
    }
  };
}

// buscador
const inputBuscar = document.getElementById("buscador");
const option = document
  .getElementById("select-lugar")
  .getElementsByTagName("option");
const coord = document.getElementById("select-lugar").getAttribute("value");
inputBuscar.addEventListener("keyup", (e) => {
  let texto = e.target.value;
  let er = new RegExp(texto, "i");
  for (let i = 0; i < option.length; i++) {
    let valor = option[i];
    // console.log(valor )
    if (er.test(valor.innerText)) {
      document
      .getElementById("buscar")
      .addEventListener("click", function (e) {
        let coord = e.target.value.split(",");
        mapa1.flyTo(coord, 18);
      });
    } else {
    }
  }
});

// Para ir a un lugar turistico seleccionado
document
  .getElementById("select-lugar")
  .addEventListener("change", function (e) {
    let coords = e.target.value.split(",");
    mapa1.flyTo(coords, 18);
  });
