document.getElementById('myForm').addEventListener('submit', saveDetails);
let gameAreaBtn = document.getElementById('gameArea');

gameAreaBtn.style.display = "none";

function saveDetails(e){




    document.getElementById('GamePad').style.display = "none";
    gameAreaBtn.style.display = "block";

    e.preventDefault();
}