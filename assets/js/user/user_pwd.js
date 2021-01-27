$(function () {
  let form = layui.form;

  // ================= 添加表单的自定义校验规则 =================
  form.verify({
    // pass 密码的校验
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 对新密码对校验
    newPwd: function (value) {
      // value 新密码的内容

      // 获取到原密码，和新密码进行比较，如果两者是相同的，需要出现提示
      let oldPwd = $("[name=oldPwd]").val();
      // console.log(oldPwd, value);

      if (oldPwd === value) {
        return "新旧密码不能相同";
      }
    },

    // 确认新密码的校验
    reNewPwd: function (value) {
      // 获取到新密码，判断密码的内容是否和确认新密码一致，如果不一致，出现提示

      let newPwd = $("[name=newPwd]").val();

      if (newPwd !== value) {
        // 两次输入的密码不一致
        return "两次输入的密码不一致";
      }
    },
  });

  // =================== 实现修改密码 ======================
  $("#form").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize();
    // console.log(data);

    axios.post("/my/updatepwd", data).then((res) => {
      console.log(res);

      if (res.data.status !== 0) {
        // 修改密码失败
        return layer.msg(res.data.message);
      }

      // 成功
      layer.msg("更新密码成功");

      // 表单重置功能
      $("#form")[0].reset();
    });
  });
});
