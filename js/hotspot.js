function Hotspot(x, y, w, h, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 100;
    this.h = h || 100;
    this.color = color || "#CCCCCC";
}

Hotspot.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    console.log("Draw hotspot", this.x, this.y, this.w, this.h);
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

Hotspot.prototype.contains = function(mx, my) {
    return (this.x <= mx) &&
        (this.x + this.w >= mx) &&
        (this.y <= my) &&
        (this.y + this.h >= my);
};

Hotspot.prototype.isValid = function(parent) {
    return (this.x >= 0 && this.x <= parent.width) &&
        (this.y >= 0 && this.y <= parent.height) &&
        this.x >= 0 && this.y >= 0 && this.w >= 0 && this.h >= 0;
};