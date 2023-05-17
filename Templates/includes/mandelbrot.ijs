$if "$$TARGETCONTEXT$$" != "InDesign UXPScript+ExtendScript" and "$$TARGETCONTEXT$$" != "InDesign UXPScript" and "$$TARGETCONTEXT$$" != "InDesign ExtendScript"
function main() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif 
    // Empty main() function. The Mandelbrot template is not applicable in target context $$TARGETCONTEXT$$   
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logExit(arguments);
    $endif
}
$else
//
// Do not run this code directly. 
// Instead, this code can be launched either in ExtendScript or in UXPScript,
// by running either the run_as_ExtendScript.jsx or the run_as_UXPScript.idjs 
// scripts from the Scripts Panel
//
// Mandelbrot set visualization in Adobe InDesign (tested with CS5 and above)
//
// (c) 2015 Kris Coppieters, kris@rorohiko.com
//
// No rhyme nor reason - no practical value, just for fun. Free to use for educational
// purposes.
//
// Start Adobe InDesign, run the script. Go get coffee.
//

//
// How many steps before we bail out and decide the complex point is not going to reach
// distance 2 from the origin. The higher, the more accurate, but also the slower
//
const kMaxSteps = 35;

//
// How large a pixel grid (kNumPixels x kNumPixels). The larger, the slower.
//
var kNumPixels = 19;

function main() {
    calculateMandelbrot();
}

//
// For applying swatches we apply a logarithmic scale; pre-calculate this value because
// we'll need it a lot
//
const kLogOfMaxSteps = Math.log(kMaxSteps);

var swatches = {};

var document = $$SHORTCODE$$.G.app.documents.add();

//
// Give the user something to watch while it's happening.
//
$$SHORTCODE$$.G.app.scriptPreferences.enableRedraw = true;

document.viewPreferences.horizontalMeasurementUnits = $$SHORTCODE$$.G.MeasurementUnits.POINTS;
document.viewPreferences.verticalMeasurementUnits = $$SHORTCODE$$.G.MeasurementUnits.POINTS;

var firstPage = document.pages.item(0);

var firstPageWidth = firstPage.bounds[3] - firstPage.bounds[1];
var firstPageHeight = firstPage.bounds[2] - firstPage.bounds[0];

var gridWidth;
if (firstPageHeight > firstPageWidth) {
    gridWidth = firstPageWidth;
}
else {
    gridWidth = firstPageHeight;
}

var pixelRectWidth = gridWidth / kNumPixels;

function calculateMandelbrot() {

    $$SHORTCODE$$.logEntry(arguments);

    //
    // Do a bit of benchmarking: record the start and end times, and subtract them
    //
    var startDate = new Date();

    var rects = createSquareOfNxN(kNumPixels,0,0, pixelRectWidth);
    var halfNumPixels = Math.floor(kNumPixels / 2 + 1)
    for (var px = 0; px < kNumPixels; px++) {
        for (var py = 0; py < halfNumPixels; py++) {
            var rect1 = rects[py][px];
            var pySymmetric = kNumPixels - py - 1;
            if (pySymmetric == py) {
                rect2 = undefined;
            }
            else {
                rect2 = rects[pySymmetric][px];
            }

            //
            // Convert [0 , kNumPixels[ into interval [-2, 2[
            //
            // (x,y) are the values on the frog's back
            //
            var x = 4 * px / kNumPixels - 2;
            var y = 4 * py / kNumPixels - 2;
            var lambda = new complex(x, y);

            var n = numSteps(lambda, kMaxSteps);

            //
            // Grab a swatch for that number of steps. If the swatch is not available yet, create it
            //
            var swatch = swatches[n];
            if (! swatch) {
                var swatchName = "N=" + n;
                // 
                // Try to get the swatch by name. If it ain't there, make it
                //
                var swatch = document.colors.itemByName(swatchName);
                if (! swatch || ! swatch.isValid) {
                    //
                    // Make a gray RGB swatch, and use a logartihmic scale to calculate the grayscale value
                    //
                    swatch = document.colors.add(
                        { 
                            name: swatchName, 
                            model: $$SHORTCODE$$.G.ColorModel.PROCESS, 
                            space: $$SHORTCODE$$.G.ColorSpace.RGB
                        }
                    );
                    var grayScaleValue = 255 * Math.log(n) / kLogOfMaxSteps;
                    swatch.colorValue = [grayScaleValue, grayScaleValue, grayScaleValue];
                }
                swatches[n] = swatch;
            }
            rect1.fillColor = swatch;
            if (rect2) {
                rect2.fillColor = swatch;        
            }
        }
    }

    // 
    // ...and we're done!
    //
    var endDate = new Date();

    $$SHORTCODE$$.alert("Time elapsed:" + (endDate.getTime() - startDate.getTime()) / 1000.0);

    $$SHORTCODE$$.logExit(arguments);
}

