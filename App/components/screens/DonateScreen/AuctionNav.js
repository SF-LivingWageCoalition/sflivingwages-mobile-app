import 'react-native-gesture-handler'; 
import React from 'react';
import {
    createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs';

import Arts from './donateSalesComponents/Arts';
import Books from './donateSalesComponents/Books';
import Cds from './donateSalesComponents/Cds';
import Dvds from './donateSalesComponents/Dvds';



const Tab = createMaterialTopTabNavigator();


export default class AuctionNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arts: [],
            books: [],
            photos: [],
            cds: [],
            dvds: [],
            modalVisible: false,
            bid: '',
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchArt()
        this.fetchBook()
        this.fetchCds()
        this.fetchDvds()
    }

    fetchArt = () => {
        fetch('https://www.livingwage-sf.org/wp-json/wc/store/v1/products?category=944&per_page=100')
            .then(resp => resp.json())
            .then(data => this.setState({ arts: data, isLoading: false }))
    }

    fetchBook = async () => {
        fetch('https://www.livingwage-sf.org/wp-json/wc/store/v1/products?category=196&per_page=12')
            .then(resBooks => resBooks.json())
            .then(dataBooks => this.setState({ books: dataBooks, isLoading: false }))
    }

    fetchCds = async () => {

        fetch('https://www.livingwage-sf.org/wp-json/wc/store/v1/products?category=190')
            .then((resCds) => resCds.json())
            .then((dataCds) => this.setState({ cds: dataCds, isLoading: false }))
    }
    fetchDvds = async () => {
        fetch('https://www.livingwage-sf.org/wp-json/wc/store/v1/products?category=192')
            .then((resDvds) => resDvds.json())
            .then((dataDvds) => this.setState({ dvds: dataDvds, isLoading: false }))
    }

    render() {
        return (

            <Tab.Navigator
                initialRouteName="Arts"

                screenOptions={{
                    tabBarActiveTintColor: '#CD1621',
                    tabBarInactiveTintColor: '#000',

                    tabBarLabelStyle : {fontSize : 15, fontWeight : '500'},
             
                }}>
                <Tab.Screen
                    name="Arts"
                    children={() => <Arts
                        arts={this.state.arts}
                        isLoading={this.state.isLoading} />
                    }
                    options={{
                        tabBarLabel: 'Art',
                    }} />

                <Tab.Screen
                    name="Books"
                    children={() => <Books
                        books={this.state.books}
                        isLoading={this.state.isLoading}
                    />
                    }
                    options={{
                        tabBarLabel: 'Book',

                    }} />
                <Tab.Screen
                    name="Cds"
                    children={() => <Cds
                        cds={this.state.cds}
                        isLoading={this.state.isLoading}
                    />}
                    options={{
                        tabBarLabel: 'Cd',

                    }} />
                <Tab.Screen
                    name="Dvds"
                    children={() => <Dvds
                        dvds={this.state.dvds}
                        isLoading={this.state.isLoading}
                    />
                    }
                    options={{
                        tabBarLabel: 'DVD',
                    }} />
            </Tab.Navigator>
        );
    }
}