import { StyleSheet } from 'react-native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    height: '15%',
  },
  cabecalho: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: '2.5%',
    paddingTop: responsiveScreenHeight(7),
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
  },
  line: {
    borderWidth: 2,
    marginTop: '3.5%',
    width: '100%',
  },
  nameLogo: {
    marginLeft: '3%',
    fontSize: 25,
    fontFamily: 'Teachers Students',
  },
  nameLogoSecondary: {
    fontSize: 25,
    fontFamily: 'Teachers Students',
  },
});
