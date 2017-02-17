var PostLink = function (linkLine) {
    this.text = null;
    this.link = null;

    if (_.isString(linkLine)) {
        this.extend(linkLine);
    }
};

PostLink.prototype = {
    extend: function (linkLine) {
        var splitValue = linkLine.split('|');

        if (splitValue.length === 2) {
            this.text = splitValue[0].trim();
            this.link = splitValue[1].trim();
        }
    }
};