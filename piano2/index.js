var context = new AudioContext()


async function twinkle(){
    music("CCGGaaG FFEEDDC GGFFEED GGFFEED FFEEDDC")
}

async function birthday(){
    music("CCDCFE CCDCGF Cc aFED asasaFGF")
}

async function jingle(){
    music("eee eee egcde fff ffee eeeddedg eee eee egcde fff ffee eeggfdc  GedcG GGGedca afedb ggfde GedcG Gedca aafedggg gagfdcg")
}

async function music(notes){
    let arr = notes.split('')
    let arr2 = []
    arr.map(element =>{
        if(element !== 's')
            arr2.push(element)
        else
        arr2[arr2.length-1] = arr2[arr2.length-1].concat('s')
    })
    for(let element of arr2){
        await play(element)

    }
}


async function play(note){
    if(note === " "){
        await new Promise(r => setTimeout(r, 500));
        return
    }
    const tecla = document.getElementById(note)
    let originalColor = tecla.style.background
    tecla.style.background = "#d80";
    let onclick = tecla.onclick.toString()
    //beep(onclick.substr(onclick.indexOf("beep")+5).replace(/\)|\}/g,''))
    await new Promise((resolve, reject) => {
        tecla.addEventListener('click', resolve)
      })
    //await new Promise(r => setTimeout(r, 400));
    tecla.style.background = originalColor;
    await new Promise(r => setTimeout(r, 100));
}

function beep(frequency){
    const myAudioContext = new AudioContext();
    return new Promise((resolve, reject) => {
        // Set default duration if not provided
        let duration = 200;
        frequency = frequency || 440;
        let volume = 50;

        try{
            let oscillatorNode = myAudioContext.createOscillator();
            let gainNode = myAudioContext.createGain();
            oscillatorNode.connect(gainNode);

            oscillatorNode.frequency.value = frequency;

            oscillatorNode.type= "triangle";
            gainNode.connect(myAudioContext.destination);

            //gainNode.gain.setValueAtTime(0.5, 0);
            oscillatorNode.start(myAudioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.1, myAudioContext.currentTime + 2);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, myAudioContext.currentTime + 2);
            oscillatorNode.stop(myAudioContext.currentTime + duration * 0.01);
            oscillatorNode.onended = () => {
                resolve();
            };
        }catch(error){
            reject(error);
        }
    });
}
