document.addEventListener("DOMContentLoaded", function(){
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const updateButton = document.getElementById("update");    

    createButton.addEventListener("click", async function () {
        //let fazon = document.createElement("fazon").value;
        let baseUrl ="http://localhost/_pizza_futar_vizsgaszeru_/index.php?futarok/" + fazon;
        const formdata = new FormData(document.getElementById("futarForm"));
        let options = {
            method: "POST",
            mode: "cors",
            body: formdata
        };
        let response = await fetch(baseUrl, options);
        if(response.ok){
            console.log("Sikeres feltöltés");
        }else{
            console.error("Sikertelen feltöltés");
        }
        return response;
    });

    updateButton.addEventListener("click", async function(){        
        let baseUrl ="http://localhost/_pizza_futar_vizsgaszeru_/index.php?futarok/" + fazon;
        let object = {
            fazon: document.getElementById("fazon").value,
            fnev: document.getElementById("fnev").value,
            ftel: document.getElementById("ftel").value
        };
        let body = JSON.stringify(object);
        let options = {
            method: "PUT",
            mode: "cors",            
            body: body
        };
        let response = await fetch(baseUrl, options);
        return response;
    });

    readButton.addEventListener("click", async function(){
        let baseUrl ="http://localhost/_pizza_futar_vizsgaszeru_/index.php?futarok";
        let options = {
            method: "GET",
            mode: "cors"
        }
        let response = await fetch(baseUrl, options);
        if(response.ok){
            let data = await response.json();
            futarListazas(data);
        }else{
            console.error("Hiba a szerver válaszában");
        }

    });

    function futarListazas(futarok){
        let futarDiv = document.getElementById("futarugyfellista");
        let tablazat = futarFejlec();
        for(let futar of futarok){
            tablazat += futarSor(futar);
        }
        futarDiv.innerHTML = tablazat + "</tbody></tbody>";
        return futarDiv;
    }

    function futarSor(futar){
        let sor = `<tr>
        <td>${futar.fazon}</td>
        <td>${futar.fnev}</td>
        <td>${futar.ftel}</td>
        <td>
            <button type="button" class="btn btn-outline-secondary" onclick="adatBetoltes(${futar.fazon}, '${futar.fnev}', '${futar.ftel}')"><i class="fa-regular fa-hand-point-left"></i>Kiválasztás</button>
            <button type="button" class="btn btn-outline-secondary" onclick="adatTorles(${futar.fazon}"><i class="fa-regular fa-hand-point-left"></i>Kiválasztás</button>
        </td>
        </tr>`;
        return sor;
    }

    function futarFejlec(){
        let fejlec = `<table class="table table-striped">
        <thead>
            <tr>
                <th>Azonosító: </th>
                <th>Név: </th>
                <th>Telefonszám: </th>
                <th>Művelet: </th>
            </tr>
        </thead>
        <tbody>`;
        return fejlec;
    };
    
});

function adatBetoltes(fazon, fnev, ftel){
    let baseUrl="http://localhost/_pizza_futar_vizsgaszeru_/index.php?futarok/" + fazon;
    let options={
        method: "GET",
        mode: "cors"
    };
    let response= fetch(baseUrl, options)
    document.getElementById("fazon").value=fazon;
    document.getElementById("fnev").value=fnev;
    document.getElementById("ftel").value=ftel;
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}