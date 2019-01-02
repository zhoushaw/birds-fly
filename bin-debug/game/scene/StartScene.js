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
        // this.initGuideBitMap();
        // this.initOperation();
    };
    StartScene.prototype.initGuideBitMap = function () {
        // getready图片
        var xiaoNiao = GameUtil.createTextureByName("s1_json#xiaoniao");
        this.addChild(xiaoNiao);
        xiaoNiao.width = 320;
        xiaoNiao.height = 90;
        xiaoNiao.x = (GameUtil.getStageWidth() - xiaoNiao.width) / 2;
        xiaoNiao.y = 235;
        var bird = new Bird();
        this.addChild(bird);
    };
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
