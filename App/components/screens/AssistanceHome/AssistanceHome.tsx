import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { translate } from "../../../translation/i18n";

interface AssistanceHomeProps {
  navigation: any;
}

const AssistanceHome: React.FC<AssistanceHomeProps> = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../../../assets/icon.png")}
            />
          </View>
          <Text style={styles.title}>
            {translate("assistHomeScreen.title")}
          </Text>
          <Text style={styles.subtitle}>
            {translate("assistHomeScreen.subtitle")}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("AssistanceScreen")}
            >
              <Text style={styles.buttonText}>
                {translate("assistHomeScreen.getAssistance")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("WageRights")}
            >
              <Text style={styles.buttonText}>
                {translate("assistHomeScreen.wageRights")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
  buttonContainer: {
    marginTop: 20,
    gap: 20,
  },
  button: {
    backgroundColor: "#177ddc",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 6,
    shadowColor: "#177ddc",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "700",
  },
});

export default AssistanceHome;
