import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import EventListScreen from "./EventListScreen";

const Stack = createStackNavigator();

function MyStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "Events"
                component={EventListScreen}
            /> 
        </Stack.Navigator>
    )
}

export default function EventNavigator() {
    return <MyStack />
}