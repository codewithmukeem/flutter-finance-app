/**
 * Onboarding — 3 beautiful slides with smooth transitions, page dots, skip/next.
 */
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "@/context/AppContext";
import { ONBOARDING_SLIDES } from "@/data/dummyData";
import { useColors } from "@/hooks/useColors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Slide illustrations using abstract geometric shapes
function SlideIllustration({ accentColor, index }: { accentColor: string; index: number }) {
  const illustrations = [
    // Slide 1: Bar chart + coins
    <View key="1" style={styles.illus}>
      <View style={[styles.illustBar, { height: 60, backgroundColor: accentColor + "40" }]} />
      <View style={[styles.illustBar, { height: 90, backgroundColor: accentColor + "70" }]} />
      <View style={[styles.illustBar, { height: 50, backgroundColor: accentColor + "40" }]} />
      <View style={[styles.illustBar, { height: 120, backgroundColor: accentColor }]} />
      <View style={[styles.illustBar, { height: 80, backgroundColor: accentColor + "60" }]} />
      <View style={[styles.illustBar, { height: 100, backgroundColor: accentColor + "80" }]} />
      <View style={[styles.illustBar, { height: 70, backgroundColor: accentColor + "50" }]} />
    </View>,
    // Slide 2: Upward arrow + line chart
    <View key="2" style={[styles.illus, { flexDirection: "column", gap: 12 }]}>
      <View style={styles.illustArrowRow}>
        <View style={[styles.illustCircle, { backgroundColor: accentColor + "30", width: 56, height: 56 }]}>
          <Feather name="trending-up" size={26} color={accentColor} />
        </View>
        <View style={[styles.illustCircle, { backgroundColor: accentColor + "20", width: 40, height: 40 }]}>
          <Feather name="dollar-sign" size={20} color={accentColor} />
        </View>
        <View style={[styles.illustCircle, { backgroundColor: accentColor + "15", width: 32, height: 32 }]}>
          <Feather name="bar-chart-2" size={16} color={accentColor} />
        </View>
      </View>
      <View style={[styles.illustLine, { backgroundColor: accentColor + "30" }]}>
        <View style={[styles.illustDot, { backgroundColor: accentColor }]} />
        <View style={[styles.illustLineFill, { backgroundColor: accentColor, width: "65%" }]} />
      </View>
    </View>,
    // Slide 3: Shield + checkmarks
    <View key="3" style={[styles.illus, { flexDirection: "column", gap: 14, alignItems: "center" }]}>
      <View style={[styles.illustCircle, { backgroundColor: accentColor + "25", width: 80, height: 80 }]}>
        <Feather name="shield" size={40} color={accentColor} />
      </View>
      {["Budget Set", "Goals Tracked", "Savings Reached"].map((label) => (
        <View key={label} style={styles.checkRow}>
          <View style={[styles.checkCircle, { backgroundColor: accentColor }]}>
            <Feather name="check" size={12} color="#FFF" />
          </View>
          <Text style={[styles.checkLabel, { color: accentColor, fontFamily: "Inter_500Medium" }]}>
            {label}
          </Text>
        </View>
      ))}
    </View>,
  ];
  return illustrations[index] ?? null;
}

export default function OnboardingScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setHasSeenOnboarding } = useApp();

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomInset = Platform.OS === "web" ? 34 : insets.bottom;

  function goNext() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      const next = currentIndex + 1;
      scrollRef.current?.scrollTo({ x: SCREEN_WIDTH * next, animated: true });
      setCurrentIndex(next);
    } else {
      finish();
    }
  }

  function finish() {
    setHasSeenOnboarding(true);
    router.replace("/login");
  }

  function handleScroll(e: any) {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(idx);
  }

  const slide = ONBOARDING_SLIDES[currentIndex];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: topInset },
      ]}
    >
      {/* Skip button */}
      <TouchableOpacity
        style={[styles.skipBtn, { top: topInset + 12 }]}
        onPress={finish}
        activeOpacity={0.7}
      >
        <Text style={[styles.skipText, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
          Skip
        </Text>
      </TouchableOpacity>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {ONBOARDING_SLIDES.map((slide, index) => (
          <View key={slide.id} style={[styles.slide, { width: SCREEN_WIDTH }]}>
            {/* Illustration area */}
            <View style={styles.illustWrap}>
              <View
                style={[
                  styles.illustBg,
                  { backgroundColor: slide.accentColor + "12", borderColor: slide.accentColor + "20" },
                ]}
              >
                <SlideIllustration accentColor={slide.accentColor} index={index} />
              </View>
            </View>

            {/* Text */}
            <View style={styles.textBlock}>
              <Text
                style={[
                  styles.title,
                  { color: colors.foreground, fontFamily: "Inter_700Bold" },
                ]}
              >
                {slide.title}
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
                ]}
              >
                {slide.subtitle}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom area */}
      <View
        style={[
          styles.bottom,
          { paddingBottom: bottomInset + 20 },
        ]}
      >
        {/* Dots */}
        <View style={styles.dots}>
          {ONBOARDING_SLIDES.map((s, i) => (
            <View
              key={s.id}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === currentIndex ? slide.accentColor : colors.border,
                  width: i === currentIndex ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        {/* Next / Get Started button */}
        <TouchableOpacity activeOpacity={0.85} onPress={goNext}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.nextBtn, { borderRadius: colors.radius }]}
          >
            <Text style={[styles.nextText, { fontFamily: "Inter_700Bold" }]}>
              {currentIndex === ONBOARDING_SLIDES.length - 1 ? "Get Started" : "Continue"}
            </Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipBtn: {
    position: "absolute",
    right: 24,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  skipText: {
    fontSize: 15,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  illustWrap: {
    marginBottom: 48,
  },
  illustBg: {
    width: 240,
    height: 240,
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  illus: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  illustBar: {
    width: 20,
    borderRadius: 6,
  },
  illustArrowRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  illustCircle: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  illustLine: {
    height: 6,
    width: 160,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  illustLineFill: {
    height: "100%",
    borderRadius: 3,
  },
  illustDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  checkLabel: {
    fontSize: 14,
  },
  textBlock: {
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  bottom: {
    paddingHorizontal: 28,
    gap: 28,
    alignItems: "center",
  },
  dots: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
