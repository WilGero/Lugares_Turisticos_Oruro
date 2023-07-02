console.log('correcto')
traerDatos();
traerDatos2();
function traerDatos(){
    const xhttp=new XMLHttpRequest();

    xhttp.open('GET','../data/lugares.json',true);
    xhttp.send();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            // console.log(this.responseText);
            let datos=JSON.parse(this.responseText);
            console.log(datos.features);
            let res =document.querySelector('#res');
            res.innerHTML='';
            for(let item of datos.features){
                console.log(item.properties.nombre);
                res.innerHTML+=`
                    <tr>
                    <td>${item.properties.nombre}</td>
                    <td>${item.properties.direccion}</td>
                    </tr>
                `
            }
        }
    }
}

function traerDatos2(){
    const xhttp=new XMLHttpRequest();

    xhttp.open('GET','../data/cajerosBUnion.json',true);
    xhttp.send();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            // console.log(this.responseText);
            let datos=JSON.parse(this.responseText);
            console.log(datos.features);
            let res1 =document.querySelector('#res1');
            res1.innerHTML='';
            for(let item of datos.features){
                console.log(item.properties.nombre);
                res1.innerHTML+=`
                    <tr>
                    <td>${item.properties.nombre}</td>
                    <td>${item.properties.direccion}</td>
                    </tr>
                `
            }
        }
    }
}