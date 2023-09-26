const audioItems = document.querySelector('.audioItems');
const playBtn = document.querySelector('.playBtn')
const forwardBtn = document.querySelector('.forwardAudio')
const backwardBtn = document.querySelector('.backwardAudio')
let audioDetialsName = document.getElementById('audio_detials_name')
let auidoLine = document.getElementById('auido_line')
let volumeLine = document.getElementById('volume_line')

index = 0;

let currentSong = new Audio(audioListData[index].songSrc)
audioDetialsName.innerHTML = audioListData[index].name.slice(0,60) + '...';







audioListData.forEach((item,i)=>{


    let {name , coverImg, songSrc} = item;

    let audioItem = new Audio(songSrc)



    if (name.length > 47 ) {
        name = name.slice(0, 47)
        name = (name + "...") 
    }
    
    const newItem = document.createElement('div');
     newItem.classList.add('audioItem');
    
     newItem.innerHTML = `
                        <img src="${coverImg}" alt="">
                        <h4>${name}</h4>
                        <div class="cruntTime"> <span class="audioDuration"></span>
                            <i class="fa-solid listPlayIcon fa-circle-play" onclick="listSongplay(${i})"></i>
                        </div>
     `;

     
     audioItems.appendChild(newItem);

     
     
})



function listSongplay(i){
    index = i;
    songPlay()

    listPlayIcon = document.querySelectorAll('.listPlayIcon')

    listPlayIcon.forEach((icon)=>{
        icon.classList.remove('fa-circle-pause')
        icon.classList.add('fa-circle-play')

    })
   
    listPlayIcon[index].classList.remove('fa-circle-play')
    listPlayIcon[index].classList.add('fa-circle-pause')
    // if ( listPlayIcon[index].classList.contains('played')) {
    //     document.querySelector('.layer img').style.opacity = '0'
    //     playBtn.classList.remove('fa-circle-pause')
    //     playBtn.classList.add('fa-circle-play')

    //     listPlayIcon[index].classList.remove('played')
    //     listPlayIcon[index].classList.remove('fa-circle-pause')
    //     listPlayIcon[index].classList.add('fa-circle-play')
    //     currentSong.pause()


    // } else {
    //     listPlayIcon[index].classList.remove('fa-circle-play')
    //     listPlayIcon[index].classList.add('fa-circle-pause')
    //     listPlayIcon[index].classList.add('played')
    // }
    
    


 }

const playBtnFnc = ()=>{
    listPlayIcon = document.querySelectorAll('.listPlayIcon')
    listPlayIcon.forEach((icon)=>{
        icon.classList.remove('fa-circle-pause')
        icon.classList.add('fa-circle-play')

    })

    if(currentSong.paused || currentSong.currentTime == 0){
        currentSong.play();
        document.querySelector('.layer img').style.opacity = '1';
        playBtn.classList.remove('fa-circle-play')
        playBtn.classList.add('fa-circle-pause')

        listPlayIcon[index].classList.remove('fa-circle-play')
        listPlayIcon[index].classList.add('fa-circle-pause')
    }else{
        currentSong.pause()
        document.querySelector('.layer img').style.opacity = '0'
        playBtn.classList.remove('fa-circle-pause')
        playBtn.classList.add('fa-circle-play')
        
        listPlayIcon[index].classList.remove('played')
        listPlayIcon[index].classList.remove('fa-circle-pause')
        listPlayIcon[index].classList.add('fa-circle-play')
        
        
    }
   

    

    


}





playBtn.addEventListener('click',playBtnFnc)

backwardBtn.addEventListener('click',()=>{
        
    currentSong.pause()
    document.querySelector('.layer img').style.opacity = '0';
    index--;
    if (index < 0 ) {
        index = 0
        songPlay()

    }else{
        songPlay()

    } 
    listSongplay(index);
    
    })

    forwardBtn.addEventListener('click',()=>{
        currentSong.pause()
        document.querySelector('.layer img').style.opacity = '0';
        index++;
        if (index >= audioListData.length) {
            index = 0
            songPlay()
        }
        else{
            songPlay()
        }
        listSongplay(index);
        })


        function songPlay() {
            currentSong.src = audioListData[index].songSrc;
        
            audioDetialsName.innerHTML = audioListData[index].name.slice(0,47) + '...';
        
            if(currentSong.paused || currentSong.currentTime == 0){
                currentSong.play();
                document.querySelector('.layer img').style.opacity = '1';
                playBtn.classList.remove('fa-circle-play')
                playBtn.classList.add('fa-circle-pause')
            }else{
                currentSong.pause()
                document.querySelector('.layer img').style.opacity = '0'
                playBtn.classList.remove('fa-circle-pause')
                playBtn.classList.add('fa-circle-play')
            }
            console.log(index);
        }


    





currentSong.addEventListener('timeupdate',(ditels)=>{
    

    document.getElementById('cruntTime').innerHTML = (time_convert(currentSong.currentTime));

    document.getElementById('totalTime').innerHTML = (time_convert(currentSong.duration));



    document.getElementById('auido_line').value = (currentSong.currentTime/currentSong.duration * 100);

})


auidoLine.addEventListener('change',(ditels)=>{

    document.getElementById('cruntTime').innerHTML = (time_convert(currentSong.currentTime));

    document.getElementById('totalTime').innerHTML = (time_convert(currentSong.duration));

    currentSong.currentTime = auidoLine.value * currentSong.duration/100;
    
})



volumeLine.addEventListener('mousemove',volumeChange)



function volumeChange (){
    currentSong.volume = volumeLine.value/100;

    volumeIcon = document.querySelector('.volumeIcon');
    if(volumeLine.value <= 5 ){
        volumeIcon.classList.remove('fa-volume-high')
        volumeIcon.classList.remove('fa-volume-low')
        volumeIcon.classList.add('fa-volume-off')
    }else if (volumeLine.value <= 60 ) {
        volumeIcon.classList.remove('fa-volume-high')
        volumeIcon.classList.remove('fa-volume-off')
        volumeIcon.classList.add('fa-volume-low')
    } else{
        volumeIcon.classList.remove('fa-volume-low')
        volumeIcon.classList.remove('fa-volume-off')
        volumeIcon.classList.add('fa-volume-high')

    }
}
volumeChange()



function time_convert(num)
 { 
    let minutes = 0.00;
    let second = 0.00;
    minutes = Math.floor(num / 60);  
    second = Math.ceil(num % 60);
  return minutes + ":" + second;         
}

