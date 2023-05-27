const createMessage = (page, req, {user=null, products=null, err=null}={})=>{
    const navBar = [{title: "Home", link:'/'}];
    const authenticated =  req.isAuthenticated();
    const fullname = user? user.fullname : null;

    const main = {
        user: fullname,
        isAuthenticated : authenticated,
    };

    if (products !== null) main.products = products;
    
    if(page === 'signIn'){
        navBar.push({title: "Register", link: "/signup"});
    }

    if(page === 'signUp'){
        navBar.push({title: 'Signin', link:'/signin'});
    }

   if(page ==='home'){
        navBar.push({title: 'Logout', link:'/api/auth/signout'});
        navBar.push({title: 'Products', link:'/products'})
   }



    const message = {
        navBar: navBar,
        main:main,
    }

    return message
}

module.exports = createMessage