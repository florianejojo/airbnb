import React from "react";
import { useState } from "react";

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

import axios from "axios";
import { useNavigation } from "@react-navigation/core";

import colors from "../assets/colors";
const { saumon, grey, lightPink, pink } = colors;

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken }) {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    // const [hide, setHide] = useState(false);

    const handleSubmit = async () => {
        if (!email || !userName || !description || !password) {
            console.log(email, userName, description, password, password2);
            alert("Please fill in all fields");
        } else if (password !== password2) {
            alert("Passwords don't match");
        } else {
            try {
                const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/sign_up",
                    {
                        email,
                        username: userName,
                        description,
                        password,
                    }
                );
                console.log("rep", response.data);
                const userToken = response.data.token;
                setToken(userToken);
                alert(userToken);
            } catch (error) {
                console.log(error.response.data);
                alert(error.response.data.error);
            }
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
                    <Text style={styles.pageName}>Sign up</Text>
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
                        placeholder="username"
                        style={styles.input}
                        onChangeText={(input) => {
                            setUserName(input);
                        }}
                    />
                    <TextInput
                        placeholder="Describe yourself in a few words"
                        style={styles.input}
                        onChangeText={(input) => {
                            setDescription(input);
                            // console.log(description);
                        }}
                        multiline={true}
                        numberOfLines={4}
                    />
                    <TextInput
                        placeholder="password"
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(input) => {
                            setPassword(input);
                        }}
                    />
                    <TextInput
                        placeholder="confirm password"
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(input) => {
                            setPassword2(input);
                        }}
                    />
                </View>

                <View>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.button}
                        // disabled={hide ? true : false}
                    >
                        <Text>Sign up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("SignIn");
                        }}
                        style={styles.button2}
                    >
                        <Text> Already have an account ? Sign in !</Text>
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
