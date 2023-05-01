import { useState, useEffect } from "react";
import { defineAnimation } from "react-native-reanimated";
import { API } from "../../../http/api";
import { Recurso } from "../../../models/Recurso";

export default function RecursoService() {

    const [listaRecursos, setListaRecursos] = useState<Recurso[]>([]);

    useEffect(() => {
        API.get<Recurso[]>('Recurso').then((response) => {
            console.log(response.data);
            setListaRecursos(response.data);
        }

        )
    }, []);

    const deleteRecurso = async (id: number) => {
        try {
            const response = await API.delete<Recurso>('Recurso/' + id)
            console.log(response.data);
            setListaRecursos((prevListaRecursos) =>
                prevListaRecursos.filter((recurso) => recurso.id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };


    return { listaRecursos, deleteRecurso };

}

export function SalvarRecurso(item: Recurso) {

    const [recurso, setRecurso] = useState<Recurso>();

    useEffect(() => {
        API.post<Recurso>('Recurso', item).then((response) => {
            console.log(response.data);
            setRecurso(response.data);
        }

        )
    }, []);

    return {};
}

