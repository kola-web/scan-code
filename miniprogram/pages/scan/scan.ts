// pages/scan/scan.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scanCode: "",
    flash: "off",
    scan: true,
    scanType: {
      barCode: "一维码",
      qrCode: "二维码",
      datamatrix: "	Data Matrix 码",
      pdf417: "PDF417 条码",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  context() {
    return wx.createCameraContext();
  },
  listener: {
    start() {},
    stop() {},
  } as WechatMiniprogram.CameraFrameListener,
  onLoad() {
    const context = wx.createCameraContext();
    this.listener = context.onCameraFrame((frame) => {
      console.log(frame.data instanceof ArrayBuffer, frame.width, frame.height);
    });
  },
  onShow() {},
  handleStart() {
    this.listener.start();
  },
  handleStop() {
    this.listener.stop();
  },
  bindScanCode(res: WechatMiniprogram.CameraScanCode) {
    const { result, type } = res.detail;
    const scanType = this.data.scanType;

    if (!this.data.scan) return;
    wx.showToast({
      icon: "none",
      title: result,
    });
    this.setData({
      scan: false,
      scanCode: result,
      scanTypeNmae: scanType[type],
    });
  },
  cameraError(err: WechatMiniprogram.CameraError) {
    console.log("err: ", err);
  },
  againScan() {
    this.setData({
      scanCode: "",
      scan: true,
    });
  },
  closureFlash() {
    this.setData({
      flash: "off",
    });
  },
  openFlash() {
    this.setData({
      flash: "on",
    });
  },
});
