var prev = 1;

function mynav($this) {
    //alert("fa");
    var defaultser = {
        width: 25,
        /*每一块所占的百分比*/
        extra: 5,
        /*回弹的百分比*/
        speed: 300,
        /*块移动的速度*/
        rebound_speed: 300 /*回弹的速度*/
    };
    //var defaultser = $.extend(defaults, options); /*将用户参数和默认参数进行扩展*/
    var _this = $this;
    var _item = _this.children("a"); /*找到触发滑块滑动的元素*/
    var all_navbox = $(".nav-box");
    var _cur_navbox = _this.children(".nav-box"); /*找到触发滑块滑动的元素*/
    var origin = _this.index(); /*获得当前导航的索引，即默认需要进行高亮的地方，比如是新添加的功能,需引起注意*/
    var _mover = $(".move-bg"); /*找到滑块，注意滑块布局为absolute，不占位，需要使用top和left进行绝对定位*/
    var cur = origin; /*初始化当前的索引值等于上一个及初始值;*/
    var extra = defaultser.extra; /*滑动多与百分比*/
    _mover.show();
    _mover.css({
        left: "" + defaultser.width * prev + "%"
    }); /*设置滑块当前显示的位置*/

    cur = origin; /*对当前滑块值进行赋值*/
    if (prev != cur) {
        all_navbox.hide();
        move($(_cur_navbox));
        prev = cur; /*滑动完成对上个滑块值进行赋值*/
    }
    //滑动方法

    function move($obj) {
        if (cur < prev) {
            extra = -Math.abs(defaultser.extra);
        } else {
            extra = Math.abs(defaultser.extra)
        };
        _mover.show();
        //停止当前所有动画
        _mover.stop(true);
        //停止nav-box动画
        all_navbox.stop(true);
        //滑动 最远处(加上extra)
        _mover.animate({
            left: "" + Number(cur * defaultser.width + extra) + "%"
        }, defaultser.speed);
        $obj.slideDown(200);
        _mover.animate({
            left: "" + Number(cur * defaultser.width) + "%"
        }, defaultser.speed);
    };

}