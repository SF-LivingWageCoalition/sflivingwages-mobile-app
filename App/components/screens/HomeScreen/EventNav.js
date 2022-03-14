import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import EventListScreen from "./EventListScreen";
import EventScreen from "./EventsScreen";

const Stack = createStackNavigator();

function MyStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "Events"
                component={EventListScreen}
            /> 
             <Stack.Screen
                name = "Calendar"
                component={EventScreen}
            />
            
        </Stack.Navigator>
    )
}

export default function EventNavigator() {
    return <MyStack />
}