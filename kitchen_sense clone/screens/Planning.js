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

import { Alert } from 'react-native';

console.disableYellowBox = true;

export default class Planning extends Component {


    constructor() {
        super();

        this.notifyRef = firestore.collection('Notifications_Planner').limit(3);
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

    componentDidMount() {

/*         peopleName = () => {
            //get the name based on ID
            let peoplename = firestore.collection('Planner').where('people_inCharge');
            let userName = firestore.collection('Users')
                            .doc(auth.currentUser.uid)
                            .where('uid' == auth.currentUser.uid )
                            .then((snapshot) => {
                                fullname=snapshot.fullname;
                                fullname= documentSnapshot.getString('fullname')
                                console.log(JSON.stringify(fullname));
                            })
            peoplename.data();
        } */
        var user = auth.currentUser;
        let name, uid;
        if (user != null) {
            name = user.displayName;
            uid = user.uid;
        }
        //this.feedRef = firestore.collection('Planner')/* where('people_inCharge' == peoplename) *//* orderBy('createdAt','desc' )*/;
        //this.unsubscribe2 = this.feedRef.onSnapshot(this.getCollection2);
        this.unsubscribe = this.notifyRef.onSnapshot(this.getCollection2);

        //take notification based on today
/*         this.notifyRef = firestore.collection('Notifications_Planner')
                       /*  .where('people_inCharge' == peoplename) 
                        .limit(3)
                        
/*                         .orderBy('createdAt','desc')*/ 
                      /*  .startAt(Date.now()) */


                        //after 24 hours no action the data will be deleted
  /*                       setTimeout((index) => {
                            this.deleteUser(index)
                            Alert.alert('I am appearing...', 'After 5 seconds!');
                          },24 * 60 * 60 * 1000); */

      //this.unsubscribe = firebase.firestore().collection('Users').onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
       // this.unsubscribe2();
        
    }

    getCollection = (querySnapshot) => {
        const food = [];
        querySnapshot.forEach((res) => {
            const {
                uid,
                date_to_buy,
                itemname,
                itemDesc,
                orderDescription, 
                orderManPhoneNum,
                orderedEmail,
                orderedMan,
                orderedid,
                userPicture, 
                people_inCharge, 
                url,
            } = res.data();
            food.push({
                key: res.id,
                res,
                uid,
                date_to_buy,
                itemname,
                itemDesc,
                orderDescription, 
                orderManPhoneNum,
                orderedEmail,
                orderedMan,
                orderedid,
                userPicture, 
                people_inCharge, 
                url,
            });
        });
        this.setState({
            food,
            isLoading: false
        })
    }


    getCollection2 = (querySnapshot) => {
        const newplan = [];
        querySnapshot.forEach((res) => {
            const {
                uid,
                date_to_buy,
                itemname,
                itemDesc,
                orderDescription, 
                orderManPhoneNum,
                orderedEmail,
                orderedMan,
                orderedid,
                userPicture, 
                people_inCharge, 
                url,
            } = res.data();
            newplan.push({
                key: res.id,
                res,
                uid,
                date_to_buy,
                itemname,
                itemDesc,
                orderDescription, 
                orderManPhoneNum,
                orderedEmail,
                orderedMan,
                orderedid,
                userPicture, 
                people_inCharge, 
                url,
            });
            console.log("new plan", newplan)
        });
        this.setState({
            newplan,
            isLoading: false
        })
    }



    setModalVisible = (bool) => {
        this.setState({ isModalVisible: bool })
    }

    setInputText = (text) => {
        this.setState({ inputText: text })
    }

    setEditedItem = (id) => {
        this.setState({ editedItem: id })
    }
    handleEditItem = (editedItem) => {
        const newData = this.state.data.map(item => {
            if (item.id === editedItem) {
                item.text = this.state.inputText
                return item
            }
            return item
        })
        this.setState({ data: newData })
    }
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
        updateDBRef.set({
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
          console.log("testData",docRef);
        })
        .catch((error) => {
          console.error("Error: ", error);
          this.setState({
            isLoading: false,
          });
        });
      } */
    
