class Product {
    constructor(name,description,price,code,urlimg,stock){
        this.name=name,
        this.description=description,
        this.price=price,
        this.code=code,
        this.urlimg=urlimg,
        this.stock=stock
    }

    getProduct(){
        return this
    }

    getProductsAsStr(){
        return JSON.stringify(this)
    }
}

export {Product}