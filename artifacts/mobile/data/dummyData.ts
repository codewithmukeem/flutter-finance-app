// FinanceFlow — local dummy data (no backend required)

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  iconName: string;
  iconSet: "Feather" | "MaterialCommunityIcons" | "Ionicons";
  iconBg: string;
}

export interface WalletCard {
  id: string;
  cardHolder: string;
  number: string;
  expiry: string;
  cvv: string;
  type: "visa" | "mastercard";
  balance: number;
  gradientColors: string[];
}

export interface WeeklyPoint {
  day: string;
  amount: number;
}

export interface MonthlyPoint {
  month: string;
  income: number;
  expense: number;
}

export interface Category {
  name: string;
  amount: number;
  color: string;
  percentage: number;
  iconName: string;
}

export interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
}

export const USER = {
  name: "Mukeem Javaid",
  email: "mukeem@financeflow.app",
  totalBalance: 24580.50,
  monthlyIncome: 8340.00,
  monthlyExpense: 3241.75,
  monthlySavings: 5098.25,
  savingsGoal: 10000,
  currentSavings: 7240,
  github: "https://github.com/codewithmukeem",
};

export const TRANSACTIONS: Transaction[] = [
  { id: "1", title: "Netflix", category: "Entertainment", amount: -14.99, date: "Jul 11", iconName: "tv", iconSet: "Feather", iconBg: "#DC2626" },
  { id: "2", title: "Salary Deposit", category: "Income", amount: 6800.00, date: "Jul 10", iconName: "trending-up", iconSet: "Feather", iconBg: "#10B981" },
  { id: "3", title: "Starbucks Coffee", category: "Food & Drink", amount: -6.50, date: "Jul 10", iconName: "coffee", iconSet: "Feather", iconBg: "#F59E0B" },
  { id: "4", title: "Uber Ride", category: "Transport", amount: -12.30, date: "Jul 9", iconName: "car", iconSet: "Feather", iconBg: "#6366F1" },
  { id: "5", title: "Amazon Order", category: "Shopping", amount: -89.99, date: "Jul 9", iconName: "shopping-bag", iconSet: "Feather", iconBg: "#8B5CF6" },
  { id: "6", title: "Gym Membership", category: "Health", amount: -49.99, date: "Jul 8", iconName: "activity", iconSet: "Feather", iconBg: "#06B6D4" },
  { id: "7", title: "Freelance Payment", category: "Income", amount: 1200.00, date: "Jul 7", iconName: "briefcase", iconSet: "Feather", iconBg: "#10B981" },
  { id: "8", title: "Electric Bill", category: "Utilities", amount: -87.50, date: "Jul 7", iconName: "zap", iconSet: "Feather", iconBg: "#EAB308" },
  { id: "9", title: "Spotify Premium", category: "Entertainment", amount: -9.99, date: "Jul 6", iconName: "music", iconSet: "Feather", iconBg: "#22C55E" },
  { id: "10", title: "Whole Foods Market", category: "Groceries", amount: -124.30, date: "Jul 6", iconName: "package", iconSet: "Feather", iconBg: "#84CC16" },
  { id: "11", title: "Apple Store", category: "Shopping", amount: -299.00, date: "Jul 5", iconName: "smartphone", iconSet: "Feather", iconBg: "#374151" },
  { id: "12", title: "Restaurant Dinner", category: "Food & Drink", amount: -45.80, date: "Jul 5", iconName: "coffee", iconSet: "Feather", iconBg: "#F97316" },
  { id: "13", title: "Internet Bill", category: "Utilities", amount: -59.99, date: "Jul 4", iconName: "wifi", iconSet: "Feather", iconBg: "#0EA5E9" },
  { id: "14", title: "Investment Return", category: "Income", amount: 340.00, date: "Jul 3", iconName: "trending-up", iconSet: "Feather", iconBg: "#10B981" },
  { id: "15", title: "Airbnb Stay", category: "Travel", amount: -180.00, date: "Jul 2", iconName: "map-pin", iconSet: "Feather", iconBg: "#F43F5E" },
  { id: "16", title: "Gas Station", category: "Transport", amount: -52.40, date: "Jul 1", iconName: "feather", iconSet: "Feather", iconBg: "#78716C" },
  { id: "17", title: "Rent Payment", category: "Housing", amount: -1500.00, date: "Jul 1", iconName: "home", iconSet: "Feather", iconBg: "#7C3AED" },
  { id: "18", title: "Udemy Course", category: "Education", amount: -29.99, date: "Jun 30", iconName: "book", iconSet: "Feather", iconBg: "#2563EB" },
  { id: "19", title: "Pharmacy", category: "Health", amount: -23.50, date: "Jun 29", iconName: "heart", iconSet: "Feather", iconBg: "#EF4444" },
  { id: "20", title: "Phone Bill", category: "Utilities", amount: -89.99, date: "Jun 28", iconName: "phone", iconSet: "Feather", iconBg: "#64748B" },
];

