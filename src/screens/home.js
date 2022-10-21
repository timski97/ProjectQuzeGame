import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

export const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.banerContainer}>
        <Image
          style={styles.banner}
          source={require('../../assets/fonts/quizBanner.png')}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Quiz')}
        style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 300,
    width: 300,
  },
  container:{
    paddingTop:40,
    paddingHorizontal:20,
  },
  button: {
    width: '100%',
    backgroundColor: '#1A759F',
    padding: 20,
    borderRadius: 16,
    alignItems:'center'
  },
  buttonText:{
    fontWeight:'600',
    fontSize:24
  }
});
