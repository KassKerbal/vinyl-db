import React, { useEffect, useState } from 'react';
import { DataForm } from '../utils/types';

interface UseApiHookProps {
    endPoint: string;
    method: string;
    body?: BodyInit;
}

function UseApiListHook({ endPoint, method, body }: UseApiHookProps) {

    const [apiData, setApiData] = useState<DataForm[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);

    const request = {
        method,
        headers: {'Content-Type': 'application/json'},
        body
    }

    useEffect((
        () => {
            (async () => {
                setLoading(true)
                try {
                    const response = await fetch(endPoint, request);
                    const data = await response.json();
                    setApiData(data)
                    setLoading(false);
                }
                catch (err) {
                    setError(err);
                    setLoading(false);
                }
            })()

        }), []);

    return [apiData, loading, error] as const;
}

export default UseApiListHook