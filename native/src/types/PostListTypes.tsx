import { RootStackParamList } from './RootStackParamListType';
import { StackNavigationProp } from '@react-navigation/stack';

export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'Home'>;

export type Props = {
  navigation: ProfileScreenNavigationProp;
};

export type State = {
  data: any;
  isLoaded: boolean;
  isFiltered: boolean;
  authorName: string;
};
