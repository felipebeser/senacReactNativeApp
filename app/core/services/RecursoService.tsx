import { useState, useEffect } from "react";
import { defineAnimation } from "react-native-reanimated";
import { API } from "../../../http/api";
import { Recurso } from "../../../models/Recurso";

export default function RecursoService() {

    const [listaRecursos, setListaRecursos] = useState<Recurso[]>([]);

    useEffect(() => {
        API.get<Recurso[]>('Recurso').then((response) => {
            setListaRecursos(response.data);
        }

        )
    }, []);

    const deleteRecurso = async (id: number) => {
        try {
            const response = await API.delete<Recurso>('Recurso/' + id)
            setListaRecursos((prevListaRecursos) =>
                prevListaRecursos.filter((recurso) => recurso.id !== id)
            );
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    };

    return { listaRecursos, deleteRecurso, saveRecurso };

}

