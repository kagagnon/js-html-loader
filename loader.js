const TemplateEngin = require( 'js-html' );
const TemplateParser = require( 'js-html/src/parser' );
const utils = require("loader-utils");
const path = require( 'path' );

module.exports = function( source ){
    let callback = this.async(),
        options = utils.getOptions( this ) || {},
        Template = new TemplateEngin( options );

    let relative_resource_path = path.relative( Template.options.views_folder, this.resourcePath ),
        clean_resource_path = relative_resource_path.split( path.sep ).join('/').replace( /\.js\.html$/, '' );

    Template.setViewPath( clean_resource_path );

    let Parser = new TemplateParser( Template, source, Template.unifyData() );

    let html =  Parser.render();

    Template.dependencies.forEach( this.addDependency, this );

    callback( null, html );
}
