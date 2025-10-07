import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { textStyles } from "../../../theme/fontStyles";
import { CommitteMemberProps } from "../../../types/types";

const CommitteeMember: React.FC<CommitteMemberProps> = ({ member }) => {
  return (
    <View style={styles.memberContainer} key={member.id}>
      <Text style={styles.memberNameText}>{member.name}</Text>
      <Text style={styles.memberTitleText}>{member.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  memberContainer: {
    alignItems: "center",
    marginBottom: 18,
  },
  memberNameText: {
    ...textStyles.bodyLargeMedium,
  },
  memberTitleText: textStyles.body,
});

export default CommitteeMember;
