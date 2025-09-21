import { Pressable, StyleSheet, Text, View } from "react-native";

type TextInputButtonProps = {
  value?: string;
  placeholder?: string;
  error?: string;
  onPress: () => void;
}

function TextInputButton({value, placeholder, error, onPress}: TextInputButtonProps) {
  return (
    <View style={styles.wrapper}>
      <Pressable onPress={onPress} style={styles.container}>
        <Text 
          style={[styles.input, !value && styles.placeholder]} 
        >
          {value || placeholder}
        </Text>
      </Pressable>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default TextInputButton;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 4,
  },
  container: {
    width: '100%',
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: "#FFFCFC",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B6B6B6",
  },
  input: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400",
    color: "#1D1D1D",
  },
  placeholder: {
    color: "#747474",
  },
  error: {
    fontSize: 10,
    lineHeight: 10,
    fontWeight: "400",
    color: "#FF0000",
    marginLeft: 4,
  },
})