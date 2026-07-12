/**
 * WalletCard — premium animated credit card component with gradient background.
 */
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { WalletCard as WalletCardData } from "@/data/dummyData";

interface WalletCardProps {
  card: WalletCardData;
  width?: number;
}

export function WalletCard({ card, width = 300 }: WalletCardProps) {
  const height = width * 0.58;
  const r = 24;

  return (
    <LinearGradient
      colors={card.gradientColors as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, { width, height, borderRadius: r }]}
    >
      {/* Top row */}
      <View style={styles.topRow}>
        {/* Chip */}
        <View style={styles.chip}>
          <View style={styles.chipInner} />
        </View>
        {/* Card type */}
        <Text style={[styles.cardType, { fontFamily: "Inter_600SemiBold" }]}>
          {card.type === "visa" ? "VISA" : "Mastercard"}
        </Text>
      </View>

      {/* Card number */}
      <Text style={[styles.cardNumber, { fontFamily: "Inter_600SemiBold" }]}>
        {card.number}
      </Text>

      {/* Bottom row */}
      <View style={styles.bottomRow}>
        <View>
          <Text style={[styles.label, { fontFamily: "Inter_400Regular" }]}>
            CARD HOLDER
          </Text>
          <Text style={[styles.value, { fontFamily: "Inter_600SemiBold" }]}>
            {card.cardHolder}
          </Text>
        </View>
        <View>
          <Text style={[styles.label, { fontFamily: "Inter_400Regular" }]}>
            EXPIRES
          </Text>
          <Text style={[styles.value, { fontFamily: "Inter_600SemiBold" }]}>
            {card.expiry}
          </Text>
        </View>
        {/* Balance */}
        <View style={{ alignItems: "flex-end" }}>
          <Text style={[styles.label, { fontFamily: "Inter_400Regular" }]}>
            BALANCE
          </Text>
          <Text style={[styles.value, { fontFamily: "Inter_700Bold", fontSize: 16 }]}>
            ${card.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </Text>
        </View>
      </View>

      {/* Decorative circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chip: {
    width: 38,
    height: 28,
    backgroundColor: "rgba(255,215,0,0.85)",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  chipInner: {
    width: 26,
    height: 18,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.35)",
    backgroundColor: "rgba(255,215,0,0.6)",
  },
  cardType: {
    color: "rgba(255,255,255,0.90)",
    fontSize: 16,
    letterSpacing: 2,
  },
  cardNumber: {
    color: "#FFFFFF",
    fontSize: 17,
    letterSpacing: 2,
    marginVertical: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  label: {
    color: "rgba(255,255,255,0.60)",
    fontSize: 9,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  circle1: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.07)",
    top: -50,
    right: -40,
  },
  circle2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.05)",
    bottom: -30,
    left: 20,
  },
});
