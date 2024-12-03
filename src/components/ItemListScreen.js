import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import theme from '../theme';

const ItemListScreen = () => {
  const { params } = useRoute();
  const { items } = params;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Item: {item.barcode}</Text>
      <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.itemList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  itemList: {
    marginTop: 20,
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
});

export default ItemListScreen;
