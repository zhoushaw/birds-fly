/**
 * 工具类
 */

class GameUtil {

    /**
     * 获取舞台高度
     */
    public static getStageHeight(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }

    /**
     * 获取舞台宽度
     */
    public static getStageWidth(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }


    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    public static createBitmapByName(name: string, type: string = 'png') {
        let result = new egret.Bitmap()
        let texture: egret.Texture = RES.getRes(name + '_' + type)
        result.texture = texture
        return result
    }

    /**
     * 根据name关键字创建一个MovieClip对象。name属性请参考resources/resource.json配置文件的内容。
     */
    public static createMovieClipByName(name:string): egret.MovieClip {

        let data_stay: any = RES.getRes(name + "_json")
        console.log(data_stay)
        let texture_stay: egret.Texture = RES.getRes(name + "_png")
        let mcFactory_stay: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data_stay, texture_stay)
        return new egret.MovieClip(mcFactory_stay.generateMovieClipData(name))
    }

    /**
     * 获取精灵图，图片Bitmap
     */
    public static createTextureByName(name: string) {


        let Texture:egret.Texture = RES.getRes( name );
        var result:egret.Bitmap = new egret.Bitmap( Texture );

        return result;
    }


    /**
     * 绑定点击事件
     */
    public static bitmapToBtn(bitmap: any, callback) {
            bitmap.touchEnabled = true
            bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=> {
                // 这个事件发生才算是点击按钮
                callback && callback()
            }, this)
    }

    /**
     * 根据传入宽度计算居中位置
     */
    public static calcMdPoz (bitmapWd: number) {
        return (GameUtil.getStageWidth() - bitmapWd) / 2;
    }



    /**
     * 创建eui, image
     */
    public createEuiImg () {
        
    }

}