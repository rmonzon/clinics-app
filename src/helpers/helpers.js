class Helpers {

  /**
   * Converts a date string in a human readable format (MMM DD, YYYY)
   * @param date
   * @returns {string}
   */
  static convertDateToString = (date) => {
    const dateObj = new Date(date);
    const convertedDate = dateObj.toDateString().split(" ");
    return convertedDate[1] + " " + convertedDate[2] + ", " + convertedDate[3];
  };

  /**
   * Same as the above function but returns a longer format (MMM DD, YYYY HH:MM)
   * @param date
   * @returns {string}
   */
  static convertDateToLongString = (date) => {
    if (date) {
      const dateObj = new Date(date);
      const convertedDate = dateObj.toString().split(" ");
      return convertedDate[1] + " " + convertedDate[2] + ", " + convertedDate[3] + " at " + convertedDate[4].substring(0, 5);
    }
    return "";
  };

  /**
   * Takes a number of arguments and checks if any of them is null, empty or undefined
   * @returns {boolean}
   */
  static hasEmptyFields() {
    const params = Array.prototype.slice.call(arguments);
    for (let i = 0; i < params.length; ++i) {
      if (!params[i]) {
        return true;
      }
    }
    return false;
  };

  /**
   * Checks if two passwords are equal
   * @param pass1
   * @param pass2
   * @returns {boolean}
   */
  static passwordsMatch = (pass1, pass2) => {
    return pass1 === pass2;
  };

  /**
   * Checks if an email address is valid using regular expressions
   * @param email
   * @returns {boolean}
   */
  static isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
}

export default Helpers;