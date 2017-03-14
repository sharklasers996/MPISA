var PostDetails = function (id) {
    this.id = id;
    this.contentApi = null;
    this.uploadedAt = null;

    this.photoAlbumPageIndex = 0;

    this.infoLink = null;
    this.posterLink = null;

    this.title = null;
    this.text = null;

    this.embeds = [];
    this.links = [];

    this.photoAlbumPath = null;
    this.photoLinks = [];

    this.getPhotoBytesAsync = null;
    this.photoBytes = [];
};

PostDetails.prototype = {
    extend: function (contentItem) {
        if (contentItem.path.indexOf('info.json') !== -1) {
            this.infoLink = contentItem.tempLink;
            this.uploadedAt = contentItem.uploadedAt;
        }
        if (contentItem.path.indexOf('poster.') !== -1) {
            this.posterLink = contentItem.tempLink;
            this.photoLinks.push(this.posterLink);
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

        this.photoLinks.splice(0, 0, this.posterLink);

        var _self = this;
        this.getPhotoBytesAsync = this
             .contentApi
             .getImageBytes(this.photoLinks[this.photoAlbumPageIndex])
             .then(function (response) {
                 _self.photoBytes[_self.photoAlbumPageIndex] = arrayBufferToBase64(response);
             });
    },
    nextPhoto: function () {
        if (this.photoAlbumPageIndex < this.photoLinks.length - 1) {
            this.photoAlbumPageIndex++;
        } else {
            this.photoAlbumPageIndex = 0;
        }

        if (!this.photoBytes[this.photoAlbumPageIndex]) {
            var _self = this;
            this.getPhotoBytesAsync = this
                 .contentApi
                 .getImageBytes(this.photoLinks[this.photoAlbumPageIndex])
                 .then(function (response) {
                     _self.photoBytes[_self.photoAlbumPageIndex] = arrayBufferToBase64(response);
                 });
        }
    },
    previousPhoto: function () {
        if (this.photoAlbumPageIndex > 0) {
            this.photoAlbumPageIndex--;
        } else {
            this.photoAlbumPageIndex = this.photoLinks.length - 1;
        }
    },
    setContentApi: function (contentApi) {
        this.contentApi = contentApi;
    }
};