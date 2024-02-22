document.querySelectorAll('.clickable-image').forEach(item => {
    item.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click from bubbling up

        var popupImage = document.createElement('img');
        popupImage.src = this.getElementsByTagName('img')[0].src; // Assuming you want to copy the src of the clicked image
        popupImage.classList.add('popup-image');
        document.body.appendChild(popupImage);

        // Initially make the image transparent for a fade-in effect
        popupImage.style.opacity = '0';
        // Use setTimeout to trigger CSS transitions after appending to the DOM
        setTimeout(() => {
            popupImage.style.opacity = '1';
        }, 10);

        var overlay = document.getElementById('overlay');
        overlay.style.display = "block";
        setTimeout(() => {
            overlay.style.opacity = 1; // Fade in the overlay
        }, 10);

        function removePopup(event) {
            if (event.target === overlay || event.target === popupImage) {
                popupImage.style.opacity = '0'; // Fade out before removal for a smooth transition
                overlay.style.opacity = 0;

                setTimeout(() => { // Delay removal until after the fade-out transition
                    popupImage.remove();
                    overlay.style.display = "none";
                }, 500); // This duration should match the CSS transition duration

                document.removeEventListener('click', removePopup);
            }
        }

        setTimeout(() => {
            document.addEventListener('click', removePopup);
        }, 10);
    });
});
