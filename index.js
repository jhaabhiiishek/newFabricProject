var canvas = new fabric.Canvas('canvas');
var canvasContext = canvas.getContext('2d');
// console.log(canvasContext);
var b = 1920;
var h =1080;

var scale = 1;

window.onload = function() {
    
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var imageType = /image.*/;
        
        if (file.type.match(imageType)) {
            var reader = new FileReader();
            
            reader.onload = function(e) {
                var img = new Image();
                img.src = reader.result;
                img.onload = function() {
                    // alert(this.width + 'x' + this.height);
                    b = this.width;
                    h = this.height;
                    console.log("width = "+b+ " height = "+h);
                }
                console.log("width = "+b+ " height = "+h);
                var display = new fabric.Image(img,{
                    angle: 0,
                    width: b,
                    height: h,
                    left: 100,
                    top: 50,
                    scaleX: .50,
                    scaleY: .50
                });
                canvas.add(display);
            }
            reader.readAsDataURL(file);
            // canvas.setZoom(scale);
            // canvas.__onMouseWheel(e);

            // canvas.on('mouse:wheel', function(opt) {
            //     var delta = opt.e.deltaY;
            //     var zoom = canvas.getZoom();
            //     zoom *= 0.999 ** delta;
            //     if (zoom > 20) zoom = 20;
            //     if (zoom < 0.01) zoom = 0.01;
            //     canvas.setZoom(zoom);
            //     opt.e.preventDefault();
            //     opt.e.stopPropagation();
            //   })

            canvas.on('mouse:down', function(opt) {
                var evt = opt.e;
                if (evt.altKey === true) {
                  this.isDragging = true;
                  this.selection = false;
                  this.lastPosX = evt.clientX;
                  this.lastPosY = evt.clientY;
                }
              });
              canvas.on('mouse:move', function(opt) {
                if (this.isDragging) {
                  var e = opt.e;
                  var vpt = this.viewportTransform;
                  vpt[4] += e.clientX - this.lastPosX;
                  vpt[5] += e.clientY - this.lastPosY;
                  this.requestRenderAll();
                  this.lastPosX = e.clientX;
                  this.lastPosY = e.clientY;
                }
              });
              canvas.on('mouse:up', function(opt) {
                // on mouse up we want to recalculate new interaction
                // for all objects, so we call setViewportTransform
                this.setViewportTransform(this.viewportTransform);
                this.isDragging = false;
                this.selection = true;
              });


            // canvas.on('mouse:wheel', function(opt) {
            //     var delta = opt.e.deltaY;
            //     var zoom = canvas.getZoom();
            //     zoom *= 0.999 ** delta;
            //     if (zoom > 20) zoom = 20;
            //     if (zoom < 0.01) zoom = 0.01;
            //     canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            //     opt.e.preventDefault();
            //     opt.e.stopPropagation();
            //   });
                  
            canvas.on('mouse:wheel', function(opt) {
                var delta = opt.e.deltaY;
                var zoom = canvas.getZoom();
                zoom *= 0.999 ** delta;
                if (zoom > 20) zoom = 20;
                if (zoom < 0.01) zoom = 0.01;
                canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
                var vpt = this.viewportTransform;
                if (zoom < 400 / 1000) {
                  vpt[4] = 200 - 1000 * zoom / 2;
                  vpt[5] = 200 - 1000 * zoom / 2;
                } else {
                  if (vpt[4] >= 0) {
                    vpt[4] = 0;
                  } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
                    vpt[4] = canvas.getWidth() - 1000 * zoom;
                  }
                  if (vpt[5] >= 0) {
                    vpt[5] = 0;
                  } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
                    vpt[5] = canvas.getHeight() - 1000 * zoom;
                  }
                }})
        } 

        
    });
    
    }

    function clear()
    {
        canvas.forEach((obj) => {
        canvas.remove(obj);
        });
        canvas.discardActiveObject().renderAll()
    };
    var del = document.getElementById('delete-object');
    del.addEventListener('click', () => {
        canvas.getActiveObjects().forEach((obj) => {
          canvas.remove(obj)
        });
        canvas.discardActiveObject().renderAll()
      })

      var nocursor = document.getElementById("cursor-off");
      nocursor.onclick= function turnoff(){
        // canvas.style.noneCursor = "none";
        console.log('pointer');
        canvas.hoverCursor = 'none';
      };

function zoomone(){
    canvas.setZoom(1);
    canvas.left(100);
    canvas.right(50);
}