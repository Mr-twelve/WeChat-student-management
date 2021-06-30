Page({

  data: {

  },

  onLoad: function (options) {
    console.log(options)
    var markers = [{
      iconPath: "cloud://test-98bk9.7465-test-98bk9-1300497805/位置.png",
      id: 0,
      latitude: options.latitude,
      longitude: options.longitude,
      width: 30,
      height: 30
    }]
    this.setData({
      markers: markers,
      lationname: options.lationname,
      name: options.name,
      longitude: options.longitude,
      latitude: options.latitude,
    })
  },

})