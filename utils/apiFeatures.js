class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: 'i', // case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...location });
    return this;
  }

  filter() {
    const queryCp = { ...this.queryStr };

    // remove fields
    const removedFields = ['location'];
    removedFields.forEach((el) => delete queryCp[el]);

    this.query = this.query.find(queryCp);
    return this;
  }
}

export default ApiFeatures;
