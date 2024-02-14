import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";

export default function App() {
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [formatStatus, setFormatStatus] = useState(null);
  const [showMsg, setShowMsg] = useState("");

  const checkPhone = (phoneNum) => {
    const rules = /^09[0-9]{8}$/;
    if (!rules.test(phoneNum)) {
      setShowMsg("The phone number must start with 09 and have 10 codes.");
      return;
    }
    return true;
  };

  const checkPassword = (password) => {
    const containsUppercase = /^(?=.*[A-Z]).*$/;
    if (!containsUppercase.test(password)) {
      console.log("Password must have at least one uppercase letter.");
      setShowMsg("Password must have at least one uppercase letter.");
      return;
    }

    const containsLowercase = /^(?=.*[a-z]).*$/;
    if (!containsLowercase.test(password)) {
      console.log("Password must have at least one lowercase letter.");
      setShowMsg("Password must have at least one lowercase letter.");
      return;
    }

    const passwordLength = /^.{8,}$/;
    if (!passwordLength.test(password)) {
      console.log("Password's length must be more than 8 characters long.");
      setShowMsg("Password's length must be more than 8 characters long.");
      return;
    }
    return true;
  };

  const handleChangePhone = (text) => {
    console.log(text);
    setPhoneNum(text);
  };

  const handleChangePassword = (text) => {
    console.log(text);
    setPassword(text);
  };

  const handleVerify = (phoneNum, password) => {
    if (phoneNum === "" || password === "") {
      alert("The Phone Number or Password can't be null.");
      return;
    } else if (checkPhone(phoneNum) && checkPassword(password)) {
      setFormatStatus("success");
      setShowMsg("The phone number and password is entered correctly.");
      setPhoneNum("");
      setPassword("");
    } else if (!checkPhone(phoneNum)) {
      setFormatStatus("error");
      setPhoneNum("");
      setPassword("");
    }
  };

  return (
    <View className="flex-1 flex-col items-center bg-white">
      <View className="h-[35%] w-full flex items-center justify-center bg-white mt-4">
        <Text className="text-center text-xl font-black text-black">
          Verify your phone number
        </Text>
        <Text className="text-center text-xl font-black text-black">
          and password !!
        </Text>
      </View>
      <View className="h-[65%] w-full bg-black rounded-3xl relative flex flex-col items-center opacity-80">
        <TextInput
          className="w-[70%] py-2 px-5 text-xl  bg-white text-black border-4 border-white  rounded-full mt-16"
          placeholder={"Enter your phone number"}
          focusable={true}
          onChangeText={handleChangePhone}
          value={phoneNum}
        />
        <TextInput />
        <TextInput
          className="w-[70%] py-2 px-5 text-xl  bg-white text-black border-4 border-white  rounded-full mt-6"
          placeholder={"Enter your password"}
          focusable={true}
          secureTextEntry={true}
          onChangeText={handleChangePassword}
          value={password}
        />
        <TextInput />
        <View className="bg-yellow-500 rounded-3xl px-4 mt-3">
          {/* <Button title="Submit" color={"red"} /> */}

          <TouchableOpacity
            className="text-red-500"
            onPress={() => {
              handleVerify(phoneNum, password);
            }}
          >
            <Text className="text-2xl font-extrabold text-red-600 py-2 px-3">
              Verify
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-10 flex items-center justify-center">
          {formatStatus === null ? null : formatStatus === "success" ? (
            <Image className="h-6 w-6" source={require("./imeges/勾.png")} />
          ) : (
            <Image className="h-6 w-6" source={require("./imeges/叉.png")} />
          )}
          <Text className="text-white text-sm font-black mt-5"> {showMsg}</Text>
        </View>
      </View>
    </View>
  );
}
