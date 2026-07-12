/**
 * AppContext — manages theme preference, onboarding, and user session state.
 * Theme uses React Native's Appearance API to override the system color scheme.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

type ThemeMode = "light" | "dark" | "system";

interface AppContextValue {
  hasSeenOnboarding: boolean;
  isLoggedIn: boolean;
  themeMode: ThemeMode;
  notificationsEnabled: boolean;
  setHasSeenOnboarding: (val: boolean) => void;
  setIsLoggedIn: (val: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setNotificationsEnabled: (val: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEYS = {
  ONBOARDING: "@ff_onboarding",
  LOGGED_IN: "@ff_logged_in",
  THEME: "@ff_theme",
  NOTIFICATIONS: "@ff_notifications",
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [hasSeenOnboarding, setHasSeenOnboardingState] = useState(false);
  const [isLoggedIn, setIsLoggedInState] = useState(false);
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [notificationsEnabled, setNotificationsEnabledState] = useState(true);
  const [ready, setReady] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    (async () => {
      try {
        const [onboarding, loggedIn, theme, notifications] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING),
          AsyncStorage.getItem(STORAGE_KEYS.LOGGED_IN),
          AsyncStorage.getItem(STORAGE_KEYS.THEME),
          AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS),
        ]);
        if (onboarding === "true") setHasSeenOnboardingState(true);
        if (loggedIn === "true") setIsLoggedInState(true);
        if (theme) {
          const t = theme as ThemeMode;
          setThemeModeState(t);
          applyTheme(t);
        }
        if (notifications !== null) setNotificationsEnabledState(notifications === "true");
      } finally {
        setReady(true);
      }
    })();
  }, []);

  function applyTheme(mode: ThemeMode) {
    if (mode === "system") {
      Appearance.setColorScheme(null);
    } else {
      Appearance.setColorScheme(mode as ColorSchemeName);
    }
  }

  function setHasSeenOnboarding(val: boolean) {
    setHasSeenOnboardingState(val);
    AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING, String(val));
  }

  function setIsLoggedIn(val: boolean) {
    setIsLoggedInState(val);
    AsyncStorage.setItem(STORAGE_KEYS.LOGGED_IN, String(val));
  }

  function setThemeMode(mode: ThemeMode) {
    setThemeModeState(mode);
    AsyncStorage.setItem(STORAGE_KEYS.THEME, mode);
    applyTheme(mode);
  }

  function setNotificationsEnabled(val: boolean) {
    setNotificationsEnabledState(val);
    AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, String(val));
  }

  if (!ready) return null;

  return (
    <AppContext.Provider
      value={{
        hasSeenOnboarding,
        isLoggedIn,
        themeMode,
        notificationsEnabled,
        setHasSeenOnboarding,
        setIsLoggedIn,
        setThemeMode,
        setNotificationsEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
