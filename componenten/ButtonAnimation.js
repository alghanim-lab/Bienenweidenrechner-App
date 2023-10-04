import { Animated, Text } from "react-native";
import styles from "./styles";

export function ButtonAnimiert(fadeAnim, value) {
  return () => {
    Animated.timing(fadeAnim, {
      toValue: value,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
}

export function setAnimtedName(fadeAnim, style, nameValue) {
  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          // position: 'absolute', //absolute //relativ
          top: 0,
          // padding: 10,
          borderRadius: 10,
          borderColor: `#483d8b`,
          backgroundColor: `#228b22`, //darkslateblue
        },
      ]}
    >
      <Text style={style}>{nameValue}</Text>
    </Animated.View>
  );
}
