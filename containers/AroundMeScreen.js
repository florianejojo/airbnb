import { useState, useEffect } from "react";
import {
    Button,
    Text,
    View,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    Image,
    TouchableHighlight,
    Dimensions,
    ScrollView,
    SafeAreaView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/core";

import colors from "../assets/colors";
const { pink } = colors;

import axios from "axios";

import * as React from "react";
import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const RoomScreen = ({ route }) => {
    const navigation = useNavigation();

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [nbLines, setNbLines] = useState(3);

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { status } =
                    await Location.requestForegroundPermissionsAsync();

                if (status === "granted") {
                    const location = await Location.getCurrentPositionAsync();

                    // console.log(location.coords.latitude);
                    setLatitude(location.coords.latitude);
                    setLongitude(location.coords.longitude);
                    // console.log("coucou", latitude, longitude);
                    const url = `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`;
                } else {
                    const url = `https://express-airbnb-api.herokuapp.com/rooms/around`;
                }

                const response = await axios.get(url);
                setData(response.data);
                console.log("data", response.data);
                setIsLoading(false);
            } catch (error) {
                alert(error.response.data.error);
            }
        };
        fetchdata();
    }, []);

    return isLoading ? (
        <ActivityIndicator
            color={`${pink}`}
            size="large"
            style={styles.activityIndicator}
        />
    ) : (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <MapView
                    style={styles.map}
                    // Pour centrer la carte sur une certaine région :
                    initialRegion={{
                        latitude: 48.856614,
                        longitude: 2.3522219,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    // Pour afficher la position de l'utilisateur :
                    showsUserLocation={true}
                >
                    {data.map((elem) => {
                        return (
                            <Marker
                                coordinate={{
                                    latitude: elem.location[1],
                                    longitude: elem.location[0],
                                }}
                                pinColor={"purple"}
                                title={data.title}
                            />
                        );
                    })}
                </MapView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RoomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    },
    scrollViewContent: {
        alignItems: "center",
    },
    view: {
        // borderBottomWidth: 2,
        // borderColor: "lightgrey",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    activityIndicator: {
        margin: "50%",
    },
    flatList: {
        width: Dimensions.get("window").width - 40,
        height: 200,
    },
    bottomView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    roomsPictures: {
        width: Dimensions.get("window").width - 40,
        height: 200,
        position: "relative",
    },
    pricePictures: {
        position: "absolute",
        backgroundColor: "black",
        color: "white",
        width: 70,
        padding: 10,
        textAlign: "center",
        bottom: 10,
        left: 10,
    },
    userPicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    description: {
        marginTop: 20,
    },
    map: {
        width: Dimensions.get("window").width - 40,
        height: 300,
        marginTop: 50,
    },
    marker: {
        width: 10,
        height: 10,
    },
});
