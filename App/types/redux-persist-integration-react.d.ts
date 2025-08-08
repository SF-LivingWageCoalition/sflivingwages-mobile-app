declare module "redux-persist/integration/react" {
  import React from "react";
  interface PersistGateProps {
    loading?: React.ReactNode;
    persistor: any;
    children?: React.ReactNode;
  }
  export class PersistGate extends React.Component<PersistGateProps> {}
}
