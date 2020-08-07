const fs = require('fs');
const path = require('path');

const {Products} = require("../database/models");
const {validationResult} = require("express-validator");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price, discount) => toThousand(Math.round(price * (1 - (discount / 100))));


//Buscar producto por id
function searchById(id) {
	let archivoJson = readJSONfile();
	let producto = null;
	archivoJson.forEach((prod, i) => {
		if (prod["id"] == id) {
			producto = prod;
		}
	});
	return producto; // si no lo encuentra devuelve null

}

const controller = {
	// Root - Show all products
	root:  async (req, res) => {
		try {
			const products = await Products.findAll();
			res.render("products", {products, formatPrice, toThousand});
		} catch(error) {
			res.render("error", {error});
		}
	},
	// Detail - Detail from one product
	detail:async (req, res) => {
		try {
			const product = await Products.findOne({
				where: {
					id: parseInt(req.params.id), // para pasar de string a entero
					category: req.params.category
				}
			});
			res.render("detail", {product, formatPrice, toThousand});
		} catch(error) {
			res.render("error", {error});
		}
    },

	// Create - Form to create
	create: async (req, res) => {
		try {
			res.render("product-create-form");
		} catch(error) {
			res.render("error", {error});
		}
	},

	// Create -  Method to store
	store: async (req, res) => {
		try {
			let errors = validationResult(req);
			if (typeof req.file === 'undefined') {
                let newError = {
                   value: '',
                   msg: 'Debe cargar una imagen de producto',
                   param: 'image',
                   location: 'files'
                }
                errors.errors.push(newError);
            }
            const existsCode = await Products.findOne({
                where: {
                    code: parseInt(req.body.code)
                }
            });
            if (existsCode != null) {
                let newError = {
                    value: '',
                    msg: 'Ya existe un producto con el código ingresado',
                    param: 'code',
                    location: 'body'
                };
                errors.errors.push(newError);
            }
			if (errors.isEmpty()) {
				await Products.create({
					name: req.body.name,
					code: parseInt(req.body.code),
					price: parseFloat(req.body.price),
					discount: parseInt(req.body.discount),
					category: req.body.category,
					description: req.body.description,
					image: req.file.filename
				});
				res.redirect("/products");
			} else {
				res.render("product-create-form", {errors: errors.errors});
			}
		} catch(error) {
			res.render("error", {error});
		}
	},

	// Update - Form to edit
	edit: async (req, res) => {
		try {
			const productToEdit = await Products.findByPk(req.params.id);
			res.render("product-edit-form", {productToEdit});
		} catch(error) {
			res.render("error", {error});
		}
	},
	// Update - Method to update
	update: async (req, res) => {
		try {
			let errors = validationResult(req);
			if (errors.isEmpty()) {
				await Products.update({
					name: req.body.name,
					price: parseFloat(req.body.price),	// a un numero
					discount: parseInt(req.body.discount), // para pasar de string a entero
					category: req.body.category,
					description: req.body.description
				}, {
					where: {
						id: req.params.id
					}
				});
				res.redirect("/products");
			} else {
				const productToEdit = await Products.findByPk(req.params.id);
				res.render("product-edit-form", {errors: errors.errors, productToEdit});
			}
		} catch(error) {
			res.render("error", {error});
		}
	},
	// Delete - Delete one product from DB
	destroy : async (req, res) => {
		try {
			const product = await Products.findByPk(req.params.id);
			await Products.destroy({
				where: {
					id: req.params.id
				}
			});
			res.redirect("/products");
		} catch(error) {
			res.render("error", {error});
		}
	}
};

module.exports = controller;