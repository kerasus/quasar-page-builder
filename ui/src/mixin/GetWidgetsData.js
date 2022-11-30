import axios from 'axios'

export default class GetWidgetsData {
  static _requests = []

  static hasThisRequest (url) {
    return !!this.getRequest(url)
  }

  static addToRequests (url) {
    const axiosInstance = this.$axois ? this.$axois : axios
    this._requests.push({
      url,
      promise: new Promise(function(myResolve, myReject) {
        axiosInstance.get(url)
          .then(response => {
            myResolve(response)
          })
          .catch((error) => {
            myReject(error)
          })

      })
    })
  }

  static getRequest (url) {
    return this._requests.find(request => request.url === url)
  }

  static getData (url) {
    if (!this.hasThisRequest(url)) {
      this.addToRequests(url)
    }

    return this.getRequest(url).promise
  }
}
