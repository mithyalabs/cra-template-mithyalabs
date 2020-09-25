import { createMuiTheme } from '@material-ui/core/styles';
import { THEME_PALETTE } from './themeConstants';


const { others: otherColors, ...palette } = THEME_PALETTE;

export default createMuiTheme({
    palette,
    typography: {
        h1: {
            fontSize: 96
        },
        h2: {
            fontSize: 60
        },
        h3: {
            fontSize: 48
        },
        h4: {
            fontSize: 34
        },
        h5: {
            fontSize: 24
        },
        h6: {
            fontSize: 20
        },
        subtitle1: {
            fontSize: 16
        },
        subtitle2: {
            fontSize: 14
        },
        body1: {
            fontSize: 16
        },
        body2: {
            fontSize: 14
        },
        caption: {
            fontSize: 12
        },
        overline: {
            fontSize: 10
        },

    },
    overrides: {

    }
})