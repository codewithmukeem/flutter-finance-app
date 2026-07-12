/**
 * GlassCard — glassmorphism container using BlurView + semi-transparent background.
 */
import { BlurView } from "expo-blur";
import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  ViewStyle,
  useColorScheme,
} from "react-native";

import { useColors } from "@/hooks/useColors";

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  padding?: number;
}

export function GlassCard({
  children,
  style,
  intensity = 60,
  padding = 20,
}: GlassCardProps) {
  const colors = useColors();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  // BlurView does not work well on web — use opaque card instead
  if (Platform.OS === "web") {
    return (
      <View
        style={[
          styles.base,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            padding,
            borderRadius: colors.radius,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <BlurView
      intensity={intensity}
      tint={isDark ? "dark" : "light"}
      style={[
        styles.base,
        {
          borderColor: isDark
            ? "rgba(255,255,255,0.10)"
            : "rgba(255,255,255,0.70)",
          backgroundColor: isDark
            ? "rgba(13,27,51,0.65)"
            : "rgba(255,255,255,0.60)",
          padding,
          borderRadius: colors.radius,
        },
        style,
      ]}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
    borderWidth: 1,
  },
});
