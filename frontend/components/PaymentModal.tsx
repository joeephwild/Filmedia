import React, { useState } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";
import SelectOption from "./PaymentSteps/SelectOption";
import PaymentProcessing from "./PaymentSteps/PaymentProcessing";
import PaymentAcheieved from "./PaymentSteps/PaymentAcheieved";

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  depositing: boolean;
  artirstAddress: string | string[]
};

const PaymentModal = ({
  modalVisible,
  setModalVisible,
  depositing,
  artirstAddress
}: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const prev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handldisplay = () => {
    switch (currentStep) {
      case 0:
        return (
          <SelectOption
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handleNext={next}
          />
        );
      case 1:
        return (
          <PaymentProcessing
            setModalVisible={setModalVisible}
            setCurrentStep={setCurrentStep}
            depositing={depositing}
            artirstAddress={artirstAddress}
          />
        );

      case 2:
        return (
          <PaymentAcheieved
            setModalVisible={setModalVisible}
            setCurrentStep={setCurrentStep}
          />
        );

      default:
        break;
    }
  };

  return (
    <View style={{ marginTop: 22 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        style={{}}
      >
        <View
          style={{
            marginTop: 200,
            backgroundColor: "white",
            padding: 20,
            shadowColor: "#000",
            width: 345,
            marginHorizontal: 20,
            height: "auto",
            borderRadius: 16,
          }}
        >
          {handldisplay()}
        </View>
      </Modal>
    </View>
  );
};

export default PaymentModal;
