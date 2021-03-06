/*-----------------------------
---- TABLE OF CONTENTS ---
-----------------------------*/

// Build it.
_.each( $( "section" ), function( section, index ) {
    var $section = $( section );
    var id = ( index == 0 ) ? '#top' : '#' + $section.attr( 'id' );
    var name = $section.attr( 'name' );
    var link = $( '<li><p><a href="' + id + '" class="is-perm">' + name + '</a></p>' );
    $( 'ul#page-nav__list' ).append( link );
} );

// Update as we scroll.

var navButtonsAndSections = [];
function addNavButtonAndSection( button, section ) {
    navButtonsAndSections.push( {
        button: button,
        stylableButton: button.closest( 'li' ),
        section: section
    } );
}

_.each( $( ".page-nav__list a[href^='#']" ), function( button ) {
    addNavButtonAndSection( $( button ), $( $( button ).attr( 'href' ) ) );
} );

navButtonsAndSections = _.sortBy( navButtonsAndSections, function( item ) {
    return item.section.offset().top * -1;
} );

var currSection;

onScroll( function() {

    var $window = $( window ),
        scrollTop = $( window ).scrollTop(),
        newSection;

    newSection = _.find( navButtonsAndSections, function( item ) {
        return ( scrollTop >= item.section.offset().top - 130 );
    } );

    if ( newSection != currSection ) {

        if ( currSection ) {
            currSection.stylableButton.removeClass( 'current-nav-section' );
        }

        currSection = newSection;

        if ( currSection ) {
            currSection.stylableButton.addClass( 'current-nav-section' );
        }

    }
    
} )();