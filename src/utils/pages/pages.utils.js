const createMessage = (page, req, {user=null, products=null, cart=null,err=null}={})=>{
    const navBar = [{title: "Home", link:'/'}];
    const authenticated =  req.isAuthenticated();
    const fullname = user? user.fullname : null;

    const main = {
        user: fullname,
        isAuthenticated : authenticated,
    };

    if (products !== null) main.products = products;
    if(cart !==null) main.cart = cart;
    
    if(page === 'signIn'){
        navBar.push({title: "Register", link: "/signup"});
    }

    if(page === 'signUp'){
        navBar.push({title: 'Signin', link:'/signin'});
    }

   if(page ==='home' || page==='cart'){
        
        navBar.push({title: 'Products', link:'/products'});
        navBar.push({title: "Cart",link: "/cart"});
        navBar.push({title: 'Logout', link:'/api/auth/signout'});
   }



    const message = {
        navBar: navBar,
        main:main,
    }

    return message
}

module.exports = createMessage