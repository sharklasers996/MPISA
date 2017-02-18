var LyricsAlbum = function (item) {
    this.path = null;
    this.title = null;

    this.lyrics = [];

    this.extend(item);
};

LyricsAlbum.prototype = {
    extend: function (item) {
        this.title = item.path.replace(/\/Lyrics\//g, '');
    }
};