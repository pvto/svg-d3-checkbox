/*  Create SVG checkbox components.
* 
* This requires a parent SVG element.
* + D3.js
* + jQuery
*
* Usage:
*   var item = { label: "I agree" };
*   var parent = d3.select( "svg #my-svg-group" );
*   addSvgCheckBox( parent, item );
*
*/



//        var GETKEY = function(elem) { return "you implement this" };



var baseline = 12;  // base row height 

var toggleMySvgCheckbox = function( elem ) {
    var storeKey = elem.id;
    var old = elem.checked;
    if (old == undefined) { old = localStorage && localStorage.getItem( storeKey ); }
    if (old == undefined) { old = + elem.getAttribute( "checked" ) || 0; }
    elem.checked = 1 - old; 
    if ( localStorage ) {
        localStorage.setItem( storeKey, elem.checked );
    }
    $( elem ).find( "path[name='check']" )
        .css( "opacity", elem.checked )
        .css( "stroke-opacity", elem.checked )
        ;
};
var addSvgCheckBox = function( parent, d ) {
    var storeKey = GETKEY( d );
    var ggg = parent.append( "g" )
      .attr( "id", storeKey )
      .attr( "onclick", function() { toggleMySvgCheckbox( this ); })
      ;
    var checked = d.selected && d.selected != 0;
    if ( localStorage ) {
        checked = localStorage.getItem( storeKey ) || checked;
    }
    ggg.attr( "checked", checked )
      .property( "checked", checked );

    ggg.append( "rect" )
      .attr( "width", baseline * 1.4 )
      .attr( "height", baseline * 1.4 )
      .attr( "transform", "translate(" + baseline * -0.2 + "," + baseline * -0.2 + ")" )
      .attr( "style", "stroke:#000000;stroke-width:0;opacity:0;" )
      ;

    ggg.append( "rect" )
      .attr( "name", "box" )
      .attr( "width", baseline * 0.8 )
      .attr( "height", baseline * 0.8 )
      .attr( "transform", "translate(" + baseline * 0.1 + "," + baseline * 0.1 + ")" )
      .attr( "style", "fill:#ffffff;stroke:#000000;stroke-width:0.5;" )
      .attr( "rx", 2 ).attr( "ry", 2 )
      ;
    ggg.append( "path" )
      .attr( "name", "check" )
      .attr( "transform", "scale(" + baseline + "," + baseline + ")" )
      .attr( "d", "M 0.2,0.5 0.5,0.8 1.15,0.0 1.15,-0.05 0.5,0.6 0.21,0.4")
      .attr( "style", "fill:#000000;stroke:#ffffff;stroke-width:0.01;opacity:"+checked+";stroke-opacity:"+checked+";" )
      ;
    ggg.append( "text" )
      .text( d.label )
      .attr( "style", "" )
      .style( "font-size", 12 )
      .style( "text-anchor", "start" )
      .attr( "transform", "translate(" + baseline * ( 1.5 ) + ", " + baseline * 1 + ")" )
      ;
};
