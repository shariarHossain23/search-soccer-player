const playerData = async () =>{
    const searchInput = document.getElementById("search-input");
    const searchText =searchInput.value;

    // clear display
    searchInput.value = "";
    try {
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        showDisplay(data.player)
        // console.log(data.player[0])
    } catch (error) {
        console.log(error)
    }
}

const showDisplay =  players =>{
    const display = document.getElementById("display");
    // clear display
    display.textContent = "";
    document.getElementById("display-details").textContent = "";
    if(players === undefined && players === null){
        console.log("hi")
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
        });
    }
}
 const playerDetails = async details => {
    try {
        const url =`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${details}`;
        const res = await fetch(url);
        const data = await res.json()
        playerDetailsDisplay (data.players[0])
    } catch (error) {
        console.log(error)
    }
 }


const playerDetailsDisplay = details =>{
    const displayDetails = document.getElementById("display-details");
    // clear display = 
    displayDetails.textContent = '';
    document.getElementById("display").textContent = "";

    const detailsDiv = document.createElement("div")
    detailsDiv.innerHTML = `
    <img width="300px" src="${details.strThumb}" alt="img not found">
    <p>Name: ${details.strPlayer}</p>
    <p>Nationality: ${details.strNationality}</p>
    <p>sports: ${details.strSport}</p>
    <p>position: ${details.strPosition}</p>
    <p>Club: ${details.strTeam}</p>
    <p>Shirt: ${details.strNumber}</p>
    `
    displayDetails.appendChild(detailsDiv)
}
