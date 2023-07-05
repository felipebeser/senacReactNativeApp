import { useEffect, useState } from "react";
import { ChapterAssuntoComentario } from "../../../models/ChapterAssuntoComentario";
import { API, handleError } from "../../../http/API";


export async function getChapterAssuntoComentariosFilterByChapterAssuntoId(id: number | string) {

  const { data } = await API.get<ChapterAssuntoComentario[]>(`ChapterAssuntoComentario/filterByChapterAssuntoId/${id}`)
  return data

}

export async function deleteChapterAssuntoComentario(id: number | string) {
  (async() => {
    try {
      const response = await API.delete<ChapterAssuntoComentario>(`ChapterAssuntoComentario/${id}`)
      return(response.status)
    } catch (error) {
      handleError(error)
    }
  })()
}


type createProps = {
  texto: string,
  data: string,
  pai?: number,
  chapterAssuntoComentarioReferenciaPai?: number,
  chapterAssuntoId: number,
  usuarioId: string
}
export async function createChapterAssuntoComentario(form: createProps) {
    const response = await API.post<createProps>(`ChapterAssuntoComentario`, form)
    return(response.status)
}