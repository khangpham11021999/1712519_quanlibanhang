const exphbs  = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const numeral = require('numeral');
module.exports=function(app){
    app.engine('.hbs', exphbs({
        extname: '.hbs',
        layoutsDir:'views/_layouts',
        partialsDir:'views/_partials',
        helpers:{
        number_format: function(value){
            return numeral(value).format('0,0') + 'đ';
        },
        section: hbs_sections(),
        
        }
    }));
    app.set('view engine', '.hbs');

}