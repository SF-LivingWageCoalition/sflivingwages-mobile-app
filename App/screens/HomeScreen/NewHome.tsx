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
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";
import { CarouselImageProps, NewHomeScreenProps } from "../../types";

const bodyPageWidth = Dimensions.get("window").width;

/**
 * Carousel Image component for the main slider
 */
const CarouselImage: React.FC<CarouselImageProps> = ({ image, onPress }) => (
  <TouchableOpacity key={image.id} onPress={onPress}>
    <ImageBackground
      source={image.src}
      style={styles.imageBackground}
      imageStyle={{ borderRadius: 10 }}
    >
      <View style={styles.containerBody}>
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
  <View style={styles.imageCarouselSmall}>
    <TouchableOpacity key={image.id} onPress={onPress}>
      <ImageBackground
        source={image.src}
        style={styles.imageBackgroundSmall}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.containerBody}>
          <Text style={styles.textCampaignsImg}>{image.title}</Text>
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
  const mainSliderImages = [
    {
      id: 1,
      title: "Donate",
      src: require("../../assets/images/campaign2_background.jpg"),
      destination: "https://www.livingwage-sf.org/donations-and-membership/",
    },
    {
      id: 2,
      title: translate("eventsScreen.title"),
      src: require("../../assets/images/events-slide.jpg"),
      destination: "EventsNavigator",
      destinationScreen: "Events",
      // destination: {name: "EventsNavigator", screen: "Events" },
    },
  ];

  // Images for the campaigns section
  const campaignImages = [
    {
      id: 1,
      src: require("../../assets/images/welfare.jpg"),
      title: "Transform Welfare",
      destination:
        "https://www.livingwage-sf.org/transform-welfare-to-work-programs/",
    },
    {
      id: 2,
      src: require("../../assets/images/public-sector.png"),
      title: "Protect Public Sector and Union Jobs",
      destination: "https://www.livingwage-sf.org/protect-public-sector-jobs/",
    },
    {
      id: 3,
      src: require("../../assets/images/Encuentro_2017_021.jpg"),
      title: "End Mass Incarceration and Prison Labor",
      destination: "https://www.livingwage-sf.org/mass-incarceration/",
    },
    {
      id: 4,
      src: require("../../assets/images/immigrant.jpg"),
      title: "Immigration Reform",
      destination: "https://www.livingwage-sf.org/immigration-reform/",
    },
    {
      id: 5,
      src: require("../../assets/images/fairtrade.jpg"),
      title: "Fair Trade",
      destination:
        "https://www.livingwage-sf.org/transform-welfare-to-work-programs/",
    },
    {
      id: 6,
      src: require("../../assets/images/campaign3_background.jpg"),
      title: "Raise Wages",
      destination: "https://www.livingwage-sf.org/raising-wages/",
    },
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Top background section: Who we Are */}
        <View style={styles.topBackground}>
          <ImageBackground
            source={require("../../assets/images/golden-gate-bridge.png")}
            style={styles.background}
          >
            <View style={styles.header}>
              <Text style={styles.imageTitle}>
                {translate("whoWeAreHeader.title")}
              </Text>
              <Text numberOfLines={3} style={styles.imageContent}>
                {translate("whoWeAreHeader.body")}
              </Text>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("WhoWeAre")}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>
                    {translate("whoWeAreHeader.buttonText")}
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
            <View style={styles.mainSlider}>
              <Swiper
                style={styles.swiperLower}
                showsButtons
                autoplay={true}
                autoplayTimeout={4}
                dotColor={"white"}
                activeDotColor={colors.light.secondary}
                dotStyle={{ width: 8, height: 8 }}
              >
                {mainSliderImages.map((image) => (
                  <CarouselImage
                    image={image}
                    key={image.id}
                    onPress={() => {
                      image.id === 1
                        ? Linking.openURL(image.destination)
                        : navigation.navigate(image.destination, {
                            screen: image.destinationScreen,
                          });
                    }}
                  />
                ))}
              </Swiper>
            </View>
          </View>

          {/* Campaigns section */}
          <View style={styles.containerBody}>
            <Text style={{ ...styles.titles, marginTop: 12, marginBottom: 30 }}>
              Campaigns
            </Text>
            <Swiper
              style={styles.swiperHigher}
              showsButtons
              autoplay={false}
              activeDotColor={"#70b5ff"}
              dotStyle={{ width: 8, height: 8 }}
            >
              {campaignImages.map((image) => (
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
                <View style={styles.cardView}>
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
                <View style={styles.cardView}>
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
                <View style={styles.cardView}>
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
            <View style={styles.socialMediaView}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://www.facebook.com/san.francisco.living.wage/"
                  )
                }
                style={styles.buttonMargin}
              >
                <FontAwesome
                  name="facebook-square"
                  size={46}
                  color={colors.light.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://twitter.com/sflivingwage?lang=en/")
                }
                style={styles.buttonMargin}
              >
                <FontAwesome
                  name="twitter"
                  size={46}
                  color={colors.light.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://www.instagram.com/sflivingwage/?hl=en"
                  )
                }
                style={styles.buttonMargin}
              >
                <FontAwesome
                  name="instagram"
                  size={46}
                  color={colors.light.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://www.youtube.com/user/sflivingwage")
                }
              >
                <FontAwesome
                  name="youtube"
                  size={42}
                  color={colors.light.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: colors.light.elevation,
  },
  topBackground: {
    height: 256,
    borderColor: colors.light.outline,
    borderWidth: 1,
    backgroundColor: "white",
  },
  background: {
    height: 256,
    width: "100%",
    backgroundColor: colors.light.textPrimary,
  },
  containerBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.light.textOnPrimary,
    marginLeft: 23,
    marginTop: 25,
  },
  imageBackground: {
    alignContent: "center",
    width: bodyPageWidth - 10,
    height: 195,
  },
  imageBackgroundSmall: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
    padding: 8,
  },
  imageContent: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.normal,
    color: colors.light.textOnPrimary,
    marginLeft: 23,
    marginTop: 26,
  },
  imageCarouselSmall: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
  buttonView: {
    marginLeft: 23,
    marginTop: 28,
    width: 120,
    height: 40,
  },
  button: {
    backgroundColor: colors.light.primary,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 6,
    shadowColor: colors.light.primary,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  buttonText: {
    fontSize: fontSize.md,
    color: colors.light.textOnPrimary,
    textAlign: "center",
    fontWeight: fontWeight.bold,
  },
  buttonMargin: {
    marginRight: 27,
  },
  bodyPage: {
    flexDirection: "column",
    backgroundColor: colors.light.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    top: -10,
  },
  mainSlider: {
    width: bodyPageWidth,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    marginLeft: 10,
  },
  textCampaignsImg: {
    fontSize: fontSize.xl,
    backgroundColor: colors.light.elevation,
    color: colors.light.textOnPrimary,
    fontWeight: fontWeight.bold,
    textTransform: "uppercase",
    textAlign: "center",
    padding: 6,
  },
  textEvent: {
    fontSize: fontSize.xxl,
    paddingVertical: 40,
    color: colors.light.textOnPrimary,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: fontWeight.bold,
  },
  swiperLower: {
    height: bodyPageWidth / 2 + 20,
  },
  swiperHigher: {
    height: 350,
  },
  youTubeStyle: {
    height: 250,
    width: 320,
    margin: 20,
    alignSelf: "center",
    opacity: 0.99,
  },
  cardStyle: {
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    marginTop: 26,
    borderWidth: 2,
    width: "90%",
  },
  cardView: {
    flex: 1,
    height: 30,
  },
  actionText: {
    textDecorationLine: "underline",
    alignSelf: "center",
    fontSize: fontSize.md,
    color: colors.light.secondary,
  },
  socialMediaArea: {
    flexDirection: "column",
    width: bodyPageWidth,
    marginTop: 40,
    flex: 1,
  },
  socialMediaView: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  divider: {
    borderWidth: 0.5,
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  follow: {
    textAlign: "center",
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    marginTop: 30,
    marginBottom: 10,
  },
  titles: {
    fontSize: fontSize.xl,
    lineHeight: 35,
    fontWeight: fontWeight.bold,
  },
});

export default NewHomeScreen;
