/**
 * imageSlider.jquery.js
 *
 * By Nachiketha S H Upadhya
 * https://github.com/nachikethashu/Image-Slider-JQuery
 *
 * Free to use under the MIT license.
 *
 * Aug 2015
 */

(function($) {

    $.fn.imageSlider = function(data) {
        var elem = this;
        elem.css({
            position: 'relative',
            overflow: 'hidden'
        });

        var leftArrow = $("<a/>", {
            class: "left-arrow"
        }).text("<<").css({
            'border-radius': '0 2px 2px 0'
        });
        var rightArrow = $("<a/>", {
            class: "right-arrow"
        }).text(">>").css({
            'border-radius': '2px 0 0 2px',
            right: '0'
        });

        elem.append(leftArrow).append(rightArrow);
        elem.find('a').css({
            userSelect: 'none'
        });

        $("a.left-arrow, a.right-arrow").addClass('arrow');

        var ul = $("<ul class='image-ul'></ul>").addClass('image-ul');
        var items = [];
        var numOfImages = data.length;
        for (var i = 0; i < numOfImages; i++) {
            var item = $("<li class='image-li'></li>").val(i + 1).addClass('image-li').css({
                'background-image': 'url(' + data[i].src + ')'
            }).append($('<footer/>').text(data[i].title).addClass('image-footer'));
            items.push(item);
        }

        ul.append(items);
        ul.appendTo(elem);
        var ulElem = elem.find('ul');

        elem.find("li").css({
            position: 'relative',
            display: 'block',
            'float': 'left',
            width: elem.width(),
            height: elem.height()
        });

        var slideCount = elem.find('ul li').length;
        var slideWidth = elem.width();
        var slideHeight = elem.height();
        var sliderUlWidth = slideCount * slideWidth;

        elem.css({
            width: slideWidth,
            height: slideHeight
        });

        elem.children("ul").css({
            width: sliderUlWidth,
            marginLeft: -slideWidth
        });

        elem.find('ul li:last-child').prependTo(elem.find('ul'));

        elem.moveLeft = function() {
            ulElem.animate({
                left: +slideWidth
            }, 200, function() {
                elem.find('ul li:last-child').prependTo(ulElem);
                ulElem.css('left', '');
                $(elem).trigger("slide", elem.find("ul li:nth-child(2)").val());
            });
            return elem;
        };

        elem.moveRight = function() {
            ulElem.animate({
                left: -slideWidth
            }, 200, function() {
                elem.find('ul li:first-child').appendTo(ulElem);
                ulElem.css('left', '');
                $(elem).trigger("slide", elem.find("li:nth-child(2)").val());
            });
            return elem;
        };

        $('a.left-arrow').click(function() {
            elem.moveLeft();
        });

        $('a.right-arrow').click(function() {
            elem.moveRight();
        });

        return elem;
    };

}(jQuery));
