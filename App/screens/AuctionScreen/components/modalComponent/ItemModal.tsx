import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ItemModalProps } from "../../../../types/types";
import { colors } from "../../../../theme";
import { fontSize, fontWeight } from "../../../../theme/fontStyles";

const ItemModal: React.FC<ItemModalProps> = ({ description, title }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        presentationStyle="pageSheet"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.titleText}>{title}</Text>
            <ScrollView>
              <Text style={styles.modalText}>{description}</Text>
            </ScrollView>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyleClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyleOpen}>Read More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "flex-start",
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.light.background,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: colors.light.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    color: colors.light.textPrimary,
  },
  buttonClose: {
    marginTop: 15,
    backgroundColor: colors.light.primary,
  },
  titleText: {
    padding: 10,
    fontSize: fontSize.lg,
    color: colors.light.textPrimary,
    fontWeight: fontWeight.bold,
    textAlign: "center",
  },
  textStyleOpen: {
    color: colors.light.textPrimary,
    fontWeight: fontWeight.bold,
  },
  textStyleClose: {
    color: colors.light.textOnPrimary,
    fontWeight: fontWeight.bold,
    textAlign: "center",
    fontSize: fontSize.lg,
  },
  modalText: {
    marginBottom: 15,
    fontSize: fontSize.md,
  },
});

export default ItemModal;
