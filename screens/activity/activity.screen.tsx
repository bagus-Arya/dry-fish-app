import React, { useState } from 'react';
import { 
  SafeAreaView, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View 
} from 'react-native';
import ListView from '@/components/OngoingActivity';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import StartSection from '@/components/ButtomSheet';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Activity() {
  const [visibleSection, setVisibleSection] = useState<'devices' | 'ongoing' | 'done'>('devices');
  const [showStartSection, setShowStartSection] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ title: string; temp: string } | null>(null);

  const translateX = useSharedValue(0);
  const sections: ('devices' | 'ongoing' | 'done')[] = ['devices', 'ongoing', 'done'];

  const updateSection = (section: 'devices' | 'ongoing' | 'done') => {
    setVisibleSection(section);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      const newValue = ctx.startX + event.translationX;
      const minTranslate = -SCREEN_WIDTH * (sections.length - 1);
      translateX.value = Math.max(Math.min(newValue, 0), minTranslate);
    },
    onEnd: (event) => {
      const currentIndex = Math.round(-translateX.value / SCREEN_WIDTH);
      const newSection = sections[currentIndex];
      translateX.value = withSpring(-currentIndex * SCREEN_WIDTH);
      runOnJS(updateSection)(newSection);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const devicesData = [
    { id: '1', title: 'Device 1', temp: '25' },
    { id: '2', title: 'Device 2', temp: '26' },
    { id: '3', title: 'Device 3', temp: '27' },
  ];

  const ongoingData = [
    { id: '1', title: 'Ongoing 1', temp: '28' },
    { id: '2', title: 'Ongoing 2', temp: '29' },
    { id: '3', title: 'Ongoing 3', temp: '30' },
  ];

  const doneData = [
    { id: '1', title: 'Done 1', temp: '31' },
    { id: '2', title: 'Done 2', temp: '32' },
    { id: '3', title: 'Done 3', temp: '33' },
    { id: '4', title: 'Done 1', temp: '31' },
    { id: '5', title: 'Done 2', temp: '32' },
    { id: '6', title: 'Done 3', temp: '33' },
    { id: '7', title: 'Done 1', temp: '31' },
    { id: '8', title: 'Done 2', temp: '32' },
    { id: '9', title: 'Done 3', temp: '33' },
  ];

  const handleItemPress = (item: { id: string; title: string; temp: string }) => {
    setSelectedItem({ title: item.title, temp: item.temp });
    setShowStartSection(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        {sections.map((section, index) => (
          <TouchableOpacity 
            key={section}
            onPress={() => {
              setVisibleSection(section);
              translateX.value = withSpring(-index * SCREEN_WIDTH);
            }}
          >
            <ThemedText 
              type="kicker"
              style={{
                color: visibleSection === section ? '#73ccff' : '#007ac1',
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      <GestureHandlerRootView style={styles.gestureContainer}>
        <PanGestureHandler 
           activeOffsetX={[-10, 10]}
           failOffsetY={[-5, 5]} 
           onGestureEvent={gestureHandler}
        >
          <Animated.View style={[styles.contentContainer, animatedStyle]}>
            <View style={styles.pageContainer}>
              <ListView data={devicesData} onItemPress={handleItemPress} />
            </View>
            <View style={styles.pageContainer}>
              <ListView data={ongoingData} onItemPress={handleItemPress} />
            </View>
            <View style={styles.pageContainer}>
              <ListView data={doneData} onItemPress={handleItemPress} />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>

      <StartSection 
        visible={showStartSection} 
        onClose={() => {
          setTimeout(() => {
            setShowStartSection(false);
            setSelectedItem(null);
          }, 300);
        }} 
        itemDetails={selectedItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  gestureContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    width: SCREEN_WIDTH * 3,
  },
  pageContainer: {
    width: SCREEN_WIDTH,
  }
});