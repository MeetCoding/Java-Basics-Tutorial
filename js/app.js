let curtainOpacity = 0.6;

//Run this code after the document is fully loaded
$(document).ready(() => {

    //Adding to my-profile-links element in index.html from my-profile-links.json file
    fetch('my-profile-links.json').then(response => response.json()).then(data => {

        //Scanning through all the profile link objects from my-profile-links.json file
        for(let index in data) {

            //Extracting content from the profile link object at index
            let media = data[index].media;
            let link = data[index].link;
            let id = toID(media);

            //Creating the html element of the link
            let element = `<a id="${id}" class="my-profile-link-button" href="${link}" target="_blank">`;
            element+=media;
            element+='</a>';

            //Appending the link html element to the my-profile-links div class in index.html
            $('.my-profile-links').append(element);
        }
    })

    //Initialising buttons to menu in index.html from menu-items.json file
    fetch('res-register.json')
    .then(response => response.json())
    .then(data => {

        //Scanning through all the objects in res-register.json file
        for(let index in data) {
            
            //Extracting content from the folder object at index
            let folder = data[index].folder;
            let files = data[index].files;
            let id = toID(folder);

            //Creating the html element of the open folder button
            let element = `<button id="${id}" class="open-folder-button">`;
            element+=folder;
            element+='</button>';

            //Appending the element to div class menu from index.html
            $('.menu').append(element);

            //Adding on click action to the open-folder-button at index
            $(`#${id}`).click(() => {

                //Loading the cards to the container
                loadCards(files,folder);
                
                //Setting the focus to that button
                for(index in $('.open-folder-button')) {

                    //Getting the open-folder-button at index
                    let openFolderButton = $(`.open-folder-button:eq(${index})`);

                    //Checking if the id matches the id of the current folder
                    if(openFolderButton.attr('id')==id) {

                        //Add focus on the current button
                        openFolderButton.addClass('open-folder-focused-button');
                    } else {

                        //Remove focus from all other buttons
                        openFolderButton.removeClass('open-folder-focused-button');
                    }
                }

                //Closing the menu when clicked on the open-folder-button in tablet/mobile
                if($('.close-menu-button').css('visibility')=='visible') {
                    $('.close-menu-button').click();
                }
            })

            //Clicking on the first folder in the menu
            if($('.open-folder-button').length == 1) {
                $('.open-folder-button:eq(0)').click();
            }
        }
    })

    //toID function converts folder name to id name by replacing all the spaces to hyphen and making all characters lowercase
    function toID(folder) {
        return folder.toLowerCase().replace(' ','-').replace('.','-');
    }

    //Load function defines the algorithm to be run in order to load the set of cards mentioned for a particular index passed in menu-items.json
    function loadCards(files,folder) {

        //Empty the card-container:
        $('.card-container').html('');

        //Scanning through all the files
        for(let index in files) {

            //Fetching the file
            fetch(`res/${folder}/${files[index]}`)
            .then(response => response.text())
            .then(data => {

                //Converting the text to html by appending it to a html element:
                data = `<div class="card">${data}</div>`;

                //Appending the card to the container
                $('.card-container').append(data);

                //Formatting the card by changing custom tags to html tags
                formatAll();
                $('footer').replaceWith(loadFooter());

                //Scroll to the top
                window.scrollTo(0,0);
            })
        }
    }

    //Open menu on click on open-menu-button
    $('.open-menu-button').click(() => {

        //Bringing the menu to the frame
        $('.menu').css('transform','translateX(0)');

        //Showing the menu curtain
        $('.menu-curtain').css('opacity',curtainOpacity);
        $('.menu-curtain').css('pointer-events','all');
    })

    //Close menu on click on close-menu-button
    $('.close-menu-button').click(() => {
        
        //Moving the menu to the left (outside the frame)
        $('.menu').css('transform','translateX(-150%)');

        //Hiding the menu curtain
        $('.menu-curtain').css('opacity','0');
        $('.menu-curtain').css('pointer-events','none');
    })

    //Close all pop-ups on click on close-popup-butotn
    $('.close-popup-button').click(() => {

        //Closing all the active iframes, mostly 1
        $('iframe').css('visibility','hidden');

        //Hiding the popup curtain
        $('.popup-curtain').css('opacity',0);
        $('.popup-curtain').css('pointer-events','none');

        //Hiding the close-popup-button
        $('.close-popup-button').css('opacity',0);
        $('.close-popup-button').css('pointer-events','none');

        let iframe = document.getElementsByClassName('card-video');
        console.log(iframe[0].contentWindow);
    })

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
})