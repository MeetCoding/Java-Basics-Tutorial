//Run this code after the document is fully loaded
$(document).ready(() => {

    navAnimation(0);

    //Adding text to about-me-info element in index.html from about-me-info.txt file
    fetch('about-me-info.txt').then(response => response.text()).then(data => {
        $('.about-me-info').html(data);
    })

    //Adding bars to menu-open-button in index.html
    for(let i=0; i<3; i++) {
        $('.open-menu-button').append('<span class="bar"></span>');
    }

    //Runs when the page is scrolled
    window.onscroll = function() {
        navAnimation(window.pageYOffset);
    };

    //Changes nav-bar animation on scroll
    function navAnimation(y) {
        if(y==0) {
            $('.nav-bar').css('border-radius','0');
            $('.nav-bar').css('background-color','var(--blue)');
            $('.nav-bar').css('top','0');
            $('.nav-bar').css('left','0');
            $('.nav-bar').css('right','0');
        } else {
            $('.nav-bar').css('border-radius','20px');
            $('.nav-bar').css('background-color','var(--purple)');
            $('.nav-bar').css('top','var(--nav-bar-indent)');
            $('.nav-bar').css('left','var(--nav-bar-indent)');
            $('.nav-bar').css('right','var(--nav-bar-indent)');
        }
    }
})