import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import firebase from '../firebaseConfig';
import theme from '../theme';

const EmployeeLogsScreen = ({ route }) => {
  const { employee } = route.params;
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = () => {
      firebase.database().ref(`logs/${employee.id}`)
        .on('value', snapshot => {
          const data = snapshot.val() || {};
          setLogs(Object.values(data));
        });
    };

    fetchLogs();
  }, [employee.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Logs for {employee.firstName} {employee.lastName}</Text>
      <FlatList
        data={logs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.logCard}>
            <Text style={styles.logText}>{item.event} - {item.timestamp}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  logCard: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
  },
  logText: {
    color: theme.colors.textPrimary,
  },
});

export default EmployeeLogsScreen;
