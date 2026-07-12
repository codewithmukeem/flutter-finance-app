/**
 * StatCard — displays a financial stat (income, expense, savings) with icon & trend.
 */
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface StatCardProps {
  label: string;
  amount: number;
  iconName: string;
  accentColor: string;
  trend?: number;
}

function formatCompact(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n.toFixed(0)}`;
}

export function StatCard({ label, amount, iconName, accentColor, trend }: StatCardProps) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: colors.radius,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Icon circle */}
      <View style={[styles.iconCircle, { backgroundColor: accentColor + "20" }]}>
        <Feather name={iconName as any} size={16} color={accentColor} />
      </View>

      <Text
        style={[styles.amount, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}
        numberOfLines={1}
      >
        {formatCompact(amount)}
      </Text>

      <View style={styles.row}>
        <Text
          style={[styles.label, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}
        >
          {label}
        </Text>
        {trend !== undefined && (
          <View style={styles.trendRow}>
            <Feather
              name={trend >= 0 ? "arrow-up-right" : "arrow-down-right"}
              size={10}
              color={trend >= 0 ? colors.income : colors.expense}
            />
            <Text
              style={[
                styles.trendText,
                {
                  color: trend >= 0 ? colors.income : colors.expense,
                  fontFamily: "Inter_500Medium",
                },
              ]}
            >
              {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 14,
    borderWidth: 1,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  amount: {
    fontSize: 17,
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 11,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  trendText: {
    fontSize: 10,
  },
});
