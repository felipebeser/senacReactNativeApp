import "moment/locale/pt-br";

import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Fontawesome from '@expo/vector-icons/FontAwesome';

const { width } = Dimensions.get("screen");

export function CardTrilha({ data }) {
  const [isSelected, setSelection] = useState(false);

  function renderUnidadesCurriculares() {
    return data.unidadesCurriculares.map((item) => (
      <Text key={item.nome} style={styles.unidadecurricular}>
        {item.nome}
      </Text>
    ));
  }

  function Icone() {
    if (data.id !== 1) {
      // return <AntDesign name="lock" size={30} color="#F7941D" />;
      return <Fontawesome name="lock" size={30} color="#F7941D" />;
    } else if (data.id === 1) {
      // return <AntDesign name="unlock" size={30} color="#092C4C" />;
      return <Fontawesome name="unlock-alt" size={30} color="#092C4C" />
    }
  }

  function renderUnidadesCurriculares() {
    return data.unidadesCurriculares.map((item) => (
      <View style={{backgroundColor:'#000000'}}>
        <View style={{ backgroundColor:'#E0E0E0', paddingLeft: 8, marginTop: 1, justifyContent: "flex-start", alignItems:'center', flexDirection: "row", flex: 7 }}>
          <Text style={{justifyContent: "flex-start", flex: 7}}>
            {item.nome}
          </Text>
          <View style={{ justifyContent: "center", flex: 1}}>
            {Icone()}
          </View>
        </View>
      </View>
    ));
  }

  return (
    <View style={styles.container}>
      <View style={styles.timeline}>
        <View style={styles.parte1}>
          <View style={styles.circulo}></View>
          <View style={styles.linha}></View>
        </View>
        <View style={styles.parte2}>
          <Text style={styles.titulo}>{data.descricao}</Text>
          <Text style={styles.cargaHoraria}>
            Carga Horária: {data.cargaHoraria}
          </Text>
          <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
            <Text style={styles.descricao}>Unidades Curriculares</Text>
            <Text style={styles.descricao}>Status</Text>
          </View>
            {renderUnidadesCurriculares()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    flexDirection: "column",
    // paddingBottom: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    alignItems: "center",
    width: width - 20,
    marginBottom: 20,
  },
  timeline: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    padding: 5,
  },
  tituloTimeline: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 0,
    justifyContent: "center",
  },
  parte1: {
    justifyContent: "flex-start",
    alignItems: "center",
    // width: 32,
  },
  circulo: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: "#00315a",
    justifyContent: "center",
    alignItems: "center",
  },
  linha: {
    backgroundColor: "#C5C5C5",
    height: "100%",
    width: 3,
    justifyContent: "center",
  },
  parte2: {
    flex: 7,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginLeft: 10,
    elevation: 10,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#092C4C",
  },
  descricao: {
    fontSize: 18,
    color: "#000",
    marginTop: 10,
  },
  cargaHoraria: {
    fontSize: 15,
    color: "#828282",
  },
  unidadecurricular: {
    fontSize: 15,
    justifyContent: 'space-between',
    flex: 1
  },
});
