/**
 * Login screen — email/password, Google Sign In (UI only), Continue as Guest.
 */
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function LoginScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { setIsLoggedIn } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomInset = Platform.OS === "web" ? 34 : insets.bottom;

  function validate() {
    const e: typeof errors = { email: "", password: "" };
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return !e.email && !e.password;
  }

  function handleLogin() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!validate()) return;
    setIsLoggedIn(true);
    router.replace("/(tabs)");
  }

  function handleGuest() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsLoggedIn(true);
    router.replace("/(tabs)");
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: topInset + 24, paddingBottom: bottomInset + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          {/* Mini logo */}
          <View style={styles.miniLogoWrap}>
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              style={styles.miniLogo}
            >
              <View style={[styles.minDiamond, { backgroundColor: "rgba(255,255,255,0.25)" }]} />
              <View style={[styles.minDiamond, styles.minDiamondInner, { backgroundColor: "#FFF" }]} />
            </LinearGradient>
          </View>
          <Text style={[styles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            Welcome back
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Sign in to your FinanceFlow account
          </Text>
        </View>

        {/* Form */}
        <View style={[styles.form, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
          {/* Email */}
          <View style={styles.fieldWrap}>
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
              Email
            </Text>
            <View
              style={[
                styles.inputRow,
                {
                  borderColor: emailFocused ? colors.primary : errors.email ? colors.expense : colors.border,
                  backgroundColor: colors.background,
                  borderRadius: colors.radius / 1.5,
                },
              ]}
            >
              <Feather name="mail" size={18} color={emailFocused ? colors.primary : colors.mutedForeground} />
              <TextInput
                style={[styles.input, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
                placeholder="you@example.com"
                placeholderTextColor={colors.mutedForeground}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {!!errors.email && (
              <Text style={[styles.errorText, { color: colors.expense, fontFamily: "Inter_400Regular" }]}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Password */}
          <View style={styles.fieldWrap}>
            <View style={styles.passwordHeader}>
              <Text style={[styles.fieldLabel, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
                Password
              </Text>
              <TouchableOpacity>
                <Text style={[styles.forgotText, { color: colors.primary, fontFamily: "Inter_500Medium" }]}>
                  Forgot?
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.inputRow,
                {
                  borderColor: passwordFocused ? colors.primary : errors.password ? colors.expense : colors.border,
                  backgroundColor: colors.background,
                  borderRadius: colors.radius / 1.5,
                },
              ]}
            >
              <Feather name="lock" size={18} color={passwordFocused ? colors.primary : colors.mutedForeground} />
              <TextInput
                style={[styles.input, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
                placeholder="••••••••"
                placeholderTextColor={colors.mutedForeground}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? "eye-off" : "eye"} size={18} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>
            {!!errors.password && (
              <Text style={[styles.errorText, { color: colors.expense, fontFamily: "Inter_400Regular" }]}>
                {errors.password}
              </Text>
            )}
          </View>

          {/* Login button */}
          <TouchableOpacity activeOpacity={0.85} onPress={handleLogin}>
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.loginBtn, { borderRadius: colors.radius / 1.5 }]}
            >
              <Text style={[styles.loginBtnText, { fontFamily: "Inter_700Bold" }]}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            or continue with
          </Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        </View>

        {/* Google Sign In */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          style={[
            styles.googleBtn,
            {
              borderColor: colors.border,
              backgroundColor: colors.card,
              borderRadius: colors.radius / 1.5,
            },
          ]}
        >
          {/* Google logo made from coloured squares */}
          <View style={styles.googleLogo}>
            <View style={[styles.gDot, { backgroundColor: "#4285F4" }]} />
            <View style={[styles.gDot, { backgroundColor: "#EA4335" }]} />
            <View style={[styles.gDot, { backgroundColor: "#FBBC04" }]} />
            <View style={[styles.gDot, { backgroundColor: "#34A853" }]} />
          </View>
          <Text style={[styles.googleText, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Guest */}
        <TouchableOpacity onPress={handleGuest} activeOpacity={0.7} style={styles.guestBtn}>
          <Text style={[styles.guestText, { color: colors.primary, fontFamily: "Inter_600SemiBold" }]}>
            Continue as Guest
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={[styles.footer, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          Created with ♥ by Mukeem Javaid
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    gap: 10,
  },
  miniLogoWrap: {
    marginBottom: 8,
  },
  miniLogo: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  minDiamond: {
    width: 28,
    height: 28,
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    borderRadius: 6,
  },
  minDiamondInner: {
    width: 18,
    height: 18,
    transform: [{ rotate: "45deg" }],
  },
  title: { fontSize: 26 },
  subtitle: { fontSize: 15 },
  form: {
    padding: 20,
    borderWidth: 1,
    gap: 18,
  },
  fieldWrap: { gap: 8 },
  fieldLabel: { fontSize: 13 },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotText: { fontSize: 13 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 13,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  errorText: { fontSize: 12, marginTop: 2 },
  loginBtn: {
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 4,
  },
  loginBtnText: { color: "#FFF", fontSize: 16 },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 13 },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderWidth: 1.5,
    paddingVertical: 14,
  },
  googleLogo: {
    width: 20,
    height: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 2,
  },
  gDot: {
    width: 9,
    height: 9,
    borderRadius: 2,
  },
  googleText: { fontSize: 15 },
  guestBtn: {
    alignItems: "center",
    paddingVertical: 16,
  },
  guestText: { fontSize: 15 },
  footer: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
  },
});
