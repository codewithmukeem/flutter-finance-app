/**
 * TransactionItem — a single transaction row with icon, details, and amount.
 */
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Transaction } from "@/data/dummyData";
import { useColors } from "@/hooks/useColors";

interface TransactionItemProps {
  item: Transaction;
  onPress?: () => void;
}

export function TransactionItem({ item, onPress }: TransactionItemProps) {
  const colors = useColors();
  const isIncome = item.amount > 0;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.row,
        {
          backgroundColor: colors.card,
          borderRadius: colors.radius,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Icon */}
      <View style={[styles.iconWrap, { backgroundColor: item.iconBg + "20" }]}>
        <Feather name={item.iconName as any} size={18} color={item.iconBg} />
      </View>

      {/* Details */}
      <View style={styles.details}>
        <Text
          style={[styles.title, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text
          style={[styles.category, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}
        >
          {item.category} · {item.date}
        </Text>
      </View>

      {/* Amount */}
      <Text
        style={[
          styles.amount,
          {
            color: isIncome ? colors.income : colors.expense,
            fontFamily: "Inter_700Bold",
          },
        ]}
      >
        {isIncome ? "+" : ""}${Math.abs(item.amount).toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 14,
  },
  category: {
    fontSize: 12,
  },
  amount: {
    fontSize: 15,
  },
});
