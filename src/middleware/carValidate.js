const validateCar = (req, res, next) =>{
    if(!req.body || Object.keys(req.body).length === 0){
        return res.status(400).json({
            message: "Request body is required. Please provide brand, model, year, and price"
        });
    }

    const {brand, model, year, price} = req.body;

    if(!brand || !model || !year || !price){
        return res.status(400).json({
            message: "Brand, model, year, and price are required"
        });
    }
    next();
};

module.exports = validateCar;