import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type ThemedButtonType = "primary" | "default";

type ThemedButtonProps = PressableProps & {
  type: ThemedButtonType;
  text: string;
}

function ThemedButton(props: ThemedButtonProps) {
  return (
    <Pressable {...props} style={[styles.button, styles[props.type]]}>
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  )
}

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  primary: {
    backgroundColor: "#FF8C00",
  },
  default: {
    backgroundColor: "#919191",
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#FFFCFC",
  },
})
