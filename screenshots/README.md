# Screenshots

This folder contains screenshots of the FinanceFlow app for the README and App Store / Play Store listings.

## How to add screenshots

### Option A — Device (recommended)

1. Run the app on a physical device via Expo Go:
   ```bash
   pnpm --filter @workspace/mobile run dev
   ```
2. Navigate to each screen and take a screenshot using your device's native screenshot shortcut.
3. Transfer the images to this folder and rename them per the table below.

### Option B — iOS Simulator

1. Open Xcode → Open Simulator
2. Run `pnpm --filter @workspace/mobile run dev`, then press `i` to open on iOS Simulator
3. Press **Cmd + S** to take a screenshot (saved to Desktop)
4. Rename and move to this folder

### Option C — Android Emulator

1. Start an Android Virtual Device in Android Studio
2. Run `pnpm --filter @workspace/mobile run dev`, then press `a` to open on Android
3. Press the camera button in the emulator toolbar
4. Rename and move to this folder

### Option D — Web (quick)

1. Run `pnpm --filter @workspace/mobile run dev`, press `w` to open in browser
2. Use browser DevTools → Toggle device toolbar (Ctrl/Cmd+Shift+M) for mobile dimensions
3. Press Ctrl/Cmd+Shift+P → type "screenshot" → Capture screenshot

---

## Required screenshots

| Filename | Screen | Description |
|----------|--------|-------------|
| `01_splash.png` | Splash | Animated logo on navy background |
| `02_onboarding.png` | Onboarding | Slide 1 or all 3 slides |
| `03_login.png` | Login | Login form |
| `04_home.png` | Home Dashboard | Balance + stats + chart |
| `05_analytics.png` | Analytics | Donut chart + monthly overview |
| `06_wallet.png` | Wallet | Card carousel |
| `07_transactions.png` | Transactions | Transaction list with search |
| `08_profile.png` | Profile | Settings screen |
| `09_dark_mode.png` | Dark Mode | Home or Analytics in dark theme |

---

## Recommended dimensions

- **Portrait**: 390 × 844 px (iPhone 14 standard)
- **Format**: PNG, < 1 MB each
- **No personal data** visible in screenshots

---

> Once screenshots are added, delete this README or keep it for contributor reference.
