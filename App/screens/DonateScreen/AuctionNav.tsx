import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { colors } from "../../theme";
import { fontSize, fontWeight } from "../../theme/fontStyles";
import { AuctionNavState, AuctionTabParamList, ProductItem } from "../../types";
import { CustomTabBar } from "./components/CustomTabBar";
import Arts from "./components/donateSalesComponents/Arts";
import Books from "./components/donateSalesComponents/Books";
import Cds from "./components/donateSalesComponents/Cds";
import Dvds from "./components/donateSalesComponents/Dvds";

const Tab = createMaterialTopTabNavigator<AuctionTabParamList>();

const AuctionNav: React.FC = () => {
  // Initialize state with default values
  const [state, setState] = useState<AuctionNavState>({
    arts: [],
    books: [],
    photos: [],
    cds: [],
    dvds: [],
    modalVisible: false,
    bid: "",
    isLoading: true,
  });

  // Fetch art data
  const fetchArt = (): void => {
    fetch(
      "https://www.livingwage-sf.org/wp-json/wc/store/v1/products?category=944&per_page=100"
    )
      .then((resp) => resp.json())
      .then((data: ProductItem[]) =>
        setState((prevState) => ({
          ...prevState,
          arts: data,
          isLoading: false,
        }))
      );
  };

  // Fetch book data
  const fetchBook = async (): Promise<void> => {
    fetch(
      "https://www.livingwage-sf.org/wp-json/wc/store/v1/products?category=196&per_page=12"
    )
      .then((resBooks) => resBooks.json())
      .then((dataBooks: ProductItem[]) =>
        setState((prevState) => ({
          ...prevState,
          books: dataBooks,
          isLoading: false,
        }))
      );
  };

  // Fetch CDs data
  const fetchCds = async (): Promise<void> => {
    fetch(
      "https://www.livingwage-sf.org/wp-json/wc/store/v1/products?category=190"
    )
      .then((resCds) => resCds.json())
      .then((dataCds: ProductItem[]) =>
        setState((prevState) => ({
          ...prevState,
          cds: dataCds,
          isLoading: false,
        }))
      );
  };

  // Fetch DVDs data
  const fetchDvds = async (): Promise<void> => {
    fetch(
      "https://www.livingwage-sf.org/wp-json/wc/store/v1/products?category=192"
    )
      .then((resDvds) => resDvds.json())
      .then((dataDvds: ProductItem[]) =>
        setState((prevState) => ({
          ...prevState,
          dvds: dataDvds,
          isLoading: false,
        }))
      );
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchArt();
    fetchBook();
    fetchCds();
    fetchDvds();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Arts"
      screenOptions={{
        tabBarActiveTintColor: colors.light.primary,
        tabBarInactiveTintColor: colors.light.textPrimary,
        tabBarLabelStyle: {
          fontSize: fontSize.md,
          fontWeight: fontWeight.medium,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Arts"
        children={() => <Arts arts={state.arts} isLoading={state.isLoading} />}
        options={{ tabBarLabel: "Art" }}
      />

      <Tab.Screen
        name="Books"
        children={() => (
          <Books books={state.books} isLoading={state.isLoading} />
        )}
        options={{
          tabBarLabel: "Book",
        }}
      />

      <Tab.Screen
        name="Cds"
        children={() => <Cds cds={state.cds} isLoading={state.isLoading} />}
        options={{
          tabBarLabel: "Cd",
        }}
      />

      <Tab.Screen
        name="Dvds"
        children={() => <Dvds dvds={state.dvds} isLoading={state.isLoading} />}
        options={{
          tabBarLabel: "DVD",
        }}
      />
    </Tab.Navigator>
  );
};

export default AuctionNav;
