import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import RecursoService from '../core/services/RecursoService'
import { Recurso } from '../../models/Recurso'
import * as nativeBase from "native-base";
import { Avatar, Card, IconButton, AnimatedFAB } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';


export default function listaRecursos() {

  const { listaRecursos, deleteRecurso } = RecursoService()

  type RenderRecursoProps = {
    item: Recurso
  }

  const RenderRecurso = ({ item }: RenderRecursoProps) => {
    return (
      <Card.Title
        title={item.nomeArquivo}
        subtitle={item.descricao}
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={(props) => <IconButton {...props} icon="close" onPress={() => deleteRecurso(item.id)} />}
      />
    )
  }



  return (
    <NativeBaseProvider>
      <View>
        <FlatList
          ListHeaderComponent={() => (
            <nativeBase.Heading fontFamily={'Poppins'} fontSize="20" p="2" marginLeft="4">
              Arquivos
            </nativeBase.Heading>
          )}
          data={listaRecursos}
          renderItem={RenderRecurso}
          keyExtractor={(item) => item.id.toString()}
        />
        <AnimatedFAB
          icon={'plus'}
          extended={false}
          label={'Label'}
          onPress={() => console.log('Pressed')}
          visible={true}
          animateFrom={'right'}
          iconMode={'static'}
          style={[styles.fabStyle]}
        />
      </View>
    </NativeBaseProvider>

  )
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    right: 16,
    top: 640,
    position: 'absolute',
  },
});
