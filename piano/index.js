function beep(duration, frequency, volume){
    const myAudioContext = new AudioContext();
    return new Promise((resolve, reject) => {
        // Set default duration if not provided
        duration = duration || 200;
        frequency = frequency || 440;
        volume = volume || 100;

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
