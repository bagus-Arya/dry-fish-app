import React, { useState } from 'react';
import { 
  SafeAreaView, 
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ListView from '@/components/OngoingActivity';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import StartSection from '@/components/ButtomSheet';
import { useColorScheme } from '@/hooks/useColorScheme';
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
  const colorScheme = useColorScheme();
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
    { id: '1', title: 'AF123', temp: '33' },
  ];

  const ongoingData = [
    { id: '1', title: 'AF123', temp: '28' },
  ];

  const doneData = [
    { id: '1', title: 'AF123', temp: '31' },
  ];

  const handleItemPress = (item: { id: string; title: string; temp: string }) => {
    setSelectedItem({ title: item.title, temp: item.temp });
    setShowStartSection(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={
          colorScheme === 'dark' 
            ? ['#0F2027', '#203A43', '#2C5364'] // Dark mode colors
            : ['#0F78BE', '#1BFFFF'] // Light mode colors
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {sections.map((section, index) => (
          <TouchableOpacity 
            key={section}
            onPress={() => {
              setVisibleSection(section);
              translateX.value = withSpring(-index * SCREEN_WIDTH, {
                damping: 20,
                stiffness: 90
              });
            }}
            style={[
              styles.sectionButton,
              visibleSection === section && styles.activeSectionButton
            ]}
          >
            <ThemedText 
              style={[
                styles.sectionText,
                visibleSection === section ? 
                  styles.activeSectionText : 
                  styles.inactiveSectionText
              ]}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </LinearGradient>

      <GestureHandlerRootView style={styles.gestureContainer}>
        <PanGestureHandler 
          activeOffsetX={[-10, 10]}
          failOffsetY={[-5, 5]} 
          onGestureEvent={gestureHandler}
        >
          <Animated.View style={[styles.contentContainer, animatedStyle]}>
            {sections.map((section, index) => (
              <ThemedView key={section} style={styles.pageContainer}>
                <ListView 
                  data={
                    section === 'devices' ? devicesData :
                    section === 'ongoing' ? ongoingData :
                    doneData
                  } 
                  onItemPress={handleItemPress} 
                />
              </ThemedView>
            ))}
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>

      <StartSection 
        visible={showStartSection} 
        onClose={() => {
          setShowStartSection(false);
          setSelectedItem(null);
        }} 
        itemDetails={selectedItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden'
  },
  gestureContainer: {
    flex: 1,
    overflow: 'hidden'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    width: SCREEN_WIDTH * 3,
  },
  pageContainer: {
    width: SCREEN_WIDTH - 32,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  sectionButton: {
    padding: 10,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center'
  },
  activeSectionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  sectionText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.25
  },
  activeSectionText: {
    color: '#ffffff'
  },
  inactiveSectionText: {
    color: '#E1F5FE'
  }
});