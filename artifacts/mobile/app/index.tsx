/**
 * Splash screen — animated FinanceFlow logo, then routes to onboarding or main app.
 */
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function SplashScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { hasSeenOnboarding, isLoggedIn } = useApp();

  // Animation values
  const scale = useRef(new Animated.Value(0.3)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const creditOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo appears with spring scale + fade
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
      // Tagline fades in
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        delay: 100,
        useNativeDriver: true,
      }),
      // Credit fades in
      Animated.timing(creditOpacity, {
        toValue: 1,
        duration: 400,
        delay: 100,
        useNativeDriver: true,
      }),
      // Hold
      Animated.delay(900),
    ]).start(() => {
      // Navigate to the right screen
      if (!hasSeenOnboarding) {
        router.replace("/onboarding");
      } else if (!isLoggedIn) {
        router.replace("/login");
      } else {
        router.replace("/(tabs)");
      }
    });
  }, []);

  const rotation = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["-20deg", "0deg"],
  });

  const topInset = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.gradientStart, paddingTop: topInset },
      ]}
    >
      {/* Decorative rings */}
      <View style={[styles.ring1, { borderColor: "rgba(255,255,255,0.06)" }]} />
      <View style={[styles.ring2, { borderColor: "rgba(255,255,255,0.04)" }]} />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoWrap,
          { opacity, transform: [{ scale }, { rotate: rotation }] },
        ]}
      >
        {/* Diamond logo — two overlapping rotated squares */}
        <View style={styles.logoOuter}>
          <View style={[styles.diamond, { backgroundColor: "rgba(255,255,255,0.15)" }]} />
          <View
            style={[
              styles.diamond,
              styles.diamondInner,
              { backgroundColor: colors.primary },
            ]}
          />
          {/* Arrow line */}
          <View style={styles.arrow} />
        </View>
      </Animated.View>

      {/* App name */}
      <Animated.View style={[styles.nameWrap, { opacity: taglineOpacity }]}>
        <Text style={[styles.appName, { fontFamily: "Inter_700Bold" }]}>
          FinanceFlow
        </Text>
        <Text style={[styles.tagline, { fontFamily: "Inter_400Regular" }]}>
          Your money, beautifully managed
        </Text>
      </Animated.View>

      {/* Credit */}
      <Animated.View
        style={[
          styles.credit,
          { opacity: creditOpacity, bottom: insets.bottom + 28 },
        ]}
      >
        <Text style={[styles.creditText, { fontFamily: "Inter_400Regular" }]}>
          Created with ♥ by Mukeem Javaid
        </Text>
        <Text style={[styles.creditSub, { fontFamily: "Inter_400Regular" }]}>
          github.com/codewithmukeem
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ring1: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 1,
  },
  ring2: {
    position: "absolute",
    width: 460,
    height: 460,
    borderRadius: 230,
    borderWidth: 1,
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },
  logoOuter: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  diamond: {
    width: 56,
    height: 56,
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    borderRadius: 10,
  },
  diamondInner: {
    width: 40,
    height: 40,
    transform: [{ rotate: "45deg" }],
  },
  arrow: {
    position: "absolute",
    width: 18,
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    transform: [{ rotate: "-45deg" }, { translateX: 2 }, { translateY: -2 }],
  },
  nameWrap: {
    alignItems: "center",
    gap: 8,
  },
  appName: {
    fontSize: 34,
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.70)",
  },
  credit: {
    position: "absolute",
    alignItems: "center",
    gap: 4,
  },
  creditText: {
    color: "rgba(255,255,255,0.70)",
    fontSize: 13,
  },
  creditSub: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
  },
});
