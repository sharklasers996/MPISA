var Lyrics = function (item) {
    this.id = null;
    this.title = null;
    this.text = null;

    this.extend(item);
};

Lyrics.prototype = {
    extend: function (item) {
        this.id = item.id;
        this.title = item.title;
        this.text = item.text;
    }
};