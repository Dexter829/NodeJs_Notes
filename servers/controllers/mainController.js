/**
 * GET/
 * Homepage
 */

exports.homepage = async(req , res) => {
        const locals = {
            title: 'NodeJs Notes',
            description: 'Free NodeJs Notes App'
        };
    
        res.render('index', { 
            title: 'Home', 
            locals: locals,
            layout: '../views/layouts/front-page'
          });
}


/**
 * GET/
 * About
 */

exports.about = async(req , res) => {
    const locals = {
        title: 'About - NodeJs Notes',
        description: 'Free NodeJs Notes App'
    };

    res.render('about', { title: 'Home', locals: locals });
}