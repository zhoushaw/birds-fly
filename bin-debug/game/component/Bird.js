var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Bird.prototype.onAddToStage = function (event) {
        this.init();
    };
    Bird.prototype.init = function () {
        var data = RES.getRes("fly_json");
        var txtr = RES.getRes("s2_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("run"));
        this.addChild(mc1);
        mc1.scaleX = 2;
        mc1.scaleY = 2;
        mc1.y = 460;
        mc1.x = (GameUtil.getStageWidth() - mc1.width) / 2;
        mc1.gotoAndPlay("start", -1);
        var mc1Tw = egret.Tween.get(mc1, { loop: true });
        mc1Tw.to({ y: 480 }, 300).to({ y: 460 }, 300);
    };
    return Bird;
}(egret.Sprite));
__reflect(Bird.prototype, "Bird");
