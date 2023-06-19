
// Initialize the Variables
let songIndex = 0;
let audio;;
let masterPlay = document.getElementById('masterPlay');
let masterPlayBtn = document.getElementById('play-pause-btn');
let myProgressBar = document.getElementById('progress-bar');
// let gif = document.getElementById('gif');
let masterSongName = document.getElementById('playing-music-title');
let songItems = Array.from(document.getElementsByClassName('song-col'));

let songs = [
    { songName: "believer", filePath: "assests/believer.mp3", coverPath: "assests/believer.jpg" },
    { songName: "bones", filePath: "assests/bones.mp3", coverPath: "assests/bones.jpg" },
    { songName: "demons", filePath: "assests/demons.mp3", coverPath: "assests/demons.jpg" },
    { songName: "thunder", filePath: "assests/thunder.mp3", coverPath: "assests/thunder.jpg" },
]
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("music-title")[0].innerText = songs[i].songName;
})

for (let i = 0; i < songItems.length; i++) {

    let playingMusicTitle = document.getElementById("playing-music-title")
    let playingMusicCover = document.getElementById("playing-music-cover")
    let songDuration = document.getElementById("song-duration")
    let songCurrentTime = document.getElementById("song-current-time")
    let progress;
    let musicplayer = document.getElementById("music-player")

    songItems[i].addEventListener('click', function () {
        let songList = [
            {
                name: this.id,
                authorName: "Imagine Dragons",
                filePath: `assests/${this.id}.mp3`,
                coverPath: `assests/${this.id}.jpg`
            },
        ]

        masterPlay.classList.remove("fa-play")
        masterPlay.classList.add("fa-pause")

        musicplayer.classList.remove("display-hidden")

        songList.map((song) => {
            currentPlayingSong = song.filePath
            audio = new Audio(currentPlayingSong)
            // audio.pause()

            if (this.id == song.name) {
                if (audio.paused) {
                    progress = 0
                    audio.pause()
                    audio.play();
                    playingMusicCover.setAttribute("src", song.coverPath)
                    playingMusicCover.setAttribute("id", song.name)
                    playingMusicTitle.textContent = song.name
                }

                else {
                    audio.pause();
                }

                audio.addEventListener("timeupdate", function () {

                    // Update Seekbar
                    progress = parseInt((audio.currentTime / audio.duration) * 100);
                    myProgressBar.value = progress;

                    tt = "0";
                    var Amin = Math.floor(audio.currentTime / 60);
                    var Asec = Math.floor(audio.currentTime - Amin * 60);

                    if (Asec < 10) {
                        Asec = "0" + Asec;
                    }
                    if (Amin > 10) {
                        tt = "";
                    }

                    // song total duration

                    var Tmin = Math.floor(audio.duration / 60);
                    var Tsec = Math.floor(audio.duration - Amin * 60);

                    if (Tsec < 10) {
                        Tsec = "0" + Tsec;
                    }
                    if (Tmin > 10) {
                        tt = "";
                    }

                    songCurrentTime.textContent = tt + Amin + ":" + Asec;
                    songDuration.textContent = tt + Tmin + ":" + Tsec;

                    // songDuration.textContent = Math.round(audio.duration)
                    // console.log(audioNum);
                })

                myProgressBar.addEventListener('change', function () {
                    audio.currentTime = myProgressBar.value * audio.duration / 100
                })
                playing = false
                audioNum++
                console.log(audioNum);


            } else {
                audio.pause()
            }
        })

    })

}



// Handle play/pause click
masterPlayBtn.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        // gif.style.opacity = 1;
    }
    else {
        audio.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})
// Listen to Events
// audio.addEventListener('timeupdate', () => {
//     // Update Seekbar
//     progress = parseInt((audio.currentTime / audio.duration) * 100);
//     myProgressBar.value = progress;
// })

// myProgressBar.addEventListener('change', () => {
//     audio.currentTime = myProgressBar.value * audio.duration / 100;
// })

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audio.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audio.currentTime = 0;
        audio.play();
        // gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audio.src = `assests/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audio.currentTime = 0;
    audio.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audio.src = `assests/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audio.currentTime = 0;
    audio.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})