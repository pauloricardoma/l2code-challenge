import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

export type Option = {
  label: string;
  value: number;
}

type SelectProps = {
  value: number;
  options: Option[];
  placeholder: string;
  error?: string;
  onChange: (value: number) => void;
}

function Select({
  value,
  options,
  placeholder,
  error,
  onChange,
}: SelectProps) {

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        style={styles.picker}
        mode="dropdown"
        onValueChange={(itemValue) =>
          onChange(itemValue)
        }
      >
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
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default Select;

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  picker: {
    backgroundColor: "#FFFCFC",
  },
  error: {
    fontSize: 10,
    lineHeight: 10,
    fontWeight: "400",
    color: "#FF0000",
    marginLeft: 4,
  },
});
