// ajax的配置

// 设置根路径
axios.defaults.baseURL = "http://api-breakingnews-web.itheima.net";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // config; // 配置对象

    // console.log("发送axios请求前执行了该函数");

    // config.headers.a = 10; // 演示看出往headers请求头对象添加信息

    // 来处理headers请求头，带上token信息
    // config.headers.Authorization = localStorage.getItem("token");

    // 将以上代码在优化，以上代码无论哪个请求都会带上token信息，只需要在/my开头才需要带上token信息

    if (config.url.indexOf("/my") !== -1) {
      // url 是有 /my
      config.headers.Authorization = localStorage.getItem("token");
    }

    console.log("config ", config);

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么

    // console.log(response);

    // 对response响应回来的数据做判断，看看 status 和 message的结果

    if (
      response.data.status === 1 &&
      response.data.message === "身份认证失败！"
    ) {
      // 用户的身份认证失败
      localStorage.removeItem("token");

      // 需要把页面跳转回到login登录页面
      location.href = "/home/login.html";
    }

    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
