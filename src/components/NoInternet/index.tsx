import {Text, View} from 'react-native';
import {styles} from './styles';

const NoInternet = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.noConnectionText}>No Interent Connection</Text>
    </View>
  );
};

export default NoInternet;
