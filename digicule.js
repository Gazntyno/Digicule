document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('simCanvas');
    var ctx = canvas.getContext('2d');

    // Function to draw a pixelated organism
    function drawOrganism(x, y, size, color) {
        // Set the pixel size for the organism (larger value = more pixelated)
        var pixelSize = 10;
        ctx.fillStyle = color;

        // Draw the organism as a series of squares (pixels)
        for (let i = 0; i < size; i += pixelSize) {
            for (let j = 0; j < size; j += pixelSize) {
                ctx.fillRect(x + i, y + j, pixelSize, pixelSize);
            }
        }
    }

    // Example: Draw an organism
    drawOrganism(100, 100, 50, 'green');
});
