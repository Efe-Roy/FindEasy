import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config";

const AccountScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  function formatTimestamp(timestamp) {
    if (!timestamp) return "N/A";
    const date = new Date(parseInt(timestamp));
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
  }
  
  return (
    <View style={tw`flex-1 bg-white p-8`}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>{user?.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Created At:</Text>
        <Text style={styles.infoValue}>{formatTimestamp(user?.metadata?.createdAt)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Last Login At:</Text>
        <Text style={styles.infoValue}>{formatTimestamp(user?.metadata?.lastLoginAt)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>User Role:</Text>
        <Text style={styles.infoValue}>{user?.displayName}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
});

export default AccountScreen;
