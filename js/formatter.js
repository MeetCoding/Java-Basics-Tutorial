function formatAll() {
    formatHeading();
    formatParagraph();
    formatCode();
    formatVideo();
    formatCompiler();
    $('footer').replaceWith(loadFooter());
}

function formatHeading() {
    for(index in $('heading')) {
        let element = "<h1 class'card-heading'>";
        element += $(`heading:eq(${index})`).html();
        element += "</h1>";
        $(`heading:eq(${index})`).replaceWith(element);
    }
}
function formatParagraph() {
    for(index in $('paragraph')) {
        let element = "<p class='card-paragraph'>"
        element += $(`paragraph:eq(${index})`).html();
        element += "</p>";
        $(`paragraph:eq(${index})`).replaceWith(element);
    }
}
function formatCode() {
    for(index in $('pre')) {
        let element = "<pre class='card-code'>"
        element += $(`pre:eq(${index})`).html();
        element += "</pre>"
        $(`pre:eq(${index})`).replaceWith(element);
    }
}
function formatVideo() {
    for(index in $('video')) {
        let element = '<iframe ';
        element += `src = "https://www.youtube.com/embed/${$(`video:eq(${index})`).html()}?enablejsapi=1"`;
        element += 'class = "card-video"';
        element += 'title="YouTube video player"';
        element += 'frameborder="0"';
        element += 'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"';
        element += 'allowfullscreen>';
        element += '</iframe>';
        $(`video:eq(${index})`).replaceWith(element);
    }
}
function formatCompiler() {
    for(index in $('compiler')) {
        let element = '<iframe ';
        element += `src = "https://www.jdoodle.com/embed/v0/${$(`compiler:eq(${index})`).html()}"`
        element += 'class = "card-compiler"';
        element += 'frameborder="0"';
        element += '</iframe>';
        $(`compiler:eq(${index})`).replaceWith(element);
    }
}
//Generates and returns the footer which is used to open/close video and compiler iframes
function loadFooter() {

    //Creating the footer element with tag div
    let footer = document.createElement('div');

    //Adding footer class name to the element
    footer.classList.add('card-footer');

    //Creating video and compiler buttons
    let videoBtn = document.createElement('button');
    let compilerBtn = document.createElement('button');

    //Adding respective class names to the two buttons
    videoBtn.classList.add('card-footer-video-button');
    compilerBtn.classList.add('card-footer-compiler-button');

    //Adding text to the buttons
    videoBtn.innerHTML = 'Watch a Video!';
    compilerBtn.innerHTML = 'Try it Yourself!';

    //Adding click listener to video button
    videoBtn.addEventListener('click',() => {
        if(screen.width >= 500) {

            //Showing the iframe
            footer.parentNode.getElementsByClassName('card-video')[0].style.visibility = 'visible';

            //Showing the popup curtain
            $('.popup-curtain').css('opacity',curtainOpacity);
            $('.popup-curtain').css('pointer-events','all');

            //Showing the close-popup-button
            $('.close-popup-button').css('opacity',1);
            $('.close-popup-button').css('pointer-events','all');
            
        } else {
            
            //Creating a link to the video
            let link = document.createElement('a');
            link.href = footer.parentNode.getElementsByClassName('card-video')[0].src;
            link.target = '_blank';

            //Clicking on the link
            link.click();
        }
    })

    //Adding click listener to the compiler button
    compilerBtn.addEventListener('click',() => {
        if(screen.width >= 500) {

            //Showing the iframe
            footer.parentNode.getElementsByClassName('card-compiler')[0].style.visibility = 'visible';

            //Showing the popup curtain
            $('.popup-curtain').css('opacity',curtainOpacity);
            $('.popup-curtain').css('pointer-events','all');

            //Showing the close-popup-button
            $('.close-popup-button').css('opacity',1);
            $('.close-popup-button').css('pointer-events','all');
            
        } else {
            
            //Creating a link to the video
            let link = document.createElement('a');
            link.href = footer.parentNode.getElementsByClassName('card-compiler')[0].src;
            link.target = '_blank';

            //Clicking on the link
            link.click();
        }
    })

    //Appending both the buttons to the footer div
    footer.append(videoBtn);
    footer.append(compilerBtn);

    //Returning the footer element
    return footer;
}