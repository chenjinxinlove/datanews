(function() {
    'use strict'
    var Range = function() {
        this._mousePoint = {
            "left":0,
            "top":0
        };
        this._rangeW = 0;
        this._isrange = false;
        this._dValue = 0;
        this._bar = "";
        this._slide = "";
        this._contrast = 0;
        this._direction = "";
        this.touch = {};
    };
    Range.prototype.init= function (options,callback) {
        var _options = {};
        _options.max = options.max || 10;
        _options.min = options.min || 1;
        _options.step = options.step || 1;
        _options.slide = options.slide;
        _options.bar = options.bar;
        _options.push = options.push;
        _options.value = options.value || 0;
        this._direction = options.direction || "left";
        this._bar = document.getElementById(_options.bar);
        this._slide = document.getElementById(_options.slide);
        this._push = document.getElementById(_options.push);
        this._rangeW = + (window.getComputedStyle(this._push).width).replace('px', '');
        this._rangeH = + (window.getComputedStyle(this._push).height).replace('px', '');
        this._contrast = this._rangeW / (_options.max - _options.min);
        this._start(_options,callback);

    };
    Range.prototype._setCss = function (_this, _optionCss) {
        if( !_this && _this.nodeType !==3 && _this.nodeType !== 8 && _this.style){
            return;
        }
        for(var cs in _optionCss){
            _this.style[cs] = _optionCss.cs;
        }
        return _this;
    };
    Range.prototype._getMousePoint = function (_e) {
        var _left = 0,
            _top = 0;
        if(typeof  window.pageXOffset !== 'undefined'){
            _left = window.pageXOffset;
            _top = window.pageYOffset;
        }
        else if (typeof document.documentMode !== 'undefined' && document.documentMode !== "BackCompot"){
            _left = document.documentElement.scrollLeft;
            _top = document.documentElement.scrollTop;
        }
        else{
            _left = document.body.scrollLeft;
            _top = document.body.scrollTop;
        }
        this._mousePoint.left = _left + _e.clientX;
        this._mousePoint.top = _top + _e.clientY;
        return this._mousePoint;
    };
    Range.prototype._getAbleft = function (_e) {
        var _left = _e.offsetLeft,
            _current = _e.offsetParent;
        while(_current !== null){
            _left += _current.offsetLeft;
            _current = _current.offsetParent;
        }
        return _left;
    };
    Range.prototype._getAbtop = function (_e) {
        var _top = _e.offsetTop,
            _current = _e.offsetParent;
        while(_current !== null){
            _top += _current.offsetTop;
            _current = _current.offsetParent;
        }
        return _top;
    };
    Range.prototype._preventDefault = function (_e) {
        if(!_e.preventDefault()){
            _e.preventDefault();
        }else{
            _e.returnValue = false;
        }
    };
    Range.prototype._stopP = function (_e) {
        if(!_e.stopPropagation()){
            _e.stopPropagation();
        }else{
            _e.cancelBubble = false;
        }
    }
    Range.prototype._start = function (_options,callback) {
        var self = this;
        var _width = 0;
        var _height = 0;
        var width_img = document.body.clientWidth - 15;
        

        document.getElementById(_options.bar).ontouchstart = function (_e) {
            self._preventDefault(_e);
            self._getMousePoint(_e);
            self.touch.initiated = true
            self.touch.startX = _e.touches[0].pageX
            self.touch.left_bar = getComputedStyle(document.getElementById('operation')).left.replace('px', '');
            self._isrange = true;
           
        };
        document.getElementById(_options.bar).ontouchmove = function (_e) {
            self._preventDefault(_e);
            if(self._isrange){
                self._getMousePoint(_e);
                var  _width = _e.touches[0].pageX - self.touch.startX
                if (self.touch.left_bar.indexOf('%') !== -1) {
                    self.touch.left_bar = width_img * (self.touch.left_bar.replace('%', '') / 100)
                }
                // alert(self.touch.left_bar)
                var left_js =Number(self.touch.left_bar) + _width;
                if (left_js < 0 || left_js > width_img) {
                    return;
                }
                if (left_js < 13) {
                    left_js = 13
                }
                self._bar.style.left = left_js +  "px";
                self._push.style.clip = "rect(0px," + left_js +"px,"+ self._rangeH +"px,0px)" ;
            }
        }
        document.getElementById(_options.bar).ontouchend = function () {
            self._isrange = false;

            var num = Math.ceil(_width / self._contrast);


            callback(num)
        }

    }
    window.Range = Range;
})();


window.onload = function () {
    var range = new Range();
    document.getElementById('img1').style.width = document.body.clientWidth + 'px';
    document.getElementById('operation').style.height = document.getElementById('main-img').clientHeight + 'px'
    range.init({'bar': 'operation', 'slide': 'main-img', 'push': 'img1'},function (num) {
        console.log(num);
    })
}