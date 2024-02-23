import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

const SubscriptionHeatmap = () => {
  const [active, setIsActive] = useState("2023");
  const years = ["2023", "2024", "2025", "2026", "2027", "2028"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <View style={{ width: 346 }} className="mx-4">
      <Text style={{ fontSize: 14, color: "#A8A8A8", fontWeight: "bold" }}>
        Subscription Heatmap
      </Text>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ rowGap: 9 }}> */}
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 7, marginTop: 9 }}
        >
          {years.map((item, index) => (
            <Text
              onPress={() => setIsActive(item)}
              key={index}
              style={{
                backgroundColor: active === item ? "#ADF802" : "transparent",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 8,
                color: active === item ? "#000" : "#fff",
                overflow: "hidden",
                fontSize: 12,
              }}
            >
              {item}
            </Text>
          ))}
        </TouchableOpacity>
        <View style={{ paddingVertical: 16, flexDirection: "column", gap: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {months.map((item, index) => (
              <Text key={index} style={{ fontSize: 12, color: "#A8A8A8" }}>
                {item}
              </Text>
            ))}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            {months.map((item, index) => (
              <View
                key={index}
                style={{ width: 17, height: 17, backgroundColor: "#ADF802" }}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SubscriptionHeatmap;
