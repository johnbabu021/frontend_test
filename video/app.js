(function(){

const supportsVideo=!!document.getElementById('vid').canPlayType


    if(supportsVideo)
{
    const        videoContainer=document.querySelector('.video__cont')
    const       time=document.querySelector('.time')
    const       video=document.getElementById('vid')
    const       videoControls=document.getElementById('video__cntrl')
    video.controls=false
    videoControls.setAttribute('data-state','visible')
    const   playPause=document.getElementById('playpause')
    const   restart=document.getElementById('restart')
    const   stop=document.getElementById('stop')
    const   progress=document.getElementById('progress')
    const   progressBar=document.getElementById('video__progress__bar')


video.addEventListener('loadedmetadata',()=>{
    progress.setAttribute('max',video.duration)
})




const   changeBtnState=(type)=>{
if(type==='playpause'){
    if(video.ended||video.paused){
        playPause.setAttribute('data-state','play')
    }
    else{
        playPause.setAttribute('data-state','pause')
    }
}
}


video.addEventListener('play',()=>{
    changeBtnState('playpause')
},false)

video.addEventListener('pause',()=>{
    changeBtnState('playpause')
})

playPause.addEventListener('click',(e)=>{
if(video.paused||video.ended)   video.play()
else    video.pause()
})

restart.addEventListener('click',()=>{
    // video.pause()
    video.currentTime=0
    video.value=0
    changeBtnState('playpause')
    video.play()
})

video.addEventListener('timeupdate',()=>{
    if(!progress.getAttribute('max'))
    progress.setAttribute('max',video.duration)
    progress.value=video.currentTime
    // console.log(video.currentTime,video.duration)
    progressBar.style.width=Math.floor((video.currentTime/video.duration)*100)+'%'
})

stop.addEventListener('click',()=>{
    video.pause()
    video.currentTime=0
    video.value=0
    changeBtnState('playpause')
})
progress.addEventListener('click',(e)=>{
    // console.log(e)
    const   pos=(e.pageX-(progress.offsetLeft+progress.offsetParent.offsetLeft))/(progress.offsetWidth)

video.currentTime=pos* video.duration

})
time.addEventListener('input',(e)=>{
if(e.target.value<video.duration&&e.target.value>0)
video.currentTime=e.target.value

})






}   





})()
