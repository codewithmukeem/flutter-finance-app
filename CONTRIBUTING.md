# Contributing to FinanceFlow

Thank you for your interest in contributing to FinanceFlow! This document provides guidelines and steps for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and harassment-free environment.

## How to Contribute

### Reporting Bugs

1. Check the [existing issues](https://github.com/codewithmukeem/flutter-finance-app/issues) to avoid duplicates.
2. Open a new issue using the **Bug Report** template.
3. Include:
   - A clear title and description
   - Steps to reproduce the bug
   - Expected vs. actual behaviour
   - Device / OS / Expo SDK version
   - Screenshots if applicable

### Suggesting Features

1. Open an issue using the **Feature Request** template.
2. Describe the problem you'd like to solve and why it belongs in this project.
3. Include mockups or examples if possible.

### Submitting Code

#### Setup

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/<your-username>/flutter-finance-app.git
cd flutter-finance-app
pnpm install
```

#### Development workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Start the dev server
pnpm --filter @workspace/mobile run dev

# TypeScript check before committing
pnpm run typecheck
```

#### Commit messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Prefix | Use for |
|--------|---------|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `style:` | Formatting, no logic change |
| `refactor:` | Code refactoring |
| `docs:` | Documentation only |
| `chore:` | Build, tooling, dependencies |
| `test:` | Adding or updating tests |

Examples:
```
feat: add budget screen with category limits
fix: resolve dark mode flicker on Android
docs: update installation instructions
```

#### Pull Request checklist

- [ ] TypeScript compiles without errors (`pnpm run typecheck`)
- [ ] Code follows the existing style (no new `console.log` statements)
- [ ] UI tested on both iOS and Android (Expo Go or simulator)
- [ ] Dark mode and light mode both look correct
- [ ] Commit messages follow the Conventional Commits format
- [ ] PR title describes what changed

## Style Guide

- **TypeScript**: strict mode, no `any` types
- **Components**: functional components with typed props
- **Styles**: React Native `StyleSheet.create`, no inline style objects in JSX
- **Colors**: always use `useColors()` hook — never hardcode hex values
- **Fonts**: always set `fontFamily` from the Inter scale (`Inter_400Regular`, etc.)
- **Logging**: never use `console.log` in production code paths

## Project Structure

New screens go in `artifacts/mobile/app/`. New reusable components go in `artifacts/mobile/components/`. New data types go in `artifacts/mobile/data/dummyData.ts`.

## License

By contributing to FinanceFlow, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Questions? Open an issue or reach out at [github.com/codewithmukeem](https://github.com/codewithmukeem).
