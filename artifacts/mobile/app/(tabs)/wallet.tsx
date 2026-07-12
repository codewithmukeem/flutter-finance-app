/**
 * Wallet screen — multiple cards with horizontal scroll, card details, recent payments.
 */
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TransactionItem } from "@/components/TransactionItem";
import { WalletCard } from "@/components/WalletCard";
import { TRANSACTIONS, WALLET_CARDS } from "@/data/dummyData";
import { useColors } from "@/hooks/useColors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 56, 320);

export default function WalletScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const activeCard = WALLET_CARDS[activeIndex];

  // Filter transactions to card-style ones (non-income)
  const cardPayments = TRANSACTIONS.filter((t) => t.amount < 0).slice(0, 6);

  function handleScroll(e: any) {
    const idx = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 20));
    if (idx !== activeIndex) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setActiveIndex(idx);
    }
  }

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topInset + 16, borderBottomColor: colors.border }]}>
        <Text style={[styles.screenTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          My Wallet
        </Text>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: colors.primary + "15", borderRadius: colors.radius / 2 }]}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        >
          <Feather name="plus" size={16} color={colors.primary} />
          <Text style={[styles.addText, { color: colors.primary, fontFamily: "Inter_600SemiBold" }]}>
            Add Card
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cards carousel */}
      <View style={styles.carouselWrap}>
        <FlatList
          data={WALLET_CARDS}
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          decelerationRate="fast"
          contentContainerStyle={styles.carousel}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginRight: 20 }}>
              <WalletCard card={item} width={CARD_WIDTH} />
            </View>
          )}
        />

        {/* Dots */}
        <View style={styles.dots}>
          {WALLET_CARDS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === activeIndex ? colors.primary : colors.border,
                  width: i === activeIndex ? 20 : 6,
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Card info */}
      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius,
          },
        ]}
      >
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Card Type
            </Text>
            <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              {activeCard.type === "visa" ? "Visa Classic" : "Mastercard"}
            </Text>
          </View>
          <View style={[styles.dividerV, { backgroundColor: colors.border }]} />
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Expires
            </Text>
            <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              {activeCard.expiry}
            </Text>
          </View>
          <View style={[styles.dividerV, { backgroundColor: colors.border }]} />
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              CVV
            </Text>
            <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              {activeCard.cvv}
            </Text>
          </View>
        </View>

        {/* Quick card actions */}
        <View style={styles.cardActions}>
          {[
            { icon: "arrow-up", label: "Transfer" },
            { icon: "lock", label: "Freeze" },
            { icon: "settings", label: "Settings" },
            { icon: "eye", label: "Details" },
          ].map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.cardAction}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            >
              <View style={[styles.actionCircle, { backgroundColor: colors.primary + "12" }]}>
                <Feather name={action.icon as any} size={16} color={colors.primary} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent payments */}
      <View style={styles.transSection}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Recent Payments
        </Text>
        <View style={{ gap: 8 }}>
          {cardPayments.map((item) => (
            <TransactionItem key={item.id} item={item} />
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
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  addText: { fontSize: 13 },
  carouselWrap: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  carousel: {
    paddingHorizontal: 20,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 16,
    alignItems: "center",
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  infoCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderWidth: 1,
    gap: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoItem: { alignItems: "center", gap: 4 },
  infoLabel: { fontSize: 11 },
  infoValue: { fontSize: 14 },
  dividerV: { width: 1, height: 36 },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardAction: { alignItems: "center", gap: 8 },
  actionCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: { fontSize: 11 },
  transSection: {
    marginHorizontal: 16,
    marginTop: 20,
    gap: 14,
  },
  sectionTitle: { fontSize: 16 },
});
