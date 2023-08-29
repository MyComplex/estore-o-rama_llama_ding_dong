const router = require('express').Router();
const { NULL } = require('mysql2/lib/constants/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((categories) => {
      res.json(categories);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
      },
    ],
  })
    .then(category => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found! Please try again.' })
      }
      res.json(category);
    })
    .catch((error) => console.log(error));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((error) => console.log(error));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.findByPk(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found! Please try again.' })
      }
      Category.update(req.body, {
        category_name: req.body.category_name,
        where: {
          id: req.params.id,
        },
      })
        .then(category => {
          res.json(category);
        })
    })
    .catch((error) => console.log(error));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(category => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found! Please try again.' })
      }
      res.json(category);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
