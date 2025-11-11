import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
import { colors } from "../../theme";
import { textStyles } from "../../theme/fontStyles";
import {
  AuctionNavState,
  AuctionTabParamList,
  ProductItem,
} from "../../types/types";
import { CustomTabBar } from "./components/CustomTabBar";
import Arts from "./components/auctionSalesComponents/Arts";
import Books from "./components/auctionSalesComponents/Books";
import Cds from "./components/auctionSalesComponents/Cds";
import Dvds from "./components/auctionSalesComponents/Dvds";
import LPs from "./components/auctionSalesComponents/LPs";

const Tab = createMaterialTopTabNavigator<AuctionTabParamList>();

const AuctionNav: React.FC = () => {
  const [state, setState] = useState<AuctionNavState>({
    arts: [],
    books: [],
    cds: [],
    dvds: [],
    lps: [],
    modalVisible: false,
    bid: "",
    isLoading: true,
  });

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

  const fetchLPs = async (): Promise<void> => {
    fetch(
      "https://www.livingwage-sf.org/wp-json/wc/store/v1/products?category=1133"
    )
      .then((resLPs) => resLPs.json())
      .then((dataLPs: ProductItem[]) =>
        setState((prevState) => ({
          ...prevState,
          lps: dataLPs,
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
    fetchLPs();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Arts"
      screenOptions={{
        tabBarActiveTintColor: colors.light.primary,
        tabBarInactiveTintColor: colors.light.textPrimary,
        tabBarLabelStyle: textStyles.label,
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
      <Tab.Screen
        name="LPs"
        children={() => <LPs lps={state.lps} isLoading={state.isLoading} />}
        options={{
          tabBarLabel: "LP",
        }}
      />
    </Tab.Navigator>
  );
};

export default AuctionNav;
