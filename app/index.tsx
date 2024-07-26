import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CharacterCard from "@/components/CharacterCard";
import FilterCharacter from "@/components/FilterCharacter";
import { Character } from "@/types/Character";

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{ status: string; location: string; origin: string }>({
    status: "",
    location: "",
    origin: "",
  });

  const fetchCharacters = () => {
    setLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacters(response.data.results);
        setAllCharacters(response.data.results); // Store all characters
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const applyFilters = (status: string, location: string, origin: string) => {
    setFilters({ status, location, origin });

    if (!status && !location && !origin) {
      setCharacters(allCharacters);
    } else {
      const filteredCharacters = allCharacters.filter((character) => {
        const matchesStatus = status
          ? character.status.toLowerCase().includes(status.toLowerCase())
          : true;
        const matchesLocation = location
          ? character.location.name.toLowerCase().includes(location.toLowerCase())
          : true;
        const matchesOrigin = origin
          ? character.origin.name.toLowerCase().includes(origin.toLowerCase())
          : true;
        return matchesStatus && matchesLocation && matchesOrigin;
      });

      setCharacters(filteredCharacters);
    }
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
          <View>
            <FilterCharacter onApplyFilters={applyFilters} filters={filters} />
            <FlatList
              data={characters}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <CharacterCard item={item} />}
            />
          </View>
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
