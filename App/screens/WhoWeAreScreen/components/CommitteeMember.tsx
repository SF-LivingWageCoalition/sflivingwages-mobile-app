import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CommitteMemberProps } from "../../../types";
import { fontSize, fontWeight } from "../../../theme/fontStyles";

const CommitteeMember: React.FC<CommitteMemberProps> = ({ member }) => {
    return (
        <View style={styles.memberContainer} key={member.id}>
            <Text style={styles.memberNameText}>
                {member.name}
            </Text>
            <Text style={styles.memberTitleText}>
                {member.title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    memberContainer: {
        alignItems: "center",
        marginBottom: 18,
    },
    memberNameText: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.medium,
    },
    memberTitleText: {
        fontSize: fontSize.sm,
    },

});

export default CommitteeMember;
