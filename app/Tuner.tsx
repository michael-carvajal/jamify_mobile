import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import Pitchfinder from 'pitchfinder';

// Set up Pitchfinder's YIN pitch detection algorithm
const detectPitch = Pitchfinder.YIN();

export default function Component() {
  const [frequency, setFrequency] = useState(null);
  const [note, setNote] = useState('');
  const [isTuning, setIsTuning] = useState(false);

  const startTuning = () => {
    setIsTuning(true);
    tuneContinuously();
  };

  const stopTuning = () => {
    setIsTuning(false);
  };

  // Continuously start short recordings for pitch detection
  const tuneContinuously = async () => {
    if (!isTuning) return;

    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        alert('Permission to access microphone is required!');
        return;
      }

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY);
      await recording.startAsync();

      // Stop after a short delay and analyze
      setTimeout(async () => {
        try {
          await recording.stopAndUnloadAsync();
          const uri = recording.getURI();
          await analyzeAudio(uri);
        } catch (error) {
          console.error('Error stopping recording:', error);
        } finally {
          tuneContinuously(); // Loop for continuous tuning
        }
      }, 1000); // Short recording length (1 second)
    } catch (error) {
      console.error('Error with continuous tuning:', error);
      stopTuning();
    }
  };

  // Analyze audio for pitch detection
  const analyzeAudio = async (uri) => {
    const audioData = await (await fetch(uri)).arrayBuffer();
    const float32Array = new Float32Array(audioData);

    const detectedFrequency = detectPitch(float32Array);
    if (detectedFrequency) {
      setFrequency(detectedFrequency);
      setNote(getNoteFromFrequency(detectedFrequency));
    }
  };

  // Map frequency to musical note
  const getNoteFromFrequency = (frequency) => {
    const notes = [
      { note: 'E', frequency: 82.41 },
      { note: 'A', frequency: 110.0 },
      { note: 'D', frequency: 146.83 },
      { note: 'G', frequency: 196.0 },
      { note: 'B', frequency: 246.94 },
      { note: 'E', frequency: 329.63 },
    ];

    const closestNote = notes.reduce((prev, curr) =>
      Math.abs(curr.frequency - frequency) < Math.abs(prev.frequency - frequency) ? curr : prev
    );

    return closestNote.note;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guitar Tuner</Text>
      <Button
        title={isTuning ? 'Stop Tuning' : 'Start Tuning'}
        onPress={isTuning ? stopTuning : startTuning}
      />
      {frequency ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Frequency: {frequency.toFixed(2)} Hz</Text>
          <Text style={styles.resultText}>Note: {note}</Text>
        </View>
      ) : (
        <Text style={styles.resultText}>No frequency detected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
  },
});
