/**
 * Transactions screen — searchable, filterable transaction list.
 */
import { Feather } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TransactionItem } from "@/components/TransactionItem";
import { TRANSACTIONS } from "@/data/dummyData";
import { useColors } from "@/hooks/useColors";

const CATEGORIES = ["All", "Income", "Food & Drink", "Shopping", "Transport", "Entertainment", "Utilities", "Health", "Housing", "Travel"];

export default function TransactionsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [focused, setFocused] = useState(false);

  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const filtered = useMemo(() => {
    return TRANSACTIONS.filter((t) => {
      const matchQuery = t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase());
      const matchCat = activeCategory === "All" || t.category === activeCategory;
      return matchQuery && matchCat;
    });
  }, [query, activeCategory]);

  const totalFiltered = filtered.reduce((s, t) => s + t.amount, 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: topInset + 16,
            borderBottomColor: colors.border,
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={styles.titleRow}>
          <Text style={[styles.screenTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            Transactions
          </Text>
          <View
            style={[
              styles.totalBadge,
              {
                backgroundColor: (totalFiltered >= 0 ? colors.income : colors.expense) + "15",
                borderRadius: colors.radius / 2,
              },
            ]}
          >
            <Text
              style={[
                styles.totalText,
                {
                  color: totalFiltered >= 0 ? colors.income : colors.expense,
                  fontFamily: "Inter_600SemiBold",
                },
              ]}
            >
              {totalFiltered >= 0 ? "+" : ""}${Math.abs(totalFiltered).toFixed(0)}
            </Text>
          </View>
        </View>

        {/* Search bar */}
        <View
          style={[
            styles.searchRow,
            {
              borderColor: focused ? colors.primary : colors.border,
              backgroundColor: colors.card,
              borderRadius: colors.radius / 1.5,
            },
          ]}
        >
          <Feather name="search" size={16} color={focused ? colors.primary : colors.mutedForeground} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
            placeholder="Search transactions..."
            placeholderTextColor={colors.mutedForeground}
            value={query}
            onChangeText={setQuery}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {!!query && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Feather name="x" size={16} color={colors.mutedForeground} />
            </TouchableOpacity>
          )}
        </View>

        {/* Category filter chips */}
        <FlatList
          horizontal
          data={CATEGORIES}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isActive = item === activeCategory;
            return (
              <TouchableOpacity
                onPress={() => setActiveCategory(item)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isActive ? colors.primary : colors.card,
                    borderColor: isActive ? colors.primary : colors.border,
                    borderRadius: 20,
                  },
                ]}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: isActive ? colors.primaryForeground : colors.mutedForeground,
                      fontFamily: isActive ? "Inter_600SemiBold" : "Inter_400Regular",
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Transaction list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 84 },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={filtered.length > 0}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="search" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              No results found
            </Text>
            <Text style={[styles.emptyText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Try adjusting your search or filter
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => <TransactionItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  screenTitle: { fontSize: 24 },
  totalBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  totalText: { fontSize: 13 },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  chips: {
    paddingBottom: 4,
    gap: 8,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderWidth: 1.5,
  },
  chipText: { fontSize: 13 },
  list: {
    padding: 16,
  },
  empty: {
    alignItems: "center",
    paddingTop: 80,
    gap: 10,
  },
  emptyTitle: { fontSize: 17, marginTop: 8 },
  emptyText: { fontSize: 14 },
});
