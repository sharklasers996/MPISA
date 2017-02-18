var Lyrics = function (item) {
    this.tempLink = item.tempLink;
    this.title = null;
    this.text = null;
};

Lyrics.prototype = {
    extend: function (item) {
        // set title
    },
    setText: function (text) {
        this.text = text;
    }
};