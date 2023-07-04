import { Dimensions, StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import MenuLink from '../../../components/Menu/MenuLink'


const {width} = Dimensions.get('window')

const Menu = () => {

  return (
    <View style={styles.container}>

      <MenuLink name='Comunidades' route='/forum'/>
      <MenuLink name='Badges' route='/badges'/>
      <MenuLink name='Senac Coin' route='/senacCoin'/>
      <MenuLink name='Perfil' route='/EditarPerfil'/>
      <MenuLink name='Configurações' route='/Configuracoes'/>
      <MenuLink name='Ajuda' route='/forum/Comunidades'/>
      <MenuLink name='Requerimento Web' route='/RequerimentoWeb'/>
      <MenuLink name='Feed de Notícias' route='/noticias/Feed'/>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    padding: width*0.04,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

})
