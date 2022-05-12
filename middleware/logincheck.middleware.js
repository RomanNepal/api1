const IsLoggedIn = (req, res, next) =>{
    let token = '';
    if(req.headers['authorization']){
        token = req.headers['authorization'];

    }
    
}
module.exports = IsLoggedIn;