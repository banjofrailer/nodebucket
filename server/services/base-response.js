/**
 * Title: base-response.js
 * Author: Professor Krasso
 * Date: 30 September 2020
 * Modified By: Sarah Kovar
 * Description: Base Response
 */


class BaseResponse {
  constructor(httpCode, message, data) {
      this.httpCode = httpCode;
      this.message = message;
      this.data = data;
  }

  toObject() {
    return {
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}


module.exports = BaseResponse;
