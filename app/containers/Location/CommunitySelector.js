import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';


class CommunitySelectoer extends Component{
  render(){
    return (<View style={styles.container}>
      <Text style={styles.title}>检测到这些小区在您周围</Text>
      <ScrollView style={styles.communityList}>
        <View style={styles.communityLayout}>
          {['秋荷坊','七贤郡','锦云坊', '竹径云山', '七贤山居', '等等'].map((item, index) => <View key={index} style={styles.community}><Text>{item}</Text></View>)}
        </View>
      </ScrollView>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignSelf: 'stretch'
  },
  title: {
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: '700'
  },
  communityList: {
    marginTop: 45,
    flex: 1,
    paddingHorizontal: 20
  },
  communityLayout: {
    marginLeft: -10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  community: {
    width: 143,
    marginLeft: 10,
    marginBottom: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 1)'
  }
});

export default CommunitySelectoer;