class HTTPManager {
  static getData(url, completionHandler, errorHandler?) {
    fetch(url)
      .then(response => response.json())
      .then(json => completionHandler(json))
      .catch(e => {
        if (errorHandler) {
          return errorHandler(e);
        }
        console.error(
          'HTTPManager getData() error url => ' + url + ' error ==> ',
          e,
        );
      });
  }
  // static getData(url, otherParam = null, completionHandler, errorHandler) {
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(json => completionHandler(json))
  //     .catch(e =>
  //       errorHandler(e)
  //     );
  // }
  static setData() {}
}

export default HTTPManager;
