const state = {
  sidebar: {
    opened: getLocalSidebarStatus(),
    withoutAnimation: false,
    showSubMenu: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    setLocalSidebarStatus(state.sidebar.opened ? 1 : 0)
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    setLocalSidebarStatus(0)
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_SUB_MENU: (state, show) => {
    state.sidebar.showSubMenu = show && true
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation = false }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device = 'desktop') {
    commit('TOGGLE_DEVICE', device)
  },
  toggleSubMenu({ commit }, { show = true }) {
    commit('TOGGLE_SUB_MENU', show)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

function getLocalSidebarStatus() {
  return localStorage.getItem('sidebarStatus') == '1'
}

function setLocalSidebarStatus(v) {
  localStorage.setItem('sidebarStatus', v)
}
