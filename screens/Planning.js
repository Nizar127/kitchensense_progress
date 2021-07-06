import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Image, FlatList,
    UIManager, Animated,
    LayoutAnimation, TextInput, Modal, TouchableHighlight, 
} from 'react-native';
import {
    Container,
    Header,
    Content,
    View,
    Card,
    Right,
    auto,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Icon,
    List,
    ListItem,
    Separator,
    Button
} from 'native-base';
import {db, auth, storage, firestore} from '../config/Firebase';
import DataPlanner from './dataplanner';
import NotificationPlanner from './notification_planner';

import { Alert } from 'react-native';

console.disableYellowBox = true;

export default class Planning extends Component {


    constructor() {
        super();

        //this.notifyRef = firestore.collection('Notifications_Planner').where()limit(3);
       
        /*  .where('people_inCharge' == peoplename) */
         //.limit(3)
        //firebase.firestore().collection('Users').doc(user.uid).set(user).collection('Job_Creator');
        this.state = {
            users: [],
            food:[],
            newplan:[],
            username: '',
            fullname: '',
            email: '',
            key: '',
            description: '',
            uniqueId: '',
            url: '',
            imageType: '',
            worktype: '',
            salary: '',
            peoplenum: '',
            address:'',
            show: true,
            data: this.initData,
            isModalVisible: false,
            isLoading:false,
            inputText: '',
            editedItem: 0,
            date_to_buy:'',
            itemname:'',
            itemDesc:'',
            orderDescription:'', 
            orderManPhoneNum:'',
            orderedEmail:'',
            orderedMan:'',
            orderedid:'',
            userPicture:'', 
            people_inCharge:'', 

        };

    }

/*     componentDidMount() {

        let date = new Date();


        var user = auth.currentUser;
        let name, uid;
        if (user != null) {
            name = user.displayName;
            uid = user.uid;
        }


    } */



    //hide card example
    ShowHideComponent = () => {
        if (this.state.show == true) {
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    };



//if planner accept job
/*     AcceptJob() {
        this.setState({
          isLoading: true,
        });
        const updateDBRef = firestore.collection('Planner').doc(auth.currentUser.uid);
        updateDBRef.add({
            uid: this.state.uid,
            date_to_buy: this.state.date_to_buy,
            itemname: this.state.itemname,
            itemDesc: this.state.itemDesc,
            orderDescription: this.state.orderDescription, 
            orderManPhoneNum: this.state.orderManPhoneNum,
            orderedEmail: this.state.orderedEmail,
            orderedMan: this.state.orderedMan,
            orderedid: this.state.orderedid,
            userPicture: this.state.userPicture, 
            people_inCharge: this.state.people_inCharge, 
            url: this.state.url,
        }).then((docRef) => {
          this.setState({
            uid:'',
            date_to_buy: '',
            itemname: '',
            itemDesc:'',
            orderDescription:'', 
            orderManPhoneNum:'',
            orderedEmail:'',
            orderedMan:'',
            orderedid:'',
            userPicture:'', 
            people_inCharge:'', 
            url:'',
            isLoading: false,
          });
          console.log("testData: ",docRef);
        })
        .catch((error) => {
          console.error("Error: ", error);
          this.setState({
            isLoading: false,
          });
        });
      } 
    
      //if cancel than here
      deleteUser(index) {
        const dbRef = firestore.collection('Notifications_Planner').doc(index)
          dbRef.delete().then((res) => {
              console.log('Item removed from database', res)
          })
          
      } 
    
      openTwoButtonAlert=()=>{
        Alert.alert(
          'Delete Item',
          'Are you sure?',
          [
            {text: 'Yes', onPress: () => this.deleteUser(index)},
            {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
          ],
          { 
            cancelable: true 
          }
        );
      }
     */
     



    render() {
        return (
            <Container>
                  <Content >
                 {/*  <Button style={{margin:10}} success onPress={() => this.props.navigation.navigate('TestNoti')}><Text>Noti</Text></Button>
 */}
                  <Separator bordered>
                        <Text style={{fontSize: 15, textAlign: 'center'}}>New Suggested Planner</Text>
                    </Separator>
                    <View>
                      <NotificationPlanner/>
                    </View>
                    <Separator bordered>
                        <Text style={{fontSize: 15, textAlign: 'center'}}>Ongoing Planner</Text>
                    </Separator>
                    <View style={{ flex: 1, shadowColor: 'white', backgroundColor: '#292D5C' }}>
                        <ScrollView>
                               <DataPlanner/> 
                        </ScrollView>
                    </View>
                    </Content>
            </Container>

        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        backgroundColor: 'white',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
    },
    keyplayer: {
        padding: 20,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 35,

    },
    marginLeft: {
        marginLeft: 5,
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3,
    },
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    textInput: {
        width: '90%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray',
        borderBottomWidth: 2,
        fontSize: 16,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableHighlight: {
        backgroundColor: 'white',
        marginVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    }
})