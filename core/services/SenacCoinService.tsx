import { useEffect, useState } from "react";
import { API, handleError } from "../../http/API";
import { SenacCoin } from "../../models/SenacCoin";

export function filtrarSenacCoinByUsuarioId(usuarioId: string) {
  const [senacCoin, setSenacCoin] = useState<SenacCoin>()
  useEffect(() => {
    (async() => {
      try {
        const { data } =  await API.get(`SenacCoin/FiltrarSenacCoinByUsuarioId/${usuarioId}`)
        setSenacCoin(data)
      } catch (error) {
        handleError(error)
      }
    })()
  },[])
  return { senacCoin }
}

export async function getSenacCoinByUsuarioId(usuarioId: string) {
  const {data} = await API.get(`SenacCoin/FiltrarSenacCoinByUsuarioId/${usuarioId}`)
  return data
}