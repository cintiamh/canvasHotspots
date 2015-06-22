function Hotspot(x, y, w, h, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 100;
    this.h = h || 100;
    this.color = color || "#CCCCCC";

    this.select = {
        color: "#CC0000",
        lineWidth: 2,
        boxSize: 6
    };
    this.handles = [];
}

Hotspot.prototype = {
    draw: function(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    },

    contains: function(mx, my) {
        return (this.x <= mx) &&
            (this.x + this.w >= mx) &&
            (this.y <= my) &&
            (this.y + this.h >= my);
    },

    drawSelect: function(ctx) {
        var half = this.select.boxSize / 2;

        ctx.strokeStyle = this.select.color;

        // border:
        ctx.lineWidth = this.select.lineWidth;
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        // 0 1 2
        // 3   4
        // 5 6 7
        for (var i = 0; i < 8; i++) {
            this.handles[i] = {};
        }

        this.handles[0].x = this.x - half;
        this.handles[0].y = this.y - half;

        this.handles[1].x = this.x + this.w/2 - half;
        this.handles[1].y = this.y - half;

        this.handles[2].x = this.x + this.w - half;
        this.handles[2].y = this.y - half;

        this.handles[3].x = this.x - half;
        this.handles[3].y = this.y + this.h/2 -half;

        this.handles[4].x = this.x + this.w - half;
        this.handles[4].y = this.y + this.h/2 - half;

        this.handles[5].x = this.x - half;
        this.handles[5].y = this.y + this.h - half;

        this.handles[6].x = this.x + this.w/2 - half;
        this.handles[6].y = this.y + this.h - half;

        this.handles[7].x = this.x + this.w - half;
        this.handles[7].y = this.y + this.h - half;

        ctx.fillStyle = this.select.color;

        for (var i = 0; i < this.handles.length; i++) {
            var cur = this.handles[i];
            ctx.fillRect(cur.x, cur.y, this.select.boxSize, this.select.boxSize);
        }
    }
};

Hotspot.prototype.isValid = function(parent) {
    return (this.x >= 0 && this.x <= parent.width) &&
        (this.y >= 0 && this.y <= parent.height) &&
        this.x >= 0 && this.y >= 0 && this.w >= 0 && this.h >= 0;
};
