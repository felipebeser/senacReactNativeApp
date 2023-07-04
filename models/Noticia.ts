export type Noticia = {
    id : number,
    titulo: string,
    descricao: string,
    data: Date,
    autor: string,
    autorId: string,
    tags: string[],
    imagem: string,
    link: string,
  }