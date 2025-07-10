import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useRef, useEffect, useState } from "react";

const server_url = "http://localhost:4000";
var connections = {};

const peerConfigConnections = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const VideoMeeting = () => {
  var socketRef = useRef();
  let socketIdRef = useRef();
  let localVideoRef = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);
  let [audioAvailable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState([]);
  let [audio, setAudio] = useState(null);
  let [screen, setScreen] = useState(null);
  let [showModal, setShowModal] = useState(false);

  let [screenAvailable, setScreenAvailable] = useState();

  let [message, setMessage] = useState(null);
  let [messages, setMessages] = useState([]);
  let [newMessages, setNewMessages] = useState(0);
  let [askForUserName, setAskForUserName] = useState(true);
  let [username, setUsername] = useState("");
  const videoRef = useRef([]);
  let [videos, setVideos] = useState([]);

  // if(isChrome()=== false){
  //     TODO
  // }

  const getpermissions = async () => {
    try {
      // video
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }

      //   audio
      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (audioPermission) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      }

      //   share screen
      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    } catch {
      console.log("Error");
    }
  };

  useEffect(() => {
    getpermissions();
  }, []);

  let getUserMediaSuccess = (stream) => {};

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({
          video: video,
          audio: audio,
        })
        .then(getUserMediaSuccess)
        .then((stream) => {})
        .catch((error) => {
          console.log(error);
        });
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {
        console.log(e);
      }
    }

    useEffect(() => {
      if (video !== undefined && audio !== undefined) {
        getUserMedia();
      }
    }, [audio, video]);

    let gotMessageFromServer = (fromId, message) => {};

    let addMessage = () => {};

    let connectToSocketServer = () => {
      socketRef.current -
        iconButtonClasses.connect(server_url, { secure: false });
      socketRef.current.on("signal", gotMessageFromServer);
      socketRef.current.on("connect", () => {
        socketRef.current.emit("join-call", window.location.href);

        socketIdRef.current = socketRef.current.id;

        socketRef.current.on("chat-message", addMessage);

        socketRef.current.on("user-left", (id) => {
          setVideo((videos) => videos.filter((video) => video.socketId !== id));
        });

        socketRef.current.on("user-joined", (id, client) => {
          client.forEach((socketListId) => {
            connections[socketListId] = new RTCPeerConnection(
              peerConfigConnections
            );
            connections[socketListId].onicecandidate = (event) => {
              if (event.candidate) {
                socketRef.current.emit(
                  "signal",
                  socketListId,
                  JSON.stringify({ ice: event.candidate })
                );
              }
            };

            connections[socketListId].onaddstream = (event) => {
              let videoExists = videoRef.current.find(
                (video) => video.socketId === socketListId
              );
              if (videoExists) {
                setVideo((video) => {
                  const updatedVideos = videos.map((video) =>
                    video.socketId === socketListId
                      ? { ...video, stream, event: stream }
                      : video
                  );
                  videoRef.current = updatedVideos;
                  return updatedVideos;
                });
              } else {
                let newVideo = {
                  socketId: socketListId,
                  stream: event.stream,
                  autoplay: true,
                  playsinline: true,
                };

                setVideos((videos) => {
                  const updatedVideos = [...videos, newVideo];
                  videoRef.current = updatedVideos;
                  return updatedVideos;
                });
              }
            };

            if (
              window.localStream !== undefined &&
              window.localStream !== null
            ) {
              connections[socketListId].addStream(window.localStream);
            } else {
              let blackSilence;
            }
          });
        });

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;
            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {
              console.log(e);
            }

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id2,
                    JSON.stringify({
                      sdp: connections[id2].setLocalDescription,
                    })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    };

    let getMedia = () => {
      setVideo(videoAvailable);
      setAudio(audioAvailable);

      connectToSocketServer();
    };

    return (
      <div>
        {/* VideoMeeting {window.location.href} */}
        {askForUserName ? (
          <div>
            <h2>Enter into Lobby</h2>
            <TextField
              id="outlined-basic"
              label="Username"
              value={username}
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button variant="contained" onClick={connect}>
              Connect
            </Button>

            <video
              ref={localVideoRef}
              autoPlay
              muted
              // style={{
              //         width: "300px",
              //         height: "200px",
              //         backgroundColor: "black",
              //         marginTop: "10px",
              //     }}
            ></video>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };
};

export default VideoMeeting;
