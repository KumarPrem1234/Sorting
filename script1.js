const n = 20;
const array = [];

init();

let audioctx=null;

function playnote(freq){
    if(audioctx==null){
        audioctx=new(
            AudioContext || 
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }

    const dur=0.1;
    const osc=audioctx.createOscillator();
    osc.frequency.vvalue=freq;
    osc.start();
    osc.stop(audioctx.currentTime+dur);
    const node=audioctx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(0,audioctx.currentTime+dur);

    osc.connect(node);
    node.connect(audioctx.destination);
}

function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}
function play() {
    const copy=[...array];
    const moves=bubbleSort(copy);
    animate(moves);
}

function animate(moves){
    if(moves.length==0){
        showBars();
        return ;
    }


    const move=moves.shift();
    const [i,j]=move.indicies;
    if(move.type=="swap"){
          [array[i], array[j]] = [array[j], array[i]];
    }
     playnote(200+array[i]*500);
     playnote(200+array[j]*500);

     showBars(move);
     setTimeout(function(){ 
        animate(moves);
     },10);
}

function bubbleSort(array) {
    const moves=[];
    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
             moves.push({indicies:[i-1,i],type:"comp"});
            if (array[i - 1] > array[i]) {
                swapped = true;
                moves.push({indicies:[i-1,i],type:"swap"});
                [array[i - 1], array[i]] = [array[i], array[i - 1]];

            }
        }
    }
    while (swapped);
    return moves;
}



function showBars(move){
      container.innerHTML="";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        bar.style.background = "black";

        if(move && move.indicies.includes(i)){
           bar.style.background = move.type=="swap"?"red" : "blue";  
        }
        container.appendChild(bar);
        
    }
}