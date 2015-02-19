var FRED = {
  /**
   * Converts a FRED observation into an the array [ date, value ]. The observation value is converted
   * to a number with Number(value) and the date is parsed with Date.parse().
   */
  observationAsPoint : function(observation) {
    return [ Date.parse(observation.date), Number(observation.value) ];
  },

  parseDate : d3.time.format("%Y-%m-%d").parse,

  /**
   * Parse the date attribute of a FRED observation and coerce the value attribute to numeric.
   *
   * @return a new object with the attributes "date" and "value".
   */
  parseObservation : function(observation) {
    return { date: FRED.parseDate(observation.date), value: +observation.value };
  },

  /**
   * Returns the date attribute of an observation.
   */
  observationDate : function(observation) { return observation.date; },

  /**
   * Returns the value attribute of an observation.
   */
  observationValue : function(observation) { return observation.value; },

  /**
   * Reduces the observations to an array of [recessionStart, recessionEnd] pairs. Expects that
   * each observation has been converted to an object with date mapped to a Date instance and
   * value is a numeric indicator which is != 0 for a recession period.
   */
  recessionPeriods : function(observations) {
    var inRecession = function(p) {
      return (p.length && (p[0].value != 0));
    }
    var periods = seq.partitionBy(FRED.observationValue, observations);
    return periods.filter(inRecession).map(
      function(p) { return d3.extent(p, FRED.observationDate)});
  }
};
