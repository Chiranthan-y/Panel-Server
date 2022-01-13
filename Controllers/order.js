const Order = require('../models/order');

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id).exec((err, order) => {
    if (err) {
      return res.status(400).json({
        error: 'Order not found in DB',
      });
    }
    next();
  });
};

exports.createOrder = (req, res) => {
  const order = new Order(req.body);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: 'Order not created',
      });
    }
    res.json(order);
  });
};
exports.getAllOrders = (req, res) => {
  Order.find().exec((err, orders) => {
    if (err) {
      return res.status(400).json({
        error: 'No orders found',
      });
    }
    res.json(orders);
  });
};

exports.deleteOrder = (req, res) => {
  let { id } = req.body;
  Order.findByIdAndRemove(id, (err, order) => {
    if (err) {
      return res.status(400).json({
        error: 'Order not found',
      });
    }
    res.json({
      message: 'Order deleted successfully',
    });
  });
};

exports.updateOrder = (req, res) => {
  const order = req.order;
  order.name = req.body.name;
  order.description = req.body.description;
  order.website = req.body.website;
  order.location = req.body.location;
  order.save((err, updatedOrder) => {
    if (err) {
      return res.status(400).json({
        error: 'Order not found',
      });
    }
    res.json(updatedOrder);
  });
};
