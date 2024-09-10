console.log("Welcome to Spotify");

// Initializing the variables
let songIndex = 0;
let audioElement = new Audio(`song/${songIndex +1}.mp3`); // Adjust file path

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = document.getElementsByClassName('songItem'); // Use getElementsByClassName

let songs = [
    { songName: "Ishq Wala Love", filePath: "song/1.mp3", coverPath: "cover.jpeg" },
    { songName: "Malang", filePath: "song/2.mp3", coverPath: "cover.jpeg" },
    { songName: "O Mahi", filePath: "song/3.mp3", coverPath: "cover.jpeg" },
    { songName: "Husn", filePath: "song/4.mp3", coverPath: "cover.jpeg"},
    { songName: "Apna Bana Le", filePath: "song/5.mp3", coverPath: "cover.jpeg" },
    { songName: "Tera Hone Laga Hoon", filePath: "song/6.mp3", coverPath: "cover.jpeg" },
    // Add more songs as needed
];

Array.from(songItems).forEach((element, i) => { // Use Array.from to convert the HTMLCollection to an array
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        // Check if the audio can be played (user interaction)
        if (audioElement.readyState >= 2) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// myProgressBar.addEventListener('change', () => {
//     audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
// });
myProgressBar.addEventListener('change', () => {
    const progressValue = parseFloat(myProgressBar.value);
    if (!isNaN(progressValue) && isFinite(progressValue)) {
        audioElement.currentTime = progressValue * audioElement.duration / 100;
    }
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src =`song/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex =1;
    }else{
        songIndex +=1;
    }
    audioElement.src =`song/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex =1;
    }else{
        songIndex -=1;
    }
    audioElement.src =`song/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})