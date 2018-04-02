/*开始使用zepto完成轮播图*/
/*1. 无缝自动轮播 点改变*/
/*2. 手势切换上一张和下一张*/
$(function () {
    var $banner = $('.sn_banner');
    var width = $banner.width();
    /*如果要支持 jquery扩展选择器  需要一个selector模块*/
    var $imageBox = $banner.find('ul:first');
    var $pointBox = $banner.find('ul:eq(1)');
    var index = 1;
    var animateFuc = function () {
        $imageBox.animate({'transform':'translateX('+(-index*width)+'px)'},200,'linear',function () {
            if(index >= 9){
                index = 1;
                $imageBox.css({'transform':'translateX('+(-index*width)+'px)'});
            }else if(index <= 0){
                index = 8;
                $imageBox.css({'transform':'translateX('+(-index*width)+'px)'});
            }
            /*index 1-8 */
            $pointBox.find('li').removeClass('now').eq(index-1).addClass('now');
        });
    }
    var timer = setInterval(function () {
        index ++;
        /*如果要支持 jquery自定义动画animate  需要一个fx模块*/
        animateFuc();
    },5000);
    /*zepto支持滑动事件 swipe swipeLeft swipeRight swipeUp swipeDown*/
    /*如果要支持 手势滑动事件  需要一个touch模块*/
    $imageBox.on('swipeLeft',function () {
        console.log('next');
        index ++;
        animateFuc();
    }).on('swipeRight',function () {
        console.log('prev');
        index --;
        animateFuc();
    });
});