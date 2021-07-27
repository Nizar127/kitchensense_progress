import React, { Component } from 'react';
import { KeyboardAvoidingView, FlatList, Modal, Alert, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import {
    Container,
    Header,
    Content,
    Right,
    View,
    Fab,
    Card,
    H1,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    //Icon,
    Item,
    Label,
    Input,
    Separator,
    Button,
    DatePicker,
    Picker,
    Textarea
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import {auth, firestore, storage} from '../config/Firebase';
import { KeyboardAvoidingViewBase } from 'react-native';
import * as Notifications from 'expo-notifications';



export default class Planner extends Component {

    constructor() {
        super();


        this.state = {
            notify: [],
            key:'',
            uid:'',
            date_to_buy:'',
            itemname: '',
            itemDesc: '',
            orderDescription:'', 
            //orderManPhoneNum: '',
            orderedEmail: '',
            orderedMan: '',
            orderedid: '',
            userPicture: '', 
            people_inChargeID:'', 
            url: '',
            date: '',
            name_item: '',
            Desc_item: '',
            //PersonPhoneNum: '',
            PersonEmail: '',
            PersonName: '',
            PersonId: '',
            PersonPicture: '', 
            people_InCharge: '',
            pic:'', 
            fabActive:false,
            
        };
        this.AcceptJob = this.AcceptJob.bind(this);

    }



    componentDidMount() {
         //.where('people_InCharge', '==', auth.currentUser.uid)
        //above is the code originally used to only called to particular people
        this.notifyRef = firestore.collection('Notifications_Planner')/* .where('people_inChargeID', '==', auth.currentUser.uid) */ //* .where('people_inChargeID' == auth.currentUser.uid) */;
        this.unsubscribe = this.notifyRef.onSnapshot(this.getCollection);
        this.plannerRef = firestore.collection('Planner');

    } 



     

    componentWillUnmount() {
        this.unsubscribe();
    }

    //main get
    getCollection = (querySnapshot) => {
        const notify = [];
        querySnapshot.forEach((res) => {
            const {
                uid,
                date_to_buy,
                itemname,
                itemDesc,
                orderDescription, 
                //orderManPhoneNum,
                orderedEmail,
                orderedMan,
                orderedid,
                userPicture, 
                people_inChargeID, 
                url,
            } = res.data();
            notify.push({
                key: res.id,
                res,
                uid,
                date_to_buy,
                itemname,
                itemDesc,
                orderDescription, 
                //orderManPhoneNum,
                orderedEmail,
                orderedMan,
                orderedid,
                userPicture, 
                people_inChargeID, 
                url,
            });
            console.log("notify", notify);
        });
        this.setState({
            notify,
            isLoading: false
        })
    }




    AcceptJob = async(id) =>{
        console.log("text_id", id);
    
        let dbref = firestore.collection('Notifications_Planner').doc(id).get();
        dbref.then(doc => {
            //const job = doc.data();
            this.setState({
                ...this.state,
                key:doc.id,
                date: doc.get('date_to_buy'),
                name_item: doc.get('itemname'),
                Desc_item: doc.get('itemDesc'),
                //PersonPhoneNum: doc.get('orderManPhoneNum'),
                PersonEmail:doc.get('orderedEmail'),
                PersonName: doc.get('orderedMan'),
                PersonId:doc.get('orderedId'),
                PersonPicture: doc.get('userPicture'), 
                people_InCharge:doc.get('people_inChargeID'), 
                pic: doc.get('url'),
            }, () => {
    
                console.log("state", this.state)
                console.log("auth.currentUser", auth.currentUser)
                console.log("uid", auth.currentUser.uid)
                console.log("date", this.state.date)
                console.log("userpicture", this.state.PersonPicture)
                console.log("people_inchargeID",this.state.people_InCharge)
                console.log("url", this.state.url)
    
                if (this.state.PersonId != null) 
                {
                    this.plannerRef.add({
                        userid:auth.currentUser.uid,
                        date: this.state.date,
                        name_item: this.state.name_item,
                        Desc_item: this.state.Desc_item,
                        //PersonPhoneNum: this.state.PersonPhoneNum,
                        PersonEmail: this.state.PersonEmail,
                        PersonName: this.state.PersonName,
                        PersonId: this.state.PersonId,
                        PersonPicture: this.state.PersonPicture, 
                        pic: this.state.pic
                        //createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    }).then((res) => {
                        console.log("[saveData] Done add to firebase", res);
                        
                    });
                    Alert.alert('Your new planner has been posted', 'Please Choose',
                        [
                            {
                                text: "Return To Main Screen",
                                onPress: () => this.props.navigation.navigate('Home')
                            },
                            {
                                text: "View Current Planner",
                                onPress: () => this.props.navigation.navigate('Planner')
                            },
                        ], { cancelable: false }
                    )
                }else{
                    Alert.alert('Empty Field')
                }
            });
    
        });
    
    }


    sendPushNotification = () => {
        let response = fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            
            to: 'ExponentPushToken[hDevWkBjFdG-Zj42pJi6fO]',
            sound: 'default',
            title: 'Demo',
            body: 'Demo notificaiton'
          })
        });
        console.log("notification", response)
      };

    //if planner accept job
  
      //if cancel than here
      deleteUser() {
        const dbRef = firestore.collection('Notifications_Planner').doc(this.state.key)
          dbRef.delete().then((res) => {
              console.log('Item removed from database', res)
              this.props.navigation.navigate('Planning');

          })
          
      } 



      openTwoButtonAlert=()=>{
        Alert.alert(
          'Delete Item',
          'Are you sure?',
          [
            {text: 'Yes', onPress: () => this.deleteUser()},
            {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
          ],
          { 
            cancelable: true 
          }
        );
      }




    render() {

        return (
            <Container>

                <Content >
                    <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>New Notifications</Text>
                    <View style={{ flex: 1, shadowColor: 'white', backgroundColor: '#242836' }}>
                <Button style={{margin:10}} success onPress={() => this.props.navigation.navigate('DataPlanner')}><Text>View Current Planner</Text></Button>

                    <FlatList
                            data={this.state.notify}                            
                          
                            renderItem={({ item, index }) => {
                                return (
                                    <Container style={{ backgroundColor: '#242836'}}>
                                            <ScrollView>
                                            <Card key={index} style={{ padding:10}}>
                                            <CardItem>
                                                <Left>
                                                    <Thumbnail source={{ uri: item.url }} />
                                                </Left>
                                                <Body>
                                                    <Text>{item.orderedMan}</Text>
                                                    <Text note>{item.itemDesc}</Text>
                                                </Body>
                                                <Right>
                                                    <Text note>{item.date_to_buy}</Text>
                                                </Right>
                                                </CardItem>
                                                <CardItem>
                                                <View style={{ marginBottom:15,  flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                                                        <Button style={{margin:10}} success onPress={()=> this.AcceptJob(item.key)}>
                                                            <Text>Accept</Text>
                                                        </Button>
                                                        <Button  style={{margin:10}} danger onPress={this.openTwoButtonAlert} >
                                                            <Text>Reject</Text>
                                                        </Button>
                                                    </View>
                                                </CardItem>

                                            </Card>

                                            </ScrollView>

                                       
                                    </Container>
                                )
                            }}
                        />
                    </View>

                </Content>



            </Container >
        );
    }
}

const Style = StyleSheet.create({
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 220,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    closeText: {
        fontSize: 25,
        color: '#00479e',
        textAlign: 'center',
        marginTop: 10
    },
    buttonText: {
        color: "#10BA01",
        fontSize: 22,
        shadowColor: 'black',
        elevation: 20,
        fontWeight: 'bold',
        fontFamily: "CerealMedium",
        justifyContent: 'center',
        alignItems: 'center',



    },
    card: {
        alignItems:'center',
        elevation: 15,
        margin: 10,
        padding:10, 
        maxWidth:200, 
        
    },
    text: {
        fontSize: 20,
        marginTop: 5
    },

    hireBtn: {
        marginLeft: 150,
        width: 75,
        textAlign: 'center',
    },

    text_title: {
        fontFamily: "CerealMedium",
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: '#0A0E4D',
        alignItems: 'center',
        justifyContent: 'center'
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    listText: {
        fontFamily: "CerealMedium",
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingLabel: {
        fontFamily: "CerealBook",
        marginLeft: 4,
    },
    startRouteBtn: {
        backgroundColor: 'blue',
        height: 30,
        width: 80,
        borderRadius: 35,

    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    image: {
        marginTop: 50,
        marginBottom: 10,
        width: '100%',
        height: 190,
    },
    logo: {
        width: '100%',
        height: 90
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
        marginTop: 40
    },
    closeButton: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF3974',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    buttonHireText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: "CerealMedium",
        fontWeight: 'bold',

    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    startTextBtn: {
        backgroundColor: 'white',
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: 'black',
        margin: 35,
        elevation: 10
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    text_header: {
        color: 'black',
        fontFamily: "CerealMedium",
        fontWeight: 'bold',
        fontSize: 18,
        padding: 7
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    text_price: {
        color: 'black',
        fontFamily: "CerealMedium",
        fontWeight: 'bold',
        fontSize: 20,
        padding: 7,
        elevation: 6
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'column'
    },
    listing: {
        marginBottom: 25,
        elevation: 10,
        borderColor: 'black',
        borderWidth: 3,
        marginHorizontal: 20,
        padding: 3,
        marginRight: 6,
        marginLeft: 6
    },
    startBtn: {
        backgroundColor: 'white',
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    roundedBtn: {
        height: 31,
        marginEnd: 50,
        width: 200
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "flex-end",
    },
})
