const memo = {};

const globalData = {
  set: function(k, v) {
    memo[k] = v;
  },
  get: function(k, replace) {
    return memo[k] || replace;
  },
};

export default globalData;
