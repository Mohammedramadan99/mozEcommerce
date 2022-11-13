class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Remove fields from query
    const removeFields = ["keyword", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advance filtering with gt, gte etc
    let filterQuery = {};
    const fieldsLength = Object.keys(queryCopy).length;

    console.log(queryCopy); // ! console's result  => { 'ratings[gte]': '5', 'price[gte]': '22' }

    for (let i = 0; i < fieldsLength; i++) {
      let queryStr = JSON.stringify(Object.keys(queryCopy)[i]);
      const filterField = queryStr.substring(1, queryStr.indexOf("["));

      if (filterField.length > 1) {
        const fieldValue = Object.values(queryCopy)[0];

        const filterOperator = queryStr.substring(
          queryStr.indexOf("[") + 1,
          queryStr.indexOf("]")
        );

        filterQuery = {
          ...filterQuery,
          [filterField]: { [`$${filterOperator}`]: fieldValue },
        };
      } else {
        filterQuery = {
          ...filterQuery,
          [Object.keys(queryCopy)[i]]: Object.values(queryCopy)[i],
        };
      }
    }
    console.log(filterQuery); // ! console's result => { ratings: { '$gte': '5' }, price: { '$gte': '5' } }
    this.query = this.query.find(filterQuery);
    return this;
  }

  pagination(resPerPage) {
    const page = this.queryStr.page * 1 || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(resPerPage / limit);

    if (endIndex < resPerPage) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }
    this.query = this.query.skip(skip).limit(limit);
    this.paginationResult = pagination;
    console.log(this.paginationResult);
    return this;
  }
}

export default APIFeatures;