/**
 * DonutChart — SVG-based donut/pie chart for category breakdown.
 * Uses react-native-svg (pre-installed).
 */
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { Category } from "@/data/dummyData";
import { useColors } from "@/hooks/useColors";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SVG_SIZE = 130;
const CENTER = SVG_SIZE / 2;
const STROKE_WIDTH = 18;

interface SegmentProps {
  color: string;
  percentage: number;
  offset: number;
  delay: number;
}

// Extracted to avoid hooks-in-map
function Segment({ color, percentage, offset, delay }: SegmentProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(percentage / 100, { duration: 900 + delay });
  }, [percentage, delay]);

  const animProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE - CIRCUMFERENCE * progress.value,
  }));

  const dashStart = (offset / 100) * CIRCUMFERENCE;

  return (
    <AnimatedCircle
      cx={CENTER}
      cy={CENTER}
      r={RADIUS}
      stroke={color}
      strokeWidth={STROKE_WIDTH}
      fill="none"
      strokeDasharray={[CIRCUMFERENCE * (percentage / 100), CIRCUMFERENCE]}
      strokeDashoffset={dashStart * -1}
      strokeLinecap="butt"
      transform={`rotate(-90, ${CENTER}, ${CENTER})`}
      animatedProps={animProps}
    />
  );
}

interface DonutChartProps {
  data: Category[];
  totalLabel?: string;
  totalAmount?: number;
}

export function DonutChart({ data, totalLabel = "Total", totalAmount }: DonutChartProps) {
  const colors = useColors();

  // Calculate cumulative offsets
  let cumulativeOffset = 0;
  const segments = data.map((cat) => {
    const offset = cumulativeOffset;
    cumulativeOffset += cat.percentage;
    return { ...cat, offset };
  });

  const total = totalAmount ?? data.reduce((s, c) => s + c.amount, 0);

  return (
    <View style={styles.container}>
      {/* Donut SVG */}
      <View style={styles.svgWrapper}>
        <Svg width={SVG_SIZE} height={SVG_SIZE}>
          {/* Background ring */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            stroke={colors.border}
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          {segments.map((seg, i) => (
            <Segment
              key={seg.name}
              color={seg.color}
              percentage={seg.percentage}
              offset={seg.offset}
              delay={i * 120}
            />
          ))}
        </Svg>
        {/* Center label */}
        <View style={styles.center}>
          <Text
            style={[
              styles.centerAmount,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            ${(total / 1000).toFixed(1)}k
          </Text>
          <Text
            style={[
              styles.centerLabel,
              { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
            ]}
          >
            {totalLabel}
          </Text>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {data.slice(0, 6).map((cat) => (
          <View key={cat.name} style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: cat.color }]} />
            <Text
              style={[
                styles.legendName,
                { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
              ]}
            >
              {cat.name}
            </Text>
            <Text
              style={[
                styles.legendPct,
                { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
              ]}
            >
              {cat.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  svgWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    position: "absolute",
    alignItems: "center",
  },
  centerAmount: {
    fontSize: 16,
  },
  centerLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  legend: {
    flex: 1,
    gap: 8,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendName: {
    flex: 1,
    fontSize: 12,
  },
  legendPct: {
    fontSize: 12,
  },
});
