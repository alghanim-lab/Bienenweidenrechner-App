import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  scrollViewContent: {
    //  flexGrow: 3,
    // flex : 1,
  },
  resultContainer: {
    flex: 1,
    marginTop: 100,
  },
  pflanzeItem: {
    flex: 0.1,
    borderColor: "green",
    backgroundColor: "palegreen",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "column",
    // justifyContent: 'space-between',
    alignItems: "baseline",
    marginVertical: 5,
    flexWrap: "wrap",
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.1, // 10% of screen's height
  },
  pflanzeLabel: {
    marginLeft: 3,
    fontWeight: "bold",
    //  color:'white',
    fontSize: Dimensions.get("window").width * 0.05,
    flex: 1,
  },
  pflanzeValue: {
    marginLeft: 3,
    fontWeight: "bold",
    fontSize: Dimensions.get("window").width * 0.037,
    flex: 1,
    textAlign: "right",
  },
  resultItem: {
    flex: 0.1,
    borderColor: "green",
    backgroundColor: "darkseagreen",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "column",
    // justifyContent: 'space-between',
    alignItems: "baseline",
    marginVertical: 5,
    flexWrap: "wrap",
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.1, // 10% of screen's height
  },

  resultLabel: {
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: Dimensions.get("window").width * 0.036,
    fontWeight: "bold",
    flex: 1,
  },
  resultValue: {
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: Dimensions.get("window").width * 0.037,
    flex: 1,
    textAlign: "right",
  },
  resultItemG: {
    flex: 0.1,
    borderWidth: 3,
    borderRadius: "10",
    borderColor: "green",
    backgroundColor: "green",
    flexDirection: "column",
    // justifyContent: 'space-between',
    alignItems: "baseline",
    marginVertical: 5,
    flexWrap: "wrap",
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.1, // 10% of screen's height
  },
  resultLabelG: {
    fontWeight: "bold",
    color: "white",
    fontSize: Dimensions.get("window").width * 0.038,
    fontWeight: "bold",
    flex: 1,
  },
  resultValueG: {
    fontWeight: "bold",
    color: "white",
    fontSize: Dimensions.get("window").width * 0.037,
    flex: 1,
    textAlign: "right",
  },
  close: {
    marginTop: 20,
    position: "absolute",
    top: Dimensions.get("window").width * 0.1,
    right: 20,
  },
});
