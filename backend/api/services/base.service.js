class BaseService {
    constructor() {
        this.returnData = {
          status: '',
          data: {},
          message: '',
          responseCode: 200
        };
    }
    getServiceResponse(status, responseCode, message, data) {
        this.returnData.status = status
        this.returnData.message = message;
        this.returnData.responseCode = responseCode;
        this.returnData.data = data;
        return this.returnData;
      }
}

module.exports = BaseService;