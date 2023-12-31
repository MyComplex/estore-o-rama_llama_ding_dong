const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((tags) => {
      res.json(tags);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
      },
    ],
  })
    .then(tag => {
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found! Please try again.' })
      }
      res.json(tag);
    })
    .catch((error) => console.log(error));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((error) => console.log(error));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.findByPk(req.params.id)
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found! Please try again.' })
      }
      Tag.update(req.body, {
        tag_name: req.body.tag_name,
        where: {
          id: req.params.id,
        },
      })
        .then(tag => {
          res.json(tag);
        })
    })
    .catch((error) => console.log(error));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tag => {
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found! Please try again.' })
      }
      res.json(tag);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
