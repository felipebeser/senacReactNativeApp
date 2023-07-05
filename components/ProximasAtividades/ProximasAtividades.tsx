import { Feather, Entypo } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import Moment from 'moment';
import 'moment/locale/pt-br';
import { Dimensions, FlatList, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getAllAtividades } from '../../core/services/ativade/AtividadeService';
import { Atividade } from '../../models/Atividade';

const  { width } = Dimensions.get('screen');
const ProximasAtividades = () => {

  const router = useRouter();
  const { atividades } = getAllAtividades();

  const RenderAtividade = ( item: Atividade) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push(`/atividades/${item.id}`)}>
        <View style={[styles.cardContainer, Platform.OS === "android" ? styles.cardContainerAndroid : styles.cardContainerIos]}>
          <View style={styles.cardHeaderContainer}>
            <Feather name="book-open" color="orange" size={24}/>
            <View>
              <Text style={styles.title}>Prazo de entrega:</Text>
              <Text style={styles.title}>{Moment(item.dataFim).format("llll")}</Text>
            </View>
          </View>
          <View style={styles.cardContentContainer}>
            <Text numberOfLines={3} style={styles.text}>{item.descricao}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={styles.headerAtividadesPendentes}>
        <Text style={styles.headerTitle}>
          Atividades
        </Text>
        <Link href={'/atividades'} style={{backgroundColor: 'transparent', padding: 5}}>
          <Entypo name="list" size={24} color="orange" />
        </Link>
      </View>
      <View>
        <FlatList
          data={atividades}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RenderAtividade {...item} />}
          snapToAlignment="start"
        />
      </View>
    </View>
  );
};

export default ProximasAtividades;

const styles = StyleSheet.create({
  headerAtividadesPendentes: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: width*0.08,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 15,
    fontWeight: '600'
  },
  container: {
    width: width,
    paddingHorizontal: width*0.08,
  },
  cardContainer: {
    height: width*0.35,
    gap: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
  },
  cardContainerIos: {
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardContainerAndroid: {
    elevation: 5
  },
  cardHeaderContainer: {
    //backgroundColor: 'red',
    //paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardContentContainer: {

  },
  text: {}
});


