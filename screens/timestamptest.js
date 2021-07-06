import React, { Component } from 'react';
import { StyleSheet, Share, BackHandler, LayoutAnimation, Image, Animated, Alert, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Header, TabHeading, View, Card, Tab, Form, Item, Input, CardItem, Label, Thumbnail, Text, Left, Body, Button, Right, Fab, Separator, Content, Footer, FooterTab, Textarea } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import {auth, firestore, storage} from '../config/Firebase';
//import { SharedElement } from "react-navigation-shared-element";


//what we going to do in this home.js is
//first: get the collection from job_list n display within card with button available
//then: once user click book now, we collect the user information and add into hiring collections
//then we send notification to job_creator regarding the application

export default class Timestamptest extends Component {

    constructor() {
        super();

    }

    timestamp() {
                const firestoke = firestore
                const ref = firestoke.collection('users').doc(auth.currentUser.uid)
                ref.set({
                    createdAt: firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    console.log('timestamp:', ref)
                    //console.log('Done')
                })
                .catch(error => {
                    console.error(error)
                })
    }

    render() {

        return (

                    <View style={{ flex: 1, padding: 10, marginBottom: 10, backgroundColor: '#242836' }}>

                        <Button primary onPress={this.timestamp()}>
                            <Test>Test Timestamp</Test>
                        </Button>
                    </View>

                )


    }
}

const Style = StyleSheet.create({

    card: {
        elevation: 10,
        //borderColour: 'black',
        borderWidth: 1,
        marginHorizontal: 20,

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
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 235,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    thumbnailOverlay: {
        ...StyleSheet.absoluteFillObject,
        padding: 16,

    },
    startRouteBtn: {
        backgroundColor: 'blue',
        height: 30,
        width: 80,
        borderRadius: 35,

    },
    inputText: {

        backgroundColor: 'white',
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        shadowColor: 'black',
        margin: 20,
        elevation: 10,
        margin: 10

    },
    searchBar: {
        justifyContent: 'center',
        padding: 5,
        opacity: 5.0,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        margin: 13,
        height: 47,

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
    buttonText: {
        color: '#FFFFFF',
        fontSize: 22,
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
    text_header: {
        color: 'black',
        fontFamily: "CerealMedium",
        fontWeight: 'bold',
        fontSize: 18,
        padding: 9
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
        marginTop: 5
    },
    // image: {
    //     height: 150,
    //     width: width - 32,
    //     marginVertical: 8,
    // },
    text_title: {
        fontFamily: "CerealMedium",
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: 'green',
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
    jobDesc: {
        padding: 2,
        margin: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'grey',
        fontFamily: "CerealMedium",
        color: 'black',
        fontSize: 15,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingLabel: {
        fontFamily: "CerealBook",
        marginLeft: 4,
    },
    jobCreator: {
        borderColor: 'black',
        // borderColor: "black",
        borderRadius: 5,
        borderWidth: 1,
        padding: 6,
        marginTop: 10,
        marginBottom: 20,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: "CerealMedium",
        backgroundColor: '#00FB83',
        color: 'black',
        opacity: 1.0
    },

    superhostLabel: {
        fontSize: 10,
        fontFamily: "CerealMedium",
    },

})

