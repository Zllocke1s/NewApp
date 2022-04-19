import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, Text, Image, View, ScrollView } from 'react-native';
import { styles } from '../styles/StuGovStyle';
import { MinuteItem } from '../components/MinuteItem';
import React, { useEffect } from 'react';
import { theme } from '../core/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'moment';

export default function StuGov() {

  const [minutes, setMinutes] = React.useState(null)
  const [agenda, setAgenda] = React.useState(null)
  const [formattedItems, setFormattedItems] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [aID, setAID] = React.useState(0)
  const [pDates, setPDates] = React.useState([])
  const colors = [theme.colors.red, theme.colors.blue]

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
      console.log("Still Loading")
      setMinutes((json))
    }).catch((error) => {
      console.log(error)
    })
    
    
  }

  React.useEffect(() => {
    fetchAgenda()
    fetchMinutes()
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
          <MinuteItem type="minutes" minutes={minute}/>
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
          <MinuteItem type="agenda" minutes={minute}/>
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


  React.useEffect(() => {
    fetch("https://www.instagram.com/sga_semo/").then((response) => {
      console.log(typeof(response))
    })
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={styles.title}>Student Government</Text>
         </View>
      </View>
      
      <View style={styles.galleryContainer}>
        <Image source={require("../assets/stugov.png")} style={styles.galleryImg}></Image>
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

