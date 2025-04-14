// src/HomePage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    CssBaseline,
    Grid,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
    Link,
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

// =============================
// Define a custom dark purple futuristic theme
const futuristicTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1B0033', // Deep dark purple
        },
        secondary: {
            main: '#9D4EDD', // Vibrant purple accent
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#E0E0E0',
            secondary: '#B0B0B0',
        },
    },
    typography: {
        fontFamily: "'Segoe UI', sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
    },
});

// Keyframes for a subtle pulse animation
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// =============================
// Custom Animated Card for resources and sections
const AnimatedCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    animation: `${pulse} 3s infinite ease-in-out`,
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        left: '-5px',
        margin: 'auto',
        width: '200px',
        height: '264px',
        borderRadius: '10px',
        background: 'linear-gradient(-45deg, #8A2BE2 0%, #9D4EDD 100%)',
        zIndex: -10,
        pointerEvents: 'none',
        transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(-45deg, #6A0DAD 0%, #9D4EDD 100%)',
        transform: 'translate3d(0, 0, 0) scale(0.95)',
        filter: 'blur(20px)',
        zIndex: -1,
    },
    '&:hover::after': {
        filter: 'blur(30px)',
    },
    '&:hover::before': {
        transform: 'rotate(-90deg) scaleX(1.34) scaleY(0.77)',
    },
}));

