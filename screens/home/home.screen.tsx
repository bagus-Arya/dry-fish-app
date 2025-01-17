import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/useColorScheme';
import { User, logout } from '@/services/apiAuth';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchDeviceList, DeviceResponse, DeviceLogs } from '@/services/apiLogMachine';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser ] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deviceData, setDeviceData] = useState<DeviceLogs[]>([]);
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          setUser (JSON.parse(userData));
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const loadDeviceData = async () => {
      try {
        const response: DeviceResponse = await fetchDeviceList();
        setDeviceData(response.data);
      } catch (err) {
        setError('Failed to fetch device data');
      } finally {
        setLoading(false);
      }
    };

    loadDeviceData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      await logout();
      router.replace('/(routers)/auth/login'); 
    } catch (error) {
      router.replace('/(routers)/auth/login'); 
    }
  };

  const renderItem = ({ item }: { item: DeviceLogs }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <ThemedText type='subtitle' style={styles.itemTitle}>{item.machine_ID}</ThemedText>
        <ThemedText style={styles.itemDescription}>Temp: {item.temp}°C, Humidity: {item.humid}%</ThemedText>
        <ThemedText style={styles.itemDescription}>Weight: {item.weight}g, Light: {item.light}lux</ThemedText>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#666" />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </View>
    );
  }

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
                <ThemedText style={styles.headerText} type="subtitle">Hi, {user ? user.name : 'Guest'}</ThemedText>
                <ThemedText style={styles.headerText} type="subtitle">{user ? user.email : 'Please log in'}</ThemedText>
              </View>
              <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={handleLogout}
              >
                <MaterialIcons name='logout' size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ThemedView>

        <FlatList
          data={deviceData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()} // Ensure the key is a string
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});