const memo = {};

const oneTimeData = {
  set: function(k, v) {
    memo[k] = v;
  },
  get: function(k, replace) {
    const v = memo[k];
    delete memo[k];
    return v || replace;
  },
};

export default oneTimeData;
