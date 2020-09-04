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
  Text,
  StatusBar,
} from 'react-native';
import AppNavigator from './components/navigator';
import 'react-native-gesture-handler';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
  total:0,
  cartItems: [],
  allItems: [
    {
      image: 'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
      title: 'Red Shirt',
      desc: 'A red t-shirt, perfect for days with non-red weather.',
      id: 1,
      quantity:0,
      price: 29.99,
    },
    {
      image: 'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tiny',
      title: 'Blue Carpet',
      desc: 'Fits your red shirt perfectly. To stand on. Not to wear it.',
      id: 2,
      quantity:0,
      price: 99.99,
    },
    {
      image: 'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
      title: 'Coffee Mug',
      desc: 'Can also be used for tea!',
      id: 3,
      quantity:0,
      price: 8.99,
    },
    {
      image: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
      title: 'The Book - Limited Edition',
      desc: "What the content is? Why would that matter? It's a limited edition!",
      id: 4,
      quantity:0,
      price: 15.99,
    },
    {
      image: 'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
      title: 'PowerBook',
      desc: 'Awesome hardware in moderate price. Buy now before a new one is released!',
      id: 5,
      quantity:0,
      price: 2299.99,
    },
    {
      image: 'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
      title: 'Pen & Paper',
      desc: "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
      id: 6,
      quantity:0,
      price: 5.49,
    },
  ],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVOURITE':
      const itemExists = state.cartItems.filter((val)=>val.id == action.payload)
      if(itemExists.length == 0){
        const addedItem = state.allItems.filter((val) => val.id == action.payload);
        console.log(addedItem);
        addedItem[0]["quantity"] = 1;
        return {
          ...state,
          total: state.total+addedItem[0]["price"],
          cartItems: [...state.cartItems, addedItem[0]],
          allItems: state.allItems.map((item, index) => {
            if(item.id === action.payload) {
              return {
                ...item,
                quantity: 1
              }
            }
            return item;
          })
        };
    }
      else{
        return{
          ...state,
          total: state.total+itemExists[0]["price"],
          cartItems: state.cartItems.map((item, index) => {
            if(item.id === action.payload) {
              return {
                ...item,
                quantity: itemExists[0]["quantity"]+1
              }
            }
            return item;
          })
        } 
      }

    case 'REMOVE_FAVOURITE':
      const itemExist = state.cartItems.filter((val)=>val.id == action.payload)
      if(itemExist[0]["quantity"] == 1){
        return {
          ...state,
          total: state.total - itemExist[0]["price"],
          allItems: state.allItems.map((item, index) => {
            if(item.id === action.payload) {
              return {
                ...item,
                quantity: 0
              }
            }
            return item;
          }),
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload,
          ),
        }; 
      }
      else{
        return{
          ...state,
          total: state.total - itemExist[0]["price"],
          cartItems: state.cartItems.map((item, index) => {
            if(item.id === action.payload) {
              return {
                ...item,
                quantity: itemExist[0]["quantity"]-1
              }
            }
            return item;
          })
        } 
      }
    default:
      return state;
  }
  return state;
};
const store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
export default App;
