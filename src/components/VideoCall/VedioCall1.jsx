"use client";
import React, { useState } from "react";
import {
  Mic,
  Videocam,
  Chat as ChatIcon,
  CallEnd,
  Close,
  Send,
} from "@mui/icons-material";
import { 
  Button, 
  IconButton, 
  Avatar, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Rating,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Divider,
  Paper
} from "@mui/material";

const VideoCall = () => {
  const isDoctor = true 
  const [isRightSideVisible, setRightSideVisible] = useState(true);
  const [isExpandButtonVisible, setExpandButtonVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  
  // State for the feedback dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [followUpRequired, setFollowUpRequired] = useState("no");
  const [followUpDays, setFollowUpDays] = useState("");
  const [patientName, setPatientName] = useState("John Smith");

  const handleCloseRight = () => {
    setRightSideVisible(false);
    setExpandButtonVisible(true);
  };

  const handleExpandChat = () => {
    setRightSideVisible(true);
    setExpandButtonVisible(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: "You" },
      ]);
      setMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  // Function to open the feedback dialog
  const handleEndCall = () => {
    setOpenDialog(true);
  };

  // Function to submit the feedback
  const handleSubmitFeedback = () => {
    if (isDoctor) {
      console.log({
        diagnosis,
        prescription,
        followUpRequired,
        followUpDays: followUpRequired === "yes" ? followUpDays : null
      });
    } else {
      console.log({
        rating,
        feedback
      });
    }
    
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setRating(0);
    setFeedback("");
    setDiagnosis("");
    setPrescription("");
    setFollowUpRequired("no");
    setFollowUpDays("");
  };

  const renderDialogContent = () => {
    if (isDoctor) {
      return (
        <>
          <DialogTitle>Consultation Summary</DialogTitle>
          <DialogContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Form Section */}
                <div className="space-y-4">
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Patient Name"
                    fullWidth
                    variant="outlined"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                  
                  <TextField
                    margin="dense"
                    label="Diagnosis"
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  />
                  
                  <TextField
                    margin="dense"
                    label="Prescription & Recommendations"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                  />
                  
                  <FormControl component="fieldset">
                    <Typography variant="subtitle2" className="mb-2">
                      Follow-up Required?
                    </Typography>
                    <RadioGroup
                      value={followUpRequired}
                      onChange={(e) => setFollowUpRequired(e.target.value)}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                  
                  {followUpRequired === "yes" && (
                    <TextField
                      margin="dense"
                      label="Follow-up in (days)"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={followUpDays}
                      onChange={(e) => setFollowUpDays(e.target.value)}
                    />
                  )}
                </div>

                {/* Preview Section */}
                <Paper className="p-6 bg-white shadow-md">
                  <div className="border-b-2 border-gray-800 pb-4 mb-4">
                    <div className="text-lg font-bold">Dr. John Doe</div>
                    <div className="text-gray-600">Phone: +1234567890</div>
                  </div>
                  
                  <div className="flex justify-between border-b border-gray-300 pb-2 mb-4">
                    <div>Patient: <span className="font-medium">{patientName}</span></div>
                    <div>{new Date().toLocaleDateString()}</div>
                  </div>
                  
                  <div className="min-h-[200px] mb-4 whitespace-pre-wrap">
                    {diagnosis && (
                      <div className="mb-4">
                        <strong>Diagnosis:</strong>
                        <div className="pl-4">{diagnosis}</div>
                      </div>
                    )}
                    
                    {prescription && (
                      <div className="mb-4">
                        <strong>Prescription:</strong>
                        <div className="pl-4">{prescription}</div>
                      </div>
                    )}
                    
                    {followUpRequired === "yes" && followUpDays && (
                      <div className="mb-4">
                        <strong>Follow-up:</strong>
                        <div className="pl-4">Schedule follow-up in {followUpDays} days</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-300">
                    <div className="font-medium">Doctor's Stamp</div>
                    <div className="font-medium">Signature</div>
                  </div>
                </Paper>
              </div>
            </div>
          </DialogContent>
        </>
      );
    }

    return (
      <>
        <DialogTitle>Rate this Consultation</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <Typography component="legend">How was your experience?</Typography>
              <Rating
                name="consultation-rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                size="large"
              />
            </div>
            
            <Divider />
            
            <TextField
              margin="dense"
              label="Additional Feedback"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts about the consultation..."
            />
          </div>
        </DialogContent>
      </>
    );
  };


  return (
    <div className="relative flex w-full h-full min-h-screen font-sans transition duration-200 overflow-hidden">
      <ChatIcon
        className={`absolute z-10 cursor-pointer w-[45px] h-[45px] rounded z-50 md:right-2 right-0 top-2 ${isExpandButtonVisible ? "block" : "hidden"} hover:bg-gray-200 rounded-full p-2`}
        onClick={handleExpandChat}
      />

      <div className={`flex flex-col flex-1 p-8 ${isRightSideVisible ? "md:block hidden" : "block w-full"}`}>
        <div className="flex flex-wrap w-full overflow-hidden rounded-lg">
          {/* Video participants */}
          <div className="relative w-full md:w-1/2 h-[35vh] md:h-[75vh]">
            <div className="absolute top-0 left-0 flex space-x-1">
              <IconButton className="hover:bg-gray-500 rounded-full">
                <Mic />
              </IconButton>
              <IconButton className="hover:bg-gray-500 rounded-full">
                <Videocam />
              </IconButton>
            </div>
            <img
              src="https://images.unsplash.com/photo-1566821582776-92b13ab46bb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
              alt="participant"
              className="w-full h-full object-cover"
            />
            <a href="#" className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white rounded px-2 py-1 text-xs">
              Andy Will
            </a>
          </div>

          <div className="relative w-full md:w-1/2 h-[35vh] md:h-[75vh]">
            <div className="absolute top-0 left-0 flex space-x-1">
              <IconButton className="hover:bg-gray-500 rounded-full">
                <Mic />
              </IconButton>
              <IconButton className="hover:bg-gray-500 rounded-full">
                <Videocam />
              </IconButton>
            </div>
            <img
              src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
              alt="participant"
              className="w-full h-full object-cover"
            />
            <a href="#" className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white rounded px-2 py-1 text-xs">
              Emmy Lou
            </a>
          </div>
        </div>

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
            onClick={handleEndCall} // Open the feedback dialog
          >
            <CallEnd />
          </Button>
        </div>
      </div>

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

          <div className="flex-1 overflow-y-auto p-2">
            {chatMessages.map((msg, index) => (
              <div key={index} className="flex items-start my-2">
                <Avatar
                  src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
                  className="rounded-full"
                />
                <div className="ml-2">
                  <p className="text-xs font-bold text-gray-800">{msg.sender}</p>
                  <div className="bg-gray-200 text-gray-800 p-2 rounded-lg mt-1 max-w-xs">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="flex items-center mb-11 p-2 border-t">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg p-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <IconButton className="bg-blue-500 text-white rounded-full p-2 ml-2" onClick={handleSendMessage}>
              <Send />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Feedback Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        {renderDialogContent()}
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitFeedback}
            variant="contained" 
            color="primary"
          >
            {isDoctor ? "Submit Summary" : "Submit Feedback"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VideoCall;
