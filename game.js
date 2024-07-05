// selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playboard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn= resultBox.querySelector("button");

//Window page

window.onload = () => { //Once window loaded
    for (let i = 0; i < allBox.length; i++) { //add onclick attribute in all available section's game
        allBox[i].setAttribute("onclick", "clickedBox(this)");
        
    }


    selectXBtn.onclick = ()=>{
        selectBox.classList.add("hide"); //hide the select box on playerX button clicked
        playboard.classList.add("show"); //show the playboard section on playerX button clicked
    }
    selectOBtn.onclick = ()=>{
        selectBox.classList.add("hide"); //hide the select box on playerO button clicked
        playboard.classList.add("show"); //show the playboard section on playerO button clicked
        players.setAttribute("class", "players active player"); //adding three class name is player element
    }

}

let playerXIcon = "fa fa-times"; //class name of fontawesome cross icon
let playerOIcon = "fa fa-circle-o"; //class name of fontawesome circle icon
let playerSign = "X"; // suppose X player won
let runBot = true;



//user click function

function clickedBox(element){ //if players element has contains .player
    // console.log(element);
    if(players.classList.contains("player")){
        element.innerHTML = `<i class="${playerOIcon}"></i>`;  //adding O Icon inside user clicked element
        players.classList.add("active");
        // if player select O then we'll change the sign value to 0
        playerSign = "O";
        element.setAttribute("id",playerSign);
    } else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;  //adding X Icon inside user clicked element
        players.classList.add("active");
        element.setAttribute("id",playerSign);
    }
    selectWinner(); // calling winner 
    playboard.style.pointerEvents = "none"; //  //once user select any box then that box can't be selected again
    element.style.pointerEvents = "none"; //once user select any box then that box can't be selected again
    let randomDelayTime = ((Math.random()* 1000) + 200).toFixed(); //generating random time delay so bot will delay randomly to select box    
    setTimeout(()=> {
    bot(runBot);//calling bot function
    },randomDelayTime); //passing random delay time
}


//bot click function 

function bot(runBot){
    if (runBot) {{//if runBot is true then run the following code 
    // first change the playerSign .so if user has x value in id then bot will have o
    playerSign = "O";
    let array = []; //creating empty array..we'll store unstable box index in this array
    for (let i = 0; i < allBox.length; i++) {
        if(allBox[i].childElementCount == 0){ //if span has no any child element
            array.push(i); //inserting unclicked boxes inside araay means that span has no children
        // console.log(i+ " " + "has no children");
    } 
}
let randomBox = array[Math.floor(Math.random() * array.length)]; //gettig random index from array so bot will select unselected box
if(array.length > 0){
    if(players.classList.contains("player")){
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;  //adding O Icon inside user clicked element
        players.classList.remove("active");
        // if user is O then the box id value be X
        playerSign = "X"; //passing the x value
        allBox[randomBox].setAttribute("id",playerSign);
    } else{
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;  //adding X Icon inside user clicked element
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id",playerSign);
    }
    selectWinner(); // calling winner
}
    allBox[randomBox].style.pointerEvents = "none"; //once user select any box then that box can't be selected again  
    playerSign = "X"; //passing the x value
    playboard.style.pointerEvents = "auto";
}
        
    }   
    
}   


// let work on the selection of winner
function  getClass(idname){
    return document.querySelector(".box" + idname).id;  //returning id name
}

function checkClass(val1, val2, val3, sign){
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}
function selectWinner(){ //if the combination of them  matched then select the winner
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(6,7,8,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)){
    console.log(playerSign + " " + "is the winner");
    // once match won by someone
    runBot = false;
    bot(runBot);
    setTimeout(()=>{ //we'll delay to show result box
        playboard.classList.remove("show");
        resultBox.classList.add("show");
    },700); //700ms delay
    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    
}else{
        // if match has drawn
        //first check all is\d... if all span has id and no one won the game then we'll draw the game

        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != ""  && getClass(7) != ""  && getClass(8) != "" && getClass(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{ //we'll delay to show result box
            playboard.classList.remove("show");
            resultBox.classList.add("show");
        },700); //700ms delay

            wonText.textContent = `Match has been drawn!`;
        }

    }
}


replayBtn.onclick= ()=>{
    window.location.reload(); //reload the current page
}