import React from "react";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";
import Stars from "../Components/Stars";
import {
    Button,
    Text,
    View,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    Image,
    TouchableHighlight,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

import colors from "../assets/colors";
const { pink } = colors;

export default function HomeScreen() {
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    // je veux afficher le meme nombre d'icones/composants que item.rating Value

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(
                    "https://express-airbnb-api.herokuapp.com/rooms"
                );
                setData(response.data);
                // console.log(response.data);
                setIsLoading(false);
            } catch (error) {
                alert(error.response.data.error);
            }
        };
        fetchdata();
    }, []);

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator
                    color={`${pink}`}
                    size="large"
                    style={styles.activityIndicator}
                />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.view}>
                                <View style={styles.homePictures}>
                                    <TouchableHighlight
                                        onPress={() => {
                                            console.log(item._id);
                                            navigation.navigate("Rooms", {
                                                itemId: item._id,
                                            });
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: item.photos[0].url,
                                            }}
                                            style={styles.roomsPictures}
                                        />
                                    </TouchableHighlight>

                                    <Text style={styles.pricePictures}>
                                        {item.price} €
                                    </Text>
                                </View>
                                <View style={styles.bottomView}>
                                    <View>
                                        <Text>{item.title}</Text>
                                        {/* <Stars nbStars={item.ratingValue} /> */}
                                        <Text>
                                            Etoiles: {item.ratingValue} / 5 |{" "}
                                            {item.reviews} reviews
                                        </Text>
                                    </View>
                                    <Image
                                        source={{
                                            uri: item.user.account.photo.url,
                                        }}
                                        style={styles.userPicture}
                                    />
                                </View>
                            </View>
                        );
                    }}
                />
                // <Button
                //     title="Go to Profile"
                //     onPress={() => {
                //         navigation.navigate("Profile", { userId: 123 });
                //     }}
                // />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    activityIndicator: {
        margin: "50%",
    },
    homePictures: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    bottomView: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderColor: "lightgrey",
        paddingVertical: 10,
        paddingHorizontal: 20,
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
        bottom: 30,
        left: 20,
    },
    userPicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});
