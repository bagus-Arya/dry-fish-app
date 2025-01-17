import { StyleSheet, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');

const tutorialData = [
  {
    id: 1,
    title: "Welcome to Fish Drying",
    description: "Learn the art of perfectly drying fish using modern techniques.",
    image: require('@/assets/images/2.png'),
    steps: [
      "Prepare your workspace and gather all necessary materials.",
      "Select fresh fish for drying.",
      "Ensure your drying equipment is clean and ready.",
      "Prepare your workspace and gather all necessary materials.",
      "Select fresh fish for drying.",
      "Ensure your drying equipment is clean and ready.",
      "Prepare your workspace and gather all necessary materials.",
      "Select fresh fish for drying.",
      "Ensure your drying equipment is clean and ready."
    ]
  },
  {
    id: 2,
    title: "Temperature Control",
    description: "Maintain optimal temperature between 35-40°C for best results.",
    image: require('@/assets/images/1.png'),
    steps: [
      "Set the drying chamber to the desired temperature.",
      "Use a thermometer to monitor the temperature regularly."
    ]
  },
  {
    id: 3,
    title: "Monitor Progress",
    description: "Track drying progress through our smart monitoring system.",
    image: require('@/assets/images/3.png'),
    steps: [
      "Check the fish every few hours.",
      "Adjust the temperature if necessary."
    ]
  },
  {
    id: 4,
    title: "Step 1: Prepare the Fish",
    description: "Clean the fish thoroughly and remove any scales.",
    image: require('@/assets/images/4.png'),
    steps: [
      "Rinse the fish under cold water.",
      "Use a knife to scrape off any scales."
    ]
  },
  {
    id: 5,
    title: "Step 2: Season the Fish",
    description: "Apply your favorite seasoning and let it marinate for at least 30 minutes.",
    image: require('@/assets/images/5.png'),
    steps: [
      "Mix your seasoning in a bowl.",
      "Rub the seasoning onto the fish evenly."
    ]
  }
];

export default function Learning() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.innerContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={e => {
            const offset = e.nativeEvent.contentOffset.x;
            setCurrentIndex(Math.round(offset / width));
          }}
          scrollEventThrottle={16}
        >
          {tutorialData.map((item) => (
            <ThemedView key={item.id} style={styles.slide}>
              <Image source={item.image} style={styles.image} />
              <ThemedText type='titleLearning'>{item.title}</ThemedText>
              <ThemedText type='description'>{item.description}</ThemedText>
              
              {/* Display Steps in a Scrollable View */}
              <ScrollView style={styles.stepsContainer}>
                <ThemedText type='stepsTitle'>Steps:</ThemedText>
                {item.steps.map((step, index) => (
                  <ThemedText key={index} type='stepsDescription'>
                    {index + 1}. {step}
                  </ThemedText>
                ))}
              </ScrollView>
            </ThemedView>
          ))}
        </ ScrollView>
        
        <ThemedView style={styles.pagination}>
          {tutorialData.map((_, index) => (
            <ThemedView
              key={index}
              style={[
                styles.paginationDot,
                currentIndex === index && styles.paginationDotActive
              ]}
            />
          ))}
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 20,
  },
  stepsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    width: '100%',
    maxHeight: 200, 
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#38b6ff',
    width: 16,
  },
});