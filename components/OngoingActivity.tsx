import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface ListViewProps {
  data: Array<{ 
    id: string; 
    title: string; 
    temp: string;
  }>;
  onItemPress?: (item: { id: string; title: string; temp: string }) => void; 
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ListView: React.FC<ListViewProps> = ({ data, onItemPress }) => {
  const renderItem = ({ item }: { item: { id: string; title: string; temp: string } }) => (
    <TouchableOpacity 
      onPress={() => onItemPress && onItemPress(item)} 
      style={styles.itemContainer}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <View style={styles.titleContainer}>
          <ThemedText type="body" style={styles.itemTitle}>{item.title}</ThemedText>
          <View style={styles.tempContainer}>
            <ThemedText type="body" style={styles.itemTemp}>{item.temp}°C</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  itemContainer: {
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 8,
    borderRadius: 12,
    elevation: 2,
    overflow: 'hidden'
  },
  itemContent: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a'
  },
  tempContainer: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  itemTemp: {
    fontSize: 14,
    color: '#007ac1',
    fontWeight: '500'
  }
});

export default ListView;