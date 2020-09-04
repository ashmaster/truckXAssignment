import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ToastAndroid,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Animated,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {min} from 'react-native-reanimated';

export default class EnterNumberScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      loading: false,
      email: '',
      emailVerify: false,
      password: '',
      passwordVerify: false,
      upperCase: false,
      digit: false,
      noOfChar: false,
      symbol: false,
    };
    this.showWidth = new Animated.Value(0);
    this.button = new Animated.Value(0);
    this.buttonWidth = new Animated.Value(0);
    this.buttonOpacity = new Animated.Value(0);
  }
  componentDidMount() {
    this.showAnim();
  }
  showAnim() {
    Animated.timing(this.showWidth, {
      delay: 500,
      toValue: 2,
    }).start();
  }
  showbutton() {
    Animated.parallel([
      Animated.timing(this.button, {
        delay: 200,
        toValue: 1,
      }),
      Animated.timing(this.buttonOpacity, {
        delay: 300,
        toValue: 1,
      }),
    ]).start();
  }
  hidebutton() {
    Animated.parallel([
      Animated.timing(this.button, {
        delay: 200,
        toValue: 0,
      }),
      Animated.timing(this.buttonOpacity, {
        delay: 100,
        toValue: 0,
      }),
    ]).start();
  }
  async afterHide() {
    this.setState({loading: true});
    this.props.navigation.navigate('Home');
  }
  afterHideAnim() {
    Animated.parallel([
      Animated.timing(this.buttonWidth, {
        delay: 200,
        toValue: 0,
      }),
      Animated.timing(this.buttonOpacity, {
        delay: 100,
        toValue: 1,
      }),
    ]).start();
  }

  pressed() {
    Animated.parallel([
      Animated.timing(this.buttonWidth, {
        delay: 100,
        toValue: 1,
      }),
      Animated.timing(this.buttonOpacity, {
        delay: 200,
        toValue: 0,
      }),
    ]).start(() => this.afterHide());
  }
  async onChangeEmail(text) {
    await this.setState({email: text});
    var emailVer;
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      emailVer = true;
    } else {
      emailVer = false;
    }
    this.setState({emailVerify: emailVer});
    if (emailVer && this.state.passwordVerify) {
      this.showbutton();
    } else this.hidebutton();
  }

  async onChangePassword(text) {
    await this.setState({password: text});
    const {password} = this.state;
    var upperCase;
    var minDig;
    var symbol;
    var noOfChar;
    var passwordVer;
    if (password.match(/[A-Z]/g)) {
      upperCase = true;
    } else {
      upperCase = false;
    }
    if (password.match(/[0-9]/g)) {
      minDig = true;
    } else {
      minDig = false;
    }
    if (password.match(/[^a-zA-Z\d]/g)) {
      symbol = true;
    } else {
      symbol = false;
    }
    if (password.length >= 8) {
      noOfChar = true;
    } else {
      noOfChar = false;
    }
    this.setState({
      upperCase: upperCase,
      noOfChar: noOfChar,
      digit: minDig,
      symbol: symbol,
    });
    if (minDig && noOfChar && upperCase && symbol) {
      passwordVer = true;
    } else {
      passwordVer = false;
    }
    this.setState({passwordVerify: passwordVer});
    if (passwordVer && this.state.emailVerify) {
      this.showbutton();
    } else this.hidebutton();
  }

  render() {
    const width = this.showWidth.interpolate({
      inputRange: [0, 2],
      outputRange: ['0%', '90%'],
    });

    const height = this.button.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50],
    });
    const buttonW = this.buttonWidth.interpolate({
      inputRange: [0, 1],
      outputRange: ['80%', '0%'],
    });
    const copacity = this.showWidth.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 0.5, 1],
    });
    const box_y = this.showWidth.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    });
    const bopacity = this.buttonOpacity;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.card,
              {opacity: copacity, transform: [{translateY: box_y}]},
            ]}>
            <View style={{margin: 20, marginBottom: 20, alignItems: 'center'}}>
              <Text
                style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>
                Sign In
              </Text>
            </View>
            <View
              style={[
                styles.number,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 30,
                },
              ]}>
              {/*EMAIL INPUT FIELD */}
              <Animated.View style={{width, alignSelf: 'center'}}>
                <TextInput
                  style={{
                    borderBottomWidth: 4,
                    borderColor: '#ccc',
                    paddingLeft: 5,
                    fontSize: 18,
                    height: 40,
                  }}
                  keyboardType="default"
                  placeholder="Email-id"
                  onChangeText={(text) => this.onChangeEmail(text)}
                />
              </Animated.View>
              {this.state.emailVerify ? (
                <Icon size={20} name="checkbox-marked-circle" color="green" />
              ) : (
                <View style={{width: 20}} />
              )}
            </View>
            <View
              style={[
                styles.number,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 30,
                  marginBottom: 10,
                },
              ]}>
              {/*PASSWORD INPUT FIELD */}
              <Animated.View style={{width, alignSelf: 'center'}}>
                <TextInput
                  style={{
                    borderBottomWidth: 4,
                    borderColor: '#ccc',
                    paddingLeft: 5,
                    fontSize: 18,
                    height: 40,
                  }}
                  keyboardType="default"
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(text) => this.onChangePassword(text)}
                />
              </Animated.View>
              {this.state.passwordVerify ? (
                <Icon size={20} name="checkbox-marked-circle" color="green" />
              ) : (
                <View style={{width: 20}} />
              )}
            </View>
            <View style={{paddingLeft: 30, paddingBottom: 20}}>
              <Text
                style={{
                  color: this.state.noOfChar ? 'green' : 'red',
                  fontSize: 12,
                }}>
                *At least 8 characters
              </Text>
              <Text
                style={{
                  color: this.state.upperCase ? 'green' : 'red',
                  fontSize: 12,
                }}>
                *At least 1 capital letter
              </Text>
              <Text
                style={{
                  color: this.state.symbol ? 'green' : 'red',
                  fontSize: 12,
                }}>
                *Atleast 1 symbol
              </Text>
              <Text
                style={{
                  color: this.state.digit ? 'green' : 'red',
                  fontSize: 12,
                }}>
                *Atleast 1 digit
              </Text>
            </View>
            {/*NEXT BUTTON */}
          </Animated.View>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => this.pressed()}>
            <Animated.View
              style={{
                backgroundColor: '#8A4AD9',
                justifyContent: 'center',
                height,
                width: buttonW,
                opacity: bopacity,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#fff',
                  fontSize: 18,
                }}>
                LOGIN
              </Text>
            </Animated.View>
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Image
              style={{
                width: Dimensions.get('window').width + 100,
                height: (Dimensions.get('window').width * 2) / 3,
                marginTop: '10%',
              }}
              source={require('../../assets/bckgrd.jpg')}
            />
          </View>
          <ActivityIndicator
            size="large"
            animating={this.state.loading}
            color={'#8A4AD9'}
          />
        </View>
      </View>
    );
  }
}

EnterNumberScreen.navigationOptions = (navData) => {
  hello = new EnterNumberScreen().state;
  return {
    headerTitle: 'Campus Ring',
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: '10%',
  },
  card: {
    borderTopColor: '#8A4AD9',
    borderTopWidth: 3,
    width: '80%',
    elevation: 5,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: '5%',
  },
  number: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  textInput: {
    marginLeft: 25,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    height: 35,
    fontSize: 18,
    paddingLeft: 15,
  },
  connectSocially: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#8A4AD9',
    marginLeft: 40,
  },
});
