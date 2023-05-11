
class PagesController {
    constructor(){}

    signIn = async (req,res)=>{
        if(req.isAuthenticated()){
           return res.redirect('/home')
        }
        res.render('signin');
    };

    signUp = async(req, res) => {
        if (req.isAuthenticated()){
            return res.redirect('/home')
        }
        res.render('signup');
    }

    error = async(_req, res) => {
        res.render('error');
    }

    signOut = async(req, res) => {
        req.logout(()=>{
            res.redirect('/signin')
        })
    }

    home = async(req, res) => {
        res.render('home');
    }

}


module.exports = PagesController;
