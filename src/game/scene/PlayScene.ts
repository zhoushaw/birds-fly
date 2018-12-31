class PlayScene extends BaseScene {

    protected initView() {

        this.initGuideBitMap();
        this.initOperation();
    }

    private initGuideBitMap () {
        // getready图片
        let getReady:egret.Bitmap = GameUtil.createTextureByName( "s1_json#get-ready" );
        this.addChild(getReady)
        
        getReady.width = 320;
        getReady.height = 90;
        getReady.x = (GameUtil.getStageWidth() - getReady.width) / 2;
        getReady.y = 235;


        let descript:egret.Bitmap = GameUtil.createTextureByName( "s1_json#guide" );
        this.addChild(descript)
        
        descript.width = 160;
        descript.height = 130;
        descript.x = (GameUtil.getStageWidth() - descript.width) / 2;
        descript.y = 555;
    }

    private initOperation () {


        let data = RES.getRes("fly_json");
        let txtr: egret.Texture = RES.getRes("s2_png");

        let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        let mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "run" ) );
        this.addChild( mc1 );
        
        mc1.scaleX = 2;
        mc1.scaleY = 2;
        mc1.y = 600;
        mc1.x = 143;

        mc1.gotoAndPlay( "start" , -1);


        let mc1Tw = egret.Tween.get( mc1, {loop: true});
        mc1Tw.to( {y: 620}, 300 ).to({y: 600}, 300);
    }
}