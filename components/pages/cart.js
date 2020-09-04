/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Modal,
  Alert

} from 'react-native';
import Header from '../utils/header';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';



class CartScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.cartItems)
  }
  handlePress(index) {
      this.props.addFavourite(index);
  }
  handlePress2(index,quantity) {
    if(quantity == 1){
      Alert.alert(
        "Cart",
        "Do you want to remove this item from cart ?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => this.props.removeFavourite(index) }
        ],
        { cancelable: false }
      );
    }
    else{
      this.props.removeFavourite(index);
    }
      
  }
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#fff'}}>
        <StatusBar backgroundColor = '#fff' barStyle = 'dark-content' />
        <Header name = "Cart" toggleDrawer = {()=>this.props.navigation.toggleDrawer()}/>
        <ScrollView style = {{flex:1}} contentContainerStyle = {{marginTop:10,paddingBottom:80}}>
                    <View style = {{flexDirection:'row',flex:1}}>
                      <View style = {{flex:3}}>
                        {
                          this.props.cartItems.slice(0).reverse().map((item,index)=>{
                            return(
                              <View onPress = {()=>console.log(this.props.cartItems)} style = {{alignItems:'center',height:130,marginBottom:20,flexDirection:'row',borderBottomWidth:0.6,borderBottomColor:'#000',marginLeft:10}}>
                                <Image source = {{uri:item.image}} style = {{width:'30%',height:'70%',borderRadius:15}}/>
                                <View style = {{marginLeft:15,alignSelf:'flex-start',marginTop:30,width:'60%'}}>
                                  <View style = {{height:'50%'}}><Text style = {{fontWeight:'bold',fontSize:18}}>{item.title}</Text></View>
                                  <View style = {{height:'50%'}}><Text>$ {item.price}</Text></View>
                                </View>
                                
                              </View>
                            )
                          })
                        }
                      </View>
                      <View style = {{flex:1}}>
                      {
                          this.props.cartItems.slice(0).reverse().map((item,index)=>{
                            return(
                              <View style = {{justifyContent:'center',alignItems:'center',height:130,marginBottom:20}}>
                              <View style = {{flexDirection:'row',width:'30%',alignItems:'center',justifyContent:'center',marginBottom:20}}>
                                <TouchableOpacity onPress= {()=>this.handlePress2(item.id,item.quantity)}>
                                    <Icon size = {20} name = "minus-circle"/>
                                  </TouchableOpacity>
                                  <View style = {{width:8}}/>
                                  <Text style = {{fontSize:18}}>{item.quantity}</Text>
                                  <View style = {{width:8}}/>
                                  <TouchableOpacity onPress= {()=>this.handlePress(item.id)}>
                                    <Icon size = {20} name = "plus-circle"/>
                                  </TouchableOpacity>
                                </View>
                                <Text style = {{fontSize:16,fontWeight:'bold',fontStyle:'italic'}}>$ {(item.price*item.quantity).toFixed(2)}</Text>
                              </View>
                            )
                          })
                        }
                      </View>
                    </View>
        </ScrollView>
        <View style = {{position:'absolute',bottom:0,flexDirection:'row',alignItems:'center',height:60,width:Dimensions.get('window').width,backgroundColor:'#2D5477'}}>
              <View style = {{flex:3,alignItems:'center'}}>
                    <Text style = {{fontSize:22,fontWeight:'bold',color:'#fff'}}>Total</Text>
              </View>
              <View style = {{flex:1,alignItems:'center'}}>
                    <Text style = {{fontWeight:'bold',fontSize:18,color:'#fff'}}>$ {(this.props.total).toFixed(2)}</Text>
              </View>
        </View>
      </View>
    );
  }

}

function mapStateToProps(state){
    return {
      cartItems: state.cartItems,
      allItems: state.allItems,
      total: state.total
    }
  }
function mapDispatchToProps(dispatch){
    return{
        addFavourite : (index) => dispatch({type:"ADD_FAVOURITE",payload:index}),
        removeFavourite : (index) => dispatch({type:"REMOVE_FAVOURITE",payload:index})
    }
}

  const styles = StyleSheet.create({
    overlay:{
        backgroundColor: '#ffffff',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height/1.2,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomWidth:1,
        borderBottomColor:'#aeb6f2'
    },
    imgDetails:{
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ccc',
        marginBottom:10
    },
    touchables:{
      width:'100%',
      height:'100%',
      justifyContent:'center',
      alignItems:'center'
    }

    
})
export default connect(mapStateToProps,mapDispatchToProps)(CartScreen)
