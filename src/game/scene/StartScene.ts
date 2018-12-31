class StartScene extends BaseScene {

    protected initView() {

        this.initGuideBitMap();
        this.initOperation();
    }

    private initGuideBitMap () {
        // getready图片
        let xiaoNiao:egret.Bitmap = GameUtil.createTextureByName( "s1_json#xiaoniao" );
        this.addChild(xiaoNiao)
        
        xiaoNiao.width = 320;
        xiaoNiao.height = 90;
        xiaoNiao.x = (GameUtil.getStageWidth() - xiaoNiao.width) / 2;
        xiaoNiao.y = 235;


        let data = RES.getRes("fly_json");
        let txtr: egret.Texture = RES.getRes("s2_png");

        let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        let mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "run" ) );
        this.addChild( mc1 );
        
        mc1.scaleX = 2;
        mc1.scaleY = 2;
        mc1.y = 460;
        mc1.x = (GameUtil.getStageWidth() - mc1.width) / 2;

        mc1.gotoAndPlay( "start" , -1);


        let mc1Tw = egret.Tween.get( mc1, {loop: true});
        mc1Tw.to( {y: 480}, 300 ).to({y: 460}, 300);
    }

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

    private initOperation () {
        // start
        let startBtn:egret.Bitmap = GameUtil.createTextureByName( "s1_json#start" );
        this.addChild(startBtn)
        
        startBtn.width = 212;
        startBtn.height = 138;
        startBtn.x = 103;
        startBtn.y = 690;

        GameUtil.bitmapToBtn(startBtn, ()=> {
            console.log('开始游戏')
            SceneController.showPlayScene()
        })

        // more
        let more:egret.Bitmap = GameUtil.createTextureByName( "s1_json#more" );
        this.addChild(more)
        
        more.width = 212;
        more.height = 138;
        more.x = 324;
        more.y = 690;


    }
}