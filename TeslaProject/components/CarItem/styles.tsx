import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%'
      },
      titleContainer: {
        marginTop: '30%',
        alignItems: 'center',
        justifyContent: 'center'
      },
      title: {
        fontWeight: '500',
        fontSize: 40,
      },
      subtitle: {
        fontSize: 15,
        color: '#5c5e62'
      },
      bgImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        position: 'absolute'
      },
      buttonContainer:{
        position: 'absolute',
        bottom: 50,
        width: '100%'
      },
      subtitleCTA: {
        textDecorationLine: 'underline',
      },
});

export default styles;