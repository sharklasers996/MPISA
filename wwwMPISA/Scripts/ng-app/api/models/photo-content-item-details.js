var PhotoContentItemDetails = function (photoContentItemDetailsArray, id) {
    this.titleLink = null;
    this.textLink = null;
    this.posterLink = null;
    this.photoLinks = [];
    this.photoAlbumPath = null;

    this.id = id;

    this.text = null;
    this.title = null;

    this.extend(photoContentItemDetailsArray);
    console.log();
};

PhotoContentItemDetails.prototype = {
    extend: function (photoContentItemDetailsArray) {
        for (var i = 0; i < photoContentItemDetailsArray.length; i++) {
            var detailsitem = photoContentItemDetailsArray[i];
            var path = detailsitem.path;

            if (path.indexOf('text.txt') !== -1) {
                this.textLink = detailsitem.tempLink;
                continue;
            }
            if (path.indexOf('title.txt') !== -1) {
                this.titleLink = detailsitem.tempLink;
                continue;
            }
            if (detailsitem.mimeType !== null
                && detailsitem.mimeType.indexOf('image') !== -1) {
                if (path.indexOf('poster') !== -1) {
                    this.posterLink = detailsitem.tempLink;
                }
                continue;
            }
            if (detailsitem.isDir
                && path.indexOf('photos') !== -1) {
                this.photoAlbumPath = path;
            }
        }
    },
    addPhotos: function (contentItemArray) {
        this.photoLinks = _.map(contentItemArray,
            function (item) {
                return item.tempLink;
            });
    }
};