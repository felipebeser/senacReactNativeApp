import {useEffect, useState} from 'react';


import {Axios, AxiosError, AxiosResponse} from 'axios';
import { Badge } from '../../../models/Badge';
import { API, handleError } from '../../../http/API';

export function getAllBadges() {
    // const [badges, setBadges] = useState<Badge[]>([]);

    // useEffect(() => {
    //   api.get<Badge[]>('/Badge').then((response) => {
    //     setBadges(response.data);
    //   });
    // }, []);

    // return badges;

    //MOCK
    // const mock: any[] = require('../../components/utils/badges.json');

    // useEffect(() => {
    //   setBadges(mock);
    //   setMasterData(mock);
    //   setFilteredData(mock);
    // }, []);

    const [badges, setBadges] = useState<Badge[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Badge[]>([]);
    const [masterData, setMasterData] = useState<Badge[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        API.get<Badge[]>('/Badge')
            .then((response: AxiosResponse) => {
                setBadges(response.data);
                setMasterData(response.data);
                setFilteredData(response.data);
            })
            .catch((error: AxiosError<Badge[]>) => {
                handleError(error)
            })
            .finally(() => setIsLoading(true));
    }, []);

    // if (badges === null) {
    //   const mock: Badge[] = require('../../../common/utils/mock/Badges.json');

    //   useEffect(() => {
    //     setBadges(mock);
    //     setMasterData(mock);
    //     setFilteredData(mock);
    //   }, []);
    // }
    return {badges, setBadges, search, setSearch, filteredData, setFilteredData, masterData, setMasterData, isLoading};
}

export function filtrarBadgeByGrupoId(id: Badge['id']) {

    const [badges, setBadges] = useState<Badge[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Badge[]>([]);
    const [masterData, setMasterData] = useState<Badge[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        API.get<Badge[]>('/Badge')
            .then((response: AxiosResponse) => {
                setBadges(response.data);
                setMasterData(response.data);
                setFilteredData(response.data);
            })
            .catch((error: AxiosError<Badge[]>) => {
                handleError(error)
            })
            .finally(() => setIsLoading(true));
    }, []);

    return {badges, setBadges, search, setSearch, filteredData, setFilteredData, masterData, setMasterData, isLoading};
}

export function getBadgeById(id: number | string) {
    const [badge, setBadges] = useState<Badge>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await API.get<Badge>(`Badge/${id}`)
                setBadges(data);
            } catch (error: unknown) {
                if( error instanceof AxiosError) {
                    handleError(error)
                }
                else {
                    alert(error)
                }
            }
        }
        fetchData();

    }, []);

    return {badge}
}

export function createBadge(badgeModel: Badge) {
    const [badge, setBadges] = useState<Badge>(new Badge());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        API.post<Badge>(`/Badge`, badgeModel)
            .then((response: AxiosResponse) => {
                setBadges(response.data);
            })
            .catch((error: AxiosError<Badge>) => {
                handleError(error)
            })
            .finally(() => setIsLoading(true));
    }, [badgeModel]);

    return {badge, isLoading}
}

export async function getBadges() {
    const { data } = await API.get<Badge[]>('Badge')
    return data
}
