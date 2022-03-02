import { memo, useEffect } from 'react';
import { Button, TouchableOpacity, Dimensions, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';
import CheckBox from 'react-native-check-box'
import * as React from 'react';
import CheckedBox from '../assets/checkedBox.svg';
import UncheckedBox from '../assets/uncheckedBox.svg';
import TodayItem from './TodayItem';
import ComplexListItem from './ComplexListItem';

const TodayList = ({ user, onclick, ...props }) => {

  var load = true;

  global.total = 0;

  global.count = 0;

  useEffect(() => {
    console.log("updated value: " + global.count);
    
      
  
  
    
  })


  var selectedDate = new Date().getMonth() + "-" + new Date().getDate();

  const [data, setData] = React.useState([]);

function itemClick (val) {
  if(val)
  {
  setCount(count + 1);
  global.count = global.count+1;
  if(global.count>=global.total && global.total > 0)
      {
  
        onclick();
      }
      else
      {
        console.log(global.count);
      }
}
else
{
  console.log("subtracting");
  setCount(count-1);
  global.count - 1;
}
}



const [count, setCount] = React.useState(0);
const [checked, setChecked] = React.useState(false);


if(load)
{
  load = false;
}

function onReturn() {
  
  fetchData();

}

const loadDetails = () => {
  return data.map(function(item, index) {
    return (<ComplexListItem siteNum={item.WID}  title={item.Name} 
      aroma={item.AromaDesc}
      sugarRating={item.Sweetness} 
      acidRating={item.Acidity}
      bodyRating={item.Body}
      tanninRating={item.Tannins}
      alcoholRating={item.Alcohol}/>);
  })
          
};

const fetchData = () => {
  var uncheckedWines = []

  return fetch('https://outpostorganizer.com/SITE/api.php/records/Wines?camp=bottleshock', {
  method: 'GET'
})
.then((response) => response.json())
.then((responseJson) => {
  return fetch('https://outpostorganizer.com/SITE/api.php/records/Reviews?camp=bottleshock',
  {method: 'GET'}).then((response) => response.json())
  .then((responseJson2) => {
    var myReviews = responseJson2.records.filter((item) => item.UID == user.UID);
    uncheckedWines = responseJson.records;
    myReviews.map((review) => {
      uncheckedWines = uncheckedWines.filter((item) => item.WID!=review.WID)
    })
    console.log("Unchecked Wines: " + JSON.stringify(uncheckedWines))
    setData(uncheckedWines);
    return uncheckedWines;
  })
//  console.log(responseJson);
console.log("called");
  setData(responseJson.records);
  return responseJson.records;
  //console.log(data);
} )
}


useEffect(() => 
{
fetchData();
}, [load])








const styles = StyleSheet.create({
  text: {
    fontSize: 20, 
    lineHeight: 26,
    color: theme.colors.secondary,
    marginBottom: 14,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Regular",
    marginLeft: 40,
  },
  header: {
    fontSize: 24,
    lineHeight: 24,
    color: theme.colors.secondary,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Bold",    
    marginLeft: 40,
  },
  noAl: {
    fontSize: 24,
    lineHeight: 24,
    color: theme.colors.secondary,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Bold",    
  },
  container:
  {
    lineHeight: 26,
    backgroundColor: theme.colors.lightBlue,
    marginBottom: 14,
    width: '90%',
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  checkbox:
  {
    
  },
  checkboxContainer:
  {
    position: 'absolute',
    left: 20,
    top: '22%',
    overflow: 'visible',
  }

  
});


return (
  <View style={{width: "100%", textAlign: 'center', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
  {loadDetails()}
  {/*<Button style={{width: "80%"}}
        title="Press me"
        onPress={onclick} 
/> */}
      
      </View> );
};
export default memo(TodayList);
