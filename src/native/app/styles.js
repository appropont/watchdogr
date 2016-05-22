import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  //general styles
  page: {
    paddingBottom: 300
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centered: {
    textAlign: 'center'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  paragraph: {
    color: '#7C7C7C',
    fontSize: 16
  },
  sceneView: {
    backgroundColor: '#fff',
    flex: 1
  },

  // Form element styling
  formRow: {
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  label: {
    marginTop: 7,
    marginRight: 10,
    flexDirection: "row"
  },
  labelText: {
    color: "#888888",
    marginRight: 10,
    flex: 1,
    width: 60
  },
  slider: {
    flex: 1
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1
  }
});
