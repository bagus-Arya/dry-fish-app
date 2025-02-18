import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';

interface SpeedometerProps {
  value: number;
  maxValue: number;
}

const Speedometer: React.FC<SpeedometerProps> = ({ value, maxValue }) => {
  const angle = (value / maxValue) * 180;
  const needleX = 100 + 80 * Math.cos((angle - 90) * (Math.PI / 180));
  const needleY = 100 + 80 * Math.sin((angle - 90) * (Math.PI / 180));

  // Determine color based on temperature
  const getColor = (temp: number) => {
    if (temp < 20) return '#4287f5'; // Cool blue
    if (temp < 40) return '#a3d86b'; // Light green
    if (temp < 60) return '#f0c94c'; // Yellow
    return '#f54242'; // Hot red
  };

  const currentColor = getColor(value); // Get the color for the current value

  return (
    <View style={styles.container}>
      <Svg height="250" width="250">
        {/* Outer circle */}
        <Circle cx="100" cy="100" r="95" stroke="#e0e0e0" strokeWidth="2" fill="none" />
        
        {/* Background arc */}
        <Circle 
          cx="100" 
          cy="100" 
          r="90" 
          stroke="#f0f0f0" 
          strokeWidth="25" 
          fill="none" 
        />
        
        {/* Value arc */}
        <Circle
          cx="100"
          cy="100"
          r="90"
          stroke={currentColor}
          strokeWidth="25"
          fill="none"
          strokeDasharray={`${(value / maxValue) * 565}, 565`}
          strokeLinecap="round"
        />

        {/* Center circle */}
        <Circle cx="100" cy="100" r="15" fill="#333" />
        
        {/* Needle */}
        <Path
          d={`M100,100 L${needleX},${needleY}`}
          stroke="#333"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Temperature value in the center */}
        <SvgText x="100" y="130" fill={currentColor} fontSize="24" fontWeight="bold" textAnchor="middle">
          {value}°C
        </SvgText>
      </Svg>
      
      <View style={styles.valueContainer}>
        <View style={styles.markerContainer}>
          <Text style={styles.markerText}>0°C</Text>
          <Text style={styles.markerText}>{maxValue}°C</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 10,
  },
  valueContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  markerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  markerText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Speedometer;