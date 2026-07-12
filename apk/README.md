# APK Releases

This folder contains pre-built Android APK files for direct installation on Android devices.

## Installation

1. **Download** the APK file from this folder (or from the [Releases](https://github.com/codewithmukeem/flutter-finance-app/releases) page).
2. **Transfer** it to your Android device.
3. On your device, go to **Settings → Security → Unknown sources** and enable it.
4. **Open** the APK file and tap **Install**.
5. Once installed, open **FinanceFlow** from your app drawer.

> ⚠️ This app is not distributed via the Play Store. You may see an "Unknown source" warning — this is expected for sideloaded apps.

---

## Building your own APK

### Prerequisites

- [EAS CLI](https://docs.expo.dev/build/setup/): `npm install -g eas-cli`
- An [Expo account](https://expo.dev/signup) (free)

### Steps

```bash
# From the mobile app folder
cd artifacts/mobile

# Log in to Expo
eas login

# Configure EAS (first time only)
eas build:configure

# Build a preview APK (no Play Store required)
eas build --platform android --profile preview

# Download the APK from the Expo dashboard and place it here
```

### Build profiles

| Profile | Description | Use for |
|---------|-------------|---------|
| `preview` | Internal APK, no Play Store | Testing & sharing |
| `production` | Signed AAB for Play Store | App Store release |

---

## Release history

| Version | Date | Notes |
|---------|------|-------|
| v1.0.0 | Coming soon | Initial release |

---

> Once an APK is built, place it here and update the table above.
