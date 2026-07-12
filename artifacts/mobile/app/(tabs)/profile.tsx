/**
 * Profile screen — user info, theme toggle, notifications, about section.
 */
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "@/context/AppContext";
import { USER } from "@/data/dummyData";
import { useColors } from "@/hooks/useColors";

interface SettingsRowProps {
  iconName: string;
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
}

function SettingsRow({ iconName, label, value, onPress, rightElement, danger }: SettingsRowProps) {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[styles.settingsRow, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View
        style={[
          styles.rowIcon,
          { backgroundColor: (danger ? colors.expense : colors.primary) + "15" },
        ]}
      >
        <Feather
          name={iconName as any}
          size={16}
          color={danger ? colors.expense : colors.primary}
        />
      </View>
      <Text
        style={[
          styles.rowLabel,
          {
            color: danger ? colors.expense : colors.foreground,
            fontFamily: "Inter_500Medium",
          },
        ]}
      >
        {label}
      </Text>
      <View style={styles.rowRight}>
        {value !== undefined && (
          <Text style={[styles.rowValue, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            {value}
          </Text>
        )}
        {rightElement}
        {onPress && !rightElement && (
          <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { themeMode, setThemeMode, notificationsEnabled, setNotificationsEnabled, setIsLoggedIn } = useApp();
  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const initials = USER.name.split(" ").map((n) => n[0]).join("");
  const savingsPct = Math.round((USER.currentSavings / USER.savingsGoal) * 100);

  function handleLogout() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            setIsLoggedIn(false);
            router.replace("/login");
          },
        },
      ]
    );
  }

  function cycleTheme() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const modes: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const current = modes.indexOf(themeMode);
    const next = modes[(current + 1) % modes.length];
    setThemeMode(next);
  }

  const themeIcon = themeMode === "light" ? "sun" : themeMode === "dark" ? "moon" : "monitor";

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Header */}
      <View style={{ paddingTop: topInset + 16, paddingBottom: 0 }}>
        {/* Avatar + info */}
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            style={styles.avatarCircle}
          >
            <Text style={[styles.avatarText, { fontFamily: "Inter_700Bold" }]}>
              {initials}
            </Text>
          </LinearGradient>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              {USER.name}
            </Text>
            <Text style={[styles.profileEmail, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              {USER.email}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.editBtn, { backgroundColor: colors.primary + "15", borderRadius: colors.radius / 2 }]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Feather name="edit-2" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Savings progress */}
        <View
          style={[
            styles.savingsCard,
            {
              marginHorizontal: 20,
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: colors.radius,
            },
          ]}
        >
          <View style={styles.savingsHeader}>
            <View>
              <Text style={[styles.savingsLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                Savings Goal
              </Text>
              <Text style={[styles.savingsAmount, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
                ${USER.currentSavings.toLocaleString()} / ${USER.savingsGoal.toLocaleString()}
              </Text>
            </View>
            <View
              style={[
                styles.pctBadge,
                { backgroundColor: colors.savings + "20", borderRadius: colors.radius / 2 },
              ]}
            >
              <Text style={[styles.pctText, { color: colors.savings, fontFamily: "Inter_700Bold" }]}>
                {savingsPct}%
              </Text>
            </View>
          </View>
          <View style={[styles.progressBg, { backgroundColor: colors.muted }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${savingsPct}%`,
                  backgroundColor: colors.savings,
                  borderRadius: 4,
                },
              ]}
            />
          </View>
          <Text style={[styles.savingsHint, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            ${(USER.savingsGoal - USER.currentSavings).toLocaleString()} more to reach your goal
          </Text>
        </View>
      </View>

      {/* Settings group: Preferences */}
      <View style={[styles.section, { marginTop: 24 }]}>
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
          PREFERENCES
        </Text>
        <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
          <SettingsRow
            iconName={themeIcon}
            label="Appearance"
            value={themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
            onPress={cycleTheme}
          />
          <SettingsRow
            iconName="bell"
            label="Notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={(val) => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setNotificationsEnabled(val);
                }}
                trackColor={{ false: colors.muted, true: colors.primary + "80" }}
                thumbColor={notificationsEnabled ? colors.primary : colors.mutedForeground}
              />
            }
          />
          <SettingsRow iconName="lock" label="Privacy & Security" onPress={() => {}} />
          <SettingsRow iconName="credit-card" label="Payment Methods" onPress={() => {}} />
        </View>
      </View>

      {/* Settings group: About */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
          ABOUT
        </Text>
        <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
          <SettingsRow iconName="info" label="App Version" value="1.0.0" />
          <SettingsRow
            iconName="github"
            label="GitHub"
            value="@codewithmukeem"
            onPress={() => Linking.openURL(USER.github)}
          />
          <SettingsRow iconName="file-text" label="Terms of Service" onPress={() => {}} />
          <SettingsRow iconName="shield" label="Privacy Policy" onPress={() => {}} />
        </View>
      </View>

      {/* Sign out */}
      <View style={styles.section}>
        <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
          <SettingsRow iconName="log-out" label="Sign Out" onPress={handleLogout} danger />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          Created with ♥ by Mukeem Javaid
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL(USER.github)}>
          <Text style={[styles.footerLink, { color: colors.primary, fontFamily: "Inter_500Medium" }]}>
            github.com/codewithmukeem
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 14,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 22,
  },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 20 },
  profileEmail: { fontSize: 13, marginTop: 3 },
  editBtn: {
    padding: 10,
  },
  savingsCard: {
    padding: 16,
    borderWidth: 1,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  savingsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  savingsLabel: { fontSize: 12, marginBottom: 2 },
  savingsAmount: { fontSize: 16 },
  pctBadge: { paddingVertical: 6, paddingHorizontal: 12 },
  pctText: { fontSize: 16 },
  progressBg: {
    height: 8,
    borderRadius: 4,
  },
  progressFill: { height: "100%" },
  savingsHint: { fontSize: 12 },
  section: { paddingHorizontal: 16, marginBottom: 4 },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 8,
    paddingLeft: 4,
  },
  group: {
    borderWidth: 1,
    overflow: "hidden",
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
    borderBottomWidth: 1,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { flex: 1, fontSize: 15 },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowValue: { fontSize: 13 },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 6,
  },
  footerText: { fontSize: 13 },
  footerLink: { fontSize: 13 },
});
