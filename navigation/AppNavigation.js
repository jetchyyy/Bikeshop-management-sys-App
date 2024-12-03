import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../src/screens/LoginScreen'; 

{/*Admin Screens */}
import AdminDashboard from '../src/screens/AdminScreens/AdminDashboard'; 
import EmployeeLogsScreen from '../src/screens/AdminScreens/EmployeesLogsScreen';
import ManageEmployeesScreen from '../src/screens/AdminScreens/ManageEmployees';

{/*Employee Screens */}
import EmployeeDashboard from '../src/screens/EmployeeScreens/EmployeeDashboard';  

{/*Components Screens */}
import QRScanner from '../src/components/QRScanner';
import ItemListScreen from '../src/components/ItemListScreen';


const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />

        {/*Admin Screens */}
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="EmployeeLogsScreen" component={EmployeeLogsScreen} />
        <Stack.Screen name="ManageEmployeesScreen" component={ManageEmployeesScreen} />
        

        {/*Employee Screens */}
        <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} />



        {/*Components Screens */}
        <Stack.Screen name="QRScanner" component={QRScanner} />
         <Stack.Screen name="ItemList" component={ItemListScreen} />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
