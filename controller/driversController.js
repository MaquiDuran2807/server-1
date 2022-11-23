const Driver=require('../models/drivers');

module.exports={
    register(req,res){
        const driver =req.body;//datos que vienen del cliente 
        Driver.create(driver,(err,data)=>{
            if (err){
                return res.status(501).json({
                success:false,
                message:'hubo un error en el registro de la ubicacion',
                error:err

                });
                
            }
            return res.status(201).json({
                success:true,
                massage:'exitoso',
                data: data//dudoso

            });
        }
        );
    }
}