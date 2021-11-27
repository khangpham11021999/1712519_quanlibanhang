module.exports=function(app)
{
    app.get('/', function (req, res) {
        res.render('home');
      });
    
    app.use('/admin/categories',require('../routes/categories.route'));
    app.use('/admin/products',require('../routes/products.route'));
    app.use('/products',require('../routes/_products.route'));
    app.use('/account',require('../routes/_account.route'));
    
}