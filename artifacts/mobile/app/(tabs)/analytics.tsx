/**
 * Analytics screen — monthly charts, category breakdown, income vs expense.
 */
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DonutChart } from "@/components/DonutChart";
import { CATEGORIES, MONTHLY_DATA, USER } from "@/data/dummyData";
import { useColors } from "@/hooks/useColors";

// Monthly comparison bar (two-color: income vs expense)
interface MonthBarProps {
  month: string;
  income: number;
  expense: number;
  maxVal: number;
  delay: number;
  incomeColor: string;
  expenseColor: string;
  textColor: string;
  mutedColor: string;
  borderColor: string;
  bgColor: string;
  radius: number;
}

function MonthBar({
  month,
  income,
  expense,
  maxVal,
  delay,
  incomeColor,
  expenseColor,
  textColor,
  mutedColor,
  borderColor,
  bgColor,
  radius,
}: MonthBarProps) {
  const incomeAnim = useRef(new Animated.Value(0)).current;
  const expenseAnim = useRef(new Animated.Value(0)).current;

  const BAR_MAX = 100;
  const targetIncome = (income / maxVal) * BAR_MAX;
  const targetExpense = (expense / maxVal) * BAR_MAX;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(incomeAnim, {
        toValue: targetIncome,
        duration: 700,
        delay,
        useNativeDriver: false,
      }),
      Animated.timing(expenseAnim, {
        toValue: targetExpense,
        duration: 700,
        delay: delay + 100,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.monthBarCol}>
      <Text style={[styles.barAmount, { color: textColor, fontFamily: "Inter_600SemiBold" }]}>
        ${(income / 1000).toFixed(1)}k
      </Text>
      <View style={[styles.barTrack, { backgroundColor: bgColor, borderColor, borderRadius: radius / 2 }]}>
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: incomeAnim,
            backgroundColor: incomeColor + "80",
            borderRadius: radius / 2,
          }}
        />
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: expenseAnim,
            backgroundColor: expenseColor + "90",
            borderRadius: radius / 2,
          }}
        />
      </View>
      <Text style={[styles.monthLabel, { color: mutedColor, fontFamily: "Inter_400Regular" }]}>
        {month}
      </Text>
    </View>
  );
}

export default function AnalyticsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const maxVal = Math.max(...MONTHLY_DATA.map((d) => Math.max(d.income, d.expense)));

  // Summary cards
  const savingsRate = ((USER.monthlySavings / USER.monthlyIncome) * 100).toFixed(0);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: topInset + 16,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.screenTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Analytics
        </Text>
        <TouchableOpacity
          style={[styles.filterBtn, { backgroundColor: colors.primary + "15", borderRadius: colors.radius / 2 }]}
        >
          <Feather name="calendar" size={14} color={colors.primary} />
          <Text style={[styles.filterText, { color: colors.primary, fontFamily: "Inter_500Medium" }]}>
            July 2026
          </Text>
        </TouchableOpacity>
      </View>

      {/* Summary pills */}
      <View style={styles.pillRow}>
        {[
          { label: "Income", value: `$${(USER.monthlyIncome / 1000).toFixed(1)}k`, color: colors.income },
          { label: "Spent", value: `$${(USER.monthlyExpense / 1000).toFixed(1)}k`, color: colors.expense },
          { label: "Saved", value: `${savingsRate}%`, color: colors.savings },
        ].map((item) => (
          <View
            key={item.label}
            style={[
              styles.summaryPill,
              {
                backgroundColor: item.color + "12",
                borderColor: item.color + "30",
                borderRadius: colors.radius,
              },
            ]}
          >
            <Text style={[styles.pillValue, { color: item.color, fontFamily: "Inter_700Bold" }]}>
              {item.value}
            </Text>
            <Text style={[styles.pillLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Monthly Bar Chart */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            6-Month Overview
          </Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.income + "80" }]} />
              <Text style={[styles.legendText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                Income
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.expense + "90" }]} />
              <Text style={[styles.legendText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                Expense
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.monthBars}>
          {MONTHLY_DATA.map((d, i) => (
            <MonthBar
              key={d.month}
              month={d.month}
              income={d.income}
              expense={d.expense}
              maxVal={maxVal}
              delay={i * 90}
              incomeColor={colors.income}
              expenseColor={colors.expense}
              textColor={colors.foreground}
              mutedColor={colors.mutedForeground}
              borderColor={colors.border}
              bgColor={colors.muted}
              radius={colors.radius}
            />
          ))}
        </View>
      </View>

      {/* Category breakdown donut */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: "Inter_700Bold", marginBottom: 18 }]}>
          Spending by Category
        </Text>
        <DonutChart
          data={CATEGORIES}
          totalLabel="Spent"
          totalAmount={USER.monthlyExpense}
        />
      </View>

      {/* Category progress bars */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: "Inter_700Bold", marginBottom: 16 }]}>
          Top Spending
        </Text>
        <View style={{ gap: 14 }}>
          {CATEGORIES.slice(0, 5).map((cat) => (
            <View key={cat.name} style={styles.catRow}>
              <View style={styles.catLabel}>
                <Feather name={cat.iconName as any} size={14} color={cat.color} />
                <Text style={[styles.catName, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>
                  {cat.name}
                </Text>
              </View>
              <View style={{ flex: 1, marginHorizontal: 12 }}>
                <View style={[styles.progressBg, { backgroundColor: colors.muted, borderRadius: 4 }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${cat.percentage}%`,
                        backgroundColor: cat.color,
                        borderRadius: 4,
                      },
                    ]}
                  />
                </View>
              </View>
              <Text style={[styles.catAmount, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
                ${cat.amount}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  screenTitle: { fontSize: 24 },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  filterText: { fontSize: 13 },
  pillRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  summaryPill: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderWidth: 1,
    gap: 4,
  },
  pillValue: { fontSize: 17 },
  pillLabel: { fontSize: 11 },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: { fontSize: 16 },
  legend: { flexDirection: "row", gap: 12 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11 },
  monthBars: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 8,
  },
  monthBarCol: {
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  barAmount: { fontSize: 10 },
  barTrack: {
    width: 28,
    height: 100,
    borderWidth: 1,
    overflow: "hidden",
    position: "relative",
  },
  monthLabel: { fontSize: 11 },
  catRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  catLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: 90,
  },
  catName: { fontSize: 13 },
  progressBg: { height: 6, flex: 1 },
  progressFill: { height: "100%" },
  catAmount: { fontSize: 13, width: 50, textAlign: "right" },
});
