import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface ListViewProps {
  data: Array<{ 
    id: string; 
    title: string; 
    temp: string;
  }>;
  onItemPress?: (item: { id: string; title: string; temp: string }) => void; // Optional prop for item press handling
}

const ListView: React.FC<ListViewProps> = ({ data, onItemPress }) => {
  const renderItem = ({ item }: { item: { id: string; title: string; temp: string } }) => (
    <TouchableOpacity onPress={() => onItemPress && onItemPress(item)} style={styles.item}>
      <ThemedText type="body">{item.title}</ThemedText>
      <ThemedText type="body">{item.temp} °C</ThemedText>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#38b6ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});

export default ListView;