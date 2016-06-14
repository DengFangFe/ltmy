<%@ page import="com.alibaba.fastjson.JSONObject,com.rkhd.ienterprise.apps.ingage.enums.*" %><%--
  Created by IntelliJ IDEA.
  User: dell
  Date: 2016/4/19
  Time: 14:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0">
    <link rel="stylesheet" type="text/css" href="../css/wx/common.css" />
    <title>授权成功</title>
    <style type="text/css">
        body {
            font-family: "微软雅黑";
            color: #333;
            background: #fff;
            height: 100%;
            width: 100%;
        }
    </style>
</head>

<body>


<%
    Boolean success = (Boolean)request.getAttribute("success");
    if(success){
%>
<h1>恭喜您，授权成功了</h1>
<hr/>
<%
    JSONObject authJson = (JSONObject) request.getAttribute("authJson");
   // out.println("授权用户信息为："+authJson.toJSONString());
%>
<%
    }else {
        AuthErrorEnum error = (AuthErrorEnum) request.getAttribute("error");
       // error  = AuthErrorEnum.NO_WEIXIN_USERID;
%>

<div class="grant-error">
    <div class="ico">
        <span>授权失败了</span>
        <%
                if( AuthErrorEnum.NO_AUTH_USER_INFO.equals(error)){
        %>
        <span>该用户不在授权通讯录中</span>
        <%
                }else  if(AuthErrorEnum.NO_AUTH_USER_INFO.equals(error)){
        %>
        <span>该用户不在授权授权范围内</span>
        <%
                }else  if(AuthErrorEnum.THREAD_ERROR.equals(error)){
        %>
        <span>您授权失败了，请联系微信企业号管理员</span>
        <%
                }
            }
        %>

    </div>
</div>


</body>
</html>
