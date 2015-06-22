function ImageMap() {
    this.canvas = this.getCanvas();
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.getContext(this.canvas);

    this.update = true;
    this.shapes = [];
    this.selHandles = [];
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
                    var el = shapes[i];

                    that.dragoff.x = pos.x - el.x;
                    that.dragoff.y = pos.y - el.y;
                    console.log("Inside", el, that.dragoff);
                    that.dragging = true;
                    that.selection = el;
                    that.update = true;
                    return;
                }
            }

            if(that.selection) {
                that.selection = null;
                that.update = false;
            }
        }, true);

        canvas.addEventListener('mousemove', function(e) {
            if (that.dragging) {
                var pos = that.getMousePosition(e, that.canvas);
                that.selection.x = pos.x - that.dragoff.x;
                that.selection.y = pos.y - that.dragoff.y;
                that.update = true;
            }
        }, true);

        canvas.addEventListener('mouseup', function(e) {
            that.dragging = false;
        }, true);

        canvas.addEventListener('dblclick', function(e) {
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
        var lineWidth = 2;
        var selectSize = 6;
        var selectColor = '#CC0000';
        if (this.update) {
            this.clear();

            for (var i = 0; i < this.shapes.length; i++) {
                var shape = this.shapes[i];
                console.log(shape);
                if (shape.x > this.width || shape.y > this.height || shape.x + shape.y < 0 || shape.y + shape.h < 0) {
                    continue;
                }
                this.shapes[i].draw(this.ctx);
            }
            if (this.selection) {
                console.log("Selection", this.selection);
                this.selection.drawSelect(this.ctx);
                //this.ctx.strokeStyle = selectColor;
                //this.ctx.lineWidth = lineWidth;
                //var el = this.selection;
                //this.ctx.strokeRect(el.x, el.y, el.w, el.h);
                //
                //var half = selectSize / 2;
                //
                //// 0 1 2
                //// 3   4
                //// 5 6 7
                //
                //this.selHandles[0].x = el.x - half;
                //this.selHandles[0].y = el.y - half;
                //
                //this.selHandles[1].x = el.x + el.w/2 - half;
                //this.selHandles[1].y = el.y - half;
                //
                //this.selHandles[2].x = el.x + el.w - half;
                //this.selHandles[2].y = el.y - half;
                //
                //this.selHandles[3].x = el.x - half;
                //this.selHandles[3].y = el.y + el.h/2 - half;
                //
                //this.selHandles[4].x = el.x + el.w - half;
                //this.selHandles[4].y = el.y + el.h/2 - half;
                //
                //this.selHandles[5].x = el.x - half;
                //this.selHandles[5].y = el.y + el.h - half;
                //
                //this.selHandles[6].x = el.x + el.w/2 - half;
                //this.selHandles[6].y = el.y + el.h - half;
                //
                //this.selHandles[7].x = el.x + el.w - half;
                //this.selHandles[7].y = el.y + el.h - half;
                //
                //this.ctx.fillStyle = selectColor;
                //for (var i = 0; i < this.selHandles.length; i++) {
                //    var cur = this.selHandles[i];
                //    this.ctx.fillRect(cur.x, cur.y, selectSize, selectSize);
                //}
            }

            this.update = false;
        }
    }
};

ImageMap.prototype.getBaseStyle = function(canvas) {
    var style = {

    };

};
