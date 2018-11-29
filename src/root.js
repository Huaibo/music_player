import React from 'react'
import Header from './components/header'
import Player from './page/player'
import { MUSIC_LIST } from './config/list'
import { connect } from 'react-redux';
import { actions } from 'react-jplayer';


const mapStateToProps = state => ({
    showRemainingDuration: state.jPlayers.AudioPlayer.showRemainingDuration,
});

const Component = ({ showRemainingDuration, dispatch }) =>
    <div onClick={() => dispatch(actions.setOption('AudioPlayer', 'showRemainingDuration', !showRemainingDuration))}>
        Toggle Duration
    </div>;

export default connect(mapStateToProps)(Component);

class Root extends React.Component{
    constructor(props) {
        super(props);
        this.state = { currentMusicItem:MUSIC_LIST[0]};
    }
    componentDidMount(){
        $("#player").jPlayer({
            ready:function(){
                $(this).jPlayer('setMedia',{
                    mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
                }).jPlayer('play');
            },
            supplied:'mp3',
            vmode:'window'
        });
    };
    componentWillUnmount(){
    };
    progressChangeHandler(progress){
    };
    render(){
        return (
            <div>
                <Header />
                <Player currentMusicItem={this.state.currentMusicItem}>

                </Player>
            </div>
        )
    }
}

export default Root;