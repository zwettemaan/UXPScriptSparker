function main() {

    app.scriptPreferences.enableRedraw = false;

    var start = new Date().getTime();

    var totalFrameCount = 70;

    var framesPerRow = 5;
    var framesPerColumn = 7;

    var curDoc = app.documents.add();
    var curPage = curDoc.pages.firstItem();

    var curPageBounds = curPage.bounds;

    var frameWidth = (curPageBounds[3] - curPageBounds[1])/framesPerRow;
    var frameHeight = (curPageBounds[2] - curPageBounds[0])/framesPerColumn;

    var xPos = curPageBounds[1];
    var yPos = curPageBounds[0];
    
    var col = 0;
    var row = 0;

    for (var textFrameIdx = 0; textFrameIdx < totalFrameCount; textFrameIdx++) {

        var curTextFrame = curPage.textFrames.add();

        curTextFrame.geometricBounds = 
            [
                yPos, 
                xPos, 
                yPos + frameHeight, 
                xPos + frameWidth
            ];

        // Note: Math.random() is >= 0 but < 1. It will always below 1
        // so the maximum random values we might calculate would be 255.
        var randomRed = Math.floor(Math.random() * 256);
        var randomGreen = Math.floor(Math.random() * 256);
        var randomBlue = Math.floor(Math.random() * 256);

        var randomColorValue = [ randomRed, randomGreen, randomBlue];

        var curColor = curDoc.colors.add({
            colorValue: randomColorValue, 
            space: ColorSpace.RGB,
            model: ColorModel.SPOT,
            name: "C" + textFrameIdx
        });

        curTextFrame.fillColor = curColor;
        curTextFrame.contents = "[" + randomColorValue + "]";

        xPos += frameWidth;
        col++;

        if (col >= framesPerRow) {

            col = 0;
            xPos = curPageBounds[1];
        
            yPos += frameHeight;
            row++;

            if (row >= framesPerColumn) {

                curPage = curDoc.pages.add();
                curPageBounds = curPage.bounds;

                frameWidth = (curPageBounds[3] - curPageBounds[1])/framesPerRow;
                frameHeight = (curPageBounds[2] - curPageBounds[0])/framesPerColumn;

                xPos = curPageBounds[1];
                yPos = curPageBounds[0];

                row = 0;
                yPos = 0;
            }
        }
    }

    var end = new Date().getTime();

    var elapsedMilliseconds = end - start;
    
    $$SHORTCODE$$.alert("time elapsed (ms) = " + elapsedMilliseconds);
}
