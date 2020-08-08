const ServicePortal = require('../../models/service_portal/service_portal_model')

class ServicePortalRepo {
    /**
     * Initializes the Repository model with service portal collection schema
     * @param {MongooseSchema} model A mongoose schema model for the service portal collection
     */
    constructor(model) {
        this.model = model;
    }
    /**
     * Creates a new service portal test entry
     * @param {String} test A string, place whatever value - this is a POST test function
     */
    create(test) {
        const newServicePortal = { serviceTest: test }

        const servicePortal = new this.model(newServicePortal);

        return servicePortal.save();
    }

    /**
     * Returns all the servicePortal entries in the collection
     */
    getAll() {
        return this.model.find();
    }
}

module.exports = new ServicePortalRepo(ServicePortal);