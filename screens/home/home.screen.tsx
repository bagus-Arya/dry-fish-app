import { 
  StyleSheet,
  View,
  Image,
  FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/useColorScheme';
import { User, logout } from '@/services/apiAuth';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  interface ListItem {
    id: string;
    title: string;
    description: string;
  }

  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

  const colorScheme = useColorScheme();
  
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
  
  useEffect(() => {
    const getUserId = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                setUserId(userData.id);
            } else {
                throw new Error('User  data not found');
            }
        } catch (err) {
            // console.error('Error retrieving user ID:', err);
            setError('Failed to retrieve user ID');
        }
    };

    getUserId();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear all stored data
      await AsyncStorage.clear();
      
      // Reset auth state
      setUser(null);
      
      // Navigate to login screen
      router.replace('/(routers)/auth/login');
      
    } catch (error) {
      console.log('Logout error:', error);
      // Force navigation to login even if error occurs
      router.replace('/(routers)/auth/login');
    }
  };
  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.headerContainer}>
          <LinearGradient
            colors={
              colorScheme === 'dark' 
                ? ['#0F2027', '#203A43', '#2C5364'] // Dark mode colors
                : ['#0F78BE', '#1BFFFF'] // Light mode colors
            }
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
                onPress={handleLogout}
              >
                <MaterialIcons name='logout' size={30} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* TODO: add image fail  */}
            
            <View style={styles.quickAccessContainer}>
            <TouchableOpacity style={styles.quickAccessItem}>
              <Image
                source={{
                  width: 20,
                  height: 30,
                  uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}
              ></Image>
              <ThemedText style={styles.quickAccessText}>Abon Ikan</ThemedText>
            </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickAccessItem}>
                <Image
                  source={{
                    width: 20,
                    height: 30,
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                  }}
                ></Image>
                <ThemedText style={styles.quickAccessText}>Ikan Kering</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickAccessItem}>
                <Image
                  source={{
                    width: 20,
                    height: 30,
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                  }}
                ></Image>
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