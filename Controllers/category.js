const Category = require('./../Models/category');

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'Category not found',
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const cate = req.body;
  const category = new Category(cate);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'Not able to save category',
      });
    }
    res.json(category);
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
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: 'No categories found',
      });
    }
    res.json(categories);
  });
};
