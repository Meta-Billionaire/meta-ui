import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    gray: {
      700: "#080808",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.50", "black")(props),
        fontFamily: 'Montserrat, sans-serif'
      },
      html: {
        fontFamily: 'Montserrat, sans-serif'
      }
    }),
  },
};
