class BizNumberAlreadyExist extends Error {
    constructor(num) {
        super(`business number: ${num} already exist`);
        this.status = 409
    }
}

module.exports = BizNumberAlreadyExist;