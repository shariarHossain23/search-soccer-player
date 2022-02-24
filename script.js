document.getElementById("error-msg").style.display = "none";
const playerData = async () =>{
    const searchInput = document.getElementById("search-input");
    const searchText =searchInput.value;
    document.getElementById("error-msg").style.display = "none";

    // clear display
    searchInput.value = "";
    try {
        document.getElementById("spinner").classList.add('loader')
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        showDisplay(data.player)
    } catch (error) {
        showError(error)
    }
}
const showError = error => {
    document.getElementById("error-msg").style.display = "block";
    document.getElementById("spinner").classList.remove('loader')
}

const showDisplay =  players =>{
    document.getElementById("spinner").classList.remove('loader')
    const display = document.getElementById("display");
    // clear display
    display.textContent = "";
    document.getElementById("display-details").textContent = "";
    if(players === undefined || players === null){
        document.getElementById("error-text").innerText = "no result found"
    }
    else{
        players.forEach(player => {
            const  playerDiv = document.createElement("div");
            playerDiv.innerHTML = `
            <img width="300px" src="${player.strThumb}" alt="img not found">
            <p>Name: ${player.strPlayer}</p>
            <p>Nationality: ${player.strNationality}</p>
            <p>sports: ${player.strSport}</p>
            <p>position: ${player.strPosition}</p>
            <p>Club: ${player.strTeam}</p>
            <p>Shirt: ${player.strNumber}</p>
            <button onclick="playerDetails(${player.idPlayer})">details</button>
            `
            display.appendChild(playerDiv)
            document.getElementById("error-text").innerText = ""
        });
    }
}
 const playerDetails = async details => {
    try {
        document.getElementById("spinner").classList.add('loader')
        const url =`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${details}`;
        const res = await fetch(url);
        const data = await res.json()
        playerDetailsDisplay (data.players[0])
    } catch (error) {
        console.log(error)
    }
 }


const playerDetailsDisplay = details =>{
    document.getElementById("spinner").classList.remove('loader')
    const displayDetails = document.getElementById("display-details");
    // clear display = 
    displayDetails.textContent = '';
    document.getElementById("display").textContent = "";

    const detailsDiv = document.createElement("div")
    detailsDiv.innerHTML = `
    <img width="300px" src="${details.strThumb}" alt="img not found">
    <p>Name: ${details.strPlayer}</p>
    <p>Born: ${details.dateBorn}</p>
    <p>Born Location: ${details.strBirthLocation}</p>
    <p>Nationality: ${details.strNationality}</p>
    <p>Gender: ${details.strGender}</p>
    <p>Height: ${details.strHeight}</p>
    <p>Weight: ${details.strWeight}</p>
    <p>sports: ${details.strSport}</p>
    <p>position: ${details.strPosition}</p>
    <p>Club: ${details.strTeam}</p>
    <p>Shirt: ${details.strNumber}</p>
    `
    displayDetails.appendChild(detailsDiv)

}


