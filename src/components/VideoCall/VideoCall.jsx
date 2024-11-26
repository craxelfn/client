import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Button, IconButton, Avatar, Dialog, DialogActions } from "@mui/material";
import { Mic, Videocam, Chat as ChatIcon, CallEnd, Close, Send } from "@mui/icons-material";


const VideoCall = ({ appointmentId }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isRightSideVisible, setIsRightSideVisible] = useState(false);
  const [isExpandButtonVisible, setIsExpandButtonVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const servers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  };

  const createPeerConnection = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
    }

    const pc = new RTCPeerConnection(servers);
    peerConnection.current = pc;

    // Add local tracks to the peer connection
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    // Handle remote stream
    pc.ontrack = (event) => {
      const newRemoteStream = new MediaStream();
      event.streams[0].getTracks().forEach((track) => {
        newRemoteStream.addTrack(track);
      });
      setRemoteStream(newRemoteStream);
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate && socket.current?.connected) {
        socket.current.emit("ice-candidate", {
          candidate: event.candidate,
          roomId: appointmentId,
        });
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log("ICE Connection State:", pc.iceConnectionState);
      if (pc.iceConnectionState === "disconnected" || 
          pc.iceConnectionState === "failed") {
        handleDisconnection();
      }
    };

    return pc;
  };

  const handleDisconnection = () => {
    console.log("Handling disconnection...");
    setIsConnected(false);
    if (socket.current?.connected) {
      socket.current.emit("join-room", { roomId: appointmentId });
    }
  };

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        // audio: true,
      });
      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      return stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      return null;
    }
  };

  // Initialize media devices
  useEffect(() => {
    initializeMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Set up socket connection and WebRTC handlers
  useEffect(() => {
    if (!localStream) return;

    socket.current = io("http://localhost:5000", {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    const initializeConnection = () => {
      createPeerConnection();
      socket.current.emit("join-room", { roomId: appointmentId });
    };

    socket.current.on("connect", () => {
      console.log("Socket connected");
      initializeConnection();
    });

    socket.current.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socket.current.on("reconnect", () => {
      console.log("Socket reconnected");
      initializeConnection();
    });

    socket.current.on("room-participants", async (participants) => {
      console.log(`Room participants: ${participants.length}`);
      const isFirst = participants.length === 1;
      setIsInitiator(isFirst);
      
      if (!isFirst && peerConnection.current) {
        try {
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
          socket.current.emit("offer", {
            sdp: offer,
            roomId: appointmentId,
          });
        } catch (error) {
          console.error("Error creating offer:", error);
        }
      }
    });

    socket.current.on("offer", async ({ sdp }) => {
      if (!peerConnection.current) return;
      try {
        if (peerConnection.current.signalingState !== "stable") {
          console.log("Ignoring offer in non-stable state");
          return;
        }
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.current.emit("answer", {
          sdp: answer,
          roomId: appointmentId,
        });
        setIsConnected(true);
      } catch (error) {
        console.error("Error handling offer:", error);
      }
    });

    socket.current.on("answer", async ({ sdp }) => {
      if (!peerConnection.current) return;
      try {
        if (peerConnection.current.signalingState === "stable") {
          console.log("Ignoring answer in stable state");
          return;
        }
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdp));
        setIsConnected(true);
      } catch (error) {
        console.error("Error handling answer:", error);
      }
    });

    socket.current.on("ice-candidate", async ({ candidate }) => {
      if (!peerConnection.current || !peerConnection.current.remoteDescription) return;
      try {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, [localStream, appointmentId]);

  // Update remote video when stream changes
  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);


  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { sender: "You", text: message }]);
      setMessage("");
    }
  };

  const handleExpandChat = () => {
    setIsRightSideVisible(!isRightSideVisible);
  };

  const handleCloseRight = () => {
    setIsRightSideVisible(false);
  };

  const renderDialogContent = () => (
    <div>
      <p>Thank you for using the video call service!</p>
      <textarea placeholder="Leave your feedback..." className="w-full h-24 border p-2 rounded" />
    </div>
  );
  const handleEndCall = () => {
    // Handle call end logic
    setOpenDialog(true); // Open feedback dialog
  };
  return (
    <div className="relative flex w-full h-full min-h-screen font-sans transition duration-200 overflow-hidden">
      {/* Chat Toggle Button */}
      <ChatIcon
        className={`absolute z-10 cursor-pointer w-[45px] h-[45px] rounded z-50 md:right-2 right-0 top-2 ${isExpandButtonVisible ? "block" : "hidden"} hover:bg-gray-200 rounded-full p-2`}
        onClick={handleExpandChat}
      />

      <div className={`flex flex-col flex-1 p-8 ${isRightSideVisible ? "md:block hidden" : "block w-full"}`}>
        {/* Video Layout */}
        <div className="flex flex-wrap w-full overflow-hidden rounded-lg">
          {/* Local Video */}
          <div className="relative w-full md:w-1/2 h-[35vh] md:h-[75vh]">
            <div className="absolute top-0 left-0 flex space-x-1">
              <IconButton className="hover:bg-gray-500 rounded-full">
                <Mic />
              </IconButton>
              <IconButton className="hover:bg-gray-500 rounded-full">
                <Videocam />
              </IconButton>
            </div>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <a href="#" className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white rounded px-2 py-1 text-xs">
              You
            </a>
          </div>

          {/* Remote Video */}
          <div className="relative w-full md:w-1/2 h-[35vh] md:h-[75vh]">
            <div className="absolute top-0 left-0 flex space-x-1">
              <IconButton className="hover:bg-gray-500 rounded-full">
                <Mic />
              </IconButton>
              <IconButton className="hover:bg-gray-500 rounded-full">
                <Videocam />
              </IconButton>
            </div>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <a href="#" className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white rounded px-2 py-1 text-xs">
              Remote User
            </a>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-5 items-center py-8">
          <IconButton className="bg-gray-200 rounded-full p-2">
            <Mic />
          </IconButton>
          <IconButton className="bg-gray-200 rounded-full p-2">
            <Videocam />
          </IconButton>
          <IconButton className="bg-gray-200 rounded-full p-2">
            <ChatIcon />
          </IconButton>
          <Button
            className="flex items-center justify-center bg-red-600 text-white rounded-full p-2"
            variant="contained"
            onClick={handleEndCall}
          >
            <CallEnd />
          </Button>
        </div>
      </div>

      {/* Chat Section */}
      <div
        className={`fixed md:relative top-0 right-0 bg-white shadow-lg 
        transition-transform duration-300 ease-in-out
        ${isRightSideVisible ? "translate-x-0" : "translate-x-full"}
        w-full md:w-96 h-full z-40
      `}
      >
        <div className="flex flex-col h-full min-h-[80vh] p-4">
          <div className="flex items-center justify-between mt-[80px] md:mt-0 border-b pb-2">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded">Chat</Button>
            <IconButton onClick={handleCloseRight}>
              <Close />
            </IconButton>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-2">
            {chatMessages.map((msg, index) => (
              <div key={index} className="flex items-start my-2">
                <Avatar
                  src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
                  className="rounded-full"
                />
                <div className="ml-2">
                  <p className="text-xs font-bold text-gray-800">{msg.sender}</p>
                  <p className="text-sm text-gray-700">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 border rounded-md"
            />
            <IconButton onClick={handleSendMessage} color="primary">
              <Send />
            </IconButton>
          </div>
        </div>
      </div>

      {/* End Call Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className="p-4">
          <h3 className="text-xl font-semibold">End Call</h3>
          <p>Thank you for using the video call service!</p>
          <textarea placeholder="Leave your feedback..." className="w-full h-24 border p-2 rounded" />
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default VideoCall;