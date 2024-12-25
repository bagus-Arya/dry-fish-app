import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import ListView from '@/components/OngoingActivity';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function Activity() {
  // State to manage which section is visible
  const [visibleSection, setVisibleSection] = useState<'devices' | 'ongoing' | 'done' | null>(null);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <TouchableOpacity onPress={() => setVisibleSection('devices')}>
          <ThemedText type="kicker">Devices</ThemedText>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={() => setVisibleSection('ongoing')}>
          <ThemedText type="kicker">On Going</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setVisibleSection('done')}>
          <ThemedText type="kicker">Done</ThemedText>
        </TouchableOpacity>
      </ThemedView>

        {visibleSection === 'ongoing' && <ListView data={ongoingData} />}
        {visibleSection === 'devices' && <ListView data={devicesData} />}
        {visibleSection === 'done' && <ListView data={doneData} />}
 
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