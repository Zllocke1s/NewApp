import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 48}}>New SEMO App</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 48,
    fontWeight: 'bold',
    backgroundColor: '#C8102E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
