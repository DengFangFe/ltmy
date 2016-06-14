<%--
  Created by IntelliJ IDEA.
  User: dell
  Date: 2015/12/11
  Time: 17:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.alibaba.fastjson.JSON" %>
<%@ page import="com.rkhd.ienterprise.apps.ingage.wx.dtos.WxEntityReturnData" %>
<%
    WxEntityReturnData jsonData =  (WxEntityReturnData) request.getAttribute("jsondata");
%>
<%=JSON.toJSONString(jsonData)%>
