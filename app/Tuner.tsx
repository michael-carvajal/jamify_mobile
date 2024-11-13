// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// // import AudioStreaming from 'react-native-audio-streaming';
// import Pitchfinder from 'pitchfinder';

// // Initialize pitch detection with YIN algorithm
// const detectPitch = Pitchfinder.YIN({ sampleRate: 44100 });

// export default function App() {
//   const [frequency, setFrequency] = useState(null);
//   const [note, setNote] = useState('');
//   const [isTuning, setIsTuning] = useState(false);

//   useEffect(() => {
//     if (isTuning) {
//       startAudioStreaming();
//     } else {
//       stopAudioStreaming();
//     }

//     // Cleanup on component unmount
//     return () => stopAudioStreaming();
//   }, [isTuning]);

//   const startAudioStreaming = () => {
//     AudioStreaming.startStreaming((error, audioData) => {
//       if (error) {
//         console.error('Audio streaming error:', error);
//         return;
//       }

//       // Process audio data with pitchfinder
//       const float32Array = new Float32Array(audioData);
//       const detectedFrequency = detectPitch(float32Array);
//       if (detectedFrequency) {
//         setFrequency(detectedFrequency);
//         setNote(getNoteFromFrequency(detectedFrequency));
//       }
//     });
//   };

//   const stopAudioStreaming = () => {
//     AudioStreaming.stopStreaming();
//   };

//   const getNoteFromFrequency = (frequency) => {
//     const notes = [
//       { note: 'E', frequency: 82.41 },
//       { note: 'A', frequency: 110.0 },
//       { note: 'D', frequency: 146.83 },
//       { note: 'G', frequency: 196.0 },
//       { note: 'B', frequency: 246.94 },
//       { note: 'E', frequency: 329.63 },
//     ];

//     const closestNote = notes.reduce((prev, curr) =>
//       Math.abs(curr.frequency - frequency) < Math.abs(prev.frequency - frequency) ? curr : prev
//     );

//     return closestNote.note;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Guitar Tuner</Text>
//       <Button
//         title={isTuning ? 'Stop Tuning' : 'Start Tuning'}
//         onPress={() => setIsTuning(!isTuning)}
//       />
//       {frequency ? (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultText}>Frequency: {frequency.toFixed(2)} Hz</Text>
//           <Text style={styles.resultText}>Note: {note}</Text>
//         </View>
//       ) : (
//         <Text style={styles.resultText}>No frequency detected</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   resultContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   resultText: {
//     fontSize: 18,
//   },
// });
import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class Tuner extends Component {
  render() {
    return (
      <View>
        <Text>Tuner</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})