var Post = function (contentItem) {
    this.path = null;


    this.isPhotoAlbum = false;

    this.getDetailsAsync = null;
    this.getPhotosAsync = null;
    this.details = null;

    this.extend(contentItem);
};

Post.prototype = {
    extend: function (contentItem) {
        this.path = contentItem.path;
        this.uploadedAt = contentItem.uploadedAt;

        if (this.path.indexOf("photo_") !== -1) {
            this.isPhotoAlbum = true;
        }
    }
};