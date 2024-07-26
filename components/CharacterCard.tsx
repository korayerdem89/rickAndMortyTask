import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Character } from "@/types/Character";

interface CharacterCardProps {
  item: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Last Known Location: {item.location.name}</Text>
        <Text>First Seen in: {item.origin.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CharacterCard;
