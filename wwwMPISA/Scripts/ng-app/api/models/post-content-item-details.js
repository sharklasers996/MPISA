var PostContentItemDetails = function (postContentItemDetailsArray, id) {
    this.embedsLink = null;
    this.linksLink = null;
    this.posterLink = null;
    this.textLink = null;
    this.titleLink = null;

    this.embeds = null;
    this.links = null;
    this.text = null;
    this.title = null;

    this.id = id;

    this.extend(postContentItemDetailsArray);
};

PostContentItemDetails.prototype = {
    extend: function (postContentItemDetailsArray) {

        var a = postContentItemDetailsArray.length;

        for (var i = 0; i < postContentItemDetailsArray.length; i++) {
            var detailsitem = postContentItemDetailsArray[i];
            var path = detailsitem.path;

            if (path.indexOf('embeds.txt') !== -1) {
                this.embedsLink = detailsitem.tempLink;
                continue;
            }
            if (path.indexOf('links.txt') !== -1) {
                this.linksLink = detailsitem.tempLink;
                continue;
            }
            if (path.indexOf('/poster.') !== -1) {
                this.posterLink = detailsitem.tempLink;
                continue;
            }
            if (path.indexOf('text.txt') !== -1) {
                this.textLink = detailsitem.tempLink;
                continue;
            }
            if (path.indexOf('title.txt') !== -1) {
                this.titleLink = detailsitem.tempLink;
                continue;
            }
        }
    }
};