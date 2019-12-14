import Vue from 'vue';

export default function registerComponents(list) {
  for (const name in list) {
    if (list.hasOwnProperty(name)) {
      const component = list[name];
      Vue.component(name, component);
    }
  }
}
