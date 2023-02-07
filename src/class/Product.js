class Product { 
        constructor(name,description,price,code,status,stock,category,urlimg){
        this.name=name,
        this.description=description,
        this.price=price,
        this.code=code,
        this.status=status
        this.stock=stock,
        this.category=category,
        this.urlimg=urlimg
    }

    getProduct(){
        return this
    }

    getProductsAsStr(){
        return JSON.stringify(this)
    }
}

export {Product}