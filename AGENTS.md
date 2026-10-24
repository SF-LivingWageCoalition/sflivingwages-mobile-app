# Project notes

## Environment

- Node 24 (see `.nvmrc` / `.node-version`). Expo SDK 58 tooling requires >= 22.13 on the 22 line or >= 24.3 on the 24 line, and rejects odd-numbered releases.
- Yarn 4 (`packageManager` field). Use `npx expo install <pkg>` rather than `yarn add` for anything Expo versions, so the SDK's pinned range is respected.

## Verification

Run all three before considering a dependency or SDK change done:

```sh
npx tsc --noEmit
npx expo-doctor
npx expo export --platform ios --output-dir /tmp/export-check   # and --platform android
```

`expo export` is the cheapest way to catch Babel/Metro resolution breakage without a native build; `tsc` alone will not find it. Delete the output directory afterwards.

The native side is Continuous Native Generation — there is no committed `ios/` or `android/` directory, so SDK upgrades do not need a manual native migration, but they do need a fresh development build (`eas build --profile development`).

## Babel configuration

Keep all Babel configuration in `babel.config.js`. A `.babelrc` existed until the SDK 56 upgrade and had to be deleted: from SDK 56 on, its presence stops `babel.config.js` from applying, so `babel-preset-expo` never runs and bundling fails on the first TypeScript generic it encounters.

## Environment variables

Read configuration from `process.env.EXPO_PUBLIC_*` directly. The `@env` module (`react-native-dotenv`) was removed in the SDK 56 upgrade; it had no remaining imports.

Note that from SDK 58, Expo CLI overwrites `NODE_ENV` based on the command being run, so `.env.<mode>` files load according to that mode rather than any value you set yourself.

## Dependency hygiene

This project accumulated a number of dependencies with no imports anywhere in the app, including a full Material UI and Express/MySQL stack. Removed during the SDK 58 upgrade work: `@material-ui/core`, `@material-ui/icons`, `express`, `body-parser`, `mysql`, `consolidate`, `querystring`, `date-fns`, `react-native-tab-view`, `react-native-credit-card-input`, `react-native-keyboard-spacer`, `react-native-render-html`.

`react-native-render-html` in particular is worth remembering: `expo-doctor` flags it as unmaintained, and it is a genuine React 19 / New Architecture risk, but it had no imports. HTML from the WordPress API is handled instead by `html-entities` plus regex stripping in `App/screens/EventsScreen/EventDetails.tsx`, and by `react-native-webview` for embedded video in `App/screens/HomeScreen/NewHome.tsx`. If rich HTML rendering is ever needed again, pick a maintained library rather than reinstating this one.

Before adding a dependency, check `reactnative.directory` for maintenance status and New Architecture support. `expo-doctor` validates installed packages against it.

## Known remaining warnings

`react-native-vector-icons` has no React Native Directory metadata, so `expo-doctor` can only report it as unknown rather than validate it. It is still a dependency and `App.tsx` silences its deprecation warning via `LogBox`. Prefer `@expo/vector-icons` for new icon usage, though that package is itself slated for deprecation in a future SDK.

## Dead code

`App/navigation/LogoHeader.tsx` is not imported anywhere. Its `navigate("Home")` call uses the pattern React Navigation 7 removed (navigating into a nested child navigator); if it is ever wired up it needs `navigate("TabStack", { screen: "Home" })`.
