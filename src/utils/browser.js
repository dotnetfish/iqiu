class checkBrowser {
  constructor() {
    this.userAgent = navigator.userAgent;
    this.Android = this.userAgent.indexOf('Android') > -1 || this.userAgent.indexOf('Linux') > -1;
    this.IPhone = this.userAgent.indexOf("iPhone") != -1;
    this.Ios = this.userAgent.indexOf('iPhone') > -1 || this.userAgent.indexOf('Mac') > -1;
    this.Ipad = this.userAgent.indexOf('iPad') > -1;
    this.Opera = this.userAgent.indexOf("Opera") > -1;
    this.IE = this.userAgent.indexOf("compatible") > -1 && this.userAgent.indexOf('MSIE') > -1 && !this.Opera;
    this.Edge = this.userAgent.indexOf("Edge") > -1;
    this.FireFox = this.userAgent.indexOf('Firefox') > -1;
    this.Safari = this.userAgent.indexOf('Safari') > -1 && this.userAgent.indexOf('Chrome') == -1;
    this.Chrome = !this.Edge && this.userAgent.indexOf('Chrome') > -1 && this.userAgent.indexOf('Safari') > -1;
    this.IE11 = this.userAgent.indexOf('Trident') > -1 && this.userAgent.indexOf('rv:11.0') > -1;
    this.Wechat=!!this.userAgent.match(/MicroMessenger/i);
    this.Weibo=!!this.userAgent.match(/Weibo/i);
    this.UCBrowser=!!this.userAgent.match(/UCBrowser/i);
    this.QQ=!!this.userAgent.match(/QQ/i);
    this.QQBrowser=!this.userAgent.indexOf('MQQBrowser') > -1 && this.userAgent.indexOf('QQ/');
  }
}
const browser = new checkBrowser();

export default browser