//
// Class 'complex' with some basic methods for calculating 
// Mandelbrot set
//
function complex(x, y) {
    if (x instanceof complex) {
        this.x = x.x;
        this.y = x.y;
    }
    else {
        this.x = x;
        if (y === undefined) {
            y = 0;
        }
        this.y = y;
    }
}

complex.prototype.add = function(c) {
    this.x += c.x;
    this.y += c.y;
}

complex.prototype.mul = function(c) {
    var x = this.x * c.x - this.y * c.y;
    this.y = this.x * c.y + this.y * c.x;
    this.x = x;
}

complex.prototype.sqr = function() {
    var x = this.x * this.x - this.y * this.y;
    this.y *= 2 * this.x;
    this.x = x;
}

complex.prototype.distSqr = function () {
    return this.x*this.x + this.y * this.y;
}

// 
// Utility functions
//
// jump: take a complex value z, and using the complex value lambda, 'jump' to the next
// iteration point, which is zNext = z^2 + lambda
//
function jump(z, lambda) {
    z = new complex(z);
    z.sqr();
    z.add(lambda);
    return z;
 }

//
// numSteps: calculate how many steps it takes to jump from (0,0) to a distance of
// 2 or more. We don't calculate the real distance, but the square of the distance and
// compare this to 4 (the square of 2). That saves us taking a square root.
//
function numSteps(lambda, kMaxSteps) {
    var n = 0;

    // Start at z = (0,0)
    var z = new complex(0,0);

    // Now iterate until we reach a distance of 2 or more, or until we 
    // tried for kMaxSteps times
    do {
        n++;
        z = jump(z,lambda);
        var distSqr = z.distSqr();
    }
    while (distSqr < 4 && n < kMaxSteps);

    return n;
}

//
// Creating rects in InDesign is slow. By duplicating a starter rect
// horizontally, then vertically we can speed up things a bit
//
function createSquareOfNxN( n, x, y, pixelRectWidth) {

    var rect = firstPage.rectangles.add();
    rect.strokeWeight = 0;
    rect.strokeColor = "None";
    rect.visibleBounds = [ y, x, y + pixelRectWidth, x + pixelRectWidth ];
    var rowRectList = [rect];
    var dupeRectXPos = x;
    for (var copyIdx = 1; copyIdx < n; copyIdx++) {
        dupeRectXPos += pixelRectWidth;
        var dupeRect = rect.duplicate();
        dupeRect.strokeWeight = 0;
        dupeRect.strokeColor = "None";
        dupeRect.visibleBounds = [ y, dupeRectXPos, y + pixelRectWidth, dupeRectXPos + pixelRectWidth ];
        rowRectList.push(dupeRect);
    }

    //
    // Create a group with all rects of this first row. Then duplicate it as needed.
    //
    var rects = rowRectList.slice(0);
    var firstRowRectGroup = firstPage.groups.add(rects);

    var neededRows = n - 1;
    var dupeRowYPos = y + pixelRectWidth;
    var allRows = [ firstRowRectGroup ];
    var rows = allRows;
    var rowsGroup;
    var dupeRows;
    while (neededRows > 0) {
        var rowCount = rows.length;
        if (rowCount > 1) {
            rowsGroup = firstPage.groups.add(rows);
        }
        else {
            rowsGroup = rows[0];
        }
        var dupeRowGroup = rowsGroup.duplicate();
        if (rowCount > 1) {
            rowsGroup.ungroup();
        }
        
        dupeRowGroup.move([x, dupeRowYPos]);
        dupeRowYPos += pixelRectWidth * rowCount;
        
        //
        // Get the rows out of the group
        //
        if (rows.length > 1) {
            dupeRows = dupeRowGroup.groups.everyItem().getElements().slice(0);
            dupeRowGroup.ungroup();
            // Rows are badly sorted. Bother. Re-sort them
            dupeRows.sort(function(a,b) { return a.geometricBounds[0] - b.geometricBounds[0]; });
        }
        else {
            dupeRows = [ dupeRowGroup ];
        }
        
        allRows = allRows.concat(dupeRows);        
        neededRows -= rowCount;

        rows = allRows;
        rowCount += rowCount;
        if (rowCount > neededRows) {
            rowCount = neededRows;
            rows = rows.slice(0, neededRows);
        }
    }

    var rects_by_XxY = [];
    for (var rowIdx = 0; rowIdx < allRows.length; rowIdx++) {
        var row = allRows[rowIdx];
        var rects = row.rectangles.everyItem().getElements().slice(0);
        row.ungroup();
        var yPos = Math.floor((rects[0].geometricBounds[0] - y)/pixelRectWidth + 0.5);
        for (var idx = 0; idx < rects.length; idx++) {
            var rect = rects[idx];
            var xPos = Math.floor((rect.geometricBounds[1] - x)/pixelRectWidth + 0.5);
            if (! rects_by_XxY[yPos]) {
                rects_by_XxY[yPos] = [];
            }
            rects_by_XxY[yPos][xPos] = rect;
        }
    }

    return rects_by_XxY;
}
$endif