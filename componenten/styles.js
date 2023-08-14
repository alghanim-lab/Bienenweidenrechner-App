import { StyleSheet,Dimensions } from "react-native";

export default  styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
  },
  form: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
    // borderWidth : 3,
    // paddingLeft : 20,
    // paddingRight : 20,
    paddingHorizontal: 10, // +

  },

  field: {
    flex: 1,
    marginBottom: 15,
    borderWidth: 1,

  },
  addIcon: {
    position: 'absolute', //absolute //relativ
    //  left: 260,
    //  borderWidth : 1,
    //  padding : 10,
    //  marginTop: 10,
    borderRadius: 10,
    left :  Dimensions.get('window').width > "700"
                  ?  Dimensions.get('window').width * 0.8 
                  :  Dimensions.get('window').width * 0.65 ,
    // left: Dimensions.get('window').width * 0.65,// 80% of screen's width
    //  const DimesionsHeight = Dimensions.get('window').height * 0.2 // 20% of screen's height
    //  right: DimesionsWidth * 0.02 
    // borderColor: `#483d8b`, //darkslateblue
    //backgroundColor: `#483d8b`, //darkslateblue
  },
  deleteIcon: {
    position: 'absolute', //absolute //relativ
    //  top: 38 ,
    left: Dimensions.get('window').width * -0.01,
    // top: 0,
    //  borderWidth : 1,
    //  padding : 10,
    //  marginTop: 10,
    // borderRadius: 10,
  },

  label: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    // borderWidth : 3,

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: Dimensions.get('window').width * 0.04,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    // transform: Dimensions.get('window').width > "700"
    // ? [{ scaleX: 2 }, { scaleY: 2 }], top:150
    // : [{ scaleX: 1.1 }, { scaleY: 1.1 }]
    //  transformOrigin: "top right"
    // transform: [
    //   { scaleX: 1.1 },
    //   { scaleY: 1.1 },
    // ],
    //  transformOrigin: "top right"
  },
  resultContainer: {
    marginTop: 20,
    flexWrap: 'wrap',
    // borderWidth : 3,
    marginBottom: 20, // +

  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    height: 40,
    // borderWidth : 3,
  },

  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 0.5,
  },
  // resultValue: {
  //   fontSize: Dimensions.get('window').width * 0.04,
  //   // borderWidth : 0.5,

  // },
  buttonContainer: {
    flex:.2,
    marginTop: 10,
    // size : Dimensions.get('window').width * 0.04
    // borderWidth: 3,
  },
  berechnen: {
    position: 'absolute', //absolute //relativ
    top:0,
    right :20,
    // flexDirection: 'row',
    //  borderWidth : 1,
    padding: 10,
    //  marginTop: 10,
    borderRadius: 10,
    borderColor: `#483d8b`, //darkslateblue
    backgroundColor: `#228b22`, //darkslateblue
  },
  speichern: {
    position: 'absolute', //absolute //relativ
    top: 0,
    // flexDirection: 'row',
    //  borderWidth : 1,
    padding: 10,
    //  marginTop: 10,
    borderRadius: 10,
    borderColor: `#483d8b`, //darkslateblue
    backgroundColor: `#228b22`, //darkslateblue
  },
  berechnenText: {
    color: '#FFF',
    fontSize: Dimensions.get('window').width * 0.04,
    textAlign: 'center',
  }

});
