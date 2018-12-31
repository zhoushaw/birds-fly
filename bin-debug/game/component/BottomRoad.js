var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BottomRoad = (function () {
    function BottomRoad(container) {
        this._stage = container;
        this.onAddToStage();
    }
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
        this.BottomRoadTw.to({ x: -GameUtil.getStageWidth() }, 3000);
    };
    BottomRoad.prototype.stopRun = function () {
        this.BottomRoadTw.pause();
    };
    return BottomRoad;
}());
__reflect(BottomRoad.prototype, "BottomRoad");
