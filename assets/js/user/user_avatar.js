$(function () {
  // ========================= 裁剪区域 =========================
  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $("#image");

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // =================== 点击上传，模拟点击了文件域 ===================
  $("#chooseBtn").click(function () {
    $("#file").click();
  });

  // ================ 文件域change事件 ========================
  // 当文件域发生改变的时候就会触发change事件
  $("#file").on("change", function () {
    // 1. 获取到用户选择的图片（文件域的DOM对象的files属性）
    let file = this.files[0];
    console.log(file);

    // 如果file不存在，用户没有选择图片，后续操作不执行
    if (!file) {
      return;
    }

    // 2. 把用户选择的图片设置到裁剪区域（预览区域和裁切大小都要发生改变）
    // 根据选择的文件，创建一个对应的 URL 地址：
    let newImgURL = URL.createObjectURL(file);

    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // ===================== 点击确定，实现上传头像 ======================
  $("#sureBtn").click(function () {
    let dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // console.log(dataURL);

    // axios.post("/my/update/avatar", "查询字符串格式的数据");
    // 以下写法错误，原因在于base64里面含有特殊符号，查找查找字符串的格式有问题，需要将dataURL的值进行编码处理
    /* axios.post("/my/update/avatar", "avatar=" + dataURL).then((res) => {
      console.log(res);
    }); */

    // 正确写法如下
    axios
      .post("/my/update/avatar", "avatar=" + encodeURIComponent(dataURL))
      .then((res) => {
        // console.log(res);

        // 提示
        if (res.data.status !== 0) {
          // 失败
          return layer.msg("更新头像失败");
        }

        layer.msg("更新头像成功");
        // 页面中的头像发生变化（更新）
        window.parent.getUserInfo();
      });
  });
});
