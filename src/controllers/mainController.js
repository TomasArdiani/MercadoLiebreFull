const fs = require('fs');  // creo que no es necesario ya
const path = require('path');  // esto tampoco.
const {Products} = require('../database/models');
const {Op} = require("sequelize");


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price, discount) => toThousand(Math.round(price * (1 - (discount / 100))));

const controller = {
	root: async (req, res) => {
		try {
			const products = await Products.findAll();
			res.render("index", {products, formatPrice, toThousand});
		} catch(error) {
			res.render("error", {error});
		}
	},
	search: async (req, res) => {
		try {
			const results = await Products.findAll({
				where: {
					name: {
						[Op.substring]: req.query.keywords
					}
				}
			});
			res.render("results", {results, formatPrice, toThousand,search: req.query.keywords});
		} catch(error) {
			res.render("error", {error});
		}
	},
	offers: async (req, res) => {
		try {
			const products = await Products.findAll({
				where: {
					category: "in-sale"
				}
			});
			res.render("offers", {products, formatPrice});
		} catch(error) {
			res.render("error", {error});
		}
	}

};

module.exports = controller;
