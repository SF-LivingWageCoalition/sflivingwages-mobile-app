import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import {
  ImageBackground,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import goldenGateBridge from "../../assets/images/golden-gate-bridge.png";
import AuthModal from "../../components/AuthModal/AuthModal";
import { AssistanceTabParamList } from "../../types/types";
import { useAuthGate } from "../../hooks/useAuthGate";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";
import { colors } from "../../theme";

type AssistanceTile = {
  title: string;
  screen: keyof AssistanceTabParamList;
  icon: React.ComponentProps<typeof FontAwesome5>["name"];
};

type AssistanceSection = {
  title: string;
  data: AssistanceTile[][];
};

const AssistanceHome: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AssistanceTabParamList>>();
  const rootNavigation = useNavigation<NavigationProp<ParamListBase>>();

  const authGate = useAuthGate({
    onForgotPassword: () =>
      rootNavigation.navigate("AuthNavigator", {
        screen: "ForgotPassword",
      } as never),
  });

  const handleTilePress = (screen: keyof AssistanceTabParamList) => {
    if (screen === "ReportViolation") {
      authGate.trigger(() =>
        navigation.navigate("Assistance", { screen: "ReportViolation" }),
      );
    } else {
      navigation.navigate("Assistance", { screen });
    }
  };

  const sections: AssistanceSection[] = [
    {
      title: translate("assistHomeScreen.complaints"),
      data: [
        [
          {
            title: translate("assistHomeScreen.getAssistance"),
            screen: "ReportViolation",
            icon: "hands-helping",
          },
          {
            title: translate("assistHomeScreen.reportBusiness"),
            screen: "ReportBusiness",
            icon: "building",
          },
        ],
      ],
    },
    {
      title: translate("assistHomeScreen.rights"),
      data: [
        [
          {
            title: translate("assistHomeScreen.beReadyForICE"),
            screen: "BeReadyForICE",
            icon: "shield-alt",
          },
          {
            title: translate("assistHomeScreen.wageRights"),
            screen: "WageRights",
            icon: "gavel",
          },
        ],
      ],
    },
    {
      title: translate("assistHomeScreen.calculator"),
      data: [
        [
          {
            title: translate("assistHomeScreen.livingWageCalculator"),
            screen: "LivingWageCalculator",
            icon: "calculator",
          },
        ],
      ],
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

      <SectionList
        sections={sections}
        keyExtractor={(row, index) =>
          `${row.map((item) => item.title).join("-")}-${index}`
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        stickySectionHeadersEnabled={false}
        renderItem={({ item: row }) => (
          <View style={styles.row}>
            {row.map((item) => (
              <View key={item.title} style={styles.item}>
                <TouchableOpacity
                  onPress={() => handleTilePress(item.screen)}
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
            ))}
          </View>
        )}
      />
      <AuthModal {...authGate.modalProps} />
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

  sectionTitle: {
    ...textStyles.h2,
    color: colors.light.textPrimary,
    marginBottom: 14,
    paddingHorizontal: 18,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 6,
  },
});

export default AssistanceHome;
