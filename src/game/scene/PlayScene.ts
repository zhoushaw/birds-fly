declare interface Pipeline {
    parent: string,
    pipeline: eui.Image
}

class PlayScene  extends eui.Component {

    private getReady: egret.Bitmap // 准备图像
    private descript: egret.Bitmap // 提示操作图像
    private birdTw: egret.Tween // 小鸟动画实例
    private bird: egret.MovieClip
    
    public wall: eui.Group;
    public wall2: eui.Group;
    private pipelineArray: Array<Pipeline> = new Array();
    private grade: number = 0;
    private amoutDistance: number = 0;

    
    public constructor() {
        super();
        this.skinName = "resource/eui_skins/PlayScene.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.initView();
    }

    protected initView() {

        // 初始化管道，并添加至背景墙中
        this.wall = this.initPipeline(640,'wall');
        this.wall2 = this.initPipeline(1280,'wall2');
        this.addChild(this.wall);
        this.addChild(this.wall2);

        // 初始化引导
        this.initGuideBitMap();
        this.initOperation();
        BottomRoad.instance.startRun();
        
        // 增加点击事件
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.initEvent, this)
    }


    // 初始化点击
    private initEvent () {
        // 隐藏引导内容
        this.getReady.visible = false;
        this.descript.visible = false;

        egret.startTick(this.onTicker, this);

        egret.Tween.removeTweens(this.bird);
        let birdTw = egret.Tween.get( this.bird );
        let y = this.bird.y - this.bird.height * 3;
        y = y <=0 ? 0 : y;

        birdTw.to( {y, rotation: -30}, 200 ).call(()=>{
            egret.Tween.removeTweens(this.bird);
            let birdRotation = egret.Tween.get( this.bird );

            let birdMove = egret.Tween.get( this.bird, {
                onChange: () => {
                    // 已经触碰到底部游戏结束
                    if (this.bird.y >= 866) {
                        this.GameOver();
                    }
                }
            });

            let speed = ((GameUtil.getStageHeight() - 236 - this.bird.y) / (GameUtil.getStageHeight() - 236) ) * 1000;

            birdRotation.to({ rotation: 90 }, 400);
            birdMove.to( { y: GameUtil.getStageHeight() - 236 - this.bird.width }, speed, egret.Ease.sineIn);
        });

    }

    // 引导场景
    private initGuideBitMap () {
        // getready图片
        let getReady:egret.Bitmap = GameUtil.createTextureByName( "s1_json#get-ready" );
        this.getReady = getReady;
        this.addChild(getReady)
        
        getReady.width = 320;
        getReady.height = 90;
        getReady.x = GameUtil.calcMdPoz(getReady.width);
        getReady.y = 320;


        let descript:egret.Bitmap = GameUtil.createTextureByName( "s1_json#guide" );
        this.descript = descript;
        this.addChild(descript)
        
        descript.width = 233;
        descript.height = 205;
        descript.x = GameUtil.calcMdPoz(descript.width);
        descript.y = 555;
    }

    // 初始化小鸟
    private initOperation () {

        let data = RES.getRes("fly_json");
        let txtr: egret.Texture = RES.getRes("s2_png");

        let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        this.bird = new egret.MovieClip( mcFactory.generateMovieClipData( "run" ) );
        this.addChild( this.bird );
        
        this.bird.scaleX = 2;
        this.bird.scaleY = 2;
        this.bird.y = 600;
        this.bird.x = 143;
        this.bird.anchorOffsetX = 17;
        this.bird.anchorOffsetY = 12;
        this.setChildIndex(this.bird, 3);

        this.bird.gotoAndPlay( "start" , -1);

        this.birdTw = egret.Tween.get( this.bird, {loop: true});
        this.birdTw.to( {y: this.bird.y + 20}, 300 ).to({y: this.bird.y}, 300);
    }

    // 初始化管道
    private initPipeline (pozX,parent) {
        var wall = new eui.Group();
        wall.x = pozX;
        wall.y = 0;
        wall.width = 640;
        wall.height = 900;

        let pipelineList = [
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
        ]

        pipelineList.forEach((item) => {
            let pipelineRes:egret.Texture = RES.getRes( item.res );
            let pipelineImg = new eui.Image(pipelineRes);
            let height = Math.floor(Math.random() * (300 - 200 + 1) + 200);
            pipelineImg.height = height;
            pipelineImg.width = item.wd;
            pipelineImg.x = item.x;

            if (item.y === 'bottom') {
                pipelineImg.y = 900 - height;
            } else {
                pipelineImg.y = <number>item.y;
            }

            wall.addChild(pipelineImg);

            // 添加至管道列表
            this.pipelineArray.push({
                parent,
                pipeline: pipelineImg
            });
        })

        return wall;
    }


    // 定时器执行函数
    private onTicker (timeStamp: number): boolean {

        // 滚动墙壁
        this.wall.x -= 2;
        this.wall2.x -= 2;
        this.amoutDistance  += 2;

        this.wall.x = this.wall.x <= -this.wall.width ? (this.wall2.x + this.wall.width) : this.wall.x;
        this.wall2.x = this.wall2.x <= -this.wall2.width ? (this.wall.x + this.wall2.width) : this.wall2.x;

        // 计算得分
        this.computedGrade();
        console.log(this.grade);

        // 碰撞检测
        this.checkCollision();
        
        return false;
    }
    
    // 碰撞检测
    private checkCollision () {
        // 检测小鸟是否与管道碰撞
        let bird = new egret.Rectangle(this.bird.x,this.bird.y, this.bird.width, this.bird.height );
        let result = this.pipelineArray.every((item, index) => {

            let pipelineX = item.pipeline.x + this[item.parent].x;
            let pipelineY = item.pipeline.y + this[item.parent].y;
            let pipelineWh = item.pipeline.width;
            let pipelineHg = item.pipeline.height;
            let pipelineRc = new egret.Rectangle(pipelineX, pipelineY, pipelineWh, pipelineHg);


            // 检测是否得分
            return !pipelineRc.intersects(bird);
        })


        if (!result) {
            console.log('碰撞了');
            this.GameOver();
        }
    }

    // 计算得分
    private computedGrade () {
        // 开始计算跨过管道个数,使用总得飞行距离-第一个管道完成的距离，然后除以每跨过的一个管道需要的距离
        let computedPoz = GameUtil.getStageWidth() - this.bird.x - this.bird.width + 210;
        if (this.amoutDistance >= computedPoz) {
            if (this.grade ===0 ){ 
                this.grade = 1;
            } else {
                let computed = this.amoutDistance - computedPoz;
                this.grade = Math.floor((computed / 320)) + 1;
            }
        }
    }

    private GameOver () {
        BottomRoad.instance.stopRun();
        egret.stopTick(this.onTicker,this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.initEvent, this);
        this.bird.stop();
    }
}