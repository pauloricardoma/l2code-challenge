import { ReactNode } from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";

type IconButtonProps = PressableProps & {
  hasBackground?: string;
  icon: ReactNode;
}

function IconButton(props: IconButtonProps) {
  return (
    <Pressable {...props} style={styles(props.hasBackground).button}>
      {props.icon}
    </Pressable>
  )
}

export default IconButton;

const styles = (hasBackground?: string) => StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: hasBackground || undefined,
  },
})
