import { View, Text, FlatList, StyleSheet, Platform, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import * as nativeBase from "native-base";
import { Avatar, Card, IconButton, AnimatedFAB, Button, TextInput } from 'react-native-paper';
import { NativeBaseProvider, Modal, Input } from 'native-base';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Recurso } from '../../../models/Recurso';
import RecursoService from '../../../core/services/RecursoService';
import uuid from 'uuid-random';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as Permissions from 'expo-permissions';



export default function listaRecursos() {

  const { listaRecursos, originalData, setListaRecursos, getListaRecursos, deleteRecurso, saveRecurso } = RecursoService()

  const [showModal, setShowModal] = useState(false);
  const [showDesc, setShowDesc] = useState(true);

  const [fileResponse, setFileResponse] = useState([]);
  const [recurso, setRecurso] = useState<Recurso>()
  const [nomeArquivo, setNomeArquivo] = useState<string>('');
  const [desc, setText] = useState('');
  const idUsuarioLogado = "3b700ecc-cec9-4be4-8c00-48bced543861";
  const id = uuid();




  type RenderRecursoProps = {
    item: Recurso
  };

  const RenderRecurso = ({ item }: RenderRecursoProps) => {
    return (
      <View>
        <Card.Title
          title={item.nomeArquivo}
          subtitle={item.descricao}
          left={(props) => <Avatar.Icon {...props} style={styles.button} icon="content-save" />}
          right={(props) => <IconButton {...props} icon="close" onPress={() =>
            downloadFile('http://techslides.com/demos/sample-videos/small.mp4')
            // Alert.alert("",
            //   "Tem certeza que deseja apagar o arquivo?",
            //   [
            //     {
            //       text: 'Sim',
            //       onPress: () => {
            //         deleteRecurso(item.id).catch((error) => {
            //           nativeBase.Toast.show({
            //             title: "Erro ao apagar arquivo!",
            //             placement: "top",
            //             backgroundColor: "amber.500",
            //           });
            //           console.log(error);
            //         }).
            //           then(() => {
            //             getListaRecursos(),
            //               nativeBase.Toast.show({
            //                 title: "Arquivo apagado com sucesso!",
            //                 placement: "top",
            //                 backgroundColor: "green.500",
            //               });
            //           });
            //       },
            //       style: 'destructive',
            //     },
            //     {
            //       text: 'Não',
            //       onPress: () => {
            //         // Lógica a ser executada ao pressionar o Botão 2
            //         return null;
            //       },
            //       style: 'cancel',
            //     },

            //   ],
            // )
          } />}
        />
        <NativeBaseProvider>
          <nativeBase.Divider />
        </NativeBaseProvider>
      </View>



    )
  }

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type == "success") {
      let data = result.uri;

      Platform.OS == 'android' ? data = data.replace('file://', '') : data;
      console.log(desc)
      let base64 = await FileSystem.readAsStringAsync(data, { encoding: FileSystem.EncodingType.Base64 });
      // utilize o valor de base64 aqui
      const Recurso = {
        id: 7,
        descricao: desc,
        nomeArquivo: result.name,
        arquivo: base64,
        dataCadastro: new Date().toISOString(),
        status: 1,
        usuarioId: idUsuarioLogado,
      };
      setRecurso(Recurso)
      console.log(recurso)

      setNomeArquivo(result.name)
    }

  };

  async function downloadFile(url: string) {
    // Downloading the file
    let fileLocation = FileSystem.documentDirectory + "small.mp4";
    console.log(fileLocation)
    FileSystem.downloadAsync(url, fileLocation)
      .then(async (url) => {
        console.log("Download completed!");
        // Saving the file in a folder name `MyImages`
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
          console.log("Permission granted");
          const asset = await MediaLibrary.createAssetAsync(fileLocation)
          console.log("Asset", asset);
          //await MediaLibrary.createAlbumAsync("MyVideos", asset, false)
        }

        // Sharing the downloded file
        Sharing.shareAsync(fileLocation);
      })
      .catch(error => {
        console.error(error);
      })
  }

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
              <nativeBase.Button colorScheme='blue' onPress={
                () => {

                  saveRecurso(recurso).catch((error) => {
                    nativeBase.Toast.show({
                      title: "Erro ao salvar arquivo!",
                      placement: "top",
                      backgroundColor: "amber.500",
                    });
                    console.log(error);
                  }).
                    then(() => {
                      getListaRecursos(),
                        nativeBase.Toast.show({
                          title: "Arquivo salvo com sucesso!",
                          placement: "top",
                          backgroundColor: "green.500",
                        });
                      setShowModal(false);
                    });

                }}>
                Save
              </nativeBase.Button>
            </nativeBase.Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </nativeBase.Center>;
  };

  const UploadBox = () => {
    return <nativeBase.Box alignItems="center">
      <nativeBase.Box w="250" maxW="250" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
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
              <nativeBase.Button colorScheme='blue' onPress={() => { pickDocument(), setShowDesc(false) }}>
                Escolher arquivo
              </nativeBase.Button>
            </nativeBase.Heading>
            <Text>Nome: {nomeArquivo}</Text>
            <Input size="lg" placeholder="Descrição" isDisabled={showDesc} value={desc} onChangeText={text => setText(text)} />
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


  function search(s) {
    let arr = JSON.parse(JSON.stringify(originalData));
    setListaRecursos(arr.filter((item) =>
      item.nomeArquivo.toUpperCase().includes(s.toUpperCase()) || item.descricao.toUpperCase().includes(s.toUpperCase())))
  }




  return (
    <NativeBaseProvider>
      <View>
        <nativeBase.Heading fontFamily={'Poppins'} fontSize="20" p="2" marginLeft="4">
          Arquivos
        </nativeBase.Heading>

        <TextInput
          placeholder='Pesquisar'
          style={styles.input}
          placeholderTextColor={'#999'}
          onChangeText={(s) => { search(s) }}
        />

        <FlatList
          // ListHeaderComponent={() => (
          //   <nativeBase.Heading fontFamily={'Poppins'} fontSize="20" p="2" marginLeft="4">
          //     Arquivos
          //   </nativeBase.Heading>
          // )}
          data={listaRecursos}
          renderItem={RenderRecurso}
          key={id}
          style={styles.listaRecursos}
        />
        <AnimatedFAB
          icon={'plus'}
          extended={false}
          label={'Label'}
          onPress={() => setShowModal(true)}
          visible={true}
          animateFrom={'right'}
          iconMode={'static'}
          color='#F2994A'
          style={[styles.fabStyle, styles.button]}
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
  button: {
    backgroundColor: '#2563ea',
  },
  listaRecursos: {
    marginTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#2563ea',
    color: '#2563ea',
  },
});


