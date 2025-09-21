import Header from "@/src/components/Header";
import ThemeTextInput from "@/src/components/ThemeTextInput";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useHome from "./useHome";

function HomeView() {
  const { 
    movies,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    renderItem,
    debounce,
   } = useHome();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Filmes" />

      <View style={styles.actionsBar}>
        <ThemeTextInput
          placeholder="Pesquisar filme"
          onChangeText={debounce}
        />
      </View>

      <View style={[styles.main, isLoading && styles.mainLoading]}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FF8C00" />
        ) : (
          <FlatList
            data={movies}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contentContainer}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => {
              return isFetchingNextPage
                ? <ActivityIndicator size="large" color="#FF8C00" />
                : null;
            }}
            ListEmptyComponent={() => {
              return isLoading ? null : <Text style={styles.emptyText}>Nenhum filme encontrado</Text>;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default HomeView;

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
