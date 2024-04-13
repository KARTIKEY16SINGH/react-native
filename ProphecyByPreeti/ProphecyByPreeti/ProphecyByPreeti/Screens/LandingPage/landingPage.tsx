import { NavigationProp } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { FirebaseAuth } from "../../Configs/FirebaseConfig";
import { NavigationConstant } from "../../Global/NavigationConstants";


interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const LandingPage = (routerProps: RouterProps) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button onPress={() => routerProps.navigation.navigate(NavigationConstant.detailPage.id)} title="Open Details" />
            <Button onPress={() => FirebaseAuth.signOut()} title="Logout" />
        </View>
    );
}

export default LandingPage;