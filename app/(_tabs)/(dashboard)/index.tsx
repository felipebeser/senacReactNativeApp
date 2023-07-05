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

export default function ListaUC() {

  const idEstudante = useAuth().authState.userData.estudanteId;
  const [grupos, setGrupos] = useState<Grupo[]>([])

  useEffect(() => {
    ObterGruposByPeriodoAtivoByEstudanteId(idEstudante)
    .then(res => {
      setGrupos(res)
    })
    .catch(err => handleError(err));
  },[])


  return (
    <>
      {grupos ? (
        <View style={styles.container}>
          <FlashList
            ListHeaderComponent={
              <>
                <UserCard/>
                <ProximasAtividades/>
                <HeaderCursos />
              </>
            }
            data={grupos}
            estimatedItemSize={8}
            numColumns={1}
            renderItem={({ item }) => <ListaGrupo {...item} />}
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

const HeaderCursos = () => {
  return (
    <Text
      style={{
        paddingHorizontal: 30,
        marginTop: 10,
        fontSize: 24,
        fontWeight: "600",
        letterSpacing: -0.5,
      }}
    >
      Meus Cursos
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
