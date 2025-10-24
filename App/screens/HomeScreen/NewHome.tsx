import React from "react";
import {
  Dimensions,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider } from "react-native-elements";
import { Card } from "react-native-paper";
import Swiper from "react-native-swiper/src";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { WebView } from "react-native-webview";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import { translate } from "../../translation/i18n";
import { CarouselImageProps, NewHomeScreenProps } from "../../types/types";

// Import images
import campaign2Background from "../../assets/images/campaign2_background.jpg";
import campaign3Background from "../../assets/images/campaign3_background.jpg";
import encuentroImg from "../../assets/images/Encuentro_2017_021.jpg";
import eventsSlide from "../../assets/images/events-slide.jpg";
import fairtradeImg from "../../assets/images/fairtrade.jpg";
import goldenGateBridge from "../../assets/images/golden-gate-bridge.png";
import immigrantImg from "../../assets/images/immigrant.jpg";
import publicSectorImg from "../../assets/images/public-sector.png";
import welfareImg from "../../assets/images/welfare.jpg";

const bodyPageWidth = Dimensions.get("window").width;

/**
 * Carousel Image component for the main slider
 */
const CarouselImage: React.FC<CarouselImageProps> = ({ image, onPress }) => (
  <TouchableOpacity key={image.id} onPress={onPress}>
    <ImageBackground
      source={image.src}
      style={styles.imageBackground}
      imageStyle={styles.imageBorder}
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
        imageStyle={styles.imageBorder}
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
      title: translate("donateScreen.title"),
      src: campaign2Background,
      destination: "Donate",
    },
    {
      id: 2,
      title: translate("eventsScreen.title"),
      src: eventsSlide,
      destination: "EventsNavigator",
      destinationScreen: "Events",
    },
  ];

  // Images for the campaigns section
  const campaignImages = [
    {
      id: 1,
      src: welfareImg,
      title: "Transform Welfare",
      destination:
        "https://www.livingwage-sf.org/transform-welfare-to-work-programs/",
    },
    {
      id: 2,
      src: publicSectorImg,
      title: "Protect Public Sector and Union Jobs",
      destination: "https://www.livingwage-sf.org/protect-public-sector-jobs/",
    },
    {
      id: 3,
      src: encuentroImg,
      title: "End Mass Incarceration and Prison Labor",
      destination: "https://www.livingwage-sf.org/mass-incarceration/",
    },
    {
      id: 4,
      src: immigrantImg,
      title: "Immigration Reform",
      destination: "https://www.livingwage-sf.org/immigration-reform/",
    },
    {
      id: 5,
      src: fairtradeImg,
      title: "Fair Trade",
      destination:
        "https://www.livingwage-sf.org/transform-welfare-to-work-programs/",
    },
    {
      id: 6,
      src: campaign3Background,
      title: "Raise Wages",
      destination: "https://www.livingwage-sf.org/raising-wages/",
    },
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Top background section: Who we Are */}
        <View style={styles.topBackground}>
          <ImageBackground source={goldenGateBridge} style={styles.background}>
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
                dotColor={colors.light.onInfo}
                activeDotColor={colors.light.secondary}
                dotStyle={styles.dotStyle}
              >
                {mainSliderImages.map((image) => (
                  <CarouselImage
                    image={image}
                    key={image.id}
                    onPress={() => {
                      navigation.navigate(image.destination, {
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
            <Text style={styles.campaignsTitle}>Campaigns</Text>
            <Swiper
              style={styles.swiperHigher}
              showsButtons
              autoplay={false}
              activeDotColor={colors.light.secondary}
              dotStyle={styles.dotStyle}
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
          <View style={styles.containerBody}>
            <Text style={styles.titles}>Media</Text>
            <Card style={styles.cardStyle}>
              <TouchableOpacity>
                <WebView
                  style={styles.youTubeStyle}
                  source={{
                    uri: "https://www.youtube.com/embed?listType=user_uploads&list=sflivingwage&rel=0&modestbranding=1&playsinline=1",
                  }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  mediaPlaybackRequiresUserAction={true}
                  scrollEnabled={false}
                  allowsInlineMediaPlayback={true}
                  allowsFullscreenVideo={true}
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
                  uri: "https://www.youtube.com/embed?listType=playlist&list=PLcuBfm3dxkszAbt58VCPehuEoi3VjzH2g&rel=0&modestbranding=1&playsinline=1",
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mediaPlaybackRequiresUserAction={true}
                scrollEnabled={false}
                allowsInlineMediaPlayback={true}
                allowsFullscreenVideo={true}
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
                  uri: "https://www.youtube.com/embed?listType=playlist&list=PLcuBfm3dxksz54i7-7QN1XaJbT23m6Pg3&rel=0&modestbranding=1&playsinline=1",
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mediaPlaybackRequiresUserAction={true}
                scrollEnabled={false}
                allowsInlineMediaPlayback={true}
                allowsFullscreenVideo={true}
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
                  Linking.openURL(
                    "https://www.instagram.com/sflivingwage/?hl=en"
                  )
                }
                style={styles.buttonMargin}
              >
                <FontAwesome
                  name="instagram"
                  size={46}
                  color={colors.light.primary}
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
    backgroundColor: colors.light.background,
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
    ...textStyles.h3,
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
    ...textStyles.bodyLarge,
    color: colors.light.textOnPrimary,
    marginLeft: 23,
    marginTop: 26,
  },
  imageCarouselSmall: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
  campaignsTitle: {
    ...textStyles.h2,
    lineHeight: 35,
    marginTop: 12,
    marginBottom: 30,
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
    paddingVertical: 7,
    paddingHorizontal: 15,
    elevation: 6,
    shadowColor: colors.light.primary,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  buttonText: {
    ...textStyles.button,
    color: colors.light.textOnPrimary,
    textAlign: "center",
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
    ...textStyles.h2,
    backgroundColor: colors.light.elevation,
    color: colors.light.textOnPrimary,
    textTransform: "uppercase",
    textAlign: "center",
    padding: 6,
  },
  textEvent: {
    ...textStyles.h2,
    paddingVertical: 40,
    color: colors.light.textOnPrimary,
    textTransform: "uppercase",
    textAlign: "center",
    textAlignVertical: "center",
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
    ...textStyles.bodyLarge,
    textDecorationLine: "underline",
    alignSelf: "center",
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
    ...textStyles.h2,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  titles: {
    ...textStyles.h2,
    lineHeight: 35,
  },
  imageBorder: {
    borderRadius: 10,
  },
  dotStyle: {
    width: 8,
    height: 8,
  },
});

export default NewHomeScreen;
