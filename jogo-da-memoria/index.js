let lista = ["🔥","☕","🚒","⛄","🌏",'🌹','🍨','👻','💣','🐌','🍒','🍇','🍌','🍕','🦴','🐖','🦢','🦜','🐊','🦖','🐋','🦋','🦀',"🌭"]
lista = lista.slice(0,15)
let idCount = 0;
let clicks = 0;
let rev1 = null;
let cover1 = null;
let freeze = false;
let players = [{name: "Jogador Vermelho",color:"#a22",points:0},{name: "Jogador Azul",color:"#22a",points:0}]
let player = Math.floor(Math.random()*players.length)
function proximo(){  
  player++;
  if(player >= players.length)
    player = 0;
  console.log()
  document.getElementById("body").style.background = players[player].color;
}
start()
function start(){
  players = [{name: "Jogador Vermelho",color:"#a22",points:0},{name: "Jogador Azul",color:"#22a",points:0}]
  player = Math.floor(Math.random()*players.length)
  proximo()
  document.getElementById("main").innerHTML = '';
  document.getElementById("cover-container").innerHTML = '';
  const listaDupla = lista.concat(lista)
  idCount = 0;
  clicks = 0;
  document.getElementById("clicks").innerHTML = `${players[0].name}: 0<p>${players[1].name}: 0`

shuffle(listaDupla).map(i=>
          {
  const node = document.createElement("div");
  node.textContent = i
  node.setAttribute("id",`cover-${idCount}reveal`)
  document.getElementById("main").appendChild(node);
  const cover = document.createElement("div");
  cover.setAttribute("id",`cover-${idCount++}`)
  cover.setAttribute("class",`cover`)
  cover.setAttribute("onclick","reveal(this.id)");  
  document.getElementById("cover-container").appendChild(cover);
})
}

async function reveal(id){
  if(freeze)return;
  //clicks++;
  //document.getElementById("clicks").innerHTML = `Clicks: ${clicks}`
  document.getElementById(id).style.opacity = 0;
  const reveal = document.getElementById(id+"reveal")
  if(!rev1){
    rev1 = reveal;
    cover1 = document.getElementById(id)
    return;
  }
  if(rev1.innerHTML === reveal.innerHTML){
    cover1 = null;
    rev1 = null;
    players[player].points++
    document.getElementById("clicks").innerHTML = `${players[0].name}: ${players[0].points}<p>${players[1].name}: ${players[1].points}`
    let covered = Array.from(document.getElementsByClassName('cover')).filter(i=>i.style.opacity !== "0")
    if(covered.length < 1){
      //document.getElementById("clicks").innerHTML = `${players[player].name} venceu`
    }
    return;
  }
  rev1 = null;
  freeze = true;
  await new Promise(r => setTimeout(r, 1000));
  freeze = false;
  document.getElementById(id).style.opacity = 1;
  cover1.style.opacity = 1;
  proximo()
  cover1 = null;  
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
