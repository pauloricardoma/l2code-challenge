import { Link } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type FabButtonProps = {
  path: any;
  icon: ReactNode;
}

const FabButton = ({ path, icon }: FabButtonProps) => {
  return (
    <Link href={path} style={styles.fabButtonContent}>
      <View style={styles.fabButton}>
        {icon}
      </View>
    </Link>
  )
}

export default FabButton;

const styles = StyleSheet.create({
  fabButtonContent: {
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  fabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFCFC",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  }
})
