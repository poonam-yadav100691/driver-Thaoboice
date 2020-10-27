import { Appbar } from 'react-native-paper';
import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { actuatedNormalize, fontFamily } from '../config/Font';
import backIcon from "../assets/images/back2.png";
import cancelJob from "../assets/images/cart.png";
export const Header = ({
  onGoBack,
  title
}: {
  onGoBack: () => void;
  title: string;
}) => {
  return (
    <Appbar.Header style={{ backgroundColor: '#f7f7f7',textcolor :'black',fontFamily: fontFamily.Bold, elevation: 1 }}>

     {  <Appbar.Action   icon={backIcon} onPress={onGoBack} />}
     <Appbar.Content title={title}  />
    </Appbar.Header>
  );
};

export const Header2 = ({
  onGoBack,
  title,
onCancelJob
}: {
  onGoBack: () => void;
  onCancelJob:()=> void;
  title: string;
}) => {
  return (
    <Appbar.Header style={{ backgroundColor: '#f7f7f7',textcolor :'black',fontFamily: fontFamily.Bold, elevation: 1 }}>

     { <Appbar.Action   icon={backIcon} onPress={onGoBack} />}
     <Appbar.Content title={title}  />
     <Appbar.Action icon = "cancel" color = "red" onPress={onCancelJob} />
    </Appbar.Header>
  );
};
