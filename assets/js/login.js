$(function () {
  // ===================================  登录 && 注册功能  ===================================

  // 去注册账号
  $("#gotoRegi").click(function () {
    // 显示注册界面
    $(".regiBox").show();
    // 隐藏登录界面
    $(".loginBox").hide();
  });

  // 去登录
  $("#gotoLogin").click(function () {
    // 隐藏注册界面
    $(".regiBox").hide();
    // 显示登录界面
    $(".loginBox").show();
  });

  // ===================================  表单自定义校验规则  ===================================
  // 表示从layui中获取到form相关功能（表单校验）以下代码不能落下，否则form.verify 会无法使用，报错
  let form = layui.form;

  // 表单自定义校验规则
  form.verify({
    // 我们既支持上述函数式的方式，也支持下述数组的形式
    // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    // pass 就是我们自定义的校验规则（密码）
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 要求对确认密码框内容和密码框的内容保持一致
    //  步骤：
    //  1. 先获取 确认密码框内容
    //  2. 密码框的内容
    //  3. 比较两者内容是否一致
    repass: function (value, item) {
      // console.log(value, item); value 就是确认密码框内容   item 确认密码框是DOM元素

      // 注意细节：获取的密码框一定是注册form表单中的密码框
      let pwd = $(".regiBox [name=password]").val();

      // console.log(value, pwd);

      if (value !== pwd) {
        // 说明两次密码不一致
        return "两次密码不一致";
      }

      // return "提示框的内容";
    },
  });

  // ===================================  注册ajax  ===================================
  $(".regiBox form").on("submit", function (e) {
    e.preventDefault();

    // 收集表单的数据
    let data = $(this).serialize();
    // console.log(data);

    // 发送ajax请求，实现注册用户功能
    // $.ajax()

    // axios
    // axios.post("http://ajax.frontend.itheima.net/api/reguser"); // 目前该根路径已经出问题，请更换

    axios.post("/api/reguser", data).then((res) => {
      // console.log(res);

      // 实现弹框 layer.msg("只想弱弱提示");
      if (res.data.status !== 0) {
        // 注册失败
        return layer.msg(res.data.message);
      }

      // 注册成功
      layer.msg("注册成功，请登录");

      // 展示登录界面 ==> 把去登陆的按钮的click触发下
      $("#gotoLogin").click();
    });
  });

  // ===================================  登录ajax  ===================================
  $(".loginBox form").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize();

    axios.post("/api/login", data).then((res) => {
      console.log(res.data);

      if (res.data.status !== 0) {
        // 登录失败
        return layer.msg(res.data.message);
      }

      // 登录成功

      // 弹框提示
      // layer.msg("登录成功，即将跳转去首页！");
      // 跳转页面
      // location.href = "/home/index.html";

      // 需要把服务器响应回来的token信息（随机码）随身携带，方便后期使用token ==> 使用本地存储来存储token
      localStorage.setItem("token", res.data.token);

      layer.msg("登录成功，即将跳转去首页！", function () {
        // 关闭后 do something
        // 跳转页面
        location.href = "/home/index.html";
      });
    });
  });
});
