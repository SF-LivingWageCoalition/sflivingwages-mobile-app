import { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import MainButton from "../../../../components/MainButton";
import { colors } from "../../../../theme";
import { textStyles } from "../../../../theme/fontStyles";
import { ItemModalProps } from "../../../../types/types";

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
            <MainButton
              variant="primary"
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.buttonClose}
            />
          </View>
        </View>
      </Modal>
      <MainButton
        variant="text"
        title="Read More"
        onPress={() => setModalVisible(true)}
        style={styles.textStyleOpen}
        textStyle={{ color: colors.light.textPrimary }}
      />
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
  buttonClose: {
    marginTop: 15,
  },
  titleText: {
    ...textStyles.h3,
    padding: 10,
    color: colors.light.textPrimary,
    textAlign: "center",
  },
  textStyleOpen: {
    marginHorizontal: 16,
  },
  modalText: {
    ...textStyles.bodyLarge,
    marginBottom: 15,
  },
});

export default ItemModal;
