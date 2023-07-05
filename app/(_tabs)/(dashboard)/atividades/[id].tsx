import { useLocalSearchParams, useRouter } from 'expo-router';
import moment from 'moment';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { API } from '../../../../http/API';

import { getAtividade } from '../../../../core/services/ativade/AtividadeService';


interface AtividadeParam {
  id: string;
}

interface UploadResponse {
  success: boolean;
  message: string;
}

export default function Atividade({ navigation, route }) {
  type atividadeParam = {
    id: string;
  };

  type UploadResponse = {
    success: boolean;
    message: string;
    // Add any other properties specific to your response
  }
  moment.locale("pt-br");
  const idEstudante = 1;
  const router = useRouter();
  const { id } = useLocalSearchParams<atividadeParam>();
  const { atividade } = getAtividade(id);
  const descricao = atividade?.descricao;
  const dataInicio = atividade?.dataInicio;
  const dataFim = atividade?.dataFim;
  const titulo = atividade?.situacaoAprendizagem.titulo;

  // const idAtividade  = route.params as atividadeParam;
  const [fileUri, setFileUri] = useState<string | null>(null);

  // Function to handle file selection
  const handleFileSelection = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Set the desired file type here
      });

      if (res.type === 'success') {
        setFileUri(res.uri);
      } else {
        // User cancelled the file selection
        console.log('User cancelled the file selection');
      }
    } catch (err) {
      // Error occurred while picking the file
      console.log('Error occurred while picking the file:', err);
    }
  };

  // Function to upload the file to the endpoint
  const handleFileUpload = async () => {
    try {
      if (fileUri) {
        
        const formData = new FormData();
        formData.append('document', fileUri);
        const options = {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
        };
        console.log(formData);

        const response = await fetch(`${API}Atividade/AtividadeEnviarArquivoByAtividadeIdByEstudanteId/${id}/${idEstudante}`, {
          method: 'POST',
          body: formData,
        });

        // Handle the response from the server
        console.log('Upload successful:', response);
      } else {
        console.log('No file selected');
      }
    } catch (err) {
      console.log('Error occurred during file upload:', err);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.atividade}>
        <Text style={styles.text}>Situação de aprendizagem: </Text>
        <Text style={styles.textContent}>{titulo}</Text>
        <Text style={styles.text}>Atividade:</Text>
        <Text style={styles.textContent}>{descricao}</Text>
        <Text style={styles.text}>Início:</Text>
        <Text style={styles.textContent}>
          {moment(dataInicio).format("LLLL")}
        </Text>
        <Text style={styles.text}>Término:</Text>
        <Text style={styles.textContent}>{moment(dataFim).format("LLLL")}</Text>
        <View>
          <Button title="Select File" onPress={handleFileSelection} />
          
          <Button title="Upload File" onPress={handleFileUpload} />

          {fileUri && (
            <Text>Selected file: {fileUri}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  atividade: {
    flexDirection: "column",
    margin: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    paddingTop: 0,
    elevation: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 10,
  },
  textContent: {
    fontSize: 18,
  },
botao:{},
});