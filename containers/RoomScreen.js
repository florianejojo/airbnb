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
import MapView, { Marker } from "react-native-maps";

import { SwiperFlatList } from "react-native-swiper-flatlist";

const RoomScreen = ({ route }) => {
    const navigation = useNavigation();

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [nbLines, setNbLines] = useState(3);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(
                    `https://express-airbnb-api.herokuapp.com/rooms/${route.params.itemId}`
                );
                setData(response.data);
                console.log(response.data.photos);
                setIsLoading(false);
            } catch (error) {
                alert(error.response.data.error);
            }
        };
        fetchdata();
    }, []);

    const displayStars = (nb) => {
        const tab = [];
        while (nb) {
            tab.push(<AntDesign name="star" size={24} color="orange" />);
            nb--;
        }
        while (tab.length < 5) {
            tab.push(<AntDesign name="star" size={24} color="grey" />);
        }
        return tab;
    };

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
                    <View style={styles.flatList}>
                        <SwiperFlatList
                            showPagination
                            data={data.photos}
                            renderItem={({ item }) => (
                                <View style={styles.roomsPictures}>
                                    <Image
                                        source={{
                                            uri: item.url,
                                        }}
                                        style={styles.roomsPictures}
                                    />
                                    <Text style={styles.pricePictures}>
                                        {data.price} €
                                    </Text>
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.bottomView}>
                        <View>
                            <Text>{data.title}</Text>
                            <Text> {displayStars(data.ratingValue)}</Text>
                            <Text>| {data.reviews} reviews</Text>
                        </View>
                        <Image
                            source={{
                                uri: data.user.account.photo.url,
                            }}
                            style={styles.userPicture}
                        />
                    </View>
                    <Text
                        style={styles.description}
                        numberOfLines={nbLines ? 3 : nbLines}
                        onPress={() => {
                            setNbLines(nbLines === 3 ? 0 : 3);
                        }}
                    >
                        {data.description}
                    </Text>

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
