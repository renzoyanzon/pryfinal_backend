class ProductDto{
    constructor(data){
        this.name = data.name,
        this.description = data.description,
        this.price = data.price,
        this.thumbnail = data.thumbnail,
        this.stock = data.stock
    }

    build (){
        return this
    }
}

module.exports= ProductDto