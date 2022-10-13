
let sequence = []
let record = localStorage.getItem('memoryMaxLevel')??0;
document.getElementById("level").innerHTML = `Level: ${sequence.length}`
document.getElementById("record").innerHTML = `Record: ${record}`
async function start(){
    createSequence()
    counter = 0;
    for(let color of sequence){
        color == "red"?beep(300,360,50):color == "blue"?beep(300,380,50):color == "green"?beep(300,400,50):beep(300,420,50);
        document.getElementById(color).style.background = "#fff"
        await new Promise(r => setTimeout(r, 200));
        document.getElementById(color).style.background = color
        await new Promise(r => setTimeout(r, 300));
    }
}
async function win(){
    document.getElementById("level").innerHTML = `Level: ${sequence.length}`
    if(sequence.length > record){
      localStorage.setItem('memoryMaxLevel', sequence.length);
      record = sequence.length
      document.getElementById("record").innerHTML = `Record: ${record}`
    }
    playWin()    
    document.getElementById("body").style.background = "#aaa"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("body").style.background = "#222"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("body").style.background = "#aaa"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("body").style.background = "#222"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("body").style.background = "#aaa"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("body").style.background = "#222"
    await new Promise(r => setTimeout(r, 1000));
    start()
}
async function lose(){
    sequence = []
    document.getElementById("level").innerHTML = `Level: ${sequence.length}`
    playLose()
    document.getElementById("body").style.background = "#000"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("body").style.background = "#222"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("body").style.background = "#000"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("body").style.background = "#222"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("body").style.background = "#000"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("body").style.background = "#222"
    
}
async function red(){
    beep(300,360,50)
    document.getElementById("red").style.background = "#fff"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("red").style.background = "red"
    if(sequence[counter] === "red"){
      counter++;
      if(counter >= sequence.length)
        win()
    }
    else
      lose()
 }
async function blue(){
    beep(300,380,50)
    document.getElementById("blue").style.background = "#fff"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("blue").style.background = "blue"
    if(sequence[counter] === "blue"){
      counter++;
      if(counter >= sequence.length)
        win()
    }
    else
      lose()
 }
async function green(){
    beep(300,400,50)
    document.getElementById("green").style.background = "#fff"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("green").style.background = "green"
    if(sequence[counter] === "green"){
      counter++;
      if(counter >= sequence.length)
        win()
    }
    else
      lose()
 }
async function yellow(){
    beep(300,420,50)
    document.getElementById("yellow").style.background = "#fff"
    await new Promise(r => setTimeout(r, 200));
    document.getElementById("yellow").style.background = "yellow"
    if(sequence[counter] === "yellow"){
      counter++;
      if(counter >= sequence.length)
        win()
    }
    else
      lose()
 }
function createSequence(){
    const colors = ["red","green","yellow","blue"]
    let color = colors[Math.floor(Math.random()*4)]
    sequence.push(color)
}

async function playWin(){
    await beep(300,240,50)
    await beep(300,260,50)
    await beep(300,280,50)
    await beep(300,240,50)
    await beep(300,300,50)
}
async function playLose(){
    await beep(300,240,50)
    await beep(300,220,50)
    await beep(300,200,50)
    await beep(300,140,50)
    await beep(300,180,50)
}

// The browser will limit the number of concurrent audio contexts
// So be sure to re-use them whenever you can
const myAudioContext = new AudioContext();

/**
 * Helper function to emit a beep sound in the browser using the Web Audio API.
 * 
 * @param {number} duration - The duration of the beep sound in milliseconds.
 * @param {number} frequency - The frequency of the beep sound.
 * @param {number} volume - The volume of the beep sound.
 * 
 * @returns {Promise} - A promise that resolves when the beep sound is finished.
 */
function beep(duration, frequency, volume){
    return new Promise((resolve, reject) => {
        // Set default duration if not provided
        duration = duration || 200;
        frequency = frequency || 440;
        volume = volume || 100;

        try{
            let oscillatorNode = myAudioContext.createOscillator();
            let gainNode = myAudioContext.createGain();
            oscillatorNode.connect(gainNode);

            // Set the oscillator frequency in hertz
            oscillatorNode.frequency.value = frequency;

            // Set the type of oscillator
            oscillatorNode.type= "square";
            gainNode.connect(myAudioContext.destination);

            // Set the gain to the volume
            gainNode.gain.value = volume * 0.01;

            // Start audio with the desired duration
            oscillatorNode.start(myAudioContext.currentTime);
            oscillatorNode.stop(myAudioContext.currentTime + duration * 0.001);

            // Resolve the promise when the sound is finished
            oscillatorNode.onended = () => {
                resolve();
            };
        }catch(error){
            reject(error);
        }
    });
}



        
