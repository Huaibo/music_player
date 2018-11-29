import React from 'react'
import Progress from '../components/progress'
import './player.less'
import { connect } from 'react-redux';
import { actions } from 'react-jplayer';

let duration=null;

class Player extends React.Component{
    constructor(props) {
        super(props);
        this.state = { progress:0,
            volume:0,
            isPlay:true};
    }
    componentDidMount(){
        $("#player").on($.jPlayer.event.timeupdate,(e) => {
            duration=e.jPlayer.status.duration;
            this.setState({
                volume:e.jPlayer.options.volume*100,
                progress:e.jPlayer.status.currentPercentAbsolute
            })
        });
    };
    componentWillUnmount(){
        $("#player").unbind($.jPlayer.event.timeupdate);
    };
    progressChangeHandler(progress){
        //点击暂停后再点击歌曲进度条防止暂停图标不变化
        this.setState({
            isPlay: true
        });
        // console.log('from root widget',progress)
        // $('#player').jPlayer(this.state.isPlay?'play':'pause',duration * progress);
        $("#player").jPlayer('play',duration * progress);
    };
    changeVolumeHandler(progress){
        this.setState({
            volume: progress * 100,
        });
        $("#player").jPlayer('volume',progress);
    };
    play(){
        if(this.state.isPlay){
            $("#player").jPlayer('pause');
        }else{
            $("#player").jPlayer('play');
        }
        this.setState({
            isPlay:!this.state.isPlay
        });
    };
    render(){
        return (
            <div className="player-page">
                <h1 className="caption">Music player &gt;</h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">-2:00</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5}}/>
                                <div className="volume-wrapper">
                                    <Progress progress={this.state.volume} onProgressChange={this.changeVolumeHandler} barColor="#aaa">

                                    </Progress>
                                </div>
                            </div>
                        </div>
                        <div style={{height:10,lineHeight:'10px'}}>
                            <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler} barColor="#ff0000">
                            </Progress>
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev"/>
                                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}/>
                                <i className="icon next ml20"/>
                            </div>
                            <div className="-col-auto">
                                <i className="icon repeat-cycle"/>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player;