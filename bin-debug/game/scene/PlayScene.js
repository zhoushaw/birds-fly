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
        var _this = _super.call(this) || this;
        _this.pipelineArray = new Array();
        _this.grade = 0;
        _this.amoutDistance = 0;
        _this.skinName = "resource/eui_skins/PlayScene.exml";
        return _this;
    }
    PlayScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initView();
    };
    PlayScene.prototype.initView = function () {
        // 初始化管道，并添加至背景墙中
        this.wall = this.initPipeline(640, 'wall');
        this.wall2 = this.initPipeline(1280, 'wall2');
        this.addChild(this.wall);
        this.addChild(this.wall2);
        // 初始化引导
        this.initGuideBitMap();
        this.initOperation();
        BottomRoad.instance.startRun();
        // 增加
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.initEvent, this);
    };
    // 初始化点击
    PlayScene.prototype.initEvent = function () {
        var _this = this;
        // 隐藏引导内容
        this.getReady.visible = false;
        this.descript.visible = false;
        egret.startTick(this.onTicker, this);
        egret.Tween.removeTweens(this.bird);
        var birdTw = egret.Tween.get(this.bird);
        var y = this.bird.y - this.bird.height * 3;
        y = y <= 0 ? 0 : y;
        birdTw.to({ y: y, rotation: -30 }, 200).call(function () {
            egret.Tween.removeTweens(_this.bird);
            var birdRotation = egret.Tween.get(_this.bird);
            var birdMove = egret.Tween.get(_this.bird, {
                onChange: function () {
                    // 已经触碰到底部游戏结束
                    if (_this.bird.y >= 866) {
                        _this.GameOver();
                    }
                }
            });
            var speed = ((GameUtil.getStageHeight() - 236 - _this.bird.y) / (GameUtil.getStageHeight() - 236)) * 1000;
            birdRotation.to({ rotation: 90 }, 400);
            birdMove.to({ y: GameUtil.getStageHeight() - 236 - _this.bird.width }, speed, egret.Ease.sineIn);
        });
    };
    // 引导场景
    PlayScene.prototype.initGuideBitMap = function () {
        // getready图片
        var getReady = GameUtil.createTextureByName("s1_json#get-ready");
        this.getReady = getReady;
        this.addChild(getReady);
        getReady.width = 320;
        getReady.height = 90;
        getReady.x = GameUtil.calcMdPoz(getReady.width);
        getReady.y = 320;
        var descript = GameUtil.createTextureByName("s1_json#guide");
        this.descript = descript;
        this.addChild(descript);
        descript.width = 233;
        descript.height = 205;
        descript.x = GameUtil.calcMdPoz(descript.width);
        descript.y = 555;
    };
    // 初始化小鸟
    PlayScene.prototype.initOperation = function () {
        var data = RES.getRes("fly_json");
        var txtr = RES.getRes("s2_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.bird = new egret.MovieClip(mcFactory.generateMovieClipData("run"));
        this.addChild(this.bird);
        this.bird.scaleX = 2;
        this.bird.scaleY = 2;
        this.bird.y = 600;
        this.bird.x = 143;
        this.bird.anchorOffsetX = 17;
        this.bird.anchorOffsetY = 12;
        this.setChildIndex(this.bird, 3);
        this.bird.gotoAndPlay("start", -1);
        this.birdTw = egret.Tween.get(this.bird, { loop: true });
        this.birdTw.to({ y: this.bird.y + 20 }, 300).to({ y: this.bird.y }, 300);
    };
    // 初始化管道
    PlayScene.prototype.initPipeline = function (pozX, parent) {
        var _this = this;
        var wall = new eui.Group();
        wall.x = pozX;
        wall.y = 0;
        wall.width = 640;
        wall.height = 900;
        var pipelineList = [
            {
                res: "s2_json#pipeline-green-down",
                wd: 100,
                x: 110,
                y: 0,
                type: 'down'
            },
            {
                res: "s2_json#pipeline-green-down",
                wd: 100,
                x: 430,
                y: 0
            },
            {
                res: "s2_json#pipeline-green-up",
                wd: 100,
                x: 110,
                y: 'bottom',
                type: 'down'
            },
            {
                res: "s2_json#pipeline-green-up",
                wd: 100,
                x: 430,
                y: 'bottom'
            }
        ];
        pipelineList.forEach(function (item) {
            var pipelineRes = RES.getRes(item.res);
            var pipelineImg = new eui.Image(pipelineRes);
            var height = Math.floor(Math.random() * (300 - 200 + 1) + 200);
            pipelineImg.height = height;
            pipelineImg.width = item.wd;
            pipelineImg.x = item.x;
            if (item.y === 'bottom') {
                pipelineImg.y = 900 - height;
            }
            else {
                pipelineImg.y = item.y;
            }
            wall.addChild(pipelineImg);
            // 添加至管道列表
            _this.pipelineArray.push({
                parent: parent,
                pipeline: pipelineImg
            });
        });
        return wall;
    };
    // 定时器执行函数
    PlayScene.prototype.onTicker = function (timeStamp) {
        // 滚动墙壁
        this.wall.x -= 2;
        this.wall2.x -= 2;
        this.amoutDistance += 2;
        this.wall.x = this.wall.x <= -this.wall.width ? (this.wall2.x + this.wall.width) : this.wall.x;
        this.wall2.x = this.wall2.x <= -this.wall2.width ? (this.wall.x + this.wall2.width) : this.wall2.x;
        // 计算得分
        this.computedGrade();
        console.log(this.grade);
        // 碰撞检测
        this.checkCollision();
        return false;
    };
    // 碰撞检测
    PlayScene.prototype.checkCollision = function () {
        var _this = this;
        // 检测小鸟是否与管道碰撞
        var bird = new egret.Rectangle(this.bird.x, this.bird.y, this.bird.width, this.bird.height);
        var result = this.pipelineArray.every(function (item, index) {
            var pipelineX = item.pipeline.x + _this[item.parent].x;
            var pipelineY = item.pipeline.y + _this[item.parent].y;
            var pipelineWh = item.pipeline.width;
            var pipelineHg = item.pipeline.height;
            var pipelineRc = new egret.Rectangle(pipelineX, pipelineY, pipelineWh, pipelineHg);
            // 检测是否得分
            return !pipelineRc.intersects(bird);
        });
        if (!result) {
            console.log('碰撞了');
            this.GameOver();
        }
    };
    // 计算得分
    PlayScene.prototype.computedGrade = function () {
        // 开始计算跨过管道个数,使用总得飞行距离-第一个管道完成的距离，然后除以每跨过的一个管道需要的距离
        var computedPoz = GameUtil.getStageWidth() - this.bird.x - this.bird.width + 210;
        if (this.amoutDistance >= computedPoz) {
            if (this.grade === 0) {
                this.grade = 1;
            }
            else {
                var computed = this.amoutDistance - computedPoz;
                this.grade = Math.floor((computed / 320)) + 1;
            }
        }
    };
    PlayScene.prototype.GameOver = function () {
        BottomRoad.instance.stopRun();
        egret.stopTick(this.onTicker, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.initEvent, this);
        this.bird.stop();
    };
    return PlayScene;
}(eui.Component));
__reflect(PlayScene.prototype, "PlayScene");
