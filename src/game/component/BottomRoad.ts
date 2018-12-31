class BottomRoad{

    private _stage: egret.DisplayObjectContainer // 开始场景
    private BottomRoadTw: egret.Tween
    public BottomRoad: egret.Bitmap
    

    public constructor (container: egret.DisplayObjectContainer) {
        this._stage = container
        this.onAddToStage();
    }

    private onAddToStage() {
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
        this.BottomRoadTw.to( {x: -GameUtil.getStageWidth()}, 3000 );
    }

    public stopRun () {
       this.BottomRoadTw.pause();
    }
}