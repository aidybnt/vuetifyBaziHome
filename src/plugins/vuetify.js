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
  VDivider,
  VChip,
  VListGroup,
  VAvatar,
  VListItemGroup
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
    VDivider,
    VChip,
    VListGroup,
    VAvatar,
    VListItemGroup
  },
  directives: {
    Ripple,
  },
});

const opts = {}

export default new Vuetify(opts);