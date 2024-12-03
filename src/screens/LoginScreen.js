import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';
import firebase from '../firebaseConfig'; // Adjust path if necessary
import theme from '../theme'; // Import custom theme
import { format } from 'date-fns';  // Importing the format function from date-fns


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const formatTimestamp = (timestamp) => {
    // Formatting the timestamp to a human-readable format using date-fns
    return format(new Date(timestamp), 'MMMM dd, yyyy HH:mm:ss');
  };
  

  const handleLogin = () => {
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
  
        firebase.database().ref(`users/${userId}`).once('value')
          .then(snapshot => {
            const userData = snapshot.val();
            if (userData) {
              const timestamp = new Date().toISOString();
              // Ensure userData contains firstName and lastName
              if (userData.firstName && userData.lastName) {
                firebase.database().ref(`logs/${userId}`).push({
                  event: 'Time In',
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  timestamp,
                });
              } else {
                console.error("User data incomplete:", userData);
                Alert.alert('Error', 'Incomplete user data!');
              }
  
              navigation.replace('Main', { user: userCredential.user });
            } else {
              Alert.alert('Error', 'User data not found!');
            }
          });
      })
      .catch(error => {
        Alert.alert('Login Failed', error.message);
      })
      .finally(() => setLoading(false));
  };

    return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Avatar.Icon
        size={64}
        icon="account"
        style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
      />
      <Text style={[styles.title, { color: theme.colors.text }]}>Login</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon name="email" />}
        theme={{ colors: { primary: theme.colors.primary } }}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        left={<TextInput.Icon name="lock" />}
        theme={{ colors: { primary: theme.colors.primary } }}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={[styles.button, { backgroundColor: theme.colors.accent }]}
        contentStyle={styles.buttonContent}
        labelStyle={{ color: theme.colors.onPrimary }}
      >
        Login
      </Button>

      <Text style={[styles.footer, { color: theme.colors.text }]}>
        Forgot your password? <Text style={[styles.link, { color: theme.colors.primary }]}>Reset it</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  avatar: {
    marginTop:-224,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: theme.roundness,
  },
  buttonContent: {
    height: 50,
  },
  footer: {
    marginTop: 16,
    textAlign: 'center',
  },
  link: {
    fontWeight: 'bold',
  },
});

export default LoginScreen;
