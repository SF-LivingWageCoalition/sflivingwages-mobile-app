import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingTop: 0,
  },
  header: {
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDownItem: {
    marginTop: 30,
  },
  titleHeader: {
    fontSize: 24,
    color: '#c91a1a',
    padding: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingTop: 20,
  },
  imageStyle: {
    width: 250,
    height: 350,
    marginLeft: 40, // Note: original had duplicate marginLeft, keeping the last one
    marginRight: 15,
    marginBottom: 10,
  },
  cardImage: {
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  horizontalLine: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textInput: { 
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 5,
  },
  buttonStyle: {
    padding: 5, 
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#d31623',
    padding: 10,
    width: 100,  
    height: 40,
    marginTop: 5,
    borderRadius: 10
  },
  submitButtonText: {
    color: 'white',
    fontWeight: "900",
    textAlign: "center"
  },
  resetButton: {
    backgroundColor: '#d31623',
    padding: 10,
    width: 100,  
    height: 40,  
    marginTop: 5
  },
  resetButtonText: {
    color: 'white',
    fontWeight: "900",
    textAlign: "center"
  },
  detailButton: {
    backgroundColor: '#141045',
    padding: 10,
    width: 100,  
    height: 40,  
    marginTop: 5,
    marginLeft: 170,
    fontSize: 14
  },
  detailButtonText: {
    color: 'white',
    fontWeight: "900",
    textAlign: "center"
  },
  detailViewStyle: {
    padding: 10,
    textAlign: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 20,
    flex: 1, 
    alignItems: 'stretch',
  },
  descriptionText: {
    fontSize: 18,
  },
  detailImage: {
    flex: 1,
    aspectRatio: 1.5, 
    marginLeft: 1,
    marginRight: 1,
    marginBottom: 15,
    flexDirection: "row",
    flexWrap: 'wrap',
    resizeMode: 'contain'
  },
  authorImage: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    flexWrap: 'wrap',
    resizeMode: 'contain',
  },
  detailInfoText: {
    fontSize: 24,
    color: '#100c08',
    paddingTop: 10,
    borderStyle: "dashed",
    textAlign: "left",
    flexWrap: 'wrap',
  },
  backButtonSytle: {
    paddingTop: 20
  },
});

export default styles;
