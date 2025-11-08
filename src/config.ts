import { memoize } from "lodash";

const getConfigForStage = (stage: string) => {
    const numbersApiUrl: Record<string, string> = {
        dev: 'https://kso9vgq60c.execute-api.us-east-1.amazonaws.com/dev/fetch-numbers',
    };

    return {
        numbersApiUrl: numbersApiUrl[stage],
    };
}

export const config = memoize(getConfigForStage)(process.env.REACT_APP_STAGE || 'dev');