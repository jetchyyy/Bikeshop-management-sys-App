import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, FlatList } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; // Import CameraView from expo-camera
import { TextInput, Dialog, Portal, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme';

const QRScanner = () => {
  const [scanned, setScanned] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [scannedItems, setScannedItems] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [facing, setFacing] = useState('back'); // Use string 'back' instead of CameraType.Back
  const [permission, requestPermission] = useCameraPermissions(); // Request camera permissions
  const navigation = useNavigation();

  useEffect(() => {
    if (permission?.granted === false) {
      requestPermission(); // Request permission if not granted yet
    }
  }, [permission]);

  const handleBarcodeScanned = ({ data }) => {
    setScanned(true);
    setCurrentItem({ barcode: data });
    setDialogVisible(true); // Show the dialog to confirm quantity
  };

  const handleConfirmQuantity = () => {
    if (quantity && !isNaN(quantity)) {
      setScannedItems(prevItems => [
        ...prevItems,
        { barcode: currentItem.barcode, quantity: parseInt(quantity) }
      ]);
      setQuantity('');
      setDialogVisible(false); // Close the dialog
      setScanned(false); // Allow new scans
    } else {
      Alert.alert('Invalid Quantity', 'Please enter a valid quantity.');
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Item: {item.barcode}</Text>
      <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
    </View>
  );

  if (!permission) {
    return <Text>Requesting camera permission...</Text>; // Show loading while requesting permission
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    ); // If permission not granted, show prompt
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing={facing}
          onBarCodeScanned={handleBarcodeScanned}
        >
          <View style={styles.overlay}>
            <View style={styles.centeredView}>
              <Text style={styles.overlayText}>Scan a QR Code</Text>
            </View>
          </View>
        </CameraView>
      ) : (
        <View style={styles.scanResultContainer}>
          <Text style={styles.scanResultText}>Scan complete!</Text>
        </View>
      )}

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Confirm Quantity</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleConfirmQuantity}>Confirm</Button>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.bottomContainer}>
        <Button mode="contained" onPress={() => navigation.navigate('ItemList', { items: scannedItems })}>
          View Scanned Items
        </Button>
        <Button mode="outlined" onPress={handleScanAgain}>
          Scan Again
        </Button>
      </View>

      {scannedItems.length > 0 && (
        <FlatList
          data={scannedItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.itemList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanResultContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -50 }],
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
    borderRadius: 8,
  },
  scanResultText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    width: 200,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemList: {
    marginTop: 20,
    width: '100%',
  },
  itemContainer: {
    padding: 16,
    backgroundColor: theme.colors.secondary,
    marginBottom: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});

export default QRScanner;
