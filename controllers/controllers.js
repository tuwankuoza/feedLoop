const { User, Product } = require('../models/')
const { sign } = require('../helpers/jwt')
const { decode } = require("../helpers/bcrypt");

class Controller {
  static async login(req, res) {
    const { email, password } = req.body
    try {
      const user = await User.findOne({where: {email}})
      if(!user) {
        res.status(404).json({message: 'Invalid email/password'})
      } else {
        let matchPassword = decode(password, user.password)
        if(!matchPassword) {
          res.status(404).json({message: 'Invalid email/password'})
        } else {
          const access_token = sign({
            username: user.username,
            email
          })
          res.status(200).json({access_token})
        }
      }
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  static async register(req, res) {
    const { username, email, password } = req.body
    try {
      const newUser = await User.create({username, email, password})
      const access_token = sign({
        username: newUser.username,
        email: newUser.email,
      })
      res.status(201).json({access_token})
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  static async addProduct(req, res) {
    const { name, price, description } = req.body
    try {
      const newProduct = await Product.create({name, price, description})
      res.status(201).json(newProduct)
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  static async listProduct(req, res) {
    try {
      const listProduct = await Product.findAll()
      res.status(200).json(listProduct)
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  static async listProductById(req, res) {
    try {
      const { id } = req.params
      const singleProduct = await Product.findByPk(id)
      if(!singleProduct) {
        res.status(404).json({message: 'Product not found'})
      } else {
        res.status(200).json(singleProduct)
      }
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params
      const singleProduct = await Product.findByPk(id)
      if(!singleProduct) {
        res.status(404).json({message: 'Product not found'})
      } else {
        const deletedProduct = await Product.destroy({where: {id}})
        res.status(201).json({message: 'Product deleted successfully'})
      }
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = Controller