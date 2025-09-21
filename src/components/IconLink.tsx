import { Link } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type IconLinkProps = {
  path: any;
  params?: any;
  hasBackground?: string;
  icon: ReactNode;
}

function IconLink({path, params, hasBackground, icon}: IconLinkProps) {
  return (
    <View style={styles(hasBackground).button}>
      <Link href={{
        pathname: path,
        params: params,
      }}>
        {icon}
      </Link>
    </View>
  )
}

export default IconLink;

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
