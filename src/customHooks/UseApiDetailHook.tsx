import { useEffect, useState } from 'react';
import { DataForm } from '../utils/types';

interface UseApiHookProps {
    endPoint: string;
    method: string;
    body?: BodyInit;
    id?: string;
}

function UseApiListHook({ endPoint, method, body, id }: UseApiHookProps) {

    const [apiData, setApiData] = useState<DataForm>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);

    const request = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body
    }

    const apiController = async () => {
        setLoading(true)
        try {
            const response = await fetch(endPoint + id, request);
            const data = await response.json();
            setApiData(data)
            setLoading(false);
        }
        catch (err) {
            setError(err);
            setLoading(false);
        }
    }

    useEffect((
        () => {
            apiController()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }), []);

    return [apiData, loading, error, apiController] as const;
}

export default UseApiListHook