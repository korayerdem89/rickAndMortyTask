import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Keyboard,
} from "react-native";
import axios from "axios";
import CharacterCard from "@/components/CharacterCard";
import FilterCharacter from "@/components/FilterCharacter";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import "react-native-gesture-handler";

import { GestureHandlerRootView } from "react-native-gesture-handler";

interface Character {
  name: string;
  status: string;
  id: number;
  image: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
}

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{ status: string; location: string; origin: string }>({
    status: "",
    location: "",
    origin: "",
  });

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const applyFilters = (status: string, location: string, origin: string) => {
    setFilters({ status, location, origin });
    axios
      .get("https://rickandmortyapi.com/api/character", {
        params: {
          status: status || undefined,
          location: location || undefined,
          origin: origin || undefined,
        },
      })
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <FilterCharacter onApplyFilters={applyFilters} filters={filters} />
          <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CharacterCard item={item} />}
          />
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272B33",
    padding: 10,
    paddingTop: 50,
  },
});

export default App;
