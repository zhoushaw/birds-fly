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
var PlayScene = (function (_super) {
    __extends(PlayScene, _super);
    function PlayScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayScene.prototype.initView = function () {
        this.initGuideBitMap();
        this.initOperation();
    };
    PlayScene.prototype.initGuideBitMap = function () {
        // getready图片
        var getReady = GameUtil.createTextureByName("s1_json#get-ready");
        this.addChild(getReady);
        getReady.width = 320;
        getReady.height = 90;
        getReady.x = (GameUtil.getStageWidth() - getReady.width) / 2;
        getReady.y = 235;
        var descript = GameUtil.createTextureByName("s1_json#guide");
        this.addChild(descript);
        descript.width = 160;
        descript.height = 130;
        descript.x = (GameUtil.getStageWidth() - descript.width) / 2;
        descript.y = 555;
    };
    PlayScene.prototype.initOperation = function () {
        var data = RES.getRes("fly_json");
        var txtr = RES.getRes("s2_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("run"));
        this.addChild(mc1);
        mc1.scaleX = 2;
        mc1.scaleY = 2;
        mc1.y = 600;
        mc1.x = 143;
        mc1.gotoAndPlay("start", -1);
        var mc1Tw = egret.Tween.get(mc1, { loop: true });
        mc1Tw.to({ y: 620 }, 300).to({ y: 600 }, 300);
    };
    return PlayScene;
}(BaseScene));
__reflect(PlayScene.prototype, "PlayScene");
