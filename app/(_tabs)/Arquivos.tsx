import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import RecursoService from '../core/services/RecursoService'
import { Recurso } from '../../models/Recurso'
import * as nativeBase from "native-base";
import { Avatar, Card, IconButton, AnimatedFAB } from 'react-native-paper';
import { NativeBaseProvider, Modal } from 'native-base';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';



export default function listaRecursos() {

  const { listaRecursos, deleteRecurso, saveRecurso } = RecursoService()
  const [showModal, setShowModal] = useState(false);
  const [fileResponse, setFileResponse] = useState([]);

  type RenderRecursoProps = {
    item: Recurso
  }

  const RenderRecurso = ({ item }: RenderRecursoProps) => {
    return (
      <Card.Title
        title={item.nomeArquivo}
        subtitle={item.descricao}
        left={(props) => <Avatar.Icon {...props} icon="content-save" />}
        right={(props) => <IconButton {...props} icon="close" onPress={() => deleteRecurso(item.id)} />}
      />
    )
  }


  // const pickDocument = () => {
  //   try {
  //     console.log("aaaaaaaaaaaaaaaaaaaa");

  //     const result = DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     console.log(
  //       result
  //     );
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User cancelled the picker');
  //     } else {
  //       console.log('Error:', err.message);
  //     }
  //   }
  // }

  const onUpload = ({ item }: any) => {
    const fileReader = new FileReader();


    for (let file of item.files) {
      fileReader.onload = (e) => {
        const arquivo = e.target?.result as string;
        const formatAquivo = arquivo.split(',')[1];

        const Recurso = {
          id: 7,
          descricao: "",
          nomeArquivo: file.name,
          arquivo: formatAquivo,
          dataCadastro: new Date().toISOString(),
          status: 1,
          usuarioId: this.idUsuarioLogado,
        };

        saveRecurso(Recurso)
      }

      fileReader.readAsDataURL(file);
    }
  }

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    if (result.type == "success") {
      let base64 = await FileSystem.readAsStringAsync('file:///data/user/0/host.exp.exponent/cache/DocumentPicker/download.jpeg', { encoding: FileSystem.EncodingType.Base64 });
      // utilize o valor de base64 aqui
      console.log(base64)
    }

  };

  const ModalUpload = () => {

    return <nativeBase.Center>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>Upload de Recursos</Modal.Header>
          <Modal.Body>
            <UploadBox />
          </Modal.Body>
          <Modal.Footer>
            <nativeBase.Button.Group space={2}>
              <nativeBase.Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false);
              }}>
                Cancel
              </nativeBase.Button>
              <nativeBase.Button onPress={() => {
                setShowModal(false);
              }}>
                Save
              </nativeBase.Button>
            </nativeBase.Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </nativeBase.Center>;
  }

  const UploadBox = () => {
    return <nativeBase.Box alignItems="center">
      <nativeBase.Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
        <nativeBase.Stack p="4" space={3}>
          <nativeBase.Stack space={2}>
            <nativeBase.Heading size="md" ml="-1">
              <nativeBase.Button onPress={pickDocument}>
                Escolher arquivo
              </nativeBase.Button>
            </nativeBase.Heading>
            {/* <Text>
              The Silicon Valley of India.
            </Text> */}
          </nativeBase.Stack>
          {fileResponse.map((file, index) => (
            <Text
              key={index.toString()}
              numberOfLines={1}
              ellipsizeMode={'middle'}>
              {file?.uri}
            </Text>
          ))}
        </nativeBase.Stack>
      </nativeBase.Box>
    </nativeBase.Box>;
  };

  // const handleDocumentSelection = async () => {
  //   try {
  //     const doc = await DocumentPicker.pick();
  //     console.log(doc)
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err))
  //       console.log("User cancelled")
  //     else
  //       console.log(err)
  //   }
  // };




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
          onPress={() => setShowModal(true)}
          visible={true}
          animateFrom={'right'}
          iconMode={'static'}
          style={[styles.fabStyle]}
        />

        <ModalUpload />
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
    top: 460,
    position: 'absolute',
  },
});
