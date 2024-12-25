import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Home() {
  return (
    <>
    <ThemedView style={styles.container}>
      <ThemedText type="title">This Home screen doesn't exist.</ThemedText>
      <Link href="/(routers)/auth/login" style={styles.link}>
        <ThemedText type="link">Login</ThemedText>
      </Link>
    </ThemedView>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});