import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                primary: colors.green,
                appbar: colors.green.lighten4,
            },
            dark: {
                appbar: colors.green.lighten1,
                primary: colors.green,
            },
        },
    }
});