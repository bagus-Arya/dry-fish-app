import { 
  StyleSheet,
  View,
  Image,
  FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  interface ListItem {
    id: string;
    title: string;
    description: string;
  }
  
  const data: ListItem[] = [
    { id: '1', title: 'Ikan tongkol Rp.10,000', description: 'harga ikan melonjak' },
    { id: '2', title: 'Item 2', description: 'Description 2' },
    { id: '3', title: 'Item 3', description: 'Description 3' },
    { id: '4', title: 'Item 4', description: 'Description 4' },
    { id: '5', title: 'Item 5', description: 'Description 5' },
    { id: '6', title: 'Item 1', description: 'Description 1' },
    { id: '7', title: 'Item 2', description: 'Description 2' },
    { id: '8', title: 'Item 3', description: 'Description 3' },
    { id: '9', title: 'Item 4', description: 'Description 4' },
    { id: '10', title: 'Item 5', description: 'Description 5' },
  ];
  
  const renderItem = ({ item }: { item: ListItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <ThemedText type='subtitle' style={styles.itemTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#666" />
    </View>
  );
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.headerContainer}>
          <LinearGradient
            colors={['#38b6ff', '#1E90FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.welcomeHeader}>
              <View>
                <ThemedText style={styles.headerText} type="subtitle">Hi, heo</ThemedText>
                <ThemedText style={styles.headerText} type="subtitle">heo@mail.com</ThemedText>
              </View>
              <TouchableOpacity 
                style={styles.logoutButton} 
              >
                <MaterialIcons name='logout' size={30} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* TODO: add image fail  */}
            
            <View style={styles.quickAccessContainer}>
              <TouchableOpacity style={styles.quickAccessItem}>
                <MaterialIcons name="add-circle-outline" size={30} color="#38b6ff" />
                <ThemedText style={styles.quickAccessText}>Abon Ikan</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickAccessItem}>
                <MaterialIcons name="list-alt" size={30} color="#38b6ff" />
                <ThemedText style={styles.quickAccessText}>Ikan Kering</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickAccessItem}>
                <MaterialIcons name="analytics" size={30} color="#38b6ff" />
                <ThemedText style={styles.quickAccessText}>Ikan Segar</ThemedText>
              </TouchableOpacity>
            </View>

          </LinearGradient>
        </ThemedView>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
},
  gradient: {
    padding: 20,
    paddingTop: 40,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 15,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickAccessItem: {
    alignItems: 'center',
    padding: 20,
    height: 100,
    justifyContent: 'center',
  },
  quickAccessText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },  
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    marginBottom: 4,
    color: '#666',
  },
  itemDescription: {
    color: '#666',
  },
});