import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import bodyText from "./bodyText.json"
import committeeData from "./committee.json"

/**
 * Who We Are Screen component
 * Displays information about the Living Wage Coalition
 * source: (https://www.livingwage-sf.org/who-we-are/)
 */
const WhoWeAre: React.FC = () => {

    // SFLWC Logo
    const logo = {
        src: require("./../../../../assets/sflwc_logo_finaltemp.png")
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View>
                    <View style={styles.logoContainer}>
                        <Image source={logo.src} style={styles.logo} />
                    </View>
                    <View>
                        {bodyText.map(({ bodyText }) => (
                            <Text style={styles.bodyText}>{bodyText}</Text>
                        ))}
                    </View>
                    <View style={styles.memberListContainer}>
                        <Text style={styles.membersHeadingText}>Coordinating Committee</Text>
                        {committeeData.map((member) => (
                            <View
                                style={styles.memberContainer}
                                key={member.id}>
                                <Text style={styles.memberNameText}>{member.name}</Text>
                                <Text style={styles.memberTitleText}>{member.title}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1
    },
    scrollView: {
        flex: 1,
    },
    logoContainer: {
        padding: 20,
        backgroundColor: "#CD1621",
        alignItems: "center",
        marginBottom: 18
    },
    logo: {
        maxWidth: "100%",
        resizeMode: "contain",
    },
    bodyText: {
        fontSize: 18,
        marginBottom: 18
    },
    membersHeadingText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 18,
        textTransform: "uppercase"
    },
    memberListContainer: {
        alignItems: "center"
    },
    memberContainer: {
        alignItems: "center",
        marginBottom: 18
    },
    memberNameText: {
        fontSize: 18,
        fontWeight: "500"
    },
    memberTitleText: {
        fontSize: 14
    }
})

export default WhoWeAre;