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
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartScene.prototype.initView = function () {
        this.initGuideBitMap();
        this.initOperation();
    };
    StartScene.prototype.initGuideBitMap = function () {
        // getready图片
        var xiaoNiao = GameUtil.createTextureByName("s1_json#xiaoniao");
        this.addChild(xiaoNiao);
        xiaoNiao.width = 320;
        xiaoNiao.height = 90;
        xiaoNiao.x = (GameUtil.getStageWidth() - xiaoNiao.width) / 2;
        xiaoNiao.y = 235;
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
    // private initGuideBitMap () {
    //     // getready图片
    //     let getReady:egret.Bitmap = GameUtil.createTextureByName( "s1_json#getready" );
    //     this.addChild(getReady)
    //     getReady.width = 320;
    //     getReady.height = 90;
    //     getReady.x = (GameUtil.getStageWidth() - getReady.width) / 2;
    //     getReady.y = 235;
    //     let descript:egret.Bitmap = GameUtil.createTextureByName( "s1_json#descript" );
    //     this.addChild(descript)
    //     descript.width = 160;
    //     descript.height = 130;
    //     descript.x = (GameUtil.getStageWidth() - descript.width) / 2;
    //     descript.y = 500;
    // }
    StartScene.prototype.initOperation = function () {
        // start
        var startBtn = GameUtil.createTextureByName("s1_json#start");
        this.addChild(startBtn);
        startBtn.width = 212;
        startBtn.height = 138;
        startBtn.x = 103;
        startBtn.y = 690;
        GameUtil.bitmapToBtn(startBtn, function () {
            console.log('开始游戏');
            SceneController.showPlayScene();
        });
        // more
        var more = GameUtil.createTextureByName("s1_json#more");
        this.addChild(more);
        more.width = 212;
        more.height = 138;
        more.x = 324;
        more.y = 690;
    };
    return StartScene;
}(BaseScene));
__reflect(StartScene.prototype, "StartScene");
