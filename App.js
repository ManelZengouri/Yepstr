import { StatusBar } from 'expo-status-bar';
import React from 'react';
import axiosApiInstance from './AxiosConfig';

import { StyleSheet, Text, View , Button ,Image, TouchableOpacity, FlatList ,TextInput } from 'react-native';



export default class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = ({
      cards : null,
      Number : 0 ,
      points : 0 ,
    })
     
  }
  //Choose a Deck
  Shuffle(){
    axiosApiInstance.get('/new/shuffle/?deck_count=1')
    .then((response) => {
        console.log(response.data.deck_id,)

        this.setState({
          deck_id: response.data.deck_id,
          remaining : response.data.remaining,
      })
    })
    .catch((erreur) => {
        console.log(erreur.response);
    });
  }

  //Draw a card 
  Draw(PrevCount){
    axiosApiInstance.get( `/${this.state.deck_id}/draw/?count=1`)
    .then((response) => {
        this.setState({
          cards: response.data.cards,
          remaining : response.data.remaining,
      })
   

    }).then(() => {
      console.log(this.state.Number);
      console.log(this.state.cards[0].value)
      // in this part I compared the number card I didn't have enough of time to implement the dichotomy to predict the interval so I did this instead  

      if(this.state.Number > this.state.cards[0].value){
        this.setState({
          points: PrevCount +  1 ,
        })
      }

  })
    .catch((erreur) => {
        console.log(erreur.response);
    });
}
componentDidMount(){
     this.Shuffle();  
}

render() { 
      return (
        <View style={styles.container}>
          <Text style={styles.TextStyle}>Deck of Cards</Text>
          <Text style={styles.TextStyle}>Number of cards left in the deck : {this.state.remaining}</Text>
          <Text style={styles.TextStyle}> Score :  {this.state.points}</Text>

          <TextInput
            style={{ height: 40, borderColor: 'white', borderWidth: 1 , padding :  '3%' , margin : '5%', backgroundColor : 'white'  }}
            onChangeText={(Number) => this.setState({ Number })}
            value={this.state.Number}
            placeholder='Which card do you expect it is ? '
          />
          <Button
              onPress={ () => { this.Draw(this.state.points) }}
              title="Current card"
              color="red"
          />
          <FlatList
              data={this.state.cards}
              keyExtractor={(item, index) => item.index}              
              renderItem={({ item, index }) => {
                  return (
                    <Image resizeMode='contain' style={{ height : 200, width : 200 , margin : '5%' }} source={this.state.cards == null ? null : { uri: item.image } } ></Image>
                  );
                   
              }}

          >
          </FlatList>
        </View>
      );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding : '10%'
  },
  TextStyle: {
    color : 'white',
    fontWeight : 'bold',
    fontSize : 15 ,  
    padding : '5%'  

  },
});
