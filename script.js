const textArea=document.querySelector("#text");
const voiceList=document.querySelector("#voice");
const speechBtn=document.querySelector(".submit");

let synth=speechSynthesis;
let isSpeaking=true;

function voicespeech(){
    for(let voice of synth.getVoices()){
        let option=document.createElement('option')
        option.text=voice.name
        voiceList.add(option)
        console.log(option)
    }
}

synth.addEventListener('voiceschanged',voicespeech)

function texttospeech(text){
   let utternance=new SpeechSynthesisUtterance(text);
   for(let voice of synth.getVoices()){
     if(voice.name===voiceList.value){
        utternance.voice=voice;
     }
   }
   speechSynthesis.speak(utternance);
}

speechBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if(textArea.value != ''){
        if(!synth.speaking){
            texttospeech(textArea.value);
        }
        if(textArea.value.length>80){
            if(isSpeaking){
                synth.resume()
                isSpeaking=false;
                speechBtn.innerHTML="Pause Speech"
            }else{
                synth.pause();
                isSpeaking=true;
                speechBtn.innerHtml="Resume Speech"
            }
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking= true;
                    speechBtn.innerHTML="Convert To Speech";
                }
            })
        }else{
            speechBtn.innerHTML="Convert To Speech";
        }
    }
})
