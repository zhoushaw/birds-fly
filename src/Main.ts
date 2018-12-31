class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause()
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume()
        }

        this.runGame().catch(e => {
            console.log(e)
        })
    }
    
    private async runGame() {
        await this.loadResource()
        this.createGameScene()

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private initBaseBg ():egret.Bitmap {
        let rdNum = Math.floor(Math.random() * 2 + 1);
        let bg: egret.Bitmap = GameUtil.createBitmapByName(`bg${rdNum}`, 'jpg');
        // 因为使用了fixedWide模式，自己根据舞台宽高，重新设置背景图片大小（会被裁剪）
        bg.width = GameUtil.getStageWidth();
        bg.height = 900;

        bg.x = 0;
        bg.y = 0;
        return bg;
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    private createGameScene(): void {
        let container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
        this.addChild(container)

        let bg: egret.Bitmap = this.initBaseBg();
        container.addChild(bg)

        let baseRoad = new BottomRoad(container);
        baseRoad.startRun();


        SceneController.instance.setStage(container)
        SceneController.initGame()
    }
}
