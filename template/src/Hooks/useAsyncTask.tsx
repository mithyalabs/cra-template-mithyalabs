import { useState } from 'react';
import { get } from 'lodash';

type TStatus = 'IDEAL' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
function useAsyncTask<T>(task: (arg: T) => Promise<any>) {
    const [status, setStatus] = useState<TStatus>('IDEAL');
    const [message, setMessage] = useState('');
    const run = async (arg: T) => {
        setStatus('PROCESSING');
        let resp;
        try {
            resp = await task(arg);
            setStatus('SUCCESS');
            setMessage(resp.message);
        } catch (error) {
            const message =
                get(error, 'response.data.error.message') || error.message;
            setMessage(message);
            setStatus('ERROR');
        }
        return resp;
    };
    const reset = () => {
        setMessage('');
        setStatus('IDEAL');
    };

    return {
        run,
        status,
        message,
        reset,
    };
}

export default useAsyncTask;
