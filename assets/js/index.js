// ====================== 发送ajax请求来获取到用户的信息 ======================

function getUserInfo() {
  axios
    .get("/my/userinfo", {
      /* headers: {
        Authorization: localStorage.getItem("token"),
      }, */
    })
    .then((res) => {
      console.log(res);

      // 判断
      if (res.data.status !== 0) {
        // 获取用户信息失败
        return layer.msg("获取用户信息失败");
      }

      // 获取用户信息成功 ==> 处理头像和昵称
      avatarAndName(res.data);
    });

  /* axios({
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => {
    console.log(res);
  }); */
}
getUserInfo();

// ======================  处理头像和昵称 ======================
function avatarAndName(res) {
  // console.log("res 结果为", res);

  // 处理名字（优先级：优先展示nickname）
  let name = res.data.nickname || res.data.username;
  // console.log(name);
  // 修改名字
  $("#welcome").text("欢迎 " + name);

  // 处理头像(2选1， 根据user_pic的结果来做区分)
  if (res.data.user_pic) {
    // 如果有自己的头像，展示，隐藏文字头像
    $(".layui-nav-img").attr("src", res.data.user_pic).show();
    $(".text_avatar").hide();
  } else {
    // 没有自己的头像，隐藏，展示文字头像
    $(".layui-nav-img").hide();
    // 文字头像的文字是名字的第一个字符的大写
    let first = name[0].toUpperCase();
    $(".text_avatar").text(first).show();
  }
}

// ====================== 退出 =======================
$("#logoutBtn").click(function () {
  // 弹框-询问是否退出
  // layer.msg("哈哈");

  layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function (index) {
    // do something， 点击确认按钮做啥 退出

    // 退出要做啥
    //  核心思路：和登录做的事情反过来
    // 1. 页面跳转到登录页面
    // 2. 将本地存储的token给删除掉

    localStorage.removeItem("token");

    location.href = "/home/login.html";

    layer.close(index);
  });
});
