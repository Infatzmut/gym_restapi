class BaseController {
    constructor(){
        this.errorStatus = 'ERROR';
        this.responseData = {
            status : '',
            data : {},
            message : ''
        }
    }

    getSucessResponse(status, message, data) {
        this.responseData.status = status;
        this.responseData.message = message;
        this.responseData.data = data;
        this.responseData.error = null;
        return this.responseData;
    }  

    getErrorResponse(message, data = {}) {
        this.responseData.status = this.errorStatus;
        this.responseData.message = message;
        this.responseData.data = {}
        this.responseData.error = data;
        return this.responseData;
    }
}

module.exports = BaseController;