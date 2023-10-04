import { Pressable,Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


export default function IconButton ({onPress, icon, style}) {
    return (
        <Pressable onPress={onPress} style={style}>
            <MaterialIcons
            name={icon}
            size={Dimensions.get("window").width * 0.1}
            color="#228b22"
            />
        </Pressable>
    )
}