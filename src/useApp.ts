import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ApiResponse, Result } from "./types";
import { config } from "./config";

const useApp = () => {
    const [sessionId, setSessionId] = useState<string>('');

    useEffect(() => {
        const token = uuidv4();
        setSessionId(token);
    }, []);

    const [result, setResult] = useState<Result | null>(null);
    const [history, setHistory] = useState<Result[]>([]);
    const [spinning, setSpinning] = useState(false);

    const fetchNumbers = async () => {
        const url = config.numbersApiUrl;
        if (!url) {
            console.error('API URL is not defined');
            return;
        }
        try {
            const response = await fetch(
                `${url}?session-id=${sessionId}`,
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

            setSpinning(data.result[0] === data.result[1]);

        } catch (error) {
            console.error('Error fetching numbers:', error);
        }
    };

    // disable spinning after 5 second
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (spinning) {
            timer = setTimeout(() => setSpinning(false), 1000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, [spinning]);

    return {
        result,
        history,
        fetchNumbers,
        spinning
    };
};
export default useApp;