export const WEEKLY_DATA: WeeklyPoint[] = [
  { day: "Mon", amount: 145 },
  { day: "Tue", amount: 89 },
  { day: "Wed", amount: 320 },
  { day: "Thu", amount: 210 },
  { day: "Fri", amount: 380 },
  { day: "Sat", amount: 156 },
  { day: "Sun", amount: 92 },
];

export const MONTHLY_DATA: MonthlyPoint[] = [
  { month: "Feb", income: 6800, expense: 2900 },
  { month: "Mar", income: 6800, expense: 3200 },
  { month: "Apr", income: 7200, expense: 2800 },
  { month: "May", income: 6800, expense: 3600 },
  { month: "Jun", income: 8100, expense: 3100 },
  { month: "Jul", income: 8340, expense: 3241 },
];

export const CATEGORIES: Category[] = [
  { name: "Housing", amount: 1500, color: "#7C3AED", percentage: 46, iconName: "home" },
  { name: "Food", amount: 177, color: "#F59E0B", percentage: 14, iconName: "coffee" },
  { name: "Shopping", amount: 389, color: "#EC4899", percentage: 12, iconName: "shopping-bag" },
  { name: "Transport", amount: 65, color: "#6366F1", percentage: 6, iconName: "car" },
  { name: "Entertainment", amount: 25, color: "#06B6D4", percentage: 4, iconName: "tv" },
  { name: "Others", amount: 1085, color: "#94A3B8", percentage: 18, iconName: "more-horizontal" },
];

export const WALLET_CARDS: WalletCard[] = [
  {
    id: "1",
    cardHolder: "Mukeem Javaid",
    number: "•••• •••• •••• 4242",
    expiry: "12/26",
    cvv: "•••",
    type: "visa",
    balance: 12840.50,
    gradientColors: ["#1E3A8A", "#2563EB", "#3B82F6"],
  },
  {
    id: "2",
    cardHolder: "Mukeem Javaid",
    number: "•••• •••• •••• 8891",
    expiry: "08/27",
    cvv: "•••",
    type: "mastercard",
    balance: 5620.00,
    gradientColors: ["#4C1D95", "#7C3AED", "#8B5CF6"],
  },
  {
    id: "3",
    cardHolder: "Mukeem Javaid",
    number: "•••• •••• •••• 3317",
    expiry: "03/25",
    cvv: "•••",
    type: "visa",
    balance: 6120.00,
    gradientColors: ["#064E3B", "#059669", "#10B981"],
  },
];

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: "1",
    title: "Smart Financial\nTracking",
    subtitle: "Track every transaction with beautiful real-time insights. Know exactly where your money goes.",
    accentColor: "#3B82F6",
  },
  {
    id: "2",
    title: "Grow Your\nWealth Faster",
    subtitle: "Visualize your savings growth, spot trends, and make smarter financial decisions every day.",
    accentColor: "#10B981",
  },
  {
    id: "3",
    title: "Take Full\nControl Today",
    subtitle: "Budget smarter, spend wiser, save more. Your financial freedom starts right here.",
    accentColor: "#8B5CF6",
  },
];
