import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';


class CommunitySelectoer extends Component{
  render(){
    return (<View style={styles.container}>
      <Text style={styles.title}>检测到这些小区在您周围</Text>
      <ScrollView style={styles.communityList}>
        <View style={styles.communityLayout}>
          {['秋荷坊','七贤郡','锦云坊', '竹径云山', '七贤山居', '等等'].map(
            (item, index) =>
              <View key={index} style={styles.community}>
                <Text style={styles.communityName}>{item}</Text>
              </View>
          )}
        </View>
      </ScrollView>
      <View>
        <Text>确认选择</Text>
        <Text>手动输入小区</Text>
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignSelf: 'stretch'
  },
  title: {
    alignSelf: 'center',
    fontSize: 34,
    fontWeight: '700'
  },
  communityList: {
    marginTop: 90,
    flex: 1,
    paddingHorizontal: 40
  },
  communityLayout: {
    marginLeft: -20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  community: {
    width: 286,
    marginLeft: 20,
    marginBottom: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 1)'
  },
  communityName: {
    fontSize: 25
  }
});

export default CommunitySelectoer;