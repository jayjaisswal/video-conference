import React from 'react';

const server_url = "http://localhost:4000";
var connections = {};

const peerConfigConnections = {
    "iceServers":[
        {
            "urls": "stun:stun.l.google.com:19302"
        }
    ]
}

const VideoMeeting = () => {
    var socketRef = useRef();
    let socketIdRef = useRef();
    let localVideoRef = useRef();

    let [videoAvailable , setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState(null);
    let [audio, setAudio] = useState(null);
    let [screen , setScreen] = useState(null);
    let [showModal , setShowModal] = useState(false);

    let [screenAvailable , setScreenAvailable] = useState();

    let [message , setMessage] = useState(null);
    let [messages , setMessages] = useState([]);
    let [newMessages , setNewMessages] = useState(0);
    let [askForUserName , setAskForUserName] = useState(true);
    let [userName , setUserName] = useState("");
    const videoRef = useRef([]);
    let [videos , setVideos] = useState([]);

    return (
        <div>
            VideoMeeting {window.location.href}
        </div>
    );
};

export default VideoMeeting;