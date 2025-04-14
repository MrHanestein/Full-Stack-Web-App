// src/LiveChat.jsx
import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    IconButton,
    Paper,
    TextField,
    Toolbar,
    Typography,
    Collapse,
    Switch,
    FormControlLabel
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import ChatIcon from '@mui/icons-material/Chat';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import HomeIcon from '@mui/icons-material/Home';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

// =============================
// Custom Dark Purple Futuristic Theme for LiveChat
const chatTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#1B0033" },
        secondary: { main: "#9D4EDD" },
        background: { default: "#121212", paper: "#1e1e1e" },
        text: { primary: "#E0E0E0", secondary: "#B0B0B0" },
    },
    typography: {
        fontFamily: "'Segoe UI', sans-serif",
    },
});

// Keyframes for message fade in
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled component for a chat message
const MessagePaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    animation: `${fadeIn} 0.5s ease-out`,
    backgroundColor: theme.palette.background.paper,
}));

// Styled container for chat messages
const ChatContainer = styled(Box)(({ theme }) => ({
    height: 300,
    overflowY: "auto",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: "#1e1e1e",
    borderRadius: theme.shape.borderRadius,
}));

// =============================
// LiveChat Component
export default function LiveChat() {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("");
    const [typing, setTyping] = React.useState(false);
    const [soundEnabled, setSoundEnabled] = React.useState(true);
    const [showSettings, setShowSettings] = React.useState(false);
    const [showScroll, setShowScroll] = React.useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const messagesEndRef = React.useRef(null);
    const chatContainerRef = React.useRef(null);

    // Sound notification audio element.
    const newMsgSound = React.useRef(null);
    React.useEffect(() => {
        newMsgSound.current = new Audio("https://www.myinstants.com/media/sounds/notification-sound-7062.mp3");
    }, []);

    // Real-time Firestore listener for chat messages.
    React.useEffect(() => {
        import("firebase/firestore").then(({ getFirestore, collection, onSnapshot, query, orderBy }) => {
            const db = getFirestore();
            const chatRef = collection(db, "chat");
            const q = query(chatRef, orderBy("timestamp", "asc"));
            onSnapshot(q, (snapshot) => {
                const msgs = snapshot.docs.map(doc => doc.data());
                setMessages(msgs);
                // Play sound if enabled and new message appears (and if not initial load)
                if (soundEnabled && msgs.length > 0) {
                    newMsgSound.current.play().catch(err => console.log("Sound play error", err));
                }
            });
        });
    }, [soundEnabled]);

    // Auto-scroll to bottom when messages change.
    React.useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Scroll event listener for the chat container to show/hide scroll-to-bottom button.
    React.useEffect(() => {
        const container = chatContainerRef.current;
        const onScroll = () => {
            if (container) {
                setShowScroll(container.scrollTop + container.clientHeight < container.scrollHeight);
            }
        };
        container.addEventListener("scroll", onScroll);
        return () => container.removeEventListener("scroll", onScroll);
    }, []);

    // Send message function.
    const sendMessage = async () => {
        if (!input.trim()) return;
        const { getFirestore, collection, addDoc, serverTimestamp } = await import("firebase/firestore");
        const db = getFirestore();
        await addDoc(collection(db, "chat"), {
            user: currentUser?.displayName || "Anonymous",
            message: input,
            timestamp: serverTimestamp()
        });
        setInput("");
        setTyping(false);
    };

    // Append emoji to message input.
    const addEmoji = () => {
        setInput(input + " 😊");
    };

    // Toggle sound setting.
    const handleSoundToggle = (event) => {
        setSoundEnabled(event.target.checked);
    };

    // Toggle settings panel.
    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    // Scroll to bottom function.
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <ThemeProvider theme={chatTheme}>
            <CssBaseline />
            <AppBar position="static" sx={{ backgroundColor: chatTheme.palette.primary.main, mb: 2 }}>
                <Toolbar>
                    <IconButton color="inherit" onClick={() => navigate("/")}>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        💬 Live Student Chat
                    </Typography>
                    <Button color="inherit" onClick={toggleSettings}>
                        Settings
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
                <Paper elevation={6} sx={{ p: 3, mb: 4, backgroundColor: chatTheme.palette.background.paper }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        💬 Live Student Chat
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                        Chat with peers, ask questions, or share tips!
                    </Typography>
                    {/* Settings Panel */}
                    <Collapse in={showSettings}>
                        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Chat Settings
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Switch checked={soundEnabled} onChange={handleSoundToggle} color="secondary" />
                                }
                                label="Sound Notifications"
                            />
                        </Paper>
                    </Collapse>
                    {/* Chat Message Container */}
                    <Box ref={chatContainerRef} sx={{ height: 300, overflowY: "auto", mb: 2, p: 1, backgroundColor: "#1e1e1e", borderRadius: 1 }}>
                        {messages.map((msg, i) => (
                            <MessagePaper key={i} elevation={2}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="subtitle2" color="secondary">
                                        {msg.user}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {msg.timestamp ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString() : "Just now"}
                                    </Typography>
                                </Box>
                                <Typography variant="body1">{msg.message}</Typography>
                                <Box mt={1} display="flex" alignItems="center">
                                    <IconButton size="small" onClick={() => console.log(`Liked message ${i}`)}>
                                        <ThumbUpIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </MessagePaper>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>
                    {/* Scroll to Bottom Button */}
                    {showScroll && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={scrollToBottom}
                            sx={{ position: "absolute", bottom: 20, right: 20 }}
                        >
                            <ArrowUpwardIcon />
                        </Button>
                    )}
                    {/* Message Input and Controls */}
                    <Box display="flex" gap={1}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={input}
                            onChange={e => { setInput(e.target.value); setTyping(true); }}
                            placeholder="Type your message..."
                            onKeyPress={e => { if (e.key === "Enter") { sendMessage(); } }}
                        />
                        <IconButton color="secondary" onClick={addEmoji}>
                            <EmojiEmotionsIcon />
                        </IconButton>
                        <Button variant="contained" color="primary" onClick={sendMessage}>
                            Send
                        </Button>
                    </Box>
                    {/* Typing indicator */}
                    {typing && (
                        <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                            {currentUser?.displayName || "Anonymous"} is typing...
                        </Typography>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
