var seq = {
  /**
   * Splits the data array each time the value returned by f(data[i]) changes. The function
   * f is called with the value of each element in data. The result is returned as an array
   * of arrays.
   *
   * Inspired by the Clojure <a href="http://clojure.github.io/clojure/clojure.core-api.html#clojure.core/partition-by">partion-by</a> function.
   */
  partitionBy: function(f, data) {
    var pVal = null;    // value that defines the current partition
    var result = [];
    for (var pStart=0, i=0; i < data.length; i++) {
      var v = f(data[i]);
      if (pVal != v) {
        pVal = v;
        if (i > pStart) {
          // save the previous partition
          result.push(data.slice(pStart, i));
          pStart = i;
        }
      }
    }
    // save last partition
    result.push(data.slice(pStart, i));
    return result;
  }
};