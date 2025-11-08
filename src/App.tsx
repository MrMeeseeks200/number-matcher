import { Box, Typography, Button, Container } from '@mui/material';
import useApp from './useApp';
import { useState } from 'react';

function App() {
    const { result, history, fetchNumbers, spinning } = useApp();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#282c34',
                color: 'white',
                animation: spinning ? 'spin 1s ease-in-out infinite' : 'none',
                '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            }}
        >
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h2" component="h1" fontWeight="bold">
                        Number Matcher
                    </Typography>

                    <Typography variant="h6" color="#61dafb">
                        Click the button to generate two random numbers and see if they match!
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                        }}
                    >

                        <Button
                            variant="text"
                            onClick={fetchNumbers}
                            sx={{
                                width: 200,
                                height: 60,
                                bgcolor: '#61dafb',
                                color: '#282c34',
                                '&:hover': {
                                    bgcolor: '#4fa8c5',
                                    transform: 'scale(1.1)',
                                },
                                transition: 'transform 0.2s',
                            }}
                        >
                            <Typography variant="button" fontWeight="bold">Generate Numbers</Typography>
                        </Button>
                    </Box>
                </Box>
                {result && (
                    <Box sx={{ textAlign: 'center' }}>
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 4,
                            }}
                        >
                            <Typography variant="h4">
                                {result[0]}
                            </Typography>
                            <Typography variant="h4">
                                {result[1]}
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>
                            {result[0] === result[1] ? 'Numbers Match!' : 'Numbers Do Not Match... :-('}
                        </Typography>
                    </Box>
                )}
                <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                    {history.length > 0 && (
                        <Typography variant="h6" sx={{ marginTop: 2 }}>
                            Previous Results:
                        </Typography>
                    )}
                    <Typography variant="body1">
                        {history.map((res, index) => (
                            <>
                                {res[0]} & {res[1]} {index < history.length - 1 ? ' | ' : ''}
                            </>
                        ))}

                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default App;