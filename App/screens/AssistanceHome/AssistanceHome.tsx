import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";
import { AssistanceTabParamList } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import goldenGateBridge from "../../assets/images/golden-gate-bridge.png";

const AssistanceHome: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AssistanceTabParamList>>();

  const buttons: {
    title: string;
    screen: keyof AssistanceTabParamList;
    icon: string;
  }[] = [
    {
      title: translate("assistHomeScreen.getAssistance"),
      screen: "ReportViolation",
      icon: "hands-helping",
    },
    {
      title: translate("assistHomeScreen.wageRights"),
      screen: "WageRights",
      icon: "gavel",
    },
    {
      title: translate("assistHomeScreen.beReadyForICE"),
      screen: "BeReadyForICE",
      icon: "shield-alt",
    },
    {
      title: "Living Wage Calculator",
      screen: "LivingWageCalculator",
      icon: "calculator",
    },
    {
      title: translate("assistHomeScreen.reportBusiness"),
      screen: "ReportBusiness",
      icon: "building",
    },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={goldenGateBridge}
        style={styles.heroImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {translate("assistHomeScreen.title")}
            </Text>
            <Text style={styles.subtitle}>
              {translate("assistHomeScreen.subtitle")}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <FlatList
        data={buttons}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Assistance", { screen: item.screen })
              }
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={item.title}
              style={styles.tile}
            >
              <View style={styles.tileHeader}>
                <View style={styles.iconWrap}>
                  <FontAwesome5
                    name={item.icon}
                    size={22}
                    color={colors.light.primary}
                  />
                </View>
                <Entypo
                  name="chevron-right"
                  size={22}
                  color={colors.light.textSecondary}
                />
              </View>

              <Text style={styles.tileTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  heroImage: {
    width: "100%",
    height: 250,
    justifyContent: "flex-end",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 6,
    margin: "auto",
  },
  title: {
    ...textStyles.h1,
    color: colors.light.surface,
    textTransform: "uppercase",
  },
  subtitle: {
    ...textStyles.bodySmall,
    marginBottom: 8,
    color: colors.light.surface,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  listContent: {
    marginTop: 6,
    paddingBottom: 10,
    paddingTop: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  item: {
    flex: 0.5,
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  tile: {
    backgroundColor: colors.light.surface,
    borderRadius: 12,
    padding: 14,
    minHeight: 140,
    aspectRatio: 1.08,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.light.surfaceVariant,
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconWrap: {
    backgroundColor: colors.light.primaryContainer || "#E8F0FF",
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tileTitle: {
    ...textStyles.bodyBold,
    color: colors.light.textPrimary,
    marginTop: 6,
  },
});

export default AssistanceHome;
