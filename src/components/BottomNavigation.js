import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/AdminScreens/AdminDashboard';
import QRScanner from '../components/QRScanner';
import ManageEmployeesScreen from '../screens/AdminScreens/ManageEmployees';
import firebase from '../firebaseConfig';
import { Alert } from 'react-native';
import theme from '../theme';
import { format } from 'date-fns';  // Importing the format function from date-fns


const Tab = createBottomTabNavigator();

const BottomNavigation = ({ navigation, route }) => {
  const { user } = route.params;

  const handleLogout = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
  
      // Fetch the user's firstName and lastName before logging out
      firebase.database().ref(`users/${userId}`).once('value')
        .then(snapshot => {
          const userData = snapshot.val();
          const timestamp = new Date().toISOString();
          
          // If firstName and lastName are available, use them, else log as "Unknown"
          const firstName = userData?.firstName || 'Unknown';
          const lastName = userData?.lastName || '';
  
          // Add Time Out log
          firebase.database().ref(`logs/${userId}`).push({
            event: 'Time Out',
            firstName,
            lastName,
            timestamp,
          });
  
          firebase.auth().signOut()
            .then(() => {
              navigation.replace('Login');
            })
            .catch(error => {
              console.error('Logout failed:', error.message);
            });
        });
    } else {
      console.error('No user is currently logged in.');
    }
  };
  
  // Helper Function to Format Time
  
  
    
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'QR Scanner') iconName = 'qr-code-scanner';
          else if (route.name === 'Logout') iconName = 'logout';

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="QR Scanner" component={QRScanner} />
      <Tab.Screen
  name="Manage Employees"
  component={ManageEmployeesScreen}
  options={{ tabBarIcon: ({ color, size }) => <MaterialIcons name="people" size={size} color={color} /> }}
  listeners={{
    tabPress: (e) => {
      if (user.role !== 'super admin' && user.role !== 'admin') {
        e.preventDefault();
        Alert.alert('Access Denied', 'You do not have permission to access this screen.');
      }
    },
  }}
/>

      <Tab.Screen
        name="Logout"
        component={HomeScreen} // Placeholder; you handle logout here
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
