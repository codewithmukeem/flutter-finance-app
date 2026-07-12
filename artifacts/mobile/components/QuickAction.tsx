/**
 * QuickAction — circular quick-action button with icon and label.
 */
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useColors } from "@/hooks/useColors";

interface QuickActionProps {
  iconName: string;
  label: string;
  onPress?: () => void;
}

export function QuickAction({ iconName, label, onPress }: QuickActionProps) {
  const colors = useColors();

  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  }

  return (
    <TouchableOpacity style={styles.wrap} activeOpacity={0.75} onPress={handlePress}>
      <Feather
        name={iconName as any}
        size={22}
        color={colors.primary}
        style={[
          styles.icon,
          {
            backgroundColor: colors.primary + "15",
            borderRadius: colors.radius,
            borderColor: colors.primary + "25",
          },
        ]}
      />
      <Text
        style={[
          styles.label,
          { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  icon: {
    padding: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  label: {
    fontSize: 11,
    textAlign: "center",
  },
});
