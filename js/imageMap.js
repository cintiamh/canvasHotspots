function ImageMap() {
    this.canvas = this.getCanvas();
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.getContext(this.canvas);

    this.update = true;
    this.shapes = [];
    this.dragging = false;
    this.selection = null;
    this.dragoff = {
        x: 0,
        y: 0
    };
    this.offset = this.getCumulativeOffset(this.canvas);
    this.initEvents(this.canvas);

    var that = this;

    setInterval(function() {
        that.draw();
    }, 30);
}

ImageMap.prototype = {
    getCanvas: function() {
        var canvas = document.getElementById("canvas1");
        console.log(canvas, canvas.width, canvas.height);
        return canvas;
    },

    getContext: function(canvas) {
        return canvas.getContext('2d');
    },

    getCumulativeOffset: function(element) {
        var top = 0;
        var left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while(element);
        return {
            top: top,
            left: left
        };
    },

    initEvents: function(canvas) {
        var that = this;
        canvas.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        }, false);

        canvas.addEventListener('mousedown', function(e) {
            var pos = that.getMousePosition(e, that.canvas);
            var shapes = that.shapes;
            var l = shapes.length;

            for (var i = l - 1; i >= 0; i--) {
                if (shapes[i].contains(pos.x, pos.y)) {
                    console.log("Inside");
                    var el = shapes[i];
                    that.dragoffx = pos.x - el.x;
                    that.dragoffy = pos.y - el.y;
                    that.dragging = true;
                    that.selection = el;
                    that.update = false;
                    return;
                }
            }

            if(that.selection) {
                that.selection = null;
                that.update = false;
            }
        }, true);

        canvas.addEventListener('mousemove', function(e) {
            //console.log("mousemove");
        }, true);

        canvas.addEventListener('mouseup', function(e) {
            //console.log("mouseup");
        }, true);

        canvas.addEventListener('dblclick', function(e) {
            //console.log("dblclick");
            var pos = that.getMousePosition(e, that.canvas);
            that.addHotspot(pos);
        }, true);
    },

    getMousePosition: function(e, element) {
        var offset = this.getCumulativeOffset(element);

        return {
            x: e.pageX - offset.left,
            y: e.pageY - offset.top
        };
    },

    addHotspot: function(pos) {
        var hotspot = new Hotspot(pos.x, pos.y, 100, 100, 'rgba(0,255,0,.6)');
        this.shapes.push(hotspot);
        this.update = true;
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    draw: function() {
        if (this.update) {
            console.log("Update!");
            this.clear();

            for (var i = 0; i < this.shapes.length; i++) {
                var shape = this.shapes[i];
                console.log(shape);
                if (shape.x > this.width || shape.y > this.height || shape.x + shape.y < 0 || shape.y + shape.h < 0) {
                    continue;
                }
                this.shapes[i].draw(this.ctx);
            }
            console.log("Selection", this.selection);
            if (this.selection) {

                this.ctx.strokeStyle = '#CC0000';
                this.ctx.lineWidth = 2;
                var el = this.selection;
                this.ctx.strokeRect(el.x, el.y, el.w, el.h);
            }

            this.update = false;
        }
    }
};

ImageMap.prototype.getBaseStyle = function(canvas) {
    var style = {

    };

};
