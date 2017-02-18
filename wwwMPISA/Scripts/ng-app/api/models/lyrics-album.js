var LyricsAlbum = function (item) {
    this.title = null;
    this.lyrics = [];

    this.extend(item);
};

LyricsAlbum.prototype = {
    extend: function (item) {
        this.title = item.title;

        if (_.isArray(item.lyrics)) {
            this.lyrics = _.map(item.lyrics,
                function (lyrics) {
                    return new Lyrics(lyrics);
                });
        }
    }
};