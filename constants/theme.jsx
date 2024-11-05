import { Dimensions } from "react-native";

const COLORS = {
  primarybackground: "#3a6be4",
  secondarybackground: "#edf1fd",
  tertiary: "#6b83b2",
  neutral: "#c9cdd4",

  black: "#10151e",
  gray2: "#C1C0C8",
  borderblack: "#e5e7eb",
  innerText: "#737391",
  buttext: "#a8b6d2",
  othertext: "#A6adba",
  white: "#ffffff",
  lightWhite: "#FAFAFC",
  transparent: "#00000000",

  primaryText: "#0e2663",
  secondaryText: "#edf1fd",
  tertiaryText: "#41547c",

  inbackcolor: "#fb5b5a",
  borderBlue: "#98a2b3",
};

const FONT = {
  regular: "200",
  medium: "300",
  semiBold: "500",
  bold: "600",
};

const SIZES = {
  xxxSmall: 10,
  xxSmall: 12,
  xSmall: 14,
  small: 16,
  medium: 18,
  large: 20,
  xLarge: 22,
  xsLarge: 28,
  xxLarge: 32,
  xxxLarge: 36,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const STYLES = {
  container: {
    flex: 1,
    justifyContent: "top", //column
    alignItems: "center", //row
    paddingTop: 12,
    paddingHorizontal: 30,
    backgroundColor: COLORS.white, // Corrected spelling
  },

  container2: {
    flex: 1,
    justifyContent: "top", //column
    alignItems: "center", //row
    paddingTop: 65,
    margin: 0,
    backgroundColor: COLORS.white, // Corrected spelling
  },

  container3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  container4: {
    flexDirection: "row",
    alignItems: "center",
  },
};

const IMG = {
  headimage: {
    width: 158,
    height: 25,
    marginTop: 50,
    borderRadius: 10,
  },

  midimage: {
    width: 340,
    height: 310,
    marginTop: 64,
    padding: 10,
  },

  backbut: {
   
    marginTop: 20,

  },
};

const BUTTON = {
  largebutton: {
    width: 320,
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: 36,
    borderRadius: 8,
    backgroundColor: COLORS.primarybackground,
  },

  largebutton2: {
    width: 320,
    height: 50,
    paddingVertical: 10,
    marginTop: 16,
    borderRadius: 8,
    // backgroundColor: COLORS.secondarybackground,
  },

  midbutton: {
    width: 340,
    height: 20,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },

  activitybutton: {
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }], // Center the loader
  },
};

const BUTTONText = {
  text1: {
    fontWeight: FONT.semiBold,
    fontSize: SIZES.large,
    textAlign: "center",
    color: COLORS.white,
  },

  text2: {
    fontWeight: FONT.semiBold,
    fontSize: SIZES.medium,
    textAlign: "center",
    color: COLORS.transparent,
  },
};

const BodyText = {
  Header: {
    fontWeight: FONT.bold,
    fontSize: SIZES.xLarge,
    textAlign: "center",
    margin: 20,
    color: COLORS.black,
  },

  Header2: {
    fontWeight: FONT.semiBold,
    fontSize: SIZES.large,
    textAlign: "center",
    color: COLORS.primaryText,
  },

  HeaderA: {
    fontWeight: FONT.bold,
    fontSize: SIZES.xsLarge,
    textAlign: "center",
    width: 280,
    flexWrap: "wrap",
    marginVertical: 20,
    color: COLORS.black,
  },

  centersmalltext: {
    fontWeight: FONT.semiBold,
    fontSize: SIZES.small,
    color: COLORS.neutral,
  },

  centersmalltext2: {
    fontWeight: FONT.bold,
    fontSize: SIZES.xSmall,
    textAlign: "center",
    color: COLORS.tertiaryText,
  },

  centersmalltext3: {
    fontWeight: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.primarybackground,
  },

  leftsmalltext: {
    fontWeight: FONT.semiBold,
    fontSize: SIZES.small,
    textAlign: "left",
    marginTop: 0,
    color: COLORS.neutral,
  },
};

const loginstyles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.inbackcolor,
    alignItems: "center",
    justifyContent: "center",
  },

  inputArea: {
    backgroundColor: COLORS.white,
    width: 320,
    paddingLeft: 10,
    height: 56,
    marginTop: 16,
    color: COLORS.innerText,
    borderColor: COLORS.borderblack,
    borderWidth: 2,
    fontSize: SIZES.xxSmall,
    borderRadius: 8,
    // alignItems: "center",
    //justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  signupText: {
    color: "white",
    marginTop: 10,
  },
};

const { width, height } = Dimensions.get("window");

const RESPONSIVENESS = {
  container: {
    flex: 1,
    paddingHorizontal: width * 0.1, // 10% padding horizontally
    paddingVertical: height * 0.05, // 5% padding vertically
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  title: {
    marginTop: height * 0.05, // Responsive top margin
    fontSize: SIZES.xxLarge,
    fontWeight: FONT.bold,
    color: COLORS.primarybackground,
    textAlign: "center",
  },
  image: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.4, // 40% of screen height
    marginVertical: height * 0.02,
  },
  subtitle: {
    fontSize: SIZES.large,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  highlight: {
    color: COLORS.primarybackground,
  },
  illustrationCredit: {
    marginTop: height * 0.02,
    fontSize: SIZES.xxxSmall,
    fontWeight: FONT.bold,
    textAlign: "center",
  },
};

export {
  COLORS,
  FONT,
  SIZES,
  SHADOWS,
  STYLES,
  BodyText,
  loginstyles,
  IMG,
  BUTTON,
  BUTTONText,
  RESPONSIVENESS,
  width,
  height,
};
