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
    } catch (error) {
        console.log(error)
    }
}

const showDisplay =  players =>{
    const display = document.getElementById("display");
    display.textContent = "";
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
            `
            display.appendChild(playerDiv)
            console.log(player)
        });
    }
}
