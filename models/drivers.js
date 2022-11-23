const db =require('../config/config');

const Driver={};
Driver.create=(driver,result)=>{
    const sql=`
    SELECT realtime 
    `;
    db.query
    (
        sql,
        [
            driver.token,
            driver.lat,
            driver.lng
        ], 
        (err,res)=>{
            if (err){
                console.log('error: ',err);
                result()
            }
            else {
                console.log('token del conductor: ',res.insertoken);
                result(null,res.insertoken);

            }
            module.exports=Drivers;
                
            
        }
    )
}