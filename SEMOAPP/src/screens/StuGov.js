import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, Text, Image, View, ScrollView } from 'react-native';
import { styles } from '../styles/StuGovStyle';
import { MinuteItem } from '../components/MinuteItem';
import React, { useEffect } from 'react';
import { theme } from '../core/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import uploadToAnonymousFilesAsync from 'anonymous-files'; 
import * as FileSystem from 'expo-file-system';
 

export default function StuGov() {

  const [imgURL, onChangeURL] = React.useState("")
  const [minutes, setMinutes] = React.useState(null)
  const [agenda, setAgenda] = React.useState(null)
  const [formattedItems, setFormattedItems] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [aID, setAID] = React.useState(0)
  const [pDates, setPDates] = React.useState([])
  const [accessors, setAccessors] = React.useState([])
  const colors = [theme.colors.red, theme.colors.blue]
  const [credentials, setCredentials] = React.useState(null)
  const [prompt, showPrompt] = React.useState(false)
  const [image, setImage] = React.useState(null);
  const [remoteUri, setRemoteURI] = React.useState("");
  const [pulledImage, setPimage] = React.useState({uri: "https://outpostorganizer.com/SEMO/stugov.png?" + Math.round(Math.random()*100000).toString() + "=" + Math.round(Math.random()*100000).toString()})

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      setCredentials( jsonValue != null ? (JSON.parse(jsonValue)) : null);
    } catch(e) {
      console.log("error")
      // error reading value
    }
  }
  

  useEffect(() => {
    if(remoteUri!="" && remoteUri!=null)
    {
      console.log("URI: ");
      console.log(remoteUri)
    }
  }, [remoteUri])

  const fetchAgenda = () => {
    setIsLoaded(false);
    fetch("https://selink.semo.edu/legacy/webapi/drive/folder/1969729/contents?page=1&pageSize=30", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "groupkey": "studentgov",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-xsrf-token": "iLMWswYnBAZy_PjiWfmgFJqBHmySqJ-Sq0oMvgz_vllEPkP0jYov3YOxlOTs8AOe6gNXqSVEAuQ_AfwbO2XcO6cjIM8MdsLOHuoJ6SHbbOM1:iFBuM3am8qgVx7HxrWYqJ2NgLrXzDnA9TA-FmNtlvRcUbtIkYRZ4lmNULJii421dn8iS4rt1cQ4rMfuqAoT45RzVBbhQTTIC-zjaG-cTUkM1"
      },
      "referrer": "https://selink.semo.edu/organization/studentgov/documents",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    }).then((response) => response.json())
    .then((json) => {
      setAgenda((json))
    })
  }

  const fetchMinutes = () => {
    setIsLoaded(false);
    fetch("https://selink.semo.edu/legacy/webapi/drive/folder/1973483/contents?page=1&pageSize=30", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "groupkey": "studentgov",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-xsrf-token": "f5qfqgfA2rEftQqnGQcJYTYrpKrgdm5oXnxDlaI7TD4K4_JIeHfWQrFoSXJnCCnrb-AuFOoZMwnk2jVfQOkkzM7IWp27ERggL1JOJytjqC01:A1V9FmYEp1lpBhuVqj_IsSNlzihVSNeKBuG8aK-Fb24ENh5OREiMkt0iC8PrXh-l-rZwIEPlGOSdzE5C7Kyu6Ecy_HUnqA6b0f8d3OG8xyI1"
      },
      "referrer": "https://selink.semo.edu/organization/studentgov/documents",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    }).then((response) => response.json())
    .then((json) => {
      setMinutes((json))
    }).catch((error) => {
      console.log(error)
    })
    
    
  }

  React.useEffect(() => {
    fetchAgenda()
    fetchMinutes()
    getData("credentials")
  }, [])
  
  React.useEffect(() => {
    if(minutes!=null)
    {
      var dates = [];
      minutes.forEach((item) => {
        const d = (item.Title.replace(new RegExp("Senate Mins[_ ]"), "").replace(".pdf", ""));
        var dateExp = d.split("_");
        var year = "20" + dateExp[2];
        var month = dateExp[0].length==1 ? "0" + dateExp[0] : dateExp[0];
        var day = dateExp[1].length==1 ? "0" + dateExp[1] : dateExp[1];
        var dateString = Moment(year + "-" + month + "-" + day).format('YYYY-MM-DD')
        var t = item.Title;
        var valid = Moment(year + "-" + month + "-" + day).isValid()
        var x = valid ? dateString : item.Title;
        dates.push({t, x})
      });
      minutes.sort((a, b) => {
        var fA = dates.find((d) => d.t == a.Title)
        var fB = dates.find((d) => d.t == b.Title)
        return (fA.x) > (fB.x) ? 1 : -1
      })

    setFormattedItems(
      minutes.map((minute) => {
        return(
          <MinuteItem key={minute.Id} type="minutes" minutes={minute}/>
        )
      })
    )
    setIsLoaded(true)
    }
  }, [minutes])

  React.useEffect(() => {
    if(agenda!=null)
    {
      var dates = [];
      var valids = [];
      agenda.forEach((item) => {
        const d = (item.Title.replace(new RegExp("Senate Agenda[_ ]"), "").replace(".docx", ""));
        var dateExp = d.split("_");
        var year = "20" + dateExp[2];
        var month = dateExp[0].length==1 ? "0" + dateExp[0] : dateExp[0];
        var day = dateExp[1].length==1 ? "0" + dateExp[1] : dateExp[1];

        var dateString = Moment(year + "-" + month + "-" + day).format('YYYY-MM-DD')
        var t = item.Title;
        var valid = Moment(year + "-" + month + "-" + day).isValid()
        var x = valid ? dateString : item.Title;
        //console.log(x)
        dates.push({t, x})
      });
      setPDates(dates)
      agenda.sort((a, b) => {
        
        var fA = dates.find((d) => d.t == a.Title)
        var fB = dates.find((d) => d.t == b.Title)
        //console.log(fA.x)
        return (fA.x) > (fB.x) ? 1 : -1
        
      })

    setFormattedItems(
      agenda.map((minute) => {
        return(
          <MinuteItem key={minute.Id} type="agenda" minutes={minute}/>
        )
      })
    )
    setIsLoaded(true)
    }
  }, [agenda])

  React.useEffect(() => {
    if(aID==0)
    {
      fetchAgenda()
    }
    else
    {
      fetchMinutes()
    }
  }, [aID])

  /*fetch("http://app.semo.edu/genl/cbalance/index.asp", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "upgrade-insecure-requests": "1"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "varid=" + so,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }).then((resp)=>{ return resp.text() }).then((text)=>{
  */

  React.useEffect(() => {
    var currentA = []
    fetch("https://selink.semo.edu/api/discovery/organization/174263/position?take=100&isOfficer=true", {
  "headers": {
    "accept": "application/json",
    "accept-language": "en-US,en;q=0.9",
  },
  "referrer": "https://selink.semo.edu/organization/studentgov/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then((response) => 
  response.json()
).then((responseJSON) => {

  (responseJSON.items.map((item) => {
    (item.holders.map((holder) => {
      currentA.push(holder.primaryEmailAddress.split("@")[0].toLowerCase())
    }))
  }))
  currentA.push("zllocke1s")
  setAccessors(currentA);
});
  }, [])

  function updateImageStart() {
    showPrompt(!prompt)
  }

  
async function uploadImageAsync(uri) {
  let apiUrl = 'https://outpostorganizer.com/SEMO/imageUpload.php';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}
  

  async function updateImage() {
   /* console.log(image.base64)
    let remoteUri = await uploadToAnonymousFilesAsync(image.uri);
    console.log(remoteUri)
    fetch("https://outpostorganizer.com/SEMO/imageUpload.php", {
      method: 'POST',
      body: {
        verified: 1,
        img: image.base64
      },
    }).then((response) => {
      console.log(response.ok)
      return(response.json())
    }).then((responseJSON) => {
        console.log(responseJSON)
      })*/
    uploadImageAsync(image.uri)
    showPrompt(false)
  }

  useEffect(() => {
    if(prompt==false && image!=null)
    {
    setPimage({uri: image.uri})
  }}, [prompt])



  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={styles.title}>Student Government</Text>
         </View>
      </View>
      
      <View style={styles.galleryContainer}>
        {pulledImage!=null ? <Image source={pulledImage} style={styles.galleryImg}></Image> : <Image source={require("../assets/stugov.png")} style={styles.galleryImg}></Image>}
        <Button onPress={() => {
          updateImageStart()
        }}style={(credentials!=null && accessors.includes(credentials.username.toLowerCase())) ? {position: "absolute", top: 20, right: 10, backgroundColor: "rgba(235, 235, 235, 0.9)"} : {display: 'none'}}><Text style={{color: "black"}}>Update</Text></Button>
        <View style={prompt ? {display: "flex", justifyContent: "space-between", flexDirection: "row", position: "absolute", left: 10, right: 10, padding: 20, borderRadius: 10, bottom: 10, backgroundColor: "rgba(235, 235, 235, 0.9)"} : {display: 'none'}}>
        <Button onPress={() => {
          pickImage()
        }}
        style={{alignItems: "center", justifyContent: "center", flex: 0.6, borderWidth: 1, borderColor: "#888"}}><Text style={{textAlignVertical: "center", color: theme.colors.red, fontSize: 16, justifyContent: "center"}}>{!image ? "Select Image" : "Replace Image"}</Text></Button><Button onPress={() => {
          updateImage()
        }}
        style={{alignItems: "center", justifyContent: "center", flex: 0.3, borderWidth: 1, borderColor: "#888"}}><Text style={{textAlignVertical: "center", color: theme.colors.red, fontSize: 16, justifyContent: "center"}}>Update</Text></Button></View>
        </View>
        <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => setAID(0)} style={aID==0 ? styles.redActive: styles.inactive}><Text style={styles.tabTitle}>Agendas</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setAID(1)} style={aID==1 ? styles.blueActive : styles.inactive}><Text style={styles.tabTitle}>Minutes</Text></TouchableOpacity>
        </View>
      <View style={[styles.infoContainer, {borderColor: colors[aID]}]}>
        <ScrollView>
        {isLoaded ? formattedItems : <ActivityIndicator style={styles.loadingBar} size="large" color={theme.colors.red} />}
        </ScrollView>
      </View>
        </View>
    
  );
}

