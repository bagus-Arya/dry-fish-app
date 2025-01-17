import { StyleSheet, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');

const tutorialData = [
  {
    id: 1,
    title: "Selamat Datang Dryfiners",
    description: "Yuk, belajar cara mengeringkan ikan dengan teknologi.",
    image: require('@/assets/images/2.png'),
    steps: [
      "Siapin dulu alat dan bahannya.",
      "Pilih ikan yang mau dikeringkan.",
      "Pastikan alat dan bahan sudah siap.",
      "Ikan fillet siap di pajang didalam alat.",
      "Jangan lupa atur dulu titik nol timbangannya.",
      "Setalah itu baru taruh ikan fillet didalam alat.",
      "Kamu bisa tinggal sambil ngerjain aktifitas lain.",
      "Kalo udah kering langsung diangkat ya, nanti malah jelek lo hasilnya."
    ]
  },
  {
    id: 2,
    title: "Ini nih cara lain mengeringkan ikan.",
    description: "Cara traditional juga gak kalah menarik.",
    image: require('@/assets/images/1.png'),
    steps: [
      "Siapin dulu nampan atau alas untuk jemur ikan.",
      "Fillet ikan dan kasi garam secukupnya. Proses penggaraman bisa membantu memperlambat perkembangan bakteri.",
      "Setalah itu taruh di nampan yang sudah disiapin tadi.",
      "Jangan lupa dijemur dengan posisi bolak balik, biar keringnya merata.",
      "Cuaca hujan siap-siap angkat!, nanti rusak ikan yang sudah dikeringkan tadi."
    ]
  },
  {
    id: 3,
    title: "Gimana sih ikan fillet itu?",
    description: "Kalo kamu belum tau ikan fillet, diatas sudah ada lo gambarnya.",
    image: require('@/assets/images/3.png'),
    steps: [
      "Bikinnya gampang kok.",
      "Belah 2 di bagian tengah ikan.",
      "Lalu bersikan ikannya.",
      "Jangan lupa buang insangnya, kadang bikin alergi.",
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