declare module "react-native-vector-icons/FontAwesome" {
  import { Component } from "react";
  import { TextProps } from "react-native";

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }

  export default class Icon extends Component<IconProps> {
    static getImageSource(
      name: string,
      size?: number,
      color?: string
    ): Promise<any>;
    static getImageSourceSync(name: string, size?: number, color?: string): any;
    static loadFont(file?: string): Promise<void>;
    static hasIcon(name: string): boolean;
  }
}

declare module "react-native-vector-icons/FontAwesome5" {
  import { Component } from "react";
  import { TextProps } from "react-native";

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
    solid?: boolean;
    brand?: boolean;
  }

  export default class Icon extends Component<IconProps> {
    static getImageSource(
      name: string,
      size?: number,
      color?: string,
      solid?: boolean,
      brand?: boolean
    ): Promise<any>;
    static getImageSourceSync(
      name: string,
      size?: number,
      color?: string,
      solid?: boolean,
      brand?: boolean
    ): any;
    static loadFont(file?: string): Promise<void>;
    static hasIcon(name: string): boolean;
  }
}
