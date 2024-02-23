import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
  // useEffect(() => {
  //   const getNFTs = async (ipfsHashes) => {
  //     const fetchPromises = ipfsHashes.map(async (hash) => {
  //       try {
  //         const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
  //         const json = await response.json(); // Extract JSON from the response

  //         if (typeof json === 'string') {
  //           // If the JSON is a string, parse it again
  //           return JSON.parse(json);
  //         } else {
  //           // Otherwise, return the JSON as is
  //           return json;
  //         }
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }
  //     });

  //     const data = await Promise.all(fetchPromises);
  //     console.log(data); // Log the data for debugging
  //     // You can now use the data here
  //   };

  //   const ipfsHashes = ['QmNT9dVCgGfxEViKZzYLhH114rgiYDT227cVDYVz1y3zvH', 'QmYGgPqaC483J5B9KczHRV9t1fDRkFtiLo5J2zMvqcZWuv'];
  //   getNFTs(ipfsHashes); // Call the function
  // }, []);