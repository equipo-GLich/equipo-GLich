var framesBetween = function (min, max, name) {
    var frames = [];

    if (min > max) {
        for (var i=min; i>=max; i--) {
            frames.push(name + i + '.png');
        }
    } else {
        for (var i=min; i<= max; i++) {
            frames.push(name + i + '.png');
        }
    }

    return frames;
};
