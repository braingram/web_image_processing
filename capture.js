var videoId = 'video';
var scaleFactor = 0.25;
var snapshots = [];

var firstImage = null;

/**
 * Captures a image frame from the provided video element.
 * 
 * @param {Video} video HTML5 video element from where the image frame will be captured.
 * @param {Number} scaleFactor Factor to scale the canvas element that will be return. This is an optional parameter.
 * 
 * @return {Canvas}
 */
function capture(video, scaleFactor) {
	if(scaleFactor == null){
		scaleFactor = 1;
	}
	var w = video.videoWidth * scaleFactor;
	var h = video.videoHeight * scaleFactor;
	var canvas = document.createElement('canvas');
		canvas.width  = w;
	    canvas.height = h;
	var ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, w, h);
    return canvas;
} 
 
 
/**
 * Invokes the <code>capture</code> function and attaches the canvas element to the DOM.
 */
function shoot(){
	var video  = document.getElementById(videoId);
	var output = document.getElementById('output');
	var canvas = capture(video, scaleFactor);
		canvas.onclick = function(){
			window.open(this.toDataURL());
		};
	snapshots.unshift(canvas);
	output.innerHTML = '';
	for(var i=0; i<4; i++){
		output.appendChild(snapshots[i]);
	}
}

function next_frame(){
    var video = document.getElementById(videoId);
    var now = video.currentTime;
    //video.currentTime = now + 0.3;
    //shoot();
    if (firstImage == null) {
        video.currentTime = 0;
        //firstImage = new Image();
        //firstImage.src = capture(video);
        firstImage = capture(video);
    }
    video.currentTime = now + 3;
    //var canvas = capture(video);
    //canvas.onclick = function(){window.open(this.toDataURL());};
    //var frame = new Image(canvas);
    var frame = capture(video);
    Pixastic.process(frame, 'blend',
            {
                amount : 1,
                mode : 'difference',
                image : firstImage
            }
    );
    var output = document.getElementById('output');
    frame.onclick = function(){
        window.open(this.toDataURL());
    }
    snapshots.unshift(frame);
    output.innterHTML = '';
    for (var i=0; i<snapshots.length; i++){
        output.appendChild(snapshots[i]);
    }
}
