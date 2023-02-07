class Cart { 
    constructor(id){
    this.id = id,
    this.products = []
}

getCart(){
    return this
}

getCartAsStr(){
    return JSON.stringify(this)
}
}

export {Cart}