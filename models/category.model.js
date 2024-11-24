const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('category', categorySchema);

exports.addNewCategory = async(category) => {
    const newCategory = new Category(category);
    await newCategory.save();
}

exports.getQueryObject = () => {
    return Category.find();
}

exports.getCategoryById = async(id) => {
    const category = await Category.findById(id);
    return category;
}

exports.updateCategory = async(id, updates) => {
    const category = await Category.updateOne({_id: id}, {$set: updates});
    return category;
}

exports.deleteCategory = async(id) => {
    await Category.deleteOne({_id: id});
}

exports.Category = mongoose.model('Category', categorySchema);