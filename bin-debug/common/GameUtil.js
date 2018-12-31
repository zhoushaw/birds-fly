/**
 * 工具类
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUtil = (function () {
    function GameUtil() {
    }
    /**
     * 获取舞台高度
     */
    GameUtil.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    /**
     * 获取舞台宽度
     */
    GameUtil.getStageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    GameUtil.createBitmapByName = function (name, type) {
        if (type === void 0) { type = 'png'; }
        var result = new egret.Bitmap();
        var texture = RES.getRes(name + '_' + type);
        result.texture = texture;
        return result;
    };
    /**
     * 根据name关键字创建一个MovieClip对象。name属性请参考resources/resource.json配置文件的内容。
     */
    GameUtil.createMovieClipByName = function (name) {
        var data_stay = RES.getRes(name + "_json");
        console.log(data_stay);
        var texture_stay = RES.getRes(name + "_png");
        var mcFactory_stay = new egret.MovieClipDataFactory(data_stay, texture_stay);
        return new egret.MovieClip(mcFactory_stay.generateMovieClipData(name));
    };
    /**
     * 获取精灵图，图片Bitmap
     */
    GameUtil.createTextureByName = function (name) {
        var Texture = RES.getRes(name);
        var result = new egret.Bitmap(Texture);
        return result;
    };
    /**
     * 绑定点击事件
     */
    GameUtil.bitmapToBtn = function (bitmap, callback) {
        bitmap.touchEnabled = true;
        bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // 这个事件发生才算是点击按钮
            callback && callback();
        }, this);
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
