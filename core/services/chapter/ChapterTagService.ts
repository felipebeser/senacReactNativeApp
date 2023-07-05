import { useEffect, useState } from "react";
import { ChapterTag } from "../../../models/ChapterTag";
import { API, handleError } from "../../../http/API";


export async function getAllChapterTags () {

  const { data } = await API.get<ChapterTag[]>('ChapterTag')
  return data
}