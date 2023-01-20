import React from 'react';

class CardProfile extends React.Component {
    state = {
        index: 2,
        currentTime: '0:00',
        musicList: [{name: 'Aguacero', artist: 'Bad Bunny', img:'https://media.giphy.com/media/DD4FroTT30PeSamZbG/giphy.gif', audio:'./12-Aguacero.mp3', duration: '3:31' }, 
        {name: 'Thank You For Being a Friend', artist: 'Golden Girls', img:'https://media.giphy.com/media/l2QZO0FcZJWZ0LLCE/giphy.gif', audio:'./Golden-Girls.mp3', duration: '0:42' },
        {name: 'Yonaguni', artist: 'Bad Bunny', img:'https://media.giphy.com/media/5O6tM5hqIOcSwQdaWs/giphy.gif', audio:'./01-Yonaguni.mp3', duration: '3:26' }],
    pause: false,
    };

    componentDidMount() {
        this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
        this.playerRef.addEventListener("ended", this.nextSong, false);
        this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
        this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
        this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
    }

    componentWillUnmount() {
        this.playerRef.addEventListener("timeupdate", this.timeUpdate);
        this.playerRef.addEventListener("ended", this.nextSong);
        this.timelineRef.addEventListener("click", this.changeCurrentTime);
        this.timelineRef.addEventListener("mousemove", this.hoverTimeLine);
        this.timelineRef.addEventListener("mouseout", this.resetTimeLine);
    }

    changeCurrentTime = (e) => {
        const duration = this.playerRef.duration;
        const playHeadWidth = this.timelineRef.offsetWidth;
        const offset = this.timelineRef.offsetLeft;
        const userClickWidth = e.clientX - offset;

        const userClickWidthInPercent = (userClickWidth*100)/playHeadWidth;

        this.playHeadRef.style.width = userClickWidthInPercent + "%";
        this.playerRef.currentTime = (duration * userClickWidthInPercent)/100;
    }

    hoverTimeLine = (e) => {
        const duration = this.playerRef.duration;
        const playHeadWidth = this.timelineRef.offsetWidth;
        const offset= this.timelineRefRef.offsetLeft;
        const userClickWidth = e.clientX - offset;
        const userClickWidthInPercent = (userClickWidth * 100)/playHeadWidth;

        if(userClickWidthInPercent <= 100){
            this.hoverPlayHeadRef.style.width = userClickWidthInPercent + "%";
          }
          const time = (duration * userClickWidthInPercent)/100;
        
          if((time =>0) && (time <= duration)) {
            this.hoverPlayHeadRef.dataset.content = this.formatTime(time);
          }
        }
resetTimeLine = () => {
    this.hoverPlayHeadRef.style.width = 0;
}

timeUpdate = () => {
    const duration = this.playerRef.duration;
  const timelineWidth = this.timelineRef.offsetWidth - this.playHeadRef.offsetWidth;
  const playPercent = 100 * (this.playerRef.currentTime / duration);
	this.playHeadRef.style.width = playPercent + "%";
  const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));  
  this.setState({ 
    currentTime 
});
}
formatTime = (currentTime) => {
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);

    seconds = (seconds >= 10) ? seconds : "0" + seconds % 60;

    const formatTime = minutes + ":" + seconds
    
    return formatTime;
}

updatePlayer = () => {
    const { musicList, index } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    this.playerRef.load();
}

nextSong = () => {
    const { musicList, index, pause } = this.state;

    this.setState({
        index: (index + 1) % musicList.length
    });
    this.updatePlayer();
    if(pause) {
        this.playerRef.play();
    }
};

prevSong = () => {
    const { musicList, index, pause} = this.state;

    this.setState({ 
        index: (index + musicList.length -1) %
        musicList.length
    });
this.updatePlayer();
if(pause) {
    this.playerRef.play();
}
};

playOrPause = () => {
    const { musicList, index, pause } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    if ( !this.state.pause ) {
        this.playerRef.play();
    }else{
        this.playerRef.pause();
    }
    this.setState({ 
        pause: !pause
    })
}
clickAudio = (key) => {
    const { pause } = this.state;

    this.setState({ 
        index: key
    });
}
}

render() {
    const { musicList, index, currentTime, pause } = this.state;
    const currentSong = musicList[index];
    return (
        <div className ="card">
            <div className="current-song">
                <audio ref={ref => this.playerRef = ref}>
                    <source src={ currentSong.audio }
                    type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
                <div className="img-wrap">
                    <img src={ currentSong.img}/>
                </div>
                <span className="song-name"> { currentSong.name }</span>
            <span className="song-autor">{currentSong.artist }</span>
            <div className ="time">
                <div className="current-Time">{ currentTime }</div>
                <div className="end-time">{ currentSong.duration }</div>
                <div ref={ref => this.timeLineRef = ref} id="timeline">
                    <div ref={ref => this.playerHeadRef = ref} id="playhead"></div>
                    <div ref={ref => this.hoverPlayHeadRef = ref} class="hover-playhead" data-content="0:00"></div>
                </div>
            <div className="controls">
                <button onClick={this.prevSong} className="prev prev-next current-btn">
                    <i className ="fas fa-backward"></i>
                </button>
                <button onClick={this.playOrPause} className="play current-btn">
                    {
                        (!pause) ? <i className="fas fa-play"></i>
                        :<i className="fas fa-pause"></i>
                    }
                </button>
                <button onClick={this.nextSong}
                className="next prev-next current-btn">
                    <i className="fas fa-forward"></i>
                </button>
            </div>
            
            </div>
            <div className="play-list">
                {musicList.map (( music, key=0) =>
                <div key={key} onClick={() => this.clickAudio(key)}
                className={"track " + 
            (index === key && !pause?'current-audio':'') + (index === key && pause ?'play-now': '')} >
                <img className ="track-img" src={music.img}/>
                <div className ="track-discr" >
                    <span className='track-name'>{music.name}</span>
                    <span className='track-author' >{music.artist}</span>
         </div>
         <span className="track-duration">
            {(index === key) ?currentTime:music.duration}
         </span>
            </div>
                )}
        </div>
        </div>
        </div>
    );
            }
            
