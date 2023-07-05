import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Atividade } from "../../../../models/Atividade";
import { API } from "../../../../http/API";
import { CardTrilha } from "../../../../components/Cards/CardTrilha";
import { Modulo } from "../../../../models/Modulo";

export default function TrilhaCurso(){
  const route = useRouter();
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const params = useLocalSearchParams();
  const { id, descricao } = useLocalSearchParams();
  
  useEffect(() => {
    API.get(`Modulo`).then(({data}) => {
      setModulos(data)
    })
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={modulos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <CardTrilha data={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 7,
    // backgroundColor: '#fff',
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: "center",
  },
});
