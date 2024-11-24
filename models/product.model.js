const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
});

const Product = mongoose.model('product', productSchema);

exports.addNewProduct = async(product) => {
    const newProduct = new Product(product);
    await newProduct.save();
}

exports.getQueryObject = () => {
    return Product.find().populate('category');
}

exports.getProductById = async(id) => {
    const product = await Product.findById(id).populate('category');
    return product;
}

exports.updateProduct = async(id, updates) => {
    const product = await Product.updateOne({_id: id}, {$set: updates});
    return product;
}

exports.deleteProduct = async(id) => {
    await Product.deleteOne({_id: id});
}