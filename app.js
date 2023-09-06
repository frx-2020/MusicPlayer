const playBtn = document.querySelector("#play");
const currentTime = document.querySelector("#current");
const totalTime = document.querySelector("#total");
const coverImage = document.querySelector(".imageCover");
const title = document.querySelector(".tilteContainer h2");
const singer = document.querySelector(".tilteContainer h4");
const body = document.querySelector("body");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const music = document.querySelector("audio");
const progressbar=document.querySelector('#progressbar')

let isPause = false;
let index = 2;
let duration = {
  time: 0,
  min: 0,
  sec: 0,
};
let current = {
  time: 0,
  min: 0,
  sec: 0,
};

let playlist = [
  {
    id: 1,
    title: "jaddeh",
    singer: "Arash&masih",
    src: "./asset/music/masih_ft_arash_ap_jaddeh.mp3",
    cover: "./asset/cover/Masih-Arash-Jaddeh.jpg"
   
  },
  {
    id: 2,
    title: "Mesle Gol",
    singer: "Masoud Sadeghloo",
    src: "./asset/music/Masoud Sadeghloo - Mesle Gol.mp3",
    cover: "./asset/cover/Masoud-Sadeghloo-Mesle-Gol.jpg"

  },
  {
    id: 3,
    title: "Aadat",
    singer: "Shadmehr Aghili",
    src: "./asset/music/Shadmehr Aghili - Aadat.mp3",
    cover: "./asset/cover/Shadmehr-Adat.jpg"
   
  },
 
];

coverImage.style.backgroundImage = `url(${playlist[index].cover})`;
title.innerHTML = playlist[index].title;
singer.innerHTML = playlist[index].singer;
body.style.backgroundImage = `url(${playlist[index].cover})`;
music.setAttribute("src", playlist[index].src);
music.addEventListener('loadeddata',(event)=>{
  duration.time=Math.floor(event.target.duration)
  duration.min = Math.floor(duration.time / 60);
  duration.sec = duration.time % 60;
  totalTime.innerHTML = `${duration.min}:${duration.sec}`;

  })



playBtn.addEventListener("click", playPauseHandler);

function playPauseHandler() {
  if (!isPause) {
    coverImage.classList.add('imageCoverPlay')
    title.classList.add('titlePlay');
    singer.classList.add('singerPlay')
    playHandler();
    isPause = true;
    playBtn.setAttribute("src", "./asset/btn/pause.png");
  } else {
    music.pause();
    isPause = false;
    coverImage.classList.remove('imageCoverPlay')
    title.classList.remove('titlePlay');
    singer.classList.remove('singerPlay')

    playBtn.setAttribute("src", "./asset/btn/play-button.png");
  }
}
function playHandler() {
 
 
    setInterval(() => {
        
      current.time = Math.floor(music.currentTime);
 
      progressbar.value=(current.time/duration.time)*100
    
    
      if (current.time < 60) {
        if (current.time < 10) {
          currentTime.innerHTML = `00:0${current.time}`;
        } else {
          currentTime.innerHTML = `00:${current.time}`;
        }
      } else {
        current.min = Math.floor(current.time / 60);
        current.sec = current.time % 60;
        if (current.min < 10) {
          if (current.sec < 10) {
            currentTime.innerHTML = `0${current.min}:0${current.sec}`;
          } else {
            currentTime.innerHTML = `0${current.min}:${current.sec}`;
          }
        } else {
          if (current.sec < 10) {
            currentTime.innerHTML = `${current.min}:0${current.sec}`;
          } else {
            currentTime.innerHTML = `${current.min}:${current.sec}`;
          }
        }
      }
    }, 1000);
  music.play();
 
  
}

next.addEventListener("click", () => {
  if (index >= playlist.length - 1) {
    index = 0;
  } else {
    index++;
  }

  coverImage.style.backgroundImage = `url(${playlist[index].cover})`;
  title.innerHTML = playlist[index].title;
  singer.innerHTML = playlist[index].singer;
  body.style.backgroundImage = `url(${playlist[index].cover})`;
  music.setAttribute("src", playlist[index].src);

  isPause = true;
  playHandler();
});

previous.addEventListener("click", () => {
  if (index <= 0) {
    index = playlist.length - 1;
  } else {
    index--;
  }

  coverImage.style.backgroundImage = `url(${playlist[index].cover})`;
  title.innerHTML = playlist[index].title;
  singer.innerHTML = playlist[index].singer;
  body.style.backgroundImage = `url(${playlist[index].cover})`;
  music.setAttribute("src", playlist[index].src);
  playHandler();
  isPause = true;
});

progressbar.addEventListener('change',(event)=>{
  console.log(duration.time);
    music.currentTime=(event.target.value/100)*duration.time
})
