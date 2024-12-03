import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';

const InfoCard = ({ title, value, icon, backgroundColor }) => {
  return (
    <Card style={[styles.card, { backgroundColor }]}>
      <Card.Content style={styles.content}>
        <Avatar.Icon size={40} icon={icon} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 8,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'transparent',
  },
  textContainer: {
    marginLeft: 8,
  },
  title: {
    fontSize: 14,
    color: '#ffffff',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default InfoCard;
