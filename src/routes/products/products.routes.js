const router= require('express').Router();

const ProductServices = require('../../services/products/products.services');
const productServices = new ProductServices();


router.post('/products', async (_req,res)=>{
    const data = await productServices.createProducts();

    res.status(200).json({
        success: true,
        data: data
    })
});

router.get('/products', async (_req,res)=>{
    const data = await productServices.getAllProducts();
    console.log(data)
    res.status(200).json(data)
});

router.get('/',async (_req,res)=>{
    const products = await productServices.getAllProducts();
    const data = products.data
    res.render('pages/products',{data})
})



router.get('/product:uuid', async (req,res)=>{
    const {uuid} = req.params

    const data = await productServices.getProduct(uuid);

    res.status(200).json({
        success: true,
        data: data
    })
});


module.exports = router