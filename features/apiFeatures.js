class ApiFeatures {
    constructor(queryObject, queryStr) {
        this.queryObject = queryObject;
        this.queryStr = queryStr;
    }

    fieldsFilter() {
        const excludedProperty = ['sort', 'page', 'limit'];
        let shallowObject = {...this.queryStr};
        excludedProperty.forEach((ele) => {
            delete shallowObject[ele];
        })

        this.queryObject = this.queryObject.find(shallowObject);
        return this;
    }

    paginate() {
        const page = +this.queryStr.page || 1;
        const limit = +this.queryStr.limit || 10;
        const skip = (page - 1) * limit;
        this.queryObject = this.queryObject.skip(skip).limit(limit);
        return this;
    }

    sort() {
        if(this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.queryObject = this.queryObject.sort(sortBy);
        }
        return this;
    }
}

module.exports = ApiFeatures;