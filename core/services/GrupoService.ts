import { ControleExecucao } from '../../models/ControleExecucao';
import { useEffect, useMemo, useState } from 'react';
import { API, handleError } from '../../http/API';
import { AxiosError, AxiosResponse } from 'axios';
import { Grupo } from '../../models/Grupo';
import { FrequenciaViewModel } from '../../models/FrequenciaViewModel';


export function getAllGrupos() {

  const [grupos, setGrupos] = useState<Grupo[]>([]);

  useEffect(() => {
    API.get<Grupo[]>(`/Grupo`)
      .then((response: AxiosResponse) => {
        setGrupos(response.data);
      })
      .catch((error: AxiosError<Grupo[]>) => {
        handleError(error)
      })
  }, []);

  return {grupos};
}


export function getGruposByEstudanteIdByPeriodoId(idEstudante: number, idPeriodo: number) {

  const [grupos, setGrupos] = useState<Grupo[]>([])

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data} = await API.get<Grupo[]>(`/Grupo/ObterGruposByEstudanteIdByPeriodoId/${idEstudante}/${idPeriodo}`)
        setGrupos(data);
      } catch (error) {
        handleError(error)
      }
    }
    fetchData()
  },[])

  return { grupos }
}

export const ObterGruposByPeriodoAtivoByEstudanteId = async (idEstudante: number | string) => {
  const { data } = await API.get<Grupo[]>(`/Grupo/ObterGruposByPeriodoAtivoByEstudanteId/${idEstudante}`)
  return data
}

export function ObterGruposByPeriodoAtivoByEstudanteIdWithFrequency(idEstudante: number | string) {

  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const inicio = Date.now()
        const {data: grupoData} = await API.get<Grupo[]>(`/Grupo/ObterGruposByPeriodoAtivoByEstudanteId/${idEstudante}`)
        const idPeriodo = grupoData[0]?.periodoId
        const {data: freqData} = await API.get<FrequenciaViewModel[]>(`/Frequencia/obterFrequenciaByEstudanteIdByPeriodoId/${idEstudante}/${idPeriodo}`)

        if(freqData){

          grupoData.forEach(
            (g) => {
                var freq = freqData.filter((f) =>(f.grupoId == g.id));
                if(freq.length != 0){
                  g.frequencia = freq[0].frequencia;
                }
                else {
                  g.frequencia = '0'
                }
            }
          )
        }
        setGrupos(grupoData)
        const final = Date.now()
        console.log(final - inicio)
        setIsLoaded(true)

      } catch (error) {
        handleError(error)
      }
    }
    fetchData()

  },[])

  return { grupos, isLoaded }
}

export function getGrupo(idGrupo: number | string) {
  const [grupo, setGrupo] = useState<Grupo>()

  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        const {data} = await API.get<Grupo>(`/Grupo/${idGrupo}`)
        setGrupo(data)
      } catch (error) {
        handleError(error)
      }
    }

    fetchGrupo()
  },[])

  return { grupo }
}

export function getGruposByEstudanteIdByPeriodoIdWithFrequency(idEstudante: number | string, idPeriodo: number) {

  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: grupoData} = await API.get<Grupo[]>(`/Grupo/ObterGruposByEstudanteIdByPeriodoId/${idEstudante}/${idPeriodo}`)
        const {data: freqData} = await API.get<FrequenciaViewModel[]>(`/Frequencia/obterFrequenciaByEstudanteIdByPeriodoId/${idEstudante}/${idPeriodo}`)

        grupoData.forEach(
          (g) => {
              var freq = freqData.filter((f) =>(f.grupoId == g.id));
              if(freq.length != 0){
                g.frequencia = freq[0].frequencia;
              }
              else {
                g.frequencia = '0'
              }
          }
        )
        setGrupos(grupoData)
        setIsLoaded(true)

      } catch (error) {
        handleError(error)
      }
    }
    fetchData()

  },[])

  return { grupos, isLoaded }
}