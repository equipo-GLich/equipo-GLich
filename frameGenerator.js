var framesBetween = function (min, max, name) {
    var frames = [];

    for (var i=min; i<= max; i++) {
        frames.push(name + i + '.png');
    }

    return frames;
};
