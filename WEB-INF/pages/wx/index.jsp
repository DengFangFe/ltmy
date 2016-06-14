<%--
  Created by IntelliJ IDEA.
  User: dell
  Date: 2016/4/19
  Time: 14:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
 <%@ page import="com.rkhd.ienterprise.apps.ingage.dingtalk.util.*" %>
<%@ page import="com.rkhd.ienterprise.apps.ingage.dingtalk.util.SystemGlobals" %>
<%

    String redirect_uri = (String )request.getAttribute("redirectUrl");
//    System.out.println("redirect_uri="+redirect_uri);
    if( redirect_uri != null  ){
%>
<script type="text/javascript">
   // alert('<%=redirect_uri%>');
    window.location= "<%=redirect_uri%>";
</script>
<%  }
else {%>
<html>
<head>
    <title>首页</title>
    <script>
        document.write('<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/wx/common.css?v=1"/>');
        document.write('<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/wx/login.css?v=1"/>');
    </script>
</head>

<body>
<div class="loadArea"><div class="loader"></div></div><span>欢迎登录销售易系统<br/>请稍等,正在努力加载数据中...</span>
</body>
<script type="text/javascript">
    window.location =  "<%=request.getContextPath()%>/wx/statics/index.action";

</script>
</html>
<%
    }
%>