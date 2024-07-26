import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from "react-native";

interface FiltersProps {
  onApplyFilters: (status: string, location: string, origin: string) => void;
  filters: { status: string; location: string; origin: string };
}

const FilterCharacter: React.FC<FiltersProps> = ({ onApplyFilters, filters }) => {
  const [statusFilter, setStatusFilter] = useState<string>(filters.status);
  const [locationFilter, setLocationFilter] = useState<string>(filters.location);
  const [originFilter, setOriginFilter] = useState<string>(filters.origin);

  useEffect(() => {
    setStatusFilter(filters.status);
    setLocationFilter(filters.location);
    setOriginFilter(filters.origin);
  }, [filters]);

  const applyFilters = () => {
    onApplyFilters(statusFilter, locationFilter, originFilter);
  };

  const isButtonDisabled = !statusFilter && !locationFilter && !originFilter;

  return (
    <View style={styles.filterContainer}>
      <TextInput
        style={styles.input}
        placeholder="Filter by Status"
        value={statusFilter}
        onChangeText={setStatusFilter}
      />
      <TextInput
        style={styles.input}
        placeholder="Filter by Last Location"
        value={locationFilter}
        onChangeText={setLocationFilter}
      />
      <TextInput
        style={styles.input}
        placeholder="Filter by First Seen Location"
        value={originFilter}
        onChangeText={setOriginFilter}
      />
      <Button
        title="Apply Filters"
        onPress={applyFilters}
        disabled={isButtonDisabled}
        color={isButtonDisabled ? "#ccc" : "#007BFF"}
      />
      <View style={styles.tagsContainer}>
        {filters.status ? (
          <TouchableOpacity
            style={styles.tag}
            onPress={() => onApplyFilters("", filters.location, filters.origin)}
          >
            <Text style={styles.tagText}>
              {filters.status} <Text style={styles.tagRemove}>✖</Text>
            </Text>
          </TouchableOpacity>
        ) : null}
        {filters.location ? (
          <TouchableOpacity
            style={styles.tag}
            onPress={() => onApplyFilters(filters.status, "", filters.origin)}
          >
            <Text style={styles.tagText}>
              {filters.location} <Text style={styles.tagRemove}>✖</Text>
            </Text>
          </TouchableOpacity>
        ) : null}
        {filters.origin ? (
          <TouchableOpacity
            style={styles.tag}
            onPress={() => onApplyFilters(filters.status, filters.location, "")}
          >
            <Text style={styles.tagText}>
              {filters.origin} <Text style={styles.tagRemove}>✖</Text>
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#007BFF",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  tagText: {
    color: "#fff",
  },
  tagRemove: {
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default FilterCharacter;
