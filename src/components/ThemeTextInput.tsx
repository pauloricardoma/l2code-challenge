import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type ThemeTextInputProps = TextInputProps & {
  error?: string;
}

function ThemeTextInput({error, ...props}: ThemeTextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput 
        {...props} 
        placeholderTextColor="#747474" 
        style={styles.input} 
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default ThemeTextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 4,
  },
  input: {
    width: '100%',
    height: 42,
    paddingHorizontal: 12,
    backgroundColor: "#FFFCFC",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B6B6B6",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400",
    color: "#1D1D1D",
  },
  error: {
    fontSize: 10,
    lineHeight: 10,
    fontWeight: "400",
    color: "#FF0000",
    marginLeft: 4,
  },
})