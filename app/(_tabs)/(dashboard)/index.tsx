import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ObterGruposByPeriodoAtivoByEstudanteId } from "../../../core/services/GrupoService";
import ListaGrupo from "../../../components/ListaGrupo";
import Colors from "../../../common/constants/Colors";
import { useAuth } from "../../../contexts/AuthContext";
import ProximasAtividades from "../../../components/ProximasAtividades/ProximasAtividades";
import UserCard from "../../../components/Dashboard/UserCard";
import { handleError } from "../../../http/API";
import { useEffect, useState } from "react";
import { Grupo } from "../../../models/Grupo";
import { FrequenciaViewModel } from "../../../models/FrequenciaViewModel";
import { obterFrequenciaByEstudanteIdByPeriodoId } from "../../../core/services/FrequenciaService";

export default function ListaUC() {

  const idEstudante = useAuth().authState.userData.estudanteId;
  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [frequencia, setFrequencia] = useState<FrequenciaViewModel[]>([])

  useEffect(() => {
    Promise.all([ObterGruposByPeriodoAtivoByEstudanteId(idEstudante), obterFrequenciaByEstudanteIdByPeriodoId(idEstudante, 2)])
      .then(res => {
        setGrupos(res[0])
        setFrequencia(res[1])
      })
      .catch(err => handleError(err));
  },[idEstudante])


  return (
    <>
      {grupos ? (
        <View style={styles.container}>
          <FlashList
            ListHeaderComponent={
              <>
                <UserCard/>
                <ProximasAtividades/>
                <Text style={{paddingHorizontal: 30, marginTop: 10, fontSize: 24, fontWeight: "600", letterSpacing: -0.5}}>
                  Meus Cursos
                </Text>
              </>
            }
            data={grupos}
            estimatedItemSize={8}
            numColumns={1}
            renderItem={({ item }) => <ListaGrupo grupo={item} frequencias={frequencia} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center'}}>
          <ActivityIndicator/>
        </View>
      )}
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
