import { Pressable,StyleSheet,Text } from "react-native";

export default function BigButton({onPress, onPressIn,onPressOut,animateName,style,children}) {

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.button, style] }
    >
        {children}
      {animateName}
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        borderColor: `#483d8b`, //darkslateblue
        backgroundColor: `#228b22`, //darkslateblue
      },
})