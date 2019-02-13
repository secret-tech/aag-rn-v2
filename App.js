import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

import OneSignal from 'react-native-onesignal';
import { RTCPeerConnection, RTCMediaStream, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia } from 'react-native-webrtc';

// Конфигурация локальных медиа данных
const LOCAL_STREAM_OPTIONS = {
  audio: true,
  video: {
    facingMode: 'user',
    mandatory: {
      minWidth: 600,
      minHeight: 800,
      minFrameRate: 30
    }
  }
};

// Устаревшие опции для создания offer. По-умолчанию они являются true, а тут находятся на всякий случай
const OFFER_OPTIONS = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.configuration = {
      'iceServers': [
        { url: 'stun:stun2.1.google.com:19302' },
        { url: 'stun:stun1.l.google.com:19302' },
        { url: 'stun:stun1.voiceeclipse.net:3478' },
        { url: 'stun:stun2.l.google.com:19302' },
        { url: 'stun:stun3.l.google.com:19302' },
        { url: 'stun:stun4.l.google.com:19302' }
      ]
    };

    this.localPeer = null;

    this.state = {
      localStream: null,
      remoteStream: null
    };
  }

  componentDidMount() {
    // 1 Создаем RTC Peer Connection
    this.localPeer = new RTCPeerConnection(this.configuration);

    // 2 Handle ICE candidates and sync that shit between peers via socket
    // this.localPeer.onicecandidate = ({ candidate }) => {
    //   const body = { conversationId: this.props.navigation.state.params.conversationId, candidate };
    //   if (candidate) this.socket.emit('req:ice', body);
    // };

    // Create local stream (video, audio)
    getUserMedia(
      LOCAL_STREAM_OPTIONS, 
      (stream) => {
        console.log(this.localPeer, stream);
        this.setState({ localStream: stream });
        this.localPeer.addStream(stream);
      }, 
      console.log
    );
  }

  render() {
    const { localStream } = this.state;

    return (
      <View style={styles.container}>
        <View style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'blue'
        }}>
          <RTCView
            objectFit="cover" 
            style={{
              width: '100%',
              height: '100%',
              flex: 1
            }} 
            streamURL={localStream && localStream.toURL()}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
