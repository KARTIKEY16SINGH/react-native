class HTTPManager {
  static getData(url, otherParam = null, completionHandler) {
    fetch(url)
      .then(response => response.json())
      .then(json => completionHandler(json))
      .catch(e =>
        console.error(
          'HTTPManager getData() error url => ' + url + ' error ==> ',
          e,
        ),
      );
  }
  static setData() {}
}

export default HTTPManager;
