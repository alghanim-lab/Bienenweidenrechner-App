import { Pressable, StyleSheet,Text } from "react-native";

export default function BigButton ({onPress,title}) {
    <Pressable
            onPress={onPress} 
            style = {styles.button}
            >
             <Text style = {styles.title}>{title}</Text>
     </Pressable>
}


const styles = StyleSheet.create ( {
    button : {
    // position: 'relativ', //absolute //relativ
        //  top: 410,
        //  borderWidth : 1,
        padding : 10,
        //  marginTop: 10,
        borderRadius: 10,
        borderColor: `#483d8b`, //darkslateblue
        backgroundColor: `#483d8b`, //darkslateblue
    },
    title : {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
    },
});