import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import ThemedButton from "./ThemedButton";

export type Option = {
  label: string;
  value: string | number;
}

type OptionsIOsModalProps = {
  visible: boolean;
  value: string | number;
  options: Option[];
  placeholder: string;
  onChange: (value: string | number) => void;
  onClose: () => void;
}

function OptionsIOsModal({ 
  visible, 
  value, 
  options, 
  placeholder,
  onChange, 
  onClose
}: OptionsIOsModalProps) {
  const [selectedValue, setSelectedValue] = useState<string | number>(value);

  const handleChange = () => {
    onChange(selectedValue);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) =>
            setSelectedValue(itemValue)
          }>
          <Picker.Item label={placeholder} value={0} color="#747474" />
          {options.map((option) => (
            <Picker.Item 
              key={option.value} 
              label={option.label} 
              value={option.value} 
              color="#1D1D1D"
            />
          ))}
        </Picker>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <ThemedButton type="default" text="Fechar" onPress={onClose} />
          </View>
          <View style={styles.button}>
            <ThemedButton type="primary" text="Salvar" onPress={handleChange} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default OptionsIOsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    flex: 1,
  },
});
