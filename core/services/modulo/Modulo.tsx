import {useEffect, useState} from 'react';

import {AxiosError, AxiosResponse} from 'axios';
import { API, handleError } from '../../../http/API';
import { Modulo } from '../../../models/Modulo';


export function getAllModulos() {

    const [modulos, setModulos] = useState<Modulo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        API.get<Modulo[]>('/Modulo')
            .then((response: AxiosResponse) => {
                setModulos(response.data);
            })
            .catch((error: AxiosError<Modulo[]>) => {
                handleError(error)
            })
            .finally(() => setIsLoading(true));
    }, []);

    return {modulos, isLoading};
}

