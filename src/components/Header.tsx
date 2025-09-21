import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";

type HeaderProps = {
  title: string
  goBack?: () => void
}

function Header({ title, goBack }: HeaderProps) {
  return (
    <View style={styles.container}>
      {!!goBack && (
        <IconButton
          icon={<MaterialIcons name="keyboard-arrow-left" size={32} color="#FF8C00" />}
          onPress={goBack}
        />
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,

  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: "#FF8C00"
  },
});
