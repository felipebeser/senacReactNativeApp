import { useState, useEffect } from "react";
import { Recurso } from "../../models/Recurso";
import { API, handleError } from "../../http/API";
import { useAuth } from "../../contexts/AuthContext";


export default function RecursoService() {

    const [listaRecursos, setListaRecursos] = useState<Recurso[]>([]);
    const [originalData, setOriginalData] = useState<Recurso[]>([]);
    const { usuarioId } = useAuth().authState.userData

    useEffect(() => {
        getListaRecursoPorUsuarioId(usuarioId)
    }, [usuarioId]);

    const getListaRecursoPorUsuarioId = async (usuarioId: string) => {
        try {
            const { data } = await API.get<Recurso[]>(`Recurso/FiltrarRecursosByUsuarioId/${usuarioId}`);
            setListaRecursos(data);
            setOriginalData(data);
        } catch (error) {
            handleError(error)
        }
    }

    const getListaRecursos = async () => {
        try {
            const response = await API.get<Recurso[]>('Recurso');
            setListaRecursos(response.data);
            setOriginalData(response.data);
        } catch (error) {
            handleError(error)
        }
    };


    const deleteRecurso = async (id: number) => {
        try {
            const response = await API.delete<Recurso>('Recurso/' + id)
            setListaRecursos((prevListaRecursos) =>
                prevListaRecursos.filter((recurso) => recurso.id !== id)
            );
        } catch (error) {
            handleError(error)
        }
    };

    const saveRecurso = async (recurso: Recurso) => {
        try {
            const response = await API.post<Recurso>('Recurso/', recurso);

            console.log(response.data);
            setListaRecursos((prevListaRecursos) => {
                const index = prevListaRecursos.findIndex((r) => r.id === recurso.id);
                if (index !== -1) {
                    // Se o recurso já existia na lista, atualizamos seus dados
                    const newListaRecursos = [...prevListaRecursos];
                    newListaRecursos[index] = response.data;
                    return newListaRecursos;
                } else {
                    // Se o recurso é novo, adicionamos à lista
                    return [...prevListaRecursos, response.data];
                }
            });
        } catch (error) {
            handleError(error)
        }
    };

    return { listaRecursos, originalData, setListaRecursos, setOriginalData, getListaRecursos, getListaRecursoPorUsuarioId, deleteRecurso, saveRecurso };

}

