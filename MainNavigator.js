import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useLogin } from "./context/LoginProvider";
import FirstScreen from "./components/FirstScreen";
import MainMenu from "./components/MainMenu";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Posts2 } from "./components/Posts2";
import { UploadImage } from "./components/CategoryServices/UploadImage";
import { ListCategoryService } from "./components/CategoryServices/ListCategoryService";
import { PostDetail } from "./components/CategoryServices/PostDetail";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="FirstScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="MainMenu" component={MainMenu} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Posts" component={Posts2} />
      <Stack.Screen name="UploadImage" component={UploadImage} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen
        name="ListCategoryService"
        component={ListCategoryService}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return <StackNavigator />;
};
export default MainNavigator;
