var ContentItem = function (contentItem) {
    this.path = null;
    this.uploadedAt = null;
    this.mimeType = null;
    this.tempLink = null;
    this.isDir = false;
    
    this.extend(contentItem);
};

ContentItem.prototype = {
    extend: function (contentItem) {
        this.path = contentItem.path;
        this.uploadedAt = contentItem.uploadedAt;
        this.mimeType = contentItem.mimeType;
        this.tempLink = contentItem.tempLink;
        this.isDir = contentItem.isDir;
    }
};