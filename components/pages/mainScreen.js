/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Snackbar from 'react-native-snackbar';
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
  Modal

} from 'react-native';
import Header from '../utils/header';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';



class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current : {},
      modalOpen:false
    }
  }

  handlePress(index,title) {
    this.props.addFavourite(index);
    Snackbar.show({
      text: `${title} added to cart`,
      duration: Snackbar.LENGTH_SHORT,
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor = '#fff' barStyle = 'dark-content' />
        <Header navigateToCart = {()=>this.props.navigation.navigate("Cart")} name = "Products" cartNo = {this.props.cartItems.length} toggleDrawer = {()=>this.props.navigation.toggleDrawer()}/>
        <ScrollView style = {{flex:1}} contentContainerStyle = {{marginTop:20,paddingBottom:80}}>
            {this.props.allItems.map((item,index)=>{
                return(
                    <View key = {item.price} style = {{flexDirection:'row',width:Dimensions.get('window').width-20,alignSelf:'center',backgroundColor:'#fff',elevation:5,height:120,marginBottom:20,borderRadius:15}}>
                        <View style = {{position:'absolute',top:0,right:0,backgroundColor:'#000',width:60,height:25,borderTopRightRadius:15,borderBottomLeftRadius:15,justifyContent:'center',alignItems:'center'}}>
                          <Text style = {{color:'#fff',fontSize:12}}>{item.price}</Text>
                        </View>
                        <Image source = {{uri:item.image}} style = {{width:'30%',height:'90%',borderRadius:15,alignSelf:'center',marginLeft:5}}/>
                        <View style = {{flexDirection:'column',marginLeft:20}}>
                          <View><Text style = {{fontWeight:'bold',fontSize:18,marginTop:20}}>{item.title}</Text></View>
                          <View style = {{height:'30%'}}/>
                          <View style = {{flexDirection:'row'}}>
                          <LinearGradient colors={['#DA22FF', '#9733EE']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{width:90,justifyContent:'center',alignItems:'center',height:35,borderRadius:15}}>
                            <TouchableOpacity onPress = {()=>this.setState({current:item,modalOpen:true})} style = {styles.touchables}>
                            
                              <Text style = {{fontWeight:'bold',fontSize:16,color:'#fff'}}>Details</Text>
                              
                            </TouchableOpacity>
                            </LinearGradient>
                            <View style = {{width:'5%'}}/>
                            <LinearGradient colors={['#1A2980', '#26D0CE']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{width:120,justifyContent:'center',alignItems:'center',height:35,borderRadius:15}}>
                            
                            {item.quantity == 1 ? <TouchableOpacity onPress={()=>this.props.navigation.navigate("Cart")} style = {styles.touchables}>
                            
                            <Text style = {{fontWeight:'bold',fontSize:16,color:'#fff'}}>Go to cart</Text>
                            
                          </TouchableOpacity> : <TouchableOpacity onPress={()=>this.handlePress(item.id,item.title)} style = {styles.touchables}>
                            
                            <Text style = {{fontWeight:'bold',fontSize:16,color:'#fff'}}>Add to cart</Text>
                            
                          </TouchableOpacity>}
                            
                            </LinearGradient>
                          </View>
                        </View>
                    </View>
                )
            })}
        </ScrollView>
        <Modal animationType={"slide"} transparent={true} visible={this.state.modalOpen}>
                <View style={{justifyContent:'flex-end',flex: 1,backgroundColor: 'rgba(0,0,0,0.2)'}}>
                    <View style ={{flex:1, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <View style={styles.overlay}>
                            <TouchableOpacity onPress={() => {this.setState({modalOpen:false})}}>
                                <Icon name="close" size={34} color='#009ACD' style = {{margin:30,alignSelf:'flex-end'}} />
                            </TouchableOpacity>
                            <View style = {{justifyContent:'center',alignItems:'center'}}>
                                <Image style={styles.imgDetails} source={{ uri: this.state.current.image}} />

                                <Text style = {{marginTop:20,fontSize:24,fontWeight:'bold'}}>{this.state.current.title}</Text>

                                <Text style = {{marginTop:10,fontSize:18,fontWeight:'bold',fontStyle:'italic'}}>$ {this.state.current.price}</Text>

                                <View style = {{height:0.5,width:Dimensions.get('screen').width/1.8,borderWidth:0.5,marginTop:40,opacity:0.5}}/>

                                <View style = {{marginTop:20,paddingHorizontal:40}}>
                                    <Text style = {{fontSize:16,textAlign:'center'}}>{this.state.current.desc}</Text>
                                </View>

                                <View style = {{height:0.5,width:Dimensions.get('screen').width/1.8,borderWidth:0.5,marginTop:40,opacity:0.5}}/>

                                <TouchableOpacity onPress = {() => this.handlePress(this.state.current.id)} style = {{marginTop:40,width:Dimensions.get('screen').width/2,paddingVertical:10,backgroundColor:'#009ACD',alignItems:'center',justifyContent:'center',borderRadius:8}}>
                                    <Text style = {{fontSize:20,fontWeight:'bold',color:'white'}}>
                                        Add to cart
                                    </Text>
                                </TouchableOpacity>

                            </View>    
                         </View>

                    </View>
                </View>
            </Modal>
      </View>
    );
  }

}

function mapStateToProps(state){
    return {
      cartItems: state.cartItems,
      allItems: state.allItems,
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
export default connect(mapStateToProps,mapDispatchToProps)(MainScreen)
