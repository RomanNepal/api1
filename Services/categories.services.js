const Category = require('../models/category.model');
class CategoryService {
    getCategories = () =>{
        return Category.find();
    }

    getCategoriesById = (id) =>{
        return Category.findById(id)
    }

    addCategory = () =>{
        
    }

    deleteCategory = (id) =>{
        return Category.findByIdAndDelete(id)
    }

    updateCategory = (id, update)=>{
        return Category.findByIdAndUpdate(id, update)
    }
    
}
