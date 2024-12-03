import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../firebaseConfig';
import theme from '../../theme';

const ManageEmployeesScreen = ({ navigation }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = () => {
      firebase.database().ref('users')
        .orderByChild('role')
        .equalTo('employee')
        .on('value', snapshot => {
          const data = snapshot.val() || {};
          setEmployees(Object.entries(data).map(([id, user]) => ({ id, ...user })));
        });
    };

    fetchEmployees();
  }, []);

  const handleEmployeeClick = (employee) => {
    navigation.navigate('EmployeeLogs', { employee });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.employeeCard} onPress={() => handleEmployeeClick(item)}>
            <Text style={styles.employeeName}>{item.firstName} {item.lastName}</Text>
          </TouchableOpacity>
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
  employeeCard: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
});

export default ManageEmployeesScreen;
