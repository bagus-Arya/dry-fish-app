import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { isLoggedIn } from '@/services/apiAuth';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const authenticated = await isLoggedIn();
      setIsAuthenticated(authenticated);
      setAuthChecked(true);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);  

  useEffect(() => {
    if (!authChecked || !loaded) return;

    const inAuthGroup = segments[0] === '(routers)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!isAuthenticated && inTabsGroup) {
      router.replace('/(routers)/auth/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)'); 
    }
  }, [isAuthenticated, segments, authChecked, loaded]); 

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !authChecked) {
    return null; 
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="(tabs)" 
          redirect={!isAuthenticated} 
        />
        <Stack.Screen 
          name="(routers)/auth/login" 
          redirect={isAuthenticated} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}