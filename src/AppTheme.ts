import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const AppTheme = createTheme({
  palette: {
    primary: {
      main: "#0099ff",
    },
  },
  typography:{
    h6:{
      fontSize: '1.2rem',
      fontWeight: 'bold',
    }
  }
});
export default responsiveFontSizes(AppTheme)
