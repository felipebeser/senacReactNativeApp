import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import Constants from 'expo-constants'
import * as Progress from 'react-native-progress';
import { MaterialIcons } from '@expo/vector-icons'
import { useAuth } from '../../contexts/AuthContext'
import { getUsuario, getUsuarioByUsuarioId } from '../../core/services/UsuarioService'
import { SenacCoin } from '../../models/SenacCoin'
import { fetchSenacCoin } from '../../core/services/api'
import { getAllBadges, getBadges } from '../../core/services/badge/BadgeService'
import { withDecay } from 'react-native-reanimated';
import { filtrarSenacCoinByUsuarioId, getSenacCoinByUsuarioId } from '../../core/services/SenacCoinService';
import { Usuario } from '../../models/Usuario';
import { Badge } from '../../models/Badge';

const UserCard = () => {

  const {usuarioId} = useAuth().authState.userData
  // const { usuario } = getUsuarioByUsuarioId(usuarioId)
  // const { badges } = getAllBadges()
  // const { senacCoin } = filtrarSenacCoinByUsuarioId(usuarioId)

  const [usuario, setUsuario] = useState<Usuario>()
  const [badges, setBadges] = useState<Badge[]>([])
  const [senacCoin, setSenacCoin] = useState<SenacCoin>()

  const router = useRouter();

  const otherBadgesNumber = badges.length - 3

  useEffect(() => {
      Promise.all([getUsuario(usuarioId), getBadges(), getSenacCoinByUsuarioId(usuarioId)])
        .then(response => {
          setUsuario(response[0]);
          setBadges(response[1]);
          setSenacCoin(response[2]);
        })

        .catch(e => console.log(e))

  },[usuarioId])


  return (
    (usuario && senacCoin && badges) ? (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.imagesContainer}>
            <Image
              style={styles.avatar}
              source={{ uri: 'data:image/png;base64,' + usuario.foto }}
            />
            <TouchableOpacity onPress={() => {router.push('/badges')}}>
              <View style={styles.badgesContainer}>
                {badges.slice(0,3)
                  .map(badge => (
                    <Image
                      key={badge.id}
                      source={{ uri: 'data:image/png;base64,' + badge.imagem }}
                      style={styles.badgeImage}
                    />
                  ))}
                <View style={styles.badgeNumber}>
                  <Text style={styles.badgeNumberText}>+{otherBadgesNumber}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name} adjustsFontSizeToFit numberOfLines={1}>{usuario.nomeCompleto}</Text>
            <TouchableOpacity onPress={() => {router.push('/senacCoin')}}>
              <Text style={styles.infoText}>
                Senac Coins: <Text style={styles.infoValue}>{senacCoin.saldo}</Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.infoText}>
              Nível: <Text style={styles.infoValue}>{usuario.status}</Text>
            </Text>
              <Text style={styles.infoProgress}>
                Progresso geral
              </Text>
              <Progress.Bar borderColor='white' color='#2ecc71' progress={0.4} width={100} />
          </View>
        </View>
      </View>
    )
    : <ActivityIndicator />

  )
}

export default UserCard

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 10,
  },
  cardContainer: {
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#02408D',
    borderRadius: 15,
    width: '90%',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imagesContainer: {
    alignItems: 'center',
    gap: 5
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  userInfo: {
    justifyContent: 'center',
    gap: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoText: {
    color: '#fff',
  },
  infoProgress: {
    fontSize: 12,
    color: '#F5F5F5'
  },
  infoValue: {
    fontWeight: '700',
    color: '#F7941D'
  },
  badgesContainer: {
    flexDirection: 'row',

  },
  badgeImage: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  badgeNumber: {
    backgroundColor: '#F7941D',
    borderRadius: 50,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -5,
    bottom: -10,
  },
  badgeNumberText: {
    color: '#fff',
  }

})