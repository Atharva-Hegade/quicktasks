import { View, Text, StyleSheet } from 'react-native';
import { useTasks } from '../../context/TaskContext';

export default function Stats() {
  const { tasks } = useTasks();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Productivity Stats</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Total Tasks Created</Text>
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#111' }}>
          {tasks.length}
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111'
  },
  subtitle: {
    fontSize: 16,
    color: '#555'
  },
  card: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3
  }
});

