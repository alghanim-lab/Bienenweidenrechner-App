import { StyleSheet } from "react-native";

export default  styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    contentContainer: {
      flexGrow: 1,
    },
    addPflanze: {
      // borderWidth: 3,
      fontSize: 25,
      // fontWeight: 'bold',
      marginTop: 50,
      left: 15,
      // marginBottom: 20,
      color : `#483d8b`
    },
    addIcon : {
      position: 'relativ', //absolute //relativ
      //  top: 38 ,
       left: 260,
      //  borderWidth : 1,
      //  padding : 10,
      //  marginTop: 10,
       borderRadius: 10,
      // borderColor: `#483d8b`, //darkslateblue
       //backgroundColor: `#483d8b`, //darkslateblue
    },
    form: {
      marginTop : 50,
      marginBottom: 20,
      // borderWidth : 3,
      // paddingLeft : 20,
      // paddingRight : 20,
       paddingHorizontal: 10, // +

    },
    field: {
      marginBottom: 20,
      // borderWidth : 3,

    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      // borderWidth : 3,

    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 16,
    },
    picker: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      fontSize: 16,
    },
    resultContainer: {
      marginTop: 20,
      flexWrap: 'wrap',
      // borderWidth : 3,
      marginBottom : 20, // +

    },
    resultTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      height: 40,
      // borderWidth : 3,
    },
    resultRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      flexWrap: 'wrap',

    },
    resultLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      borderWidth : 0.5,
    },
    resultValue: {
      fontSize: 16,
      // borderWidth : 0.5,

    },
    buttonContainer: {
      marginTop: 10,
      // borderWidth: 3,
    },
    berechnen: {
      position: 'relativ', //absolute //relativ
      //  top: 410,
      //  borderWidth : 1,
       padding : 10,
      //  marginTop: 10,
       borderRadius: 10,
       borderColor: `#483d8b`, //darkslateblue
       backgroundColor: `#483d8b`, //darkslateblue
    },
    berechnenText: {
      color: '#FFF',
      fontSize: 18,
      textAlign: 'center',
    },
  
    
  });