class BottomRoad extends egret.DisplayObjectContainer{

    private _stage: egret.DisplayObjectContainer // 开始场景
    private BottomRoadTw: egret.Tween
    public BottomRoad: egret.Bitmap
    public static bottomRoad: BottomRoad // 实例对象


    public static get instance() {
        if (!this.bottomRoad) {
            this.bottomRoad = new BottomRoad()
        }
        return this.bottomRoad
    }

    public constructor () {
        super();
        // this._stage = container
        // this.onAddToStage();
    }

    /**
     * 设置存放游戏场景的容器
     */
    public setStage(stage: egret.DisplayObjectContainer) {
        this._stage = stage
    }

    public onAddToStage() {
        let s1Bbottombg:egret.Texture = RES.getRes( "s1_json#bottom-road" );
        var BottomRoad:egret.Bitmap = new egret.Bitmap( s1Bbottombg );

        BottomRoad.y = GameUtil.getStageHeight() - 236;
        BottomRoad.width = GameUtil.getStageWidth() * 2;
        BottomRoad.height = 236;

        this.BottomRoad = BottomRoad;
        this._stage.addChild(BottomRoad);
    }

    public startRun () {
        let x = 0;
        this.BottomRoadTw = egret.Tween.get( this.BottomRoad, {loop: true});
        this.BottomRoadTw.to( {x: -GameUtil.getStageWidth()}, 4000 );
    }

    public stopRun () {
        this.BottomRoadTw.setPaused(true);
    }
}