import React from "react";
import { useState } from "react";

import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
    Button,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
} from "react-native";

import { StyleSheet } from "react-native";

import colors from "../assets/colors";
const { saumon, grey, lightPink, pink } = colors;

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hide, setHide] = useState(false);

    const handleSubmit = async () => {
        if (!password || !email) {
            alert("Password or email missing");
        } else {
            try {
                setHide(true);
                const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/log_in",
                    {
                        email,
                        password,
                    }
                );
                alert("ok");
                // setHide(false);
            } catch (error) {
                alert("Wrong email or Password");
            }
            const userToken = response.data.token;
            setToken(userToken);
        }
    };

    return (
        <KeyboardAwareScrollView>
            <View style={styles.background}>
                <View>
                    <Image
                        source={require("../assets/logo.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.pageName}>Sign in</Text>
                </View>

                <View>
                    <TextInput
                        placeholder="email"
                        style={styles.input}
                        onChangeText={(input) => {
                            setEmail(input);
                        }}
                    />

                    <TextInput
                        placeholder="password"
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(input) => {
                            setPassword(input);
                        }}
                    />
                </View>

                <View>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.button}
                        disabled={hide ? true : false}
                    >
                        <Text>Sign in </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("SignUp");
                        }}
                        style={styles.button2}
                    >
                        <Text> No account ? Sign up !</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "white",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-around",
    },

    logo: {
        height: 100,
        width: 90,
    },
    pageName: {
        color: "grey",
        fontSize: 40,
        marginTop: 30,
    },
    input: {
        width: 300,
        padding: 10,
        marginBottom: 20,
        borderColor: lightPink,
        borderBottomWidth: 2,
        fontSize: 30,
    },
    button: {
        borderColor: pink,
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    button2: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
});