// =============================
// Main HomePage component
export default function HomePage() {
    return (
        <ThemeProvider theme={futuristicTheme}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar position="static" sx={{ mb: 4, backgroundColor: futuristicTheme.palette.primary.main, boxShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Finite Automata Web Application
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ pb: 4 }}>
                {/* Intro Section */}
                <Box sx={{ textAlign: 'center', mb: 6, color: futuristicTheme.palette.text.primary }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Finite Automata Web Application
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        An Interactive Journey into Finite Automata and Regular Languages
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 'auto', maxWidth: 800, mb: 2 }}>
                        Hi there, welcome to my web application used to simplify the study of finite automata and regular languages.
                        This application offers interactive lessons and examples inspired by Michael Sipser's textbook,
                        "Introduction to the Theory of Computation." For additional learning materials, please visit the Resources
                        section below, where you will see relevant links and support.
                        If you have any questions or need assistance, don't hesitate to reach out to me.
                        Enjoy your learning journey!
                    </Typography>
                    <Typography variant="subtitle1" color="secondary">
                        - David Anthony, 29th April 2025
                    </Typography>
                </Box>

                {/* Chapter Links Section */}
                <Box sx={{ my: 4 }}>
                    <Grid container spacing={3} justifyContent="center">
                        {[
                            { to: '/chapter/1.1', label: '💻🔤🔢 Chapter 1.1 – Deterministic Finite Automata' },
                            { to: '/chapter/1.2', label: '💻🔤🔢 Chapter 1.2 – Nondeterministic Finite Automata' },
                            { to: '/chapter/1.3', label: '🤖 Chapter 1.3 – Regular Expressions' },
                            { to: '/chapter/1.4', label: '🤖💡 Chapter 1.4 – Pumping Lemma' }
                        ].map((chapter, index) => (
                            <Grid key={index} item xs={12} sm={6} md={3}>
                                <Button
                                    component={RouterLink}
                                    to={chapter.to}
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        height: 100,
                                        fontSize: '1.1rem',
                                        textTransform: 'none',
                                        boxShadow: 6,
                                        backgroundColor: '#4B0082',
                                        transition: 'transform 0.3s ease-in-out, background-color 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            backgroundColor: '#6A0DAD',
                                        },
                                    }}
                                >
                                    {chapter.label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Navigation Buttons Section */}
                <Box sx={{ textAlign: 'center', my: 4 }}>
                    <Grid container spacing={2} justifyContent="center">
                        {[
                            { to: '/dfa-tester', label: '‍🧑🏻‍💻 DFA Tester (All Chapters)' },
                            { to: '/leaderboard', label: '🏆🏅🥈 View Leaderboard' },
                            { to: '/chat', label: '💬💭 Live Student Chat' },
                            { to: '/custom-dfa', label: '✍🏼 Exercises' },
                            { to: '/quiz', label: '🧠 Go to Quizzes' }, // Added "Go to Quizzes" link
                        ].map((link, index) => (
                            <Grid item xs={12} sm={6} md={2} key={index}>
                                <Button
                                    component={RouterLink}
                                    to={link.to}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        height: 80,
                                        fontSize: '0.9rem',
                                        borderColor: '#9D4EDD',
                                        color: '#9D4EDD',
                                        transition: 'background-color 0.3s, color 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#9D4EDD',
                                            color: '#fff',
                                        },
                                    }}
                                >
                                    {link.label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                        <Button
                            component={RouterLink}
                            to="/login"
                            variant="contained"
                            color="secondary"
                            sx={{ mr: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>

                {/* Resources Section */}
                <Box sx={{ my: 6 }}>
                    <AnimatedCard elevation={8}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom sx={{ color: '#E0E0E0' }}>
                                2. Resources
                            </Typography>
                            <Typography variant="h5" gutterBottom sx={{ color: '#E0E0E0' }}>
                                2.1 Youtube/Video Lectures
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="https://www.youtube.com/watch?v=58N2N7zJGrQ&list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev" target="_blank" rel="noreferrer" underline="hover" color="inherit">
                                                Neso Academy: Theory of Computation and Automata Playlist
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="https://www.youtube.com/watch?v=14RLvkzbHFc" target="_blank" rel="noreferrer" underline="hover" color="inherit">
                                                Nerd's Lesson Youtube Channel: Theory of Computation and Automata (FULL COURSE)
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="https://www.youtube.com/watch?v=PK3wL7DXuuw" target="_blank" rel="noreferrer" underline="hover" color="inherit">
                                                Lydia's Youtube Channel: Regular Languages – DFA
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="https://www.youtube.com/watch?v=bK8LVFWA0L8" target="_blank" rel="noreferrer" underline="hover" color="inherit">
                                                Easy Theory's Youtube Channel: Regular Languages in 4 Hours
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="https://www.youtube.com/watch?v=9syvZr-9xwk&list=PLUl4u3cNGP60_JNv2MmK3wkOt9syvfQWY" target="_blank" rel="noreferrer" underline="hover" color="inherit">
                                                MIT OpenCourseWare: Automata Intermediate Playlist
                                            </Link>
                                        }
                                    />
                                </ListItem>
                            </List>

                            <Typography variant="h5" gutterBottom sx={{ mt: 4, color: '#E0E0E0' }}>
                                2.2 Books by Author
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="https://www.amazon.com/Introduction-Theory-Computation-Michael-Sipser/dp/113318779X" target="_blank" rel="noreferrer" underline="hover" color="inherit">
                                                Michael Sipser: Introduction to the Theory of Computation
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="https://www.amazon.com/Introduction-Automata-Theory-Languages-Computation/dp/0321455363" target="_blank" rel="noreferrer" underline="hover" color="inherit">
                                                Hopcroft, Motwani, and Ullman: Introduction to Automata Theory, Languages, and Computation
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="https://blackwells.co.uk/bookshop/product/An-Introduction-to-Formal-Languages-and-Automata-by-Peter-Linz/9780763737986" target="_blank" rel="noreferrer" underline="hover" color="inherit">
                                                Peter Linz: An Introduction to Formal Languages and Automata
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="https://www.barnesandnoble.com/w/200-problems-on-languages-automata-and-computation-filip-murlak/1142385574" target="_blank" rel="noreferrer" underline="hover" color="inherit">
                                                Filip Murlak et al.: 200 Problems on Languages, Automata, and Computation
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="https://www.amazon.co.uk/Automata-Computability-Dexter-C-Kozen/dp/0387949070" target="_blank" rel="noreferrer" underline="hover" color="inherit">
                                                Dexter C. Kozen: Automata and Computability
                                            </Link>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </AnimatedCard>
                </Box>

                {/* Contact & About Section */}
                <Box sx={{ my: 6 }}>
                    <AnimatedCard elevation={8} sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom sx={{ color: '#E0E0E0' }}>
                                Contact Me
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Tel: +44 7776 024480
                            </Typography>
                            <Typography variant="h4" gutterBottom sx={{ color: '#E0E0E0' }}>
                                About Me
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Hi there, I am an upcoming Developer and I hope to make an impact in this lifetime.
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                I only seek knowledge, which I hope that with my finite time, it would be a worthwhile experience.
                            </Typography>
                            <Typography variant="body1">
                                Please reach out to me if you have any questions.<br />
                                Email: giddydanny002@gmail.com<br />
                                Address: 66 Alexandra Road, Seren student accommodation,<br />
                                Marina street, Swansea, United Kingdom
                            </Typography>
                        </CardContent>
                    </AnimatedCard>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
