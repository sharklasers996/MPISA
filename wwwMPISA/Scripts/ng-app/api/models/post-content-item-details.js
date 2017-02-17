var PostContentItemDetails = function (postContentItemDetailsArray, id) {
    this.embedsLink = null;
    this.linksLink = null;
    this.posterLink = null;
    this.textLink = null;
    this.titleLink = null;

   // this.embeds = null;
    this.links = null;
    this.text = null;
    this.title = null;

    this.id = id;

    this.postLinks = [];
    this.embeds = [];

    this.extend(postContentItemDetailsArray);
};

PostContentItemDetails.prototype = {
    extend: function (postContentItemDetailsArray) {
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
    },
    addPostLinks: function (content) {
        var lines = content.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var postLink = new PostLink(lines[i]);
            this.postLinks.push(postLink);
        }
    },
    addEmbeds: function(content) {
        var lines = content.split('\n');
        for (var i = 0; i < lines.length; i++) {
            this.embeds.push(lines[i].trim());
        }
    }
};