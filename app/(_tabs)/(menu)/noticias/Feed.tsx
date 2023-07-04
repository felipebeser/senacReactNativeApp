import { Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import ChapterAssuntoCard from '../../../../components/Forum/ChapterAssuntoCard';
import { Noticia } from '../../../../models/Noticia';
import CardNoticia from '../../../../components/Cards/CardNoticia';
import { useAuth } from '../../../../contexts/AuthContext';


const { width } = Dimensions.get('screen')

const Feed = () => {
  const { usuarioId, usuarioRole } = useAuth().authState.userData

  const router = useRouter(); 

  const noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Noticia 1',
      descricao: 'Descrição da noticia 1',
      data: new Date(),
      autor: 'Autor 1',
      autorId: "1",
      tags: ['tag1', 'tag2'],
      imagem: 'https://picsum.photos/200',
      link: 'https://google.com',
    },
    {
      id: 2,
      titulo: 'Noticia 2',
      descricao: 'Descrição da noticia 2',
      data: new Date(),
      autor: 'Autor 2',
      autorId: "2",
      tags: ['tag1', 'tag2'],
      imagem: 'https://picsum.photos/200',
      link: 'https://google.com',
    },
    {
      id: 3,
      titulo: 'Noticia 3',
      descricao: 'Descrição da noticia 3',
      data: new Date(),
      autor: 'Autor 3',
      autorId: "3",
      tags: ['tag1', 'tag2'],
      imagem: 'https://picsum.photos/200',
      link: 'https://google.com',
    },
  ]

  const renderItem = ({ item }) => {
    return (
      <CardNoticia
        topico={item}
        usuarioId={usuarioId}
        usuarioRole={usuarioRole}
      />
    );
  };



  return (
    <View style={styles.container}>

      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.Buttoncontainer}>
              <View style={[styles.askButtoncontainer]}>
                <TouchableOpacity onPress={null}>
                  <Text>Nova Noticia</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <TagsCard tags={chapterTags}/> */}
      </>
        }
        data={noticias}
        renderItem={({item}) => renderItem({item})}
        keyExtractor={(item) => (item.id.toString())}
      />
    </View>
  )
}

/* type tagsCardProp = {
  tags: ChapterTag[]
} */
/* const TagsCard = ({tags} : tagsCardProp) => {
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
} */



export default Feed

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