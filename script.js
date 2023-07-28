console.log("Welcome to spotify!")

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3")
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("gif")
let masterSongName = document.getElementById("masterSongName")
let songsList =[
    {songName: "First song", path: 'songs/1.mp3', cover: 'covers/1.jpg'},
    {songName: "Second song", path: 'songs/2.mp3', cover: 'covers/2.jpg'},
    {songName: "Third song", path: 'songs/3.mp3', cover: 'covers/3.jpg'},
    {songName: "Fourth song", path: 'songs/4.mp3', cover: 'covers/4.jpg'},
    {songName: "Fifth song", path: 'songs/5.mp3', cover: 'covers/5.jpg'},
    {songName: "Sixth song", path: 'songs/1.mp3', cover: 'covers/1.jpg'},
    {songName: "Seventh song", path: 'songs/1.mp3', cover: 'covers/1.jpg'},
    {songName: "Eighth song", path: 'songs/1.mp3', cover: 'covers/1.jpg'},
    {songName: "Ninth song", path: 'songs/1.mp3', cover: 'covers/1.jpg'},
    {songName: "Tenth song", path: 'songs/1.mp3', cover: 'covers/1.jpg'},
]
songItems = Array.from(document.getElementsByClassName("songItem"));

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songsList[i].cover;
    element.getElementsByClassName("songName")[0].innerText = songsList[i].songName;
})

//Handle play/pause
masterPlay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle')
        element.classList.remove('fa-pause-circle')
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        console.log(e.target);
        makeAllPlays()
        songIndex = parseInt(e.target.id)%5;
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src = `songs/${songIndex}.mp3`
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterSongName.innerText = songsList[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById("next").addEventListener('click',(e)=>{
    songIndex = (songIndex+1)%5;
    audioElement.src = `songs/${songIndex}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songsList[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById("previous").addEventListener('click',(e)=>{
    songIndex = (5+songIndex-1)%5;
    audioElement.src = `songs/${songIndex}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songsList[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
