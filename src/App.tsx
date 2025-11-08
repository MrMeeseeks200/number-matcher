import { Box, Typography, Button, Container } from '@mui/material';
import { ApiResponse, Result } from './types';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [sessionId, setSessionId] = useState<string>('');

    useEffect(() => {
        const token = uuidv4();
        setSessionId(token);
    }, []);

    const [result, setResult] = useState<Result | null>(null);
    const [history, setHistory] = useState<Result[]>([]);

    const fetchNumbers = async () => {

        try {
            const response = await fetch(
                `https://kso9vgq60c.execute-api.us-east-1.amazonaws.com/dev/fetch-numbers?session-id=${sessionId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data: ApiResponse = await response.json();

            setResult(data.result);
            setHistory(data.history);
        } catch (error) {
            console.error('Error fetching numbers:', error);
        }
    };

    console.log('Current Result:', result);
    console.log('History:', history);
    console.log('Session ID:', sessionId);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#282c34',
                color: 'white',
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
                {/* Display the two number in the result side by side */}
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
                {/* Display history of results in the format 1 & 2  -  2 & 3 etc*/}

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