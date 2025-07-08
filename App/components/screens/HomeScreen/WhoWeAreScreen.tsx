import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const pageWidth = Dimensions.get("window").width;

/**
 * Who We Are Screen component
 * Displays information about the Living Wage Coalition
 * source: (https://www.livingwage-sf.org/who-we-are/)
 */
const WhoWeAre: React.FC = () => {

    // SFLWC Logo
    const logo = [{
        src: require("./../../../../assets/sflwc_logo_finaltemp.png")
    }]

    // Who We Are text
    const bodyText = 'The Living Wage Coalition is a grassroots movement of low-wage workers and their allies fighting for economic justice.  We believe that everyone who works full time should be able to survive on what they earn and support their families.\n\nThe Living Wage Coalition was initiated in 1998 by labor unions, religious congregations and community organizations to develop a movement led and democratically run by low-wage workers. The founding members of the steering committee were the San Francisco Labor Council, SEIU Local 790 (now Local 1021), SEIU Local 250 (now Local 2015 and United Health Care Workers West), UNITE HERE Local 2, OPEIU Local 3 (now Local 29), Bay Area Organizing Committee, San Franciscans for Tax Justice, People Organized to Win Employment Rights, Coalition for Ethical Welfare Reform and Northern California Coalition Immigrant and Refugee Rights.\n\nAs a result of a grass-roots campaign, San Francisco’s Living Wage laws – called the Minimum Compensation Ordinance, passed in 2001, and the Health Care Accountability Ordinance, passed in 2002 – require that our tax dollars and use of public property do not go to businesses that pay poverty wages.\n\nAs a result of a grass-roots campaign, San Francisco’s Living Wage laws – called the Minimum Compensation Ordinance, passed in 2001, and the Health Care Accountability Ordinance, passed in 2002 – require that our tax dollars and use of public property do not go to businesses that pay poverty wages.\n\nIn 2008, the Living Wage Coalition successfully campaigned to expand the Minimum Compensation Ordinance to include participants in welfare-to-work programs and single adults in county workfare programs.\n\nIn 2014, San Francisco voters passed amendments to the Minimum Wage Ordinance for stepped increases to $15 per hour in 2018, with annual cost-of-living adjustments afterwards. It is one of the highest minimum wages in the country.\n\nIn 2018, the Living Wage Coalition successfully campaigned for amendments to increase the Minimum Compensation Ordinance to $1.50 per hour above the minimum wage for In-Home-Supportive-Services home health care workers, city-funded non-profit workers, and participants in welfare-to-work programs such as CalWORKs parents and $2 per hour above the minimum wage for airport workers and workers at for-profit city service contractors, with annual cost-of-living adjustments every July 1.';

    // Committee members data
    const committee = [
        {
            id: 1,
            name: "Karl Kramer",
            title: "Campaign Co-director"
        },
        {
            id: 2,
            name: "David Frias",
            title: "Campaign Co-director"
        },
        {
            id: 3,
            name: "Anne Jayne",
            title: "Recording Secretary"
        },
        {
            id: 4,
            name: "Peter Miller",
            title: "Treasurer"
        },
        {
            id: 5,
            name: "Alice Rogoff",
            title: "Member"
        },
        {
            id: 6,
            name: "David Williams",
            title: "Member"
        },
        {
            id: 7,
            name: "Nancy Esteva",
            title: "Member"
        },
        {
            id: 8,
            name: "Peter Miller",
            title: "Member"
        },
        {
            id: 9,
            name: "Rodger Scott",
            title: "Member"
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <View style={styles.logoContainer}>
                        <Image source={require("./../../../../assets/sflwc_logo_finaltemp.png")} style={styles.logo} />
                    </View>
                    <Text style={styles.bodyText}>{bodyText}</Text>
                    <View style={styles.memberListContainer}>
                        <Text style={styles.membersHeadingText}>Coordinating Committee</Text>
                        {committee.map((member) => (
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
        marginBottom: 36
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