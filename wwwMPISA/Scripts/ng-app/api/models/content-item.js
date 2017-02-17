var ContentItem = function (contentItem) {
    this.path = null;
    this.uploadedAt = null;
    this.mimeType = null;
    this.tempLink = null;
    this.isDir = false;

    this.isPhotoAlbum = false;
    this.isPost = false;

    this.getDetailsAsync = null;

    this.photoAlbumDetails = null;
    this.postDetails = null;

    this.extend(contentItem);
};

ContentItem.prototype = {
    extend: function (contentItem) {
        this.path = contentItem.path;
        this.uploadedAt = contentItem.uploadedAt;
        this.mimeType = contentItem.mimeType;
        this.tempLink = contentItem.tempLink;
        this.isDir = contentItem.isDir;

        if (this.isDir) {
            if (this.path.indexOf("post_") !== -1) {
                this.isPost = true;
            } else if (this.path.indexOf("photo_") !== -1) {
                this.isPhotoAlbum = true;
            }
        }
    }
};