import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, HandlerStateChangeEvent } from 'react-native-gesture-handler';
import BackDrop from './BackDrop';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CustomNativeEvent {
  translationY: number;
}

interface StartSectionProps {
  visible: boolean;
  onClose: () => void;
  itemDetails: { title: string; temp: string } | null;
}

const StartSection: React.FC<StartSectionProps> = ({ visible, onClose, itemDetails }) => {
  const translateY = useSharedValue(SCREEN_HEIGHT); // Start off-screen

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (visible) {
      // Animate up when visible
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      // Animate down when not visible
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 });
    }
  }, [visible]);

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const newValue = Math.max(event.nativeEvent.translationY, 0); // Access translationY from nativeEvent
    translateY.value = newValue; // Update position based on drag
  };

  const onGestureEnd = (event: HandlerStateChangeEvent) => {
    const { translationY } = event.nativeEvent as unknown as CustomNativeEvent; // Type assertion
    if (translationY > 100) {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 });
      onClose();
    } else {
      translateY.value = withTiming(0, { duration: 300 });
    }
  };

  if (!visible) return null; // Don't render if not visible

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <BackDrop
        topAnimation={translateY}
        openHeight={0}
        closeHeight={SCREEN_HEIGHT}
        backDropColor="black"
        close={onClose}
      />
      <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Device Details</Text>
            {itemDetails ? (
              <>
                <Text style={styles.description}>Title: {itemDetails.title}</Text>
                <Text style={styles.description}>Temperature: {itemDetails.temp} °C</Text>
              </>
            ) : (
              <Text style={styles.description}>No item selected.</Text>
            )}
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
  },
  lineContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  line: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default StartSection;