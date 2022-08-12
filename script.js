const audio=document.getElementById('audio')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const timestamp = document.getElementById('timestamp')
const chosen_music=document.getElementsByClassName('music-item')
const music_head=document.getElementById('music-head')
const sidebar_btn=document.getElementById("sidebar-btn")
const sidebar=document.getElementById("sidebar")


half_screen_height=0.5*screen.height
sidebar_btn.style.transform=`translate(200px,${half_screen_height-50}px)`


function toggleAudioStatus(){
    if(audio.paused){
        audio.play();
    }else{
        audio.pause();
    }
    

}

function updatePlayIcon(){
    if(audio.paused){
        play.innerHTML='<i class="fa-solid fa-play fa-2x"></i>';

    }
    else{
        play.innerHTML='<i class="fa-solid fa-pause fa-2x"></i>';
    }

}

function updateProgress(){
    progress.value=(audio.currentTime / audio.duration)*100;

    let mins = Math.floor(audio.currentTime/60)
    if(mins < 10){
        mins='0'+String(mins);
    }
    let seconds=Math.floor(audio.currentTime % 60)
    if(seconds<10){
        seconds='0'+String(seconds);
    
    }
    timestamp.innerHTML=`${mins}:${seconds}`;
}

function setAudioProgress(){
    audio.currentTime=(+progress.value * audio.duration)/100;
}

function stopAudio(){
    audio.currentTime=0;
    audio.pause();

}
function changemusic(){
    audio.src=`Music/${this.id}.mp3`
    audio.play()
    play.innerHTML='<i class="fa-solid fa-play fa-2x"></i>';
    progress.value=0;
    music_head.innerHTML=this.id
}
var open_or_closed=true
function sidebar_control(){
    
    if (open_or_closed){
        sidebar.style.transform="translate(-200px,0px)"
        sidebar_btn.innerHTML='<i class="fa-solid fa-arrow-right-long"></i>'
        document.getElementById('main').style.transform="translate(-200px,0px)"
        open_or_closed=false
    }else{
        sidebar.style.transform="translate(0px,0px)"
        sidebar_btn.innerHTML='<i class="fa-solid fa-arrow-left-long"></i>'
        document.getElementById('main').style.transform="translate(0px,0px)"
        open_or_closed=true
        
    }

}
///event listeners
 audio.addEventListener('click',toggleAudioStatus);
 audio.addEventListener('pause', updatePlayIcon);
 audio.addEventListener('play',updatePlayIcon);
 audio.addEventListener('timeupdate',updateProgress);

 play.addEventListener('click',toggleAudioStatus);

 stop.addEventListener('click',stopAudio);
 progress.addEventListener('change', setAudioProgress);
 for(i=0;i<chosen_music.length;i++){
    chosen_music[i].addEventListener('click',changemusic)

}
sidebar_btn.addEventListener('click',sidebar_control)
