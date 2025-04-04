import { Text } from "native-base";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider } from "react-native-elements";
import { Card } from "react-native-paper";
import Swiper from "react-native-swiper/src";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { WebView } from "react-native-webview";
import { CarouselImageProps, NewHomeScreenProps } from "../../../../App/types";

const bodyPageWidth = Dimensions.get("window").width;

/**
 * Carousel Image component for the main slider
 */
const CarouselImage: React.FC<CarouselImageProps> = ({ image, onPress }) => (
  <TouchableOpacity key={image.id} onPress={onPress}>
    <ImageBackground
      source={image.src}
      style={{ alignContent: "center", width: bodyPageWidth - 10, height: 195 }}
      imageStyle={{ borderRadius: 10 }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.textEvent}>{image.title}</Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

/**
 * Carousel Image component for the campaigns section
 */
const CarouselImageSmall: React.FC<CarouselImageProps> = ({
  image,
  onPress,
}) => (
  <View
    style={{
      marginTop: 30,
      flex: 1,
      alignItems: "center",
      alignContent: "center",
    }}
  >
    <TouchableOpacity key={image.id} onPress={onPress}>
      <ImageBackground
        source={image.src}
        style={{
          flex: 1,
          alignContent: "center",
          alignItems: "center",
          width: 300,
          height: 300,
        }}
        imageStyle={{ borderRadius: 10 }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.textCampaingsImg}>
            {image.title.toUpperCase()}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </View>
);

/**
 * New Home Screen component
 */
const NewHomeScreen: React.FC<NewHomeScreenProps> = ({ navigation }) => {
  // Images for the main slider
  const images = [
    {
      id: 2,
      title: "Donate",
      src: require("./../../../../assets/campaign2_background.jpg"),
      destination: "https://www.livingwage-sf.org/donations-and-membership/",
    },
    {
      id: 3,
      title: "Events",
      src: require("./../../../../assets/p1040208.jpg"),
      destination: "Event",
    },
  ];

  // Images for the campaigns section
  const newsImages = [
    {
      id: 1,
      src: require("./../../../../assets/welfare.jpg"),
      title: "Transform Welfare",
      destination:
        "https://www.livingwage-sf.org/transform-welfare-to-work-programs/",
    },
    {
      id: 2,
      src: require("./../../../../assets/public-sector.png"),
      title: "Protect Public Sector and union jobs",
      destination: "https://www.livingwage-sf.org/protect-public-sector-jobs/",
    },
    {
      id: 3,
      src: require("./../../../../assets/Encuentro_2017_021.jpg"),
      title: "end mass incarceration and prison labor",
      destination: "https://www.livingwage-sf.org/mass-incarceration/",
    },
    {
      id: 4,
      src: require("./../../../../assets/immigrant.jpg"),
      title: "IMMIGRATION REFORM",
      destination: "https://www.livingwage-sf.org/immigration-reform/",
    },
    {
      id: 5,
      src: require("./../../../../assets/fairtrade.jpg"),
      title: "Fair Trade",
      destination:
        "https://www.livingwage-sf.org/transform-welfare-to-work-programs/",
    },
    {
      id: 6,
      src: require("./../../../../assets/campaign3_background.jpg"),
      title: "RAISE WAGES",
      destination: "https://www.livingwage-sf.org/raising-wages/",
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.container}>
        {/* Top background section */}
        <View style={styles.topbackground}>
          <ImageBackground
            source={require("./../../../../assets/stefan-mitev-Sp3eNPAHB8c-unsplash.jpg")}
            style={styles.background}
          >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}>
              <Text style={styles.imageTitle}>Who We Are </Text>
              <Text numberOfLines={3} style={styles.imageContent}>
                The Living Wage Coalition is a low-wage worker advocacy
                organization fighting for economic justice.
              </Text>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("https://www.livingwage-sf.org/who-we-are/")
                  }
                  style={styles.button}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#ffffff",
                      textAlign: "center",
                      fontWeight: "700",
                    }}
                  >
                    View More
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Main content section */}
        <View style={styles.bodyPage}>
          {/* Main slider */}
          <View>
            <View
              style={{
                width: bodyPageWidth,
                alignItems: "center",
                alignSelf: "center",
                marginTop: 30,
                marginLeft: 10,
              }}
            >
              <Swiper
                style={{ height: bodyPageWidth / 2 }}
                showsButtons
                autoplay={true}
                autoplayTimeout={4}
                dotColor={"white"}
                activeDotColor={"#70b5ff"}
                dotStyle={{ width: 8, height: 8 }}
              >
                {images.map((image) => (
                  <CarouselImage
                    image={image}
                    key={image.id}
                    onPress={() => {
                      image.id === 2
                        ? Linking.openURL(image.destination)
                        : navigation.navigate(image.destination);
                    }}
                  />
                ))}
              </Swiper>
            </View>
          </View>

          {/* Campaigns section */}
          <View style={styles.containerBody}>
            <Text style={{ ...styles.titles, marginTop: 12 }}>Campaigns</Text>
            <Swiper
              style={{ height: 350 }}
              showsButtons
              autoplay={false}
              activeDotColor={"#70b5ff"}
              dotStyle={{ width: 8, height: 8 }}
            >
              {newsImages.map((image) => (
                <CarouselImageSmall
                  key={image.id}
                  image={image}
                  onPress={() => {
                    Linking.openURL(image.destination);
                  }}
                />
              ))}
            </Swiper>
          </View>

          {/* Media section */}
          {/* OLD COMMENT: this is comment because an error occur need to fix : ERROR with WebView */}
          <View style={styles.containerBody}>
            <Text style={styles.titles}>Media</Text>
            <Card style={styles.cardStyle}>
              <TouchableOpacity>
                <WebView
                  style={styles.youTubeStyle}
                  source={{
                    uri: "http://www.youtube.com/embed?max-results=1&showinfo=0&rel=0&listType=user_uploads&list=sflivingwage",
                  }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  mediaPlaybackRequiresUserAction={true}
                  scrollEnabled={false}
                  allowsInlineMediaPlayback={true}
                />
              </TouchableOpacity>
              <Card.Actions>
                <View style={{ flex: 1, height: 30 }}>
                  <Text
                    style={styles.actionText}
                    onPress={() =>
                      Linking.openURL(
                        "https://www.youtube.com/playlist?list=PLcuBfm3dxksyN__WaZR1pN1hoUcivSMPU"
                      )
                    }
                  >
                    See full list of TV Shows
                  </Text>
                </View>
              </Card.Actions>
            </Card>
            <Card style={styles.cardStyle}>
              <WebView
                style={styles.youTubeStyle}
                source={{
                  uri: "https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=playlist&list=PLcuBfm3dxkszAbt58VCPehuEoi3VjzH2g",
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mediaPlaybackRequiresUserAction={true}
                scrollEnabled={false}
                allowsInlineMediaPlayback={true}
              />
              <Card.Actions>
                <View style={{ flex: 1, height: 30 }}>
                  <Text
                    style={styles.actionText}
                    onPress={() =>
                      Linking.openURL(
                        "https://www.youtube.com/playlist?list=PLcuBfm3dxkszAbt58VCPehuEoi3VjzH2g"
                      )
                    }
                  >
                    See full list of Vintage Videos
                  </Text>
                </View>
              </Card.Actions>
            </Card>
            <Card style={styles.cardStyle}>
              <WebView
                style={styles.youTubeStyle}
                source={{
                  uri: "https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=playlist&list=PLcuBfm3dxksz54i7-7QN1XaJbT23m6Pg3",
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mediaPlaybackRequiresUserAction={true}
                scrollEnabled={false}
                allowsInlineMediaPlayback={true}
              />
              <Card.Actions>
                <View style={{ flex: 1, height: 30 }}>
                  <Text
                    style={styles.actionText}
                    onPress={() =>
                      Linking.openURL(
                        "https://www.youtube.com/playlist?list=PLcuBfm3dxksz54i7-7QN1XaJbT23m6Pg3"
                      )
                    }
                  >
                    See full list of Documentaries
                  </Text>
                </View>
              </Card.Actions>
            </Card>
          </View>

          {/* Social media section */}
          <View style={styles.socialMediaArea}>
            <Divider style={styles.divider} />
            <Text style={styles.follow}>Follow Us</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://www.facebook.com/san.francisco.living.wage/"
                  )
                }
                style={{ marginRight: 27 }}
              >
                <FontAwesome name="facebook-square" size={46} color="#177DDC" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://twitter.com/sflivingwage?lang=en/")
                }
                style={{ marginRight: 27 }}
              >
                <FontAwesome name="twitter" size={46} color="#7AB3E8" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://www.instagram.com/sflivingwage/?hl=en"
                  )
                }
                style={{ marginRight: 27 }}
              >
                <FontAwesome name="instagram" size={46} color="#F297DE" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://www.youtube.com/user/sflivingwage")
                }
              >
                <FontAwesome name="youtube" size={42} color="#E10505" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topbackground: {
    height: 256,
    borderColor: "#95989a",
    borderWidth: 1,
    backgroundColor: "white",
  },
  background: {
    height: 256,
    width: "100%",
    backgroundColor: "#000000",
  },
  imageTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 23,
    marginTop: 25,
  },
  imageContent: {
    fontSize: 21,
    fontWeight: "400",
    color: "#ffffff",
    marginLeft: 23,
    marginTop: 26,
  },
  buttonView: {
    marginLeft: 23,
    marginTop: 28,
    width: 120,
    height: 40,
  },
  button: {
    backgroundColor: "#177ddc",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    elevation: 6,
    shadowColor: "#177ddc",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  bodyPage: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    top: -10,
  },
  text: {
    fontSize: 40,
    color: "#fffdfd",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "800",
  },
  textCampaingsImg: {
    fontSize: 20,
    backgroundColor: "rgba(0, 0, 0, 0.576)",
    color: "#ffff",
    fontWeight: "900",
  },
  textEvent: {
    fontSize: 40,
    paddingVertical: 40,
    color: "#fffdfd",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "800",
  },
  textDonate: {
    fontSize: 40,
    color: "#fffdfd",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "800",
  },
  newsArea: {
    flexDirection: "column",
    width: bodyPageWidth,
    marginTop: 30,
  },
  newsIamge: {
    height: 180,
    marginRight: 23,
    elevation: 6,
    shadowColor: "#177ddc",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  textNews: {
    fontFamily: "HelveticaNeue-BoldItalic",
    fontSize: 15,
    color: "#fffdfd",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    marginBottom: 20,
    shadowColor: "#177ddc",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 3, height: 3 },
    textTransform: "uppercase",
  },
  textNews2: {
    fontFamily: "HelveticaNeue-BoldItalic",
    fontSize: 15,
    color: "#fffdfd",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#177ddc",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 3, height: 3 },
    textTransform: "uppercase",
  },
  mediaArea: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  youTubeStyle: {
    height: 250,
    width: 320,
    margin: 20,
    alignSelf: "center",
    opacity: 0.99,
  },
  cardStyle: {
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    marginTop: 26,
    borderWidth: 2,
    width: "90%",
  },
  actionText: {
    textDecorationLine: "underline",
    alignSelf: "center",
    fontSize: 18,
    color: "#4169e1",
  },
  socialMediaArea: {
    flexDirection: "column",
    width: bodyPageWidth,
    marginTop: 40,
    flex: 1,
  },
  divider: {
    borderWidth: 0.5,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  follow: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
  },
  dot: {
    flexDirection: "row",
    alignSelf: "center",
    marginRight: 21,
    marginTop: 10,
  },
  active: {
    margin: 3,
    color: "#C4C4C4",
  },
  noActive: {
    margin: 3,
    color: "#EEEEEE",
  },
  containerBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titles: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "bold",
  },
});

export default NewHomeScreen;
