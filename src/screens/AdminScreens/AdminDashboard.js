import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import AnalyticsCard from '../../components/AnalyticsCard';
import InfoCard from '../../components/InfoCard';
import theme from '../../theme';
import QRScanner from '../../components/QRScanner';
import { Camera } from 'expo-camera';

const AdminDashboard = () => {
  const [hasPermission, setHasPermission] = useState(null);

  // Handle camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleScan = (scannedData) => {
    console.log("Scanned Data: ", scannedData);
    // Optionally handle the scanned data (e.g., show it on the screen or add it to a list)
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No access to camera. Please enable camera permissions in your settings.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      
      {/* Analytics Section */}
      <AnalyticsCard
        description="Detailed analytics of daily and monthly sales performance."
      />

      <View style={styles.cardContainer}>
        <InfoCard
          title="Low Stock Items"
          value="15"
          icon="alert-circle-outline"
          backgroundColor={theme.colors.primary}
        />
        <InfoCard
          title="Total Sales"
          value="$12,345"
          icon="currency-usd"
          backgroundColor={theme.colors.accent}
        />
      </View>

      {/* QRScanner Section */}
      <View style={styles.container}>
        <QRScanner onScan={handleScan} />
      </View>
        
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.colors.text,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: theme.colors.text,
  },
});

export default AdminDashboard;
