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

import { useNavigation } from "@react-navigation/core";

import colors from "../assets/colors";
const { pink } = colors;

import axios from "axios";
import * as React from "react";
import MapView, { Marker } from "react-native-maps";

const RoomScreen = ({ route }) => {
    const navigation = useNavigation();

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(
                    `https://express-airbnb-api.herokuapp.com/rooms/${route.params.itemId}`
                );
                setData(response.data);
                // console.log(response.data.location[1]);
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
                <View style={styles.view}>
                    <View style={styles.homePictures}>
                        <Image
                            source={{
                                uri: data.photos[0].url,
                            }}
                            style={styles.roomsPictures}
                        />

                        <Text style={styles.pricePictures}>{data.price} €</Text>
                    </View>
                    <View style={styles.bottomView}>
                        <View>
                            <Text>{data.title}</Text>

                            <Text>
                                Etoiles: {data.ratingValue} / 5 | {data.reviews}{" "}
                                reviews
                            </Text>
                        </View>
                        <Image
                            source={{
                                uri: data.user.account.photo.url,
                            }}
                            style={styles.userPicture}
                        />
                    </View>
                    <Text style={styles.description}>{data.description} </Text>

                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: data.location[1],
                            longitude: data.location[0],
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: data.location[1],
                                longitude: data.location[0],
                            }}
                            pinColor={"purple"}
                            title={data.title}
                        />
                    </MapView>
                </View>
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
    homePictures: {
        // paddingVertical: 10,
        // paddingHorizontal: 20,
    },
    bottomView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    roomsPictures: {
        width: "100%",
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
