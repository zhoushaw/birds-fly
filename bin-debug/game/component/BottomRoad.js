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
var BottomRoad = (function (_super) {
    __extends(BottomRoad, _super);
    function BottomRoad() {
        return _super.call(this) || this;
        // this._stage = container
        // this.onAddToStage();
    }
    Object.defineProperty(BottomRoad, "instance", {
        get: function () {
            if (!this.bottomRoad) {
                this.bottomRoad = new BottomRoad();
            }
            return this.bottomRoad;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置存放游戏场景的容器
     */
    BottomRoad.prototype.setStage = function (stage) {
        this._stage = stage;
    };
    BottomRoad.prototype.onAddToStage = function () {
        var s1Bbottombg = RES.getRes("s1_json#bottom-road");
        var BottomRoad = new egret.Bitmap(s1Bbottombg);
        BottomRoad.y = GameUtil.getStageHeight() - 236;
        BottomRoad.width = GameUtil.getStageWidth() * 2;
        BottomRoad.height = 236;
        this.BottomRoad = BottomRoad;
        this._stage.addChild(BottomRoad);
    };
    BottomRoad.prototype.startRun = function () {
        var x = 0;
        this.BottomRoadTw = egret.Tween.get(this.BottomRoad, { loop: true });
        this.BottomRoadTw.to({ x: -GameUtil.getStageWidth() }, 4000);
    };
    BottomRoad.prototype.stopRun = function () {
        this.BottomRoadTw.setPaused(true);
    };
    return BottomRoad;
}(egret.DisplayObjectContainer));
__reflect(BottomRoad.prototype, "BottomRoad");
