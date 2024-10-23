"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Send as SendIcon,
  Chat as ChatIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

// Styled components
const ChatContainer = styled(Paper)(({ theme, isOpen }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: isOpen ? '100%' : '48px', // Adjust width based on isOpen
  maxWidth: isOpen ? '320px' : '48px',
  overflow: 'hidden',
  zIndex: 1000,
  transition: 'width 0.3s', // Smooth transition for width change
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '48px',
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  height: '300px',
  overflowY: 'auto',
  padding: theme.spacing(1),
  background: theme.palette.background.paper,
}));

const MessageBubble = styled(Box)(({ theme, isUser }) => ({
  maxWidth: '85%',
  padding: theme.spacing(0.75, 1.5),
  borderRadius: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  wordBreak: 'break-word',
  background: isUser ? theme.palette.primary.main : theme.palette.grey[100],
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  fontSize: '0.9rem',
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  display: 'flex',
  gap: theme.spacing(0.5),
}));

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hi! 👋 I'm 7med , your assistant. How can I help?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = "I'm processing your request. I'll help you shortly.";
      setMessages(prev => [...prev, { type: 'ai', content: botResponse }]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <ChatContainer elevation={3} isOpen={isOpen}>
      <ChatHeader onClick={() => setIsOpen(!isOpen)}>
        <Box display="flex" alignItems="center">
          <ChatIcon fontSize="small" />
          {isOpen && (
            <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', marginLeft: 1 }}>
              Got a question? <span style={{ opacity: 0.8 }}>Ask Harry</span>
            </Typography>
          )}
        </Box>
        {/* Render the expand/collapse button only when the chat is open */}
        {isOpen && (
          <IconButton size="small" sx={{ color: 'inherit', padding: 0.5 }}>
            <ExpandLessIcon fontSize="small" />
          </IconButton>
        )}
      </ChatHeader>

      <Collapse in={isOpen}>
        <MessageContainer>
          <List sx={{ p: 0 }}>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  padding: 0.5,
                }}
              >
                <MessageBubble isUser={message.type === 'user'}>
                  <Typography variant="body2">{message.content}</Typography>
                </MessageBubble>
              </ListItem>
            ))}
          </List>
          <div ref={messagesEndRef} />
        </MessageContainer>

        <InputContainer component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <IconButton 
            color="primary" 
            type="submit"
            disabled={!inputValue.trim()}
            size="small"
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </InputContainer>
      </Collapse>
    </ChatContainer>
  );
};

export default Chatbot;
