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

The native side is Continuous Native Generation — there is no committed `ios/` or `android/` directory, so SDK upgrades do not need a manual native migration, but they do need a fresh development build (`eas build --profile development`). `npx expo prebuild --no-install` is a useful fourth check, since it validates the config plugins and surfaces deprecated `app.json` fields; delete the generated `ios/` and `android/` directories afterwards, as neither is gitignored.

## React Native types

React Native 0.87 made the [Strict TypeScript API](https://reactnative.dev/docs/strict-typescript-api) the default, which changed two things this codebase ran into during the SDK 58 upgrade:

- Component classes are no longer their own instance types. Refs need the instance types: `TextInputInstance`, `ViewInstance`, `ScrollViewInstance`, imported with an inline `type` modifier from `react-native`.
- `ViewStyle` and `TextStyle` are now readonly, so a style object cannot be built by assigning properties one at a time. Build literals and compose them with spreads instead (see `App/components/MainButton.tsx`).

Deep imports from `react-native/Libraries/*` are type errors. There is a `customConditions` opt-out in `tsconfig.json` for the whole migration, but this project does not use it and should not need to.

`ImageBackground` is deprecated as of SDK 58 in favour of a `View` with an absolutely positioned `Image`. It still works and is used in several screens; migrate opportunistically.

## Android specifics

Edge-to-edge is mandatory, and the status bar cannot be given a background colour. The `androidStatusBar` app.json field was removed in the SDK 58 upgrade because prebuild reported it as deprecated and having no effect; the `expo-status-bar` plugin accepts only `hidden` and `style`. To put colour behind the status bar, render a view inset by the top safe area.

R8 is enabled by default in release builds from SDK 58 (`android.enableMinifyInReleaseBuilds=true` in the generated `gradle.properties`). Libraries that rely on reflection may need ProGuard keep rules. If a release build misbehaves where a debug build does not, suspect this first; it can be turned off through `expo-build-properties`.

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
