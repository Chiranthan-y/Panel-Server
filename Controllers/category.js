exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id)
    .exec()
    .then((category) => {
      if (category) {
        req.category = category;
        next();
      } else {
        return res.status(404).json({
          message: 'Category not found',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.createCategory = (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  category
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Category created',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteCategory = (req, res) => {
  const id = req.body.id;
  Category.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Category deleted',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getAllCategories = (req, res) => {
  Category.find()
    .exec()
    .then((categories) => {
      res.status(200).json({
        categories: categories,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
