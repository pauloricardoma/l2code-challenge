import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, StyleSheet, View } from "react-native";
import ThemedButton from "./ThemedButton";

type DateModalProps = {
  visible: boolean;
  value?: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
}

function DateModal({ visible, value, onChange, onClose }: DateModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());

  const handleChange = () => {
    onChange(selectedDate);
    onClose();
  }

  if (Platform.OS === "android") {
    return (
      <DateTimePicker
        display="spinner"
        value={value || new Date()}
        mode="datetime"
        is24Hour={true}
        textColor="#1D1D1D"
        onChange={(event, selectedDate) => {
          if (event.type === 'set') {
            onChange(selectedDate || new Date());
          }
          onClose();
        }}
        // negativeButton={{label: 'Voltar', textColor: '#919191'}}
        // positiveButton={{label: 'Salvar', textColor: '#1AA0F0'}}
        minimumDate={new Date()}
        onTouchCancel={onClose}
      />
    )
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <DateTimePicker
          display="spinner"
          value={selectedDate}
          mode="datetime"
          is24Hour={true}
          onChange={(_e, selectedDate) => {
            setSelectedDate(selectedDate || new Date());
          }}
          textColor="#1D1D1D"
        />
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

export default DateModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  button: {
    flex: 1,
  },
});