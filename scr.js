console.log("Welcome to Spotify");
//initialize the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay =document.getElementById('masterPlay');
let myProgressbar= document.getElementById("myProgressBar");

let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs=[
    {songName: "Baarishein ", filePath: "songs/1.mp3" , coverPath:"covers/1.jpg"},
    {songName: "Aise kyun  ", filePath: "songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName: "Kasoor", filePath: "songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName: "There's Nothing ", filePath: "songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName: "Wildest Dreams", filePath: "songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName: "Channa Pardesi", filePath: "songs/6.mp3", coverPath:"covers/6.jpg"},
    
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})


//Handle  play
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }

    }
)
//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    
    //update seekbar
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myProgressbar.value =progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;

})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })


})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})