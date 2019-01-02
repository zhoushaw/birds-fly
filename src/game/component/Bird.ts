class Bird extends egret.Sprite {

    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    private onAddToStage(event: egret.Event){
        this.init()
    }

    private init() {
        
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
}