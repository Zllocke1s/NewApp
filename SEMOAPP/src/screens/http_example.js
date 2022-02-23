import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'

class HttpExample extends Component {
   state = {
      data: ''
   }
   componentDidMount = () => {
      fetch('http://outpostorganizer.com/SITE/api.php/records/Users?camp=wartburg', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            data: responseJson.records
         })
      })
      .catch((error) => {
         console.error(error);
      });
   }
   render() {
      return (
         <View>
            <FlatList
          data={this.state.data}
          keyExtractor={({ UID }, index) => UID}
          renderItem={({ item }) => (
            <Text>{item.screenName}, {item.smallGroup}</Text>
          )}
        />
         </View>
      )
   }
}
export default HttpExample