import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ItemModalProps } from "../../../../App/types";

// Modal Description
const ItemModal: React.FC<ItemModalProps> = ({ decription, title }) => {
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
              <Text style={styles.modalText}>{decription}</Text>
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
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
  },
  buttonOpen: {
    color: "black",
  },
  buttonClose: {
    marginTop: 15,
    backgroundColor: "#D31623",
  },
  titleText: {
    padding: 10,
    fontSize: 21,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyleOpen: {
    color: "#000",
    fontWeight: "bold",
  },
  textStyleClose: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 19,
  },
});

export default ItemModal;
