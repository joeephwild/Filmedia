import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Confetti from "react-native-confetti";

const SuccessMessage = () => {
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    // Start the confetti animation
    setConfetti(true);
    // Stop the confetti after 5 seconds
    setTimeout(() => setConfetti(false), 15000);
  }, []);

  return (
    <View style={styles.container}>
      <FontAwesome5 name="smile" size={200} color="orange" />
      <Text style={styles.text}>
        Congratulations on subscribing to your favorite artist! Your NFT has
        been minted successfully.
      </Text>
      {confetti && <Confetti size={200}  />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 6,
    color: "#F5FCFF"
  },
});

export default SuccessMessage;
