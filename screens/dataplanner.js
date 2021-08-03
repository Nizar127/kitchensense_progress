import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, FlatList, Modal, Alert, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
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
    Item,
    Label,
    Icon,
    Input,
    Separator,
    Button,
    DatePicker,
    Picker,
    Textarea
} from 'native-base';
// import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import {auth, firestore, storage} from '../config/Firebase';
import { KeyboardAvoidingViewBase } from 'react-native';
import * as Notifications from 'expo-notifications';



export default class DataPlanner extends Component {

    constructor() {
        super();

        this.state = {
            planner: [],
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
            fabActive:false,
            
        };

    }



    componentDidMount() {
        //.where('people_InCharge', '==', auth.currentUser.uid)
        //above is the code originally used to only called to particular people
        this.plannerRef = firestore.collection('Planner');
        this.unsubscribe = this.plannerRef.onSnapshot(this.getCollection);
        console.log('plannerref', this.plannerRef);
    } 



    getCollection = (querySnapshot) => {
        const planner = [];
        querySnapshot.forEach((res) => {
            const {
                userid,
                date,
                name_item,
                Desc_item,
                PersonEmail,
                PersonId,
                PersonName,
                PersonPicture,
                //PersonPhoneNum,
                pic,
                people_InCharge,
            } = res.data();
            planner.push({
                key: res.id,
                res,
                userid,
                date,
                name_item,
                Desc_item,
                PersonEmail,
                PersonId,
                PersonName,
                PersonPicture,
                //PersonPhoneNum,
                pic,
                people_InCharge,
            });
            console.log("pic",planner)
        });
        this.setState({
            planner,
            isLoading: false
        })
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    displayModal(show) {
        this.setState({ isVisible: show })
        
    }

    render() {

        return (
            <Container>

                <Content >
                    <View style={{flex: 1, flexDirection:'row'}}>
                    <Icon ios='ios-menu' android="md-arrow-back" style={{fontSize: 24, marginTop:20, marginStart:10, marginEnd:30, color: 'black'}} onPress={() => this.props.navigation.navigate('Planner')}/>

                    <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>Current Planner</Text>
                    </View>
             
                    <View style={{ flex: 1,  shadowColor: 'white', backgroundColor: '#242836' }}>
                    <FlatList
                            data={this.state.planner}                            
                            
                            renderItem={({ item, index }) => {
                                return (
                                    <Container style={{backgroundColor: '#242836'}}>
                                          
                                            <Card key={index} style={Style.card} >
                                                <CardItem header bordered style={{ flexDirection: 'row' }}>
                                                    <Text>{item.name_item}</Text>
                                                </CardItem>
                                                <CardItem header bordered style={{ flexDirection: 'row' }}>
                                                    <View style={{ flexDirection: 'row', padding: 10}}>
                                                        <Text>Person In Charge: </Text>
                                                        <Text>{item.people_InCharge}</Text>
                                                    </View>
                                                </CardItem>
                                                <CardItem>
                                                    <Image style={{flex:1, height:200}} source={{uri: item.pic}}/>
                                                </CardItem>
                                                <CardItem>
                                                    <Left>
                                                        <Thumbnail source={{uri: item.PersonPicture}}/>
                                                        <Text style={{marginBottom:10, marginTop:10,marginEnd: 20, padding: 20}}>{item.PersonName}</Text>
                                                    </Left>
                                                    <Body></Body>                                                    
                                                </CardItem>
                                                <CardItem>                                                   
                                                    <Text>{item.Desc_item}</Text>  

                                                </CardItem>
                                                <CardItem style={{margin: 7,  flexDirection: 'column'}}>
                                                    <Body>
                                                        <Right>
                                                            <Text style={{paddingEnd:40}}>Date To Buy: </Text>
                                                            <Text>
                                                                {item.date}
                                                            </Text>
                                                        </Right>
                                                    </Body>
                                                </CardItem>
                                            </Card>
                                           
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
        //maxWidth:200, 
        
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
