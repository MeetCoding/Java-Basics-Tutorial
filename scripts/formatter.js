function formatAll() {
    formatHeading();
    formatParagraph();
    formatCode();
    formatVideo();
    formatCompiler();
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