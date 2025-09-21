import Header from "@/src/components/Header";
import ThemeTextInput from "@/src/components/ThemeTextInput";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SchedulesCard from "./components/SchedulesCard";
import useSchedules from "./useSchedules";

function SchedulesView() {
  const { 
    search,
    isLoading, 
    filteredSchedules, 
    askToDeleteMovieSchedules, 
    setSearch 
  } = useSchedules();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Filmes Agendados" />

      <View style={styles.actionsBar}>
        <ThemeTextInput
          placeholder="Pesquisar filme"
          onChangeText={setSearch}
        />
      </View>

      <View style={[styles.main, isLoading && styles.mainLoading]}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FF8C00" />
        ) : (
          <FlatList
            data={filteredSchedules}
            renderItem={({ item }) => (
              <SchedulesCard
                item={item}
                onDelete={askToDeleteMovieSchedules}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={() => {
              return isLoading
                ? null
                : (
                  <Text style={styles.emptyText}>
                    {search
                      ? `Nenhum filme agendado para "${search}"`
                      : 'Nenhum filme agendado'}
                  </Text>
                );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default SchedulesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  actionsBar: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  main: {
    flex: 1,
    padding: 24
  },
  mainLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '700',
    color: "#FFF"
  },
})
