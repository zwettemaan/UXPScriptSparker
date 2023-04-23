function main() {
    var numFrames = 70;
    var numHor = 5;
    var numVer = 7;

    var curDoc = app.documents.add();
    var curPage = curDoc.pages.firstItem();

    var curPageBounds = curPage.bounds;

    var width = (curPageBounds[3] - curPageBounds[1])/numHor;
    var height = (curPageBounds[2] - curPageBounds[0])/numVer;

    var xPos = 0;
    var yPos = 0;
    
    var col = 0;
    var row = 0;

    for (var textFrameIdx = 0; textFrameIdx < numFrames; textFrameIdx++) {

        var curTextFrame = curPage.textFrames.add();

        curTextFrame.geometricBounds = [yPos, xPos, yPos + height, xPos + width];

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

        xPos += width;
        col++;

        if (col >= numHor) {

            col = 0;
            xPos = 0;

            yPos += height;
            row++;

            if (row >= numVer) {

                curPage = curDoc.pages.add();
                curPageBounds = curPage.bounds;

                width = (curPageBounds[3] - curPageBounds[1])/numHor;
                height = (curPageBounds[2] - curPageBounds[0])/numVer;

                row = 0;
                yPos = 0;
            }
        }
    }
}