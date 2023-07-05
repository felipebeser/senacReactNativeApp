import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  CheckBox,
  Dimensions,
} from "react-native";
import Moment from 'moment';
import 'moment/locale/pt-br';
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("screen");

export function CardAtividade({ data }) {
  const { push } = useRouter();
  const navigation = useNavigation();

  const [isSelected, setSelection] = useState(false);

  const descricao = data.descricao;

  const image = `data:image/png;base64,${data.blob}`;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => push(`/atividades/${data.id}`)}
    >
        <View
          style={[
            styles.cardContainer,
            Platform.OS === "android"
              ? styles.cardContainerAndroid
              : styles.cardContainerIos,
          ]}
        >
          <View style={styles.cardHeaderContainer}>
            <Feather name="book-open" color="orange" size={30} />
            <View>
              <Text style={styles.title}>Prazo de entrega:</Text>
              <Text style={styles.title}>
                {Moment(data.dataFim).format("llll")}
              </Text>
            </View>
          </View>
          <View style={styles.cardContentContainer}>
            <Text numberOfLines={3} style={styles.text}>
              {data.descricao}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    paddingHorizontal: 10,
    // paddingHorizontal: width * 0.08,
  },
  cardContainer: {
    height: width * 0.330,
    gap: 5,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
  },
  cardContainerIos: {
    shadowOffset: { width: 2, height: 4 },
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
  title: {
    fontSize: 15,
    fontWeight: '600'
  },
});
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, CheckBox, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Feather } from '@expo/vector-icons';

// export function CardAtividade({ data }) {
//     const navigation = useNavigation();

//     const [isSelected, setSelection] = useState(false);

//     const id = data.id;
//     const descricao = data.descricao;

//     const image = `data:image/png;base64,${data.blob}`;

//     return (
//         <TouchableOpacity style={styles.container}>
//             <View style={styles.start}>
//                 <TouchableOpacity>
//                     <Feather
//                         name="book-open"
//                         color="orange"
//                         size={20}
//                         style={{marginRight: 15, elevation: 10}}
//                     />
//                 </TouchableOpacity>
//                 <Text style={styles.text}>
//                     {data.descricao}
//                 </Text>
//             </View>

//             <View style={styles.end}>
//                 <TouchableOpacity style={styles.checkBox}></TouchableOpacity>
//             </View>
//         </TouchableOpacity>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#205395',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         // marginBottom: 12,
//         marginTop: 4,
//         paddingVertical: 12,
//         paddingHorizontal: 12,
//         borderRadius: 4,
//         borderWidth: 1,
//         borderColor: '#8a8a8a',
//     },
//     text: {
//         color: '#FFF',
//         elevation: 10,
//         // fontSize: 15,
//         // fontWeight: 'bold'
//     },
//     start: {
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         flexDirection: 'row',
//     },
//     end: {
//         width: 40,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         flexDirection: 'row',
//     },
//     checkBox: {
//         width: 15,
//         height: 15,
//         borderWidth: 1,
//         borderColor: '#FFF',
//         backgroundColor: '#FFF'
//     },
//     cardImage:{
//         width: 30,
//         height: 30,
//         marginRight: 15,
//     }
// });
