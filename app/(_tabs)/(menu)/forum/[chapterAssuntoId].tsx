import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router/src/navigationStore'
import { getChaptersAssuntoById } from '../../../../core/services/chapter/ChapterAssuntoService'
import { createChapterAssuntoComentario, getChapterAssuntoComentariosFilterByChapterAssuntoId } from '../../../../core/services/chapter/ChapterAssuntoComentarioService'
import { ChapterAssuntoComentario } from '../../../../models/ChapterAssuntoComentario'
import { useAuth } from '../../../../contexts/AuthContext'
import ChapterAssuntoCard from '../../../../components/Forum/ChapterAssuntoCard'
import ChapterAssuntoComentarioCard from '../../../../components/Forum/ChapterAssuntoComentarioCard'
import { ChapterAssunto } from '../../../../models/ChapterAssunto'
import { handleError } from '../../../../http/API'

const { width } = Dimensions.get('screen')

const ChapterAssuntoDetails = () => {

  type ChapterAssuntoParam = {
    chapterAssuntoId: string
  }

  type createComentarioProps = {
    texto: string,
    data: string,
    pai?: number,
    chapterAssuntoComentarioReferenciaPai?: number,
    chapterAssuntoId: number,
    usuarioId: string
  }

  const { usuarioId, usuarioRole } = useAuth().authState.userData
  const { chapterAssuntoId } = useLocalSearchParams<ChapterAssuntoParam>()
  const [chapterAssuntoComentarios, setChapterAssuntoComentarios] = useState<ChapterAssuntoComentario[]>()
  const [chapterAssunto, setChapterAssunto] = useState<ChapterAssunto>()
  const refInput = useRef(null)

  useEffect(() => {
    Promise.all([getChaptersAssuntoById(chapterAssuntoId) ,getChapterAssuntoComentariosFilterByChapterAssuntoId(chapterAssuntoId)])
      .then(res => {
        setChapterAssunto(res[0])
        setChapterAssuntoComentarios(res[1])
      })
      .catch(err => handleError(err))
  },[chapterAssuntoId])

  const [ createForm, setCreateForm] = useState<createComentarioProps>({
    texto: "",
    data: new Date().toLocaleDateString(),
    pai: null,
    chapterAssuntoComentarioReferenciaPai: null,
    chapterAssuntoId: Number(chapterAssuntoId),
    usuarioId: usuarioId
  })

  const getComentarios = async ( chapterAssuntoId: string ) => {
    const data = await getChapterAssuntoComentariosFilterByChapterAssuntoId(chapterAssuntoId)
    setChapterAssuntoComentarios(data)
  }

  const updateDate = () => {
    var date = new Date()
    setCreateForm({...createForm, data: date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' +
    ('00' + date.getHours()).slice(-2) + ':' +
    ('00' + date.getMinutes()).slice(-2) + ':' +
    ('00' + date.getSeconds()).slice(-2)})
  }
  const handleResponder = async () => {
    await createChapterAssuntoComentario(createForm).then(async() => {
      getComentarios(chapterAssuntoId)
      setCreateForm({...createForm, texto: ""})
    }).catch(e => console.log(e))
  }

  const handleResponderComentario = (id: number) => {
    setCreateForm({...createForm, pai: id});
    refInput.current.focus()
  }

  return (
    <View 
      style={styles.container}
      >
      { (chapterAssunto && chapterAssuntoComentarios) &&
      <>
        <FlatList
          data={chapterAssuntoComentarios}
          renderItem={({item}) => 
            <ChapterAssuntoComentarioCard comentario={item} usuarioId={usuarioId} usuarioRole={usuarioRole} handleResponderComentario={handleResponderComentario}/>}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={<ChapterAssuntoCard topico={chapterAssunto} usuarioId={usuarioId} usuarioRole={usuarioRole}/>}
        />
        <View style={styles.inputContainer}>

          <TextInput
            onChangeText={(text) => {setCreateForm({...createForm, texto: text})}}
            value={createForm.texto}
            style={[styles.input, styles.inputDescription]}
            multiline
            ref={refInput}
          />

            <TouchableOpacity
              onPressIn={() => updateDate()}
              style={[styles.button, ((createForm.texto.length < 1)) ? styles.buttonDisabled : styles.button]}
              onPressOut={() => handleResponder()}
              disabled={(createForm.texto.length < 1)}
            >
              <Text style={styles.buttonText}>Responder</Text>
            </TouchableOpacity>
        </View>
      </>
      }
    </View>
  )
}

export default ChapterAssuntoDetails


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
  },
  comentariosContainer:{
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 12,
    backgroundColor: '#004A90'
  },
  buttonText: {
    color: '#fff'
  },
  buttonDisabled: {
    backgroundColor: 'lightgray'
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inputDescription: {
    height: 70
  },
  inputContainer: {
    padding: 10,
    gap: 10
  }
})