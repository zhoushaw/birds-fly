class StartScene extends BaseScene {

    protected initView() {

        // this.initGuideBitMap();
        // this.initOperation();
    }

    private initGuideBitMap () {
        // getready图片
        let xiaoNiao:egret.Bitmap = GameUtil.createTextureByName( "s1_json#xiaoniao" );
        this.addChild(xiaoNiao)
        
        xiaoNiao.width = 320;
        xiaoNiao.height = 90;
        xiaoNiao.x = (GameUtil.getStageWidth() - xiaoNiao.width) / 2;
        xiaoNiao.y = 235;

        let bird = new Bird();
        this.addChild(bird);
        
    }


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