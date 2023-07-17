import { useState } from "react";
import { Modal,Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
export default function NeuePflanzenart (props) {
    const visible =props.visible;
    const onCancel=props.onCancel;
    const onSave = props.onSave;

    const [pflanzenartName,setPflanzenartName] = useState('')
    const [saatMenge, setSaatMenge] = useState('')
    const [saatZeitpunkt,setSaatZeitpunkt] = useState ('')
    const [bluetzeit, setBluetzeit] = useState('')
    const [vegetationszeit, SetVegetationzeit] = useState('')
    

    function savePflanzenart () {
        const neuePflanzenartName = pflanzenartName.trim();
        const neueSaatMenge = saatMenge.trim ();
        const neueSaatZeitpunkt = saatZeitpunkt.trim ();
        const neueBluetzeit = bluetzeit.trim ();
        const neueVegetationszeit = vegetationszeit.trim ();

        if (neuePflanzenartName.length === 0 || neueSaatMenge.length === 0 || neueSaatZeitpunkt.length === 0 || 
            neueBluetzeit === 0 || neueVegetationszeit === 0) {
                alert ('Alle Felder dürfen nicht leer seine !');
                return;
            }
            onSave (neuePflanzenartName, neueSaatMenge, neueSaatZeitpunkt, neueBluetzeit, neueVegetationszeit)
            setPflanzenartName('');
            setSaatMenge('');
            setSaatZeitpunkt('');
            setBluetzeit('');
            SetVegetationzeit('');

    }


    function cancelEditing () {
        onCancel ();

        // um  bei (Hinzufuegen von daten ++ Abbrechen)  
        //dann erneut (Hinzufugen ++ speichern ) die nicht zu sehenden Daten  verhindern zu speichern
        setPflanzenartName('');
        setSaatMenge(0);
        setSaatZeitpunkt ('');
        setBluetzeit ('');
        SetVegetationzeit (0);
    }

    // if (!visible) return null; mit dem Modal brauchen wir diese Zeile nicht mehr
    return ( 
<Modal 
visible={visible}
onRequestClose={cancelEditing}
animationType='slide'>

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style = {styles.container}>
        <TextInput placeholder="Planzenartname"
        onChangeText={(value) => setPflanzenartName(value)} //{setPlanzenartName} ist ausreichend da es sich um einen Text handelt 
         style={styles.input}
         multiline= {true}
         required/>
        <TextInput placeholder="Saatgutmenge pro QM"
        onChangeText={(value) => setSaatMenge(value)}
         style={styles.input} multiline= {true} 
         required/>
        <TextInput placeholder="Saatzeitpunkt"
        onChangeText={(value) => setSaatZeitpunkt(value)}
        style={[styles.input, {height: 80}]} multiline= {true}
        required/>
        <TextInput placeholder="Blütezeit" 
        onChangeText={(value) => setBluetzeit(value)} 
        style={[styles.input, {height: 80}]} multiline= {true}
        required/>
        <TextInput placeholder="Vegetationszeit"
        returnKeyType='done' 
        onChangeText={(value) => SetVegetationzeit(value)}
        onSubmitEditing={savePflanzenart}
        style={styles.input}
        required/>

        {/* <Text style={{borderWidth:3, padding:30, marginBottom: 10}}>
        Neue Pflanzenart eingeben
        </Text> */}

        <Pressable
            style= {styles.back}
            onPress={cancelEditing}> 
            <MaterialIcons name="keyboard-backspace" size={36} color="#483d8b" />
        </Pressable>

        <Pressable 
        onPress={savePflanzenart} 
        style = {styles.speichern}>
            <Text style = {styles.speichernText}> Speichern</Text>
        </Pressable>

    </KeyboardAvoidingView>
</Modal>
        );
}

const styles = StyleSheet.create ({
    container: {
        //inhalte zentrieren
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
    },
    input:{
        borderWidth: 1,
        borderColor: `#483d8b`, //'#darkslateblue'
        borderRadius: 5,
        width: '80%',
        marginBottom :10,
        padding : 10,
        fontSize: 20,

    },
    speichern: {
        position: 'relativ', //absolute //relativ
        //  top: 410,
        //  borderWidth : 1,
         padding : 10,
        //  marginTop: 10,
         borderRadius: 10,
         borderColor: `#483d8b`, //darkslateblue
         backgroundColor: `#483d8b`, //darkslateblue
      },
      speichernText: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
      },
      back : {
        position: 'absolute', //absolute //relativ
         top: 10,
         left: 30,
        //  borderWidth : 1,
         padding : 10,
        //  marginTop: 10,
         borderRadius: 10,
        // borderColor: `#483d8b`, //darkslateblue
         //backgroundColor: `#483d8b`, //darkslateblue
      }
})