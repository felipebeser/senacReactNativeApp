import { useEffect, useState } from "react";
import { Chapter } from "../../../models/Chapter";
import { API, handleError } from "../../../http/API";
import { ChapterAssunto } from "../../../models/ChapterAssunto";



export async function getAllChaptersAssunto() {
  const {data} = await API.get<ChapterAssunto[]>(`ChapterAssunto`)
  return data
}
export async function getChaptersAssuntoById(id: number | string) {
  const {data} = await API.get<ChapterAssunto>(`ChapterAssunto/${id}`)
  return data
}


export async function createChaptersAssunto(newChapterAssunto) {

  const response = await API.post<ChapterAssunto>(`ChapterAssunto`, newChapterAssunto)
  return(response.status)

}

export async function deleteChapterAssunto(id: number | string) {

  const response = await API.delete<ChapterAssunto>(`ChapterAssunto/${id}`)
  
  return {response}
}