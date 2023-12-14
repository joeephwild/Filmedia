import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const Index = () => {
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

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default Index;
