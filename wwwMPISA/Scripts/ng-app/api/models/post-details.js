var PostDetails = function (id) {
    this.id = id;

    this.infoLink = null;
    this.posterLink = null;

    this.title = null;
    this.text = null;

    this.embeds = [];
    this.links = [];

    this.photoAlbumPath = null;
    this.photoLinks = [];
};

PostDetails.prototype = {
    extend: function (contentItem) {
        if (contentItem.path.indexOf('info.json') !== -1) {
            this.infoLink = contentItem.tempLink;
        }
        if (contentItem.path.indexOf('poster.') !== -1) {
            this.posterLink = contentItem.tempLink;
        }
        if (contentItem.isDir && contentItem.path.indexOf('photos') !== -1) {
            this.photoAlbumPath = contentItem.path;
        }
    },
    set: function (infoJson) {
        this.title = infoJson.title.trim();
        this.text = infoJson.text.trim();

        if (infoJson.embeds !== undefined) {
            this.embeds = infoJson.embeds;
        }
        if (infoJson.links !== undefined) {
            this.links = infoJson.links;
        }
    },
    addPhotos: function (contentItems) {
        this.photoLinks = _.map(contentItems,
         function (item) {
             return item.tempLink;
         });
    }
};