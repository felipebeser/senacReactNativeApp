import { Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllChaptersAssunto } from '../../../../core/services/chapter/ChapterAssuntoService'
import { ChapterTag } from '../../../../models/ChapterTag';
import { ChapterAssunto } from '../../../../models/ChapterAssunto';
import { getAllChapterTags } from '../../../../core/services/chapter/ChapterTagService';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../../contexts/AuthContext';
import ChapterAssuntoCard from '../../../../components/Forum/ChapterAssuntoCard';


const { width } = Dimensions.get('screen')
const Comunidades = () => {

  const [chaptersAssunto, setChaptersAssunto] = useState<ChapterAssunto[]>([])
  const [chapterTags, setChapterTags] = useState<ChapterTag[]>([])
  const { push } = useRouter()
  const { usuarioId, usuarioRole } = useAuth().authState.userData

  useEffect(() => {
    Promise.all([getAllChaptersAssunto(), getAllChapterTags()])
      .then((response) => {
        setChaptersAssunto(response[0])
        setChapterTags(response[1])
      })
  },[])

  return (
    <View style={styles.container}>
      {(chapterTags && chaptersAssunto) &&
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.Buttoncontainer}>
              <View style={[styles.askButtoncontainer]}>
                <TouchableOpacity onPress={() => push('/forum/NovaPergunta')}>
                  <Text>Nova Pergunta</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TagsCard tags={chapterTags}/>
          </>
        }
        data={chaptersAssunto}
        renderItem={({item}) => <ChapterAssuntoCard topico={item} usuarioId={usuarioId} usuarioRole={usuarioRole} />}
        keyExtractor={(item) => (item.id.toString())}
      />}
    </View>
  )
}

type tagsCardProp = {
  tags: ChapterTag[]
}
const TagsCard = ({tags} : tagsCardProp) => {
  return (
    <View style={styles.TagsCardContainer}>
      <FlatList
        data={tags}
        renderItem={({item}) => 
          (
            <>
              <TouchableOpacity style={styles.tagButton}>
                <Text style={styles.tagName}>{item.descricao}</Text>
              </TouchableOpacity>
            </>
          )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}



export default Comunidades

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  TagsCardContainer: {
    flex:1,
    padding: 20,
  },
  tagButton: {
    backgroundColor: '#02408d',
    borderRadius: 10,
    marginHorizontal: 3,
    padding:3
  },
  tagName: {
    color: '#fff',
    textTransform: 'lowercase'
  },
  Buttoncontainer: {
    width: width*0.4,
    height: width*0.15,
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'center'
  },
  askButtoncontainer: {
    flex:1 ,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingLeft: 5,
    ...Platform.select({
      ios: {
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5
      }
    })
  }
})