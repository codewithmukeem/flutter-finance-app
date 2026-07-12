/**
 * BarChart — animated weekly spending bar chart using Reanimated.
 * Each bar is a separate component to comply with hooks-in-loops rules.
 */
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { WeeklyPoint } from "@/data/dummyData";
import { useColors } from "@/hooks/useColors";

interface BarItemProps {
  point: WeeklyPoint;
  maxAmount: number;
  chartHeight: number;
  barWidth: number;
  isToday: boolean;
  delay: number;
  primaryColor: string;
  mutedColor: string;
  textColor: string;
  mutedTextColor: string;
  radius: number;
}

// Extracted component so useAnimatedStyle is NOT inside a loop
function BarItem({
  point,
  maxAmount,
  chartHeight,
  barWidth,
  isToday,
  delay,
  primaryColor,
  mutedColor,
  textColor,
  mutedTextColor,
  radius,
}: BarItemProps) {
  const targetHeight = maxAmount > 0 ? (point.amount / maxAmount) * chartHeight : 0;
  const animHeight = useSharedValue(0);

  useEffect(() => {
    animHeight.value = withDelay(delay, withTiming(targetHeight, { duration: 700 }));
  }, [targetHeight, delay]);

  const barStyle = useAnimatedStyle(() => ({
    height: animHeight.value,
  }));

  return (
    <View style={styles.barColumn}>
      <Text
        style={[
          styles.amountLabel,
          {
            color: isToday ? primaryColor : mutedTextColor,
            fontFamily: "Inter_500Medium",
            width: barWidth + 8,
            textAlign: "center",
          },
        ]}
        numberOfLines={1}
      >
        ${point.amount}
      </Text>
      <View style={[styles.barTrack, { height: chartHeight }]}>
        <Animated.View
          style={[
            barStyle,
            {
              width: barWidth,
              backgroundColor: isToday ? primaryColor : mutedColor,
              borderRadius: radius / 2,
              bottom: 0,
              position: "absolute",
            },
          ]}
        />
      </View>
      <Text
        style={[
          styles.dayLabel,
          {
            color: isToday ? primaryColor : mutedTextColor,
            fontFamily: isToday ? "Inter_700Bold" : "Inter_400Regular",
          },
        ]}
      >
        {point.day}
      </Text>
    </View>
  );
}

interface BarChartProps {
  data: WeeklyPoint[];
  chartHeight?: number;
}

export function BarChart({ data, chartHeight = 120 }: BarChartProps) {
  const colors = useColors();
  const maxAmount = Math.max(...data.map((d) => d.amount));
  // Friday (index 4) is "today" for demo purposes
  const todayIndex = 4;
  const barWidth = 28;

  return (
    <View style={styles.container}>
      {data.map((point, i) => (
        <BarItem
          key={point.day}
          point={point}
          maxAmount={maxAmount}
          chartHeight={chartHeight}
          barWidth={barWidth}
          isToday={i === todayIndex}
          delay={i * 80}
          primaryColor={colors.primary}
          mutedColor={colors.primary + "28"}
          textColor={colors.foreground}
          mutedTextColor={colors.mutedForeground}
          radius={colors.radius}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 24,
  },
  barColumn: {
    alignItems: "center",
    gap: 6,
  },
  amountLabel: {
    fontSize: 9,
    marginBottom: 2,
  },
  barTrack: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dayLabel: {
    fontSize: 11,
  },
});
