import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Grupo } from '../models/Grupo'
import { ProgressBar } from 'react-native-paper'
import { Link, useRouter } from 'expo-router'
import Colors from '../common/constants/Colors'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Ionicons } from '@expo/vector-icons';
import { FrequenciaViewModel } from '../models/FrequenciaViewModel'
import { obterFrequenciaByGrupoIdByEstudanteId } from '../core/services/FrequenciaService'
import { useAuth } from '../contexts/AuthContext'
import { handleError } from '../http/API'

const {width} = Dimensions.get('screen')


const ListaGrupo = (grupo: Grupo) => {
  const router = useRouter()
  const { estudanteId } = useAuth().authState.userData
  const [frequency, setFrequency] = useState<FrequenciaViewModel>()

  useEffect(() => {
    (async() => {
      try{
        const data = await obterFrequenciaByGrupoIdByEstudanteId(grupo.id, estudanteId)
        setFrequency(data)
      } catch (error){
        handleError(error)
      }
    })()

  },[grupo])


  return (
    <View style={styles.mainCardContainer} >
      {frequency &&
        <TouchableOpacity onPress={() => router.push(`/ucs/${grupo.id}`)}>
          <View style={[styles.cardContainer, Platform.OS === "android" ? styles.cardContainerAndroid : styles.cardContainerIos]}>
            <View style={styles.cardHeaderContainer}>
              <Text style={styles.cardTitle} numberOfLines={1} adjustsFontSizeToFit={false}>
                {grupo.unidadeCurricular.nome}
              </Text>
              <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Ionicons name="school-outline" size={20} color="black" />
                <Text>
                  Módulo {grupo.unidadeCurricular.numeroModulo}
                </Text>
              </View>
            </View>
            <View style={styles.cardInfoContainer}>
              <View style={styles.progressStats}>
                <CircularProgress
                  value={30}
                  radius={30}
                  inActiveStrokeColor={'#2ecc71'}
                  inActiveStrokeOpacity={0.2}
                  progressValueColor={'#000'}
                  valueSuffix={'%'}
                  rotation={180}
                />
                <Text style={styles.progressInfo}>
                  Meu progresso
                </Text>
              </View>
              <View style={styles.progressStats}>
                <CircularProgress
                  value={60}
                  radius={30}
                  inActiveStrokeColor={'#2ecc71'}
                  inActiveStrokeOpacity={0.2}
                  progressValueColor={'#000'}
                  valueSuffix={'%'}
                  rotation={180}
                />
                <Text style={styles.progressInfo}>
                  Progresso UC
                </Text>
              </View>
              <View style={styles.progressStats}>
                <CircularProgress
                  value={parseInt(frequency.frequencia)}
                  radius={30}
                  inActiveStrokeColor={'#2ecc71'}
                  inActiveStrokeOpacity={0.2}
                  progressValueColor={'#000'}
                  valueSuffix={'%'}
                  rotation={180}
                />
                <Text style={styles.progressInfo}>
                  Frequência
                </Text>
              </View>
            </View>
          </View>

        </TouchableOpacity>
      }
      </View>
  )
}

export default ListaGrupo

const styles = StyleSheet.create({
  mainCardContainer: {
    marginVertical: 8,
    paddingHorizontal: width*0.08,
  },
  cardContainer: {
    padding: 15,
    backgroundColor: Colors.light.cardBackground,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    borderRadius: 15,
    gap: 8,
    
  },
  cardContainerIos: {
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardContainerAndroid: {
    elevation: 5
  },
  cardHeaderContainer:{
    gap: 5,
  },
  cardInfoContainer :{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardTitle: {
    fontWeight:'600',
    fontSize: 20,
  },
  progressInfo: {
    //marginTop: 5,
  },
  progressStats: {
    alignItems: 'center',
  }
})