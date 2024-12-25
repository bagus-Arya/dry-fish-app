import React, { useState } from 'react';
import { 
  SafeAreaView, 
  TouchableOpacity,
  StyleSheet } from 'react-native';
import ListView from '@/components/OngoingActivity';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import StartSection from '@/components/ButtomSheet';

export default function Activity() {
  // State to manage which section is visible
  const [visibleSection, setVisibleSection] = useState<'devices' | 'ongoing' | 'done' | null>(null);
  const [showStartSection, setShowStartSection] = useState(false); 
  const [selectedItem, setSelectedItem] = useState<{ title: string; temp: string } | null>(null);

  // Sample data for each section
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
    { id: '7', title: 'Done 1', temp: '31' },
    { id: '8', title: 'Done 2', temp: '32' },
    { id: '9', title: 'Done 3', temp: '33' },
    { id: '10', title: 'Done 1', temp: '31' },
    { id: '11', title: 'Done 2', temp: '32' },
    { id: '12', title: 'Done 3', temp: '33' },
    { id: '13', title: 'Done 1', temp: '31' },
    { id: '14', title: 'Done 2', temp: '32' },
    { id: '15', title: 'Done 3', temp: '33' },
  ];

  const handleItemPress = (item: { id: string; title: string; temp: string }) => {
    setSelectedItem({ title: item.title, temp: item.temp });
    setShowStartSection(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <TouchableOpacity onPress={() => setVisibleSection('devices')}>
          <ThemedText type="kicker"
          style={{
            color: visibleSection === 'devices' ? '#73ccff' : '#007ac1', 
          }}
          >Devices</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setVisibleSection('ongoing')}>
          <ThemedText type="kicker"
            style={{
              color: visibleSection === 'ongoing' ? '#73ccff' : '#007ac1', 
            }}
          >On Going</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setVisibleSection('done')}>
          <ThemedText type="kicker"
            style={{
              color: visibleSection === 'done' ? '#73ccff' : '#007ac1', 
            }}
          >Done</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {visibleSection === 'ongoing' && <ListView data={ongoingData} onItemPress={handleItemPress} />}
      {visibleSection === 'devices' && <ListView data={devicesData} onItemPress={handleItemPress} />}
      {visibleSection === 'done' && <ListView data={doneData} onItemPress={handleItemPress} />}
      
      {/* Render the StartSection component */}
      <StartSection 
        visible={showStartSection} 
        onClose={() => {
          // Delay the state update to allow the animation to complete
          setTimeout(() => {
            setShowStartSection(false);
            setSelectedItem(null); // Reset selected item on close
          }, 300); // Match the duration of the closing animation
        }} 
        itemDetails={selectedItem} // Pass selected item details
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',  
    justifyContent: 'space-around', 
    padding: 12,
  },
});