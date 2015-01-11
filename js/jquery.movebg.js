(function($) {
	$.fn.movebg = function(options) {
		var defaults = {
			width: 25,
			/*每一块所占的百分比*/
			extra: 5,
			/*回弹的百分比*/
			speed: 300,
			/*块移动的速度*/
			rebound_speed: 300 /*回弹的速度*/
		};
		var defaultser = $.extend(defaults, options); /*将用户参数和默认参数进行扩展*/
		return this.each(function() {
			var _this = $(this);
			var _item = _this.children("ul").children("li").children("a"); /*找到触发滑块滑动的元素*/
			var all_navbox = $(".mynav-box");
			var origin = _this.children("ul").children("li.cur").index(); /*获得当前导航的索引，即默认需要进行高亮的地方，比如是新添加的功能,需引起注意*/
			var _mover = _this.find(".move-bg"); /*找到滑块，注意滑块布局为absolute，不占位，需要使用top和left进行绝对定位*/
			var hidden; /*设置一个变量当html中没有规定cur时在鼠标移出导航后消失*/
			if (origin == -1) {
				origin = 0;
				hidden = 1
			} else {
				_mover.show()
			}; /*如果没有定义cur,则默认从第一个滑动出来*/
			var cur = prev = origin; /*初始化当前的索引值等于上一个及初始值;*/
			var extra = defaultser.extra; /*滑动多与百分比*/
			_mover.css({
				left: "" + defaultser.width * origin + "%"
			}); /*设置滑块当前显示的位置*/

			//设置鼠标经过事件
			_item.each(function(index, it) {
				$(it).mouseover(function() {
					cur = index; /*对当前滑块值进行赋值*/
					if (prev != cur) {
						all_navbox.hide();
						/*传如前*/
						//_cur_navbox.show()
						_cur_navbox = $(it).parent().find(".mynav-box");
						move($(_cur_navbox));
						prev = cur; /*滑动完成对上个滑块值进行赋值*/
					}
				});
			});
			//wrapper
			$(".wraper").mouseleave(function() {
				all_navbox.hide();
				if (cur != origin) {
					cur = origin; /*鼠标离开导航时当前滑动值等于最初滑块值*/
					move(null);
					prev=origin;
					if (hidden == 1) {
						_mover.stop().fadeOut();
					} /*当html中没有规定cur时在鼠标移出导航后消失*/
				}
			});

			//滑动方法

			function move($obj) {
				_mover.clearQueue();
				if (cur < prev) {
					extra = -Math.abs(defaultser.extra);
				} /*当当前值小于上个滑块值时，额外滑动值为负数*/
				else {
					extra = Math.abs(defaultser.extra)
				}; /*当当前值大于上个滑块值时，滑动值为正数*/
				_mover.show();
				//停止当前所有动画
				_mover.stop(true);
				//停止nav-box动画
				all_navbox.stop(true);
				//滑动 最远处(加上extra)
				
				/*_mover.animate({
					left: "" + Number(cur * defaultser.width + extra) + "%"
				}, defaultser.speed);
				if ($obj != null)
				$obj.slideDown(200);
				_mover.animate({
					left: "" + Number(cur * defaultser.width) + "%"
				}, defaultser.speed);*/
				/*为什么这里需要使用queue，其实不用也可以，用了可扩展性强
				 *when you are using methods that animate content, those animations are added to
				 *what is called a queue, specifically the "fx" queue. normal jquery methods,
				 *such as prependTo(), are not added to the "fx" queue, therefore they get
				 *executed immediately instead of waiting till the previously added ite
				 *in the queue is executed.
				 */
				_mover.queue(function() {
				_mover.animate({
					left: "" + Number(cur * defaultser.width + extra) + "%"
				}, defaultser.rebound_speed);
				}).dequeue();
				
				 if ($obj != null)
				_mover.queue(function() {
				_mover.animate({
					left: "" + Number(cur * defaultser.width + extra) + "%"
				}, defaultser.rebound_speed,function(){$obj.slideDown(200);});
				}).dequeue();
				else
				_mover.queue(function() {
				_mover.animate({
					left: "" + Number(cur * defaultser.width + extra) + "%"
				}, defaultser.rebound_speed);
				}).dequeue();
				_mover.queue(function() {
				_mover.animate({
					left: "" + cur * defaultser.width + "%"
				}, defaultser.rebound_speed);
				}).dequeue();
				
			};
		})
	}
})(jQuery);