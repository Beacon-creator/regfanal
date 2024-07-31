import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "YOUR_WEB_CLIENT_ID", // Client ID from Google Developer Console
  offlineAccess: true, // If you want to access Google API on behalf of the user FROM YOUR SERVER
});