      //if cancel than here
/*       deleteUser(index) {
        const dbRef = firestore.collection('Notifications_Planner').doc(index)
          dbRef.delete().then((res) => {
              console.log('Item removed from database', res)
          })
          
      } */
    
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
    
     
    static navigationOptions = {
        title: 'Planning',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-person" style={{ color: tintColor }} />
        ),
        headerTitle: {
            title: 'GET-THE-JOB'
        },
        headerStyle: {
            backgroundColor: '#f45fff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }



    render() {
        return (
            <Container>
                  <Content >
                  <Separator bordered>
                        <Text style={{fontSize: 15, textAlign: 'center'}}>New Suggested Planner</Text>
                    </Separator>
                    <View>
                    <FlatList
                            data={this.state.newplan}                            
                           
                            renderItem={({ item, index }) => {
                                return (
                                    <Container style={{ flex: 1,  backgroundColor: '#242836', height: 300}}>
                                            <View>

                                            <Card key={index} style={{ marginTop: 10, padding:30}}>
                                            <ListItem>
                                                <Left>
                                                    <Thumbnail source={{ uri: item.url }} />
                                                </Left>
                                                <Body>
                                                    <Text>{item.people_inCharge}</Text>
                                                    <Text note>{item.itemDesc}</Text>
                                                    <View style={{ flex: 1, flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                                                        <Button success /* onPress={this.AcceptJob()} */>
                                                            <Text>Accept</Text>
                                                        </Button>
                                                        <Button danger /* onPress={this.openTwoButtonAlert(index)} */>
                                                            <Text>Reject</Text>
                                                        </Button>
                                                    </View>
                                                </Body>
                                                <Right>
                                                    <Text note>3:43 pm</Text>
                                                </Right>
                                            </ListItem>

                                            </Card>

                                            </View>

                                       
                                    </Container>
                                )
                            }}
                        />
                    </View>
                    <Separator bordered>
                        <Text>Ongoing Planner</Text>
                    </Separator>
                    <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>List of Ingredient</Text>                    
                    <View style={{ flex: 1, shadowColor: 'white', backgroundColor: '#292D5C' }}>
                    <FlatList
                            data={this.state.food}                            
                            contentContainerStyle={{ justifyContsent:'space-around' }}
                            renderItem={({ item, index }) => {
                                return (
                                    <Container>
                                       
                                          

                                            <Card key={index} style={{flex: 1}} time={index * 1000}>
                                                <CardItem>
                                                <Left>
                                                        <Thumbnail source={{uri: item.userPicture}} />
                                                    <Body>
                                                        <Text>{item.orderedMan}</Text>
                                                        <Text note>{item.orderManPhoneNum}</Text>
                                                    </Body>
                                                </Left>
                                                </CardItem>
                                                <CardItem>
                                                    <CardItem header bordered>
                                                        <Text>{item.itemname}</Text>
                                                        <Text>{item.date_to_buy}</Text>
                                                    </CardItem>
                                                <Body>
                                                    <Image source={{uri: item.url}} style={{height: 200, width: 200, flex: 1}}/>
                                                    <CardItem>
                                                        <Text>{item.itemDesc}</Text>
                                                    </CardItem>
                                                    <CardItem>

                                                    </CardItem>
                                                </Body>
                                                </CardItem>
                                                <CardItem>
                                                <Left>
                                                    <Button transparent textStyle={{color: '#87838B'}}>
                                                    <Icon name="logo-github" />
                                                    <Text>1,926 stars</Text>
                                                    </Button>
                                                </Left>
                                                </CardItem>
                                                <CardItem>
                                                <Button block primary last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => this.props.navigation.navigate('EditProfileJobCreator')}>
                                                                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'montserrat' }}>Edit Profile</Text>
                                                            </Button>

                                                </CardItem>
                                            </Card>

                                  
                                    </Container>
                                )
                            }}
                        />
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