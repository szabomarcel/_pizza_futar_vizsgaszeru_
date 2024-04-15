document.addEventListener("DOMContentLoaded",function(){
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const updateButton = document.getElementById("update");
    const deleteButton = document.getElementById("delete");
    const selectButton = document.getElementById("select");
    //const baseUrl ="http://localhost/pizzakarbantartasa/pizzakarban/index.php?pizzakarban";

    createButton.addEventListener("click", async function () {
        const baseUrl ="http://localhost/pizzafutarok/futarokbackend/index.php?futarok" + fazon;
        const formdata = new FormData(document.getElementById("fnev"));
        let options = {
            method: "POST",
            mode: "cors",
            body: formdata
        };
        let response = await fetch(baseUrl, options);
        if(response.ok){
            console.log("Sikeres feltöltés")
        }else{
            console.error("Sikertelen megoldás")
        }
        return response;
    });

    deleteButton.addEventListener("click", async function () {
        const baseUrl =`http://localhost/futarok/index.php?futarok/${document.getElementById("fazon").value}`;    
        let options = {
            method: "DELETE",        
        };
        let response = await fetch(baseUrl, options);
        return response;
    });

    updateButton.addEventListener("click", async function(){        
        const baseUrl ="http://localhost/futarok/index.php?futarok" + fazon;
        let object = {
            pazon: document.getElementById("fazon").value,
            pnev: document.getElementById("fnev").value,
            par: document.getElementById("ftel").value
        };
        let options = {
            method: "PUT",
            mode: "cors",            
        };
        let response = await fetch(baseUrl, options);
        return response;
    });

    readButton.addEventListener("click", async function(){
        const baseUrl ="http://localhost/pizzafutarok/futarokbackend/futarok/index.php?futarok" + fazon;
        let response = await fetch(baseUrl);
        if(response.ok){
            let data = await response.json();
            futarListazas(data);
        }else{
            console.error("Hiba a szerver válaszában")
        }

    });

    function futarListazas(futarok){
        let futarDiv = document.getElementById('futarugyfellista');
        let tablazat = futarFejlec();
        for(let futar of futarok){
            tablazat += futarSor(futar)
        }
        futarDiv.innerHTML = tablazat + '</tbody></tbody>'
        return futarDiv;
    }

    function futarSor(futar){
        let sor = `<tr>
        <td>${futar.fazon}</td>
        <td>${futar.fnev}</td>
        <td>${futar.ftel}</td>
        <td><button type="button" class="btn btn-outline-secondary" onclick="adatBetoltes(${futar.fazon}, '${futar.fnev}', '${futar.ftel}')"><i class="fa-regular fa-hand-point-left"></i>Kiválasztás</button></td>
        </tr>`;
        return sor
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
    let baseUrl='http://localhost/futarok/index.php?futarok' + fnev;
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