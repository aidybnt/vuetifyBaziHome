import Vue from 'vue';
import Vuetify, {
  VDialog,
  VOverlay,
  VProgressLinear,
  VSheet,
  VBtn,
  VIcon,
  VProgressCircular,
  VList,
  VListItem,
} from 'vuetify/lib';
import {Ripple} from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VDialog,
    VOverlay,
    VProgressLinear,
    VSheet,
    VBtn,
    VIcon,
    VProgressCircular,
    VList,
    VListItem,
  },
  directives: {
    Ripple,
  },
});

const opts = {}

export default new Vuetify(opts);