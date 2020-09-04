import React from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <View
          style={{
            zIndex: 1,
            height: StatusBar.currentHeight + 20,
            backgroundColor: '#fff',
            width: Dimensions.get('window').width,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            elevation: 5,
          }}>
          <TouchableOpacity
            style={{zIndex: 1, left: 20, elevation: 6}}
            onPress={() => this.props.toggleDrawer()}>
            <View>
              <Icon name="menu" size={26} />
            </View>
          </TouchableOpacity>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>
            {this.props.name}
          </Text>
          {this.props.name === "Cart" ? <View style = {{width:26,right:20}}/> : <TouchableOpacity
            style={{zIndex: 1, right: 20}}
            onPress={() => this.props.navigateToCart()}>
            <View>
              <Icon name="shopping-cart" size={26} />
            </View>
            {this.props.cartNo !== 0 ? <View style = {{position:'absolute',bottom:-10,right:-10,backgroundColor:'#000',borderRadius:20,width:25,justifyContent:'center',alignItems:'center'}}><Text style = {{color:'#fff',fontSize:12}}>{this.props.cartNo}</Text></View> : null}
          </TouchableOpacity>}
          
        </View>
    );
  }
}
export default Header;
