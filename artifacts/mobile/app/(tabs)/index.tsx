/**
 * Home Dashboard — balance, stats, weekly chart, quick actions, recent transactions.
 */
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
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

import { BarChart } from "@/components/BarChart";
import { QuickAction } from "@/components/QuickAction";
import { StatCard } from "@/components/StatCard";
import { TransactionItem } from "@/components/TransactionItem";
import { TRANSACTIONS, USER, WEEKLY_DATA } from "@/data/dummyData";
import { useColors } from "@/hooks/useColors";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const topInset = Platform.OS === "web" ? 67 : insets.top;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const recentTransactions = TRANSACTIONS.slice(0, 5);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Header card with gradient */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerCard, { paddingTop: topInset + 16 }]}
      >
        {/* Decorative circles */}
        <View style={styles.deco1} />
        <View style={styles.deco2} />

        {/* Top row */}
        <Animated.View
          style={[
            styles.topRow,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View>
            <Text style={[styles.greeting, { fontFamily: "Inter_400Regular" }]}>
              Good morning
            </Text>
            <Text style={[styles.userName, { fontFamily: "Inter_700Bold" }]}>
              {USER.name.split(" ")[0]}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Text style={[styles.avatarText, { fontFamily: "Inter_700Bold" }]}>
              {USER.name.split(" ").map((n) => n[0]).join("")}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Balance */}
        <Animated.View
          style={[
            styles.balanceBlock,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={[styles.balanceLabel, { fontFamily: "Inter_400Regular" }]}>
            Total Balance
          </Text>
          <Text style={[styles.balanceAmount, { fontFamily: "Inter_700Bold" }]}>
            ${USER.totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </Text>
          <View style={styles.trendRow}>
            <Feather name="arrow-up-right" size={14} color="#86EFAC" />
            <Text style={[styles.trendText, { fontFamily: "Inter_500Medium" }]}>
              +8.2% vs last month
            </Text>
          </View>
        </Animated.View>

        <View style={{ height: 28 }} />
      </LinearGradient>

      {/* Stat cards */}
      <View style={[styles.statsRow, { marginTop: -20 }]}>
        <StatCard
          label="Income"
          amount={USER.monthlyIncome}
          iconName="arrow-down-left"
          accentColor={colors.income}
          trend={12}
        />
        <StatCard
          label="Expenses"
          amount={USER.monthlyExpense}
          iconName="arrow-up-right"
          accentColor={colors.expense}
          trend={-4}
        />
        <StatCard
          label="Savings"
          amount={USER.monthlySavings}
          iconName="shield"
          accentColor={colors.savings}
          trend={21}
        />
      </View>

      {/* Weekly Chart */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius,
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              Weekly Spending
            </Text>
            <Text style={[styles.sectionSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              This week
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.pill, { backgroundColor: colors.primary + "15" }]}
          >
            <Text style={[styles.pillText, { color: colors.primary, fontFamily: "Inter_600SemiBold" }]}>
              Week
            </Text>
          </TouchableOpacity>
        </View>
        <BarChart data={WEEKLY_DATA} chartHeight={110} />
      </View>

      {/* Quick Actions */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold", marginBottom: 16 }]}>
          Quick Actions
        </Text>
        <View style={styles.actionsRow}>
          <QuickAction iconName="send" label="Send" />
          <QuickAction iconName="download" label="Receive" />
          <QuickAction iconName="credit-card" label="Pay Bills" />
          <QuickAction iconName="plus-circle" label="Add Money" />
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.transSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            Recent Transactions
          </Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/transactions")}>
            <Text style={[styles.seeAll, { color: colors.primary, fontFamily: "Inter_600SemiBold" }]}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionList}>
          {recentTransactions.map((item) => (
            <TransactionItem key={item.id} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  headerCard: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    overflow: "hidden",
  },
  deco1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -60,
    right: -50,
  },
  deco2: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.04)",
    bottom: -20,
    left: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    color: "rgba(255,255,255,0.70)",
    fontSize: 14,
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 22,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.20)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  balanceBlock: {
    gap: 6,
  },
  balanceLabel: {
    color: "rgba(255,255,255,0.70)",
    fontSize: 14,
  },
  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 38,
    letterSpacing: -1,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trendText: {
    color: "#86EFAC",
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  section: {
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
  },
  sectionSub: {
    fontSize: 12,
    marginTop: 2,
  },
  pill: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  pillText: {
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  transSection: {
    marginHorizontal: 16,
    marginTop: 16,
    gap: 14,
  },
  seeAll: { fontSize: 14 },
  transactionList: { gap: 8 },
});
