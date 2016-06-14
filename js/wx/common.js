$(document).bind('ready', function() {
    //底栏跳转
    footerSkip();
    //主体被删除返回的提示
    errInfo();
})

function footerSkip() {
    $('footer .account').bind('click', function() {
        location.href = apppath + '/wx/account/list.action?' + ddcommparams;
    })
    $('footer .opportunity').bind('click', function() {
        location.href = apppath + '/wx/opportunity/list.action?' + ddcommparams;
    })
    $('footer .service').bind('click', function() {
        location.href = apppath + '/wx/serveice/index.action?' + ddcommparams;
    })
    $('footer .index').bind('click', function() {
        location.href = apppath + '/wx/statics/index.action?' + ddcommparams;
    })
}

function errInfo() {
    if (GetQueryString('err')) {
        if (GetQueryString('err') == 'acc_deleted') {
            myDialog('该公司已被删除', 'without');
        } else if (GetQueryString('err') == 'con_deleted') {
            myDialog('该联系人已被删除', 'without');
        } else if (GetQueryString('err') == 'opp_deleted') {
            myDialog('该销售机会已被删除', 'without');
        } else if (GetQueryString('err') == 'acc_noright') {
            myDialog('您无权查看该公司', 'without');
        } else if (GetQueryString('err') == 'con_noright') {
            myDialog('您无权查看该联系人', 'without');
        } else if (GetQueryString('err') == 'opp_noright') {
            myDialog('您无权查看该销售机会', 'without');
        }
    }
}

//禁止滑动操作
function stopScroll($obj) {
    function stopScrolling(touchEvent) {
        touchEvent.preventDefault();
    }
    $obj.bind('touchmove', stopScrolling, false);
}

//控制返回动作（点击返回按钮，执行func）
function control_back(func) {}

//设置返回路径
function set_back(url) {}

//头像颜色库
var arr_color = ['#78c06e', '#f65e8d', '#f6bf26', '#3bc2b5', '#5c6bc0', '#f65e5e', '#5e97f6', '#9a89b9', '#bd84cd', '#6bb5ce', '#a1887f', '#ff943e', '#5ec9f6', '#c5cb63', '#ff8e6b', '#78919d'];

function set_cir_color(obj) {
    if (obj.color == null) {
        obj.color = arr_color[Math.floor(Math.random() * arr_color.length)];
    };
    obj.css('backgroundColor', obj.color);
};

//==================删除数组指定元素================
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(index) {
    var length = this.length;
    if (index >= 0 && index < length) {
        this.splice(index, 1);
    }
};

function set_title(title) {}

function remove_rTop() {}

function set_right(text, func) {}

function checkTable(title) {
    $('.ct').remove();
    var ct = $('<div class="ct"></div>');
    $('body').append(ct);
    $(window).scrollTop(0);
    $('body').css({ 'height': '100%', 'overflow': 'hidden' });
    set_title(title);
    remove_rTop();
}

//textarea高度自适应
jQuery.fn.extend({
    autoHeight: function() {
        return this.each(function() {
            var $this = jQuery(this);
            if (!$this.attr('_initAdjustHeight')) {
                $this.attr('_initAdjustHeight', $this.outerHeight());
            }
            _adjustH(this);
            _adjustH(this).on('input', function() {
                _adjustH(this);
            });
        });
        //重置高度
        function _adjustH(elem) {
            var $obj = jQuery(elem);
            return $obj.css({ height: $obj.attr('_initAdjustHeight'), 'overflow-y': 'hidden' })
                .height(elem.scrollHeight);
        }
    }
});
//textarea字数统计
function textarea_num() {
    var textnum = $('#textarea').val().length;
    $('#num').text(textnum + '/1000');
    $('#textarea').bind('input', function() {
        if ($(this).val().length > 1000) {
            $(this).val($(this).val().substr(0, 1000));
        }
        $('#num').text($(this).val().length + '/1000');
    })
}
//字符串去空格
String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, '');
    }
    //正则验证及报错
function reg_exp($obj, warning_words) {
    $obj.bind('click', function() {
        $(this).css('background', '');
    })
    $obj.bind('blur', function() {
        confirm_reg($obj, warning_words);
    })
}
//提交出错时验证+报错
function confirm_reg($obj, warning_words) {
    add_warn($obj, warning_words);
}

function rtn_reg($obj, reg) {
    if (!reg.test($obj.val())) {
        return false;
    } else {
        return true;
    }
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

//button元素文字颜色调整
function btn_color_adjust() {
    $('button').each(function() {
        if ($(this).html() != '点击选择') {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    })
}
//input文字颜色调整
function input_color_adjust() {
    $('input').each(function() {
        $(this).bind('input', function() {
            if ($(this).val() != null) {
                $(this).addClass('active')
            } else {
                $(this).removeClass('active')
            }
        })
    })
    $('textarea').each(function() {
        $(this).bind('input', function() {
            console.log('1')
            if ($(this).val() != null) {
                $(this).addClass('active')
            } else {
                $(this).removeClass('active')
            }
        })
    })
}

//表单弹出错误提示
function add_warn($obj, warning_words) {
    $obj.addClass('warn');
    var warning = $('<div class="warning"><span>' + warning_words + '</span></div>');
    $obj.parent().parent().css({ 'marginBottom': '70px' });
    $obj.parent().append(warning);
    $obj.bind('click', function() {
        remove_warn($obj);
    })
    if ($obj.parent().parent().attr('id') == 'saleStageId') {
        $obj.bind('click', function() {
            $("#winRate").find('.warning').remove();
            $("#winRate").find('input').removeClass('warn');
        })
    }
}

function remove_warn($obj) {
    $obj.removeClass('warn');
    $obj.parent().parent().css({ 'marginBottom': '0px' });
    $obj.parent().find('.warning').remove();
}
//保存按钮点击效果
function btn_touch_style() {
    $('.confirm').bind('touchstart', function() {
        $(this).addClass('touching');
    })
    $('.confirm').bind('touchend', function() {
        $(this).removeClass('touching');
    })
}
//创建活动记录
//content(记录类型中文)，belongId(来源业务对象),activityTypeId(活动记录类型),objectId(来源对象的ID),isBack(是否返回上一页1:是)
function create_record(data, $button) {
    $.ajax({
        url: apppath + '/wx/activityrecord/docreate.action',
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        beforeSend: function() {
            $button.attr('disabled', true);
            loader();
        },

        dataType: 'json',
        success: function(oData) {
            $('.loaderArea').remove();
            if (oData.success == true) {
                if (data.activityTypeId == activeRecordTypeOje["SIGN_IN"]) {
                    var buriedPointType = 'Sign';
                    // buriedPoint(buriedPointType);
                } else {
                    var buriedPointType = 'activityRecordAdd';
                    // buriedPoint(buriedPointType);
                }
                myDialog('创建成功');
                setTimeout(function() {
                    doWindowLocationChange()
                }, 2000)
            } else if (oData.entity.status == '0000002') {
                myAlert('创建失败，不能包含表情符');
                $button.removeAttr('disabled');
            } else if (oData.entity && oData.entity.status && oData.entity.status == '0000003') {
                location.href = apppath + '/wx/authorized/no.action?' + ddcommparams;
            } else {
                $button.removeAttr('disabled');
                myAlert('创建失败');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('.loaderArea').remove();
            $button.removeAttr('disabled');
            myAlert('暂时无法获取数据，请检查您的网络');
        }
    })

    function doWindowLocationChange() {
        var from = GetQueryString('from');
        if (from == 'acc_info') {
            location.replace(apppath + '/wx/account/info.action?' + ddcommparams + '&accountId=' + GetQueryString('accountId'));
        } else if (from == 'con_info') {
            location.replace(apppath + '/wx/contact/info.action?' + ddcommparams + '&contactId=' + GetQueryString('contactId'));
        } else if (from == 'opp_info') {
            location.replace(apppath + '/wx/opportunity/detail.action?' + ddcommparams + '&opportunityId=' + GetQueryString('opportunityId'));
        }
    }
}

function myAlert(info) {
    $('.UPS').remove();
    var shadow = $('<div class="commonShadow UPS"></div>');
    var oAlert = $('<div class="alert"><span>' + info + '</span><div>确定</div></div>');
    oAlert.find('div').bind('click', function() {
        $(this).parent().parent().remove();
    })
    shadow.append(oAlert);
    $('body').append(shadow);
    stopScroll($('.commonShadow'));
    stopScroll($('.alert'));
}
//默认为带对号的提示框，如果pic为without，则无对号
function myDialog(info, pic) {
    $('.UPS').remove();
    if (pic == 'without') {
        var oDialog = $('<div class="dialog_without_pic UPS">' + info + '</div>');
    } else {
        var oDialog = $('<div class="dialog UPS">' + info + '</div>');
    }
    $('body').append(oDialog);
    setTimeout(function() {
        $('.dialog').remove();
        $('.dialog_without_pic').remove();
    }, 2000);
}
//延迟跳转
function time_out_location(url) {
    setTimeout(function() {
        location.href = url;
    }, 2000)
}

//选择是否退出，是则跳转至相应url
function myChoose(url, func) {
    $('.UPS').remove();
    var dia = $('<div class="chooseShadow UPS"><div class="dia"><p class="boxSizing">确定放弃操作并退出吗？</p><div class="chooseBtn"><div class="n">取消</div><div class="y boxSizing">确认</div></div></div></div>');
    $('body').append(dia);
    $('.dia').css({ 'top': '200px', 'left': ($(window).width() - $('.dia').width()) / 2 });
    $('.y').bind('click', function() {
        $('.chooseShadow').remove();
        if (url != '') {
            location.href = url;
        } else if (func) {
            func();
        }
    })
    $('.n').bind('click', function() {
        $('.chooseShadow').remove();
    })
}
//input格式自动校正（去除首尾空格）
function input_adjust() {
    $('input').bind('blur', function() {
        var val = $(this).val();
        $(this).val(val.trim());
    })
}
//生成带下拉刷新功能的列表
//url=apppath+'/wx/opportunity/dolist.action'
//全局obj,pageNo,pageSize
//nullInfo = '无相关商机'
//$container = $('#search_content .main')
//build_unit(oData,$container)局部函数
//scrollFunc()下拉加载动作
function build_common_list(url, $container, nullInfo, build_unit, scrollFunc) {
    $(window).scrollTop(0);
    $.ajax({
        url: url,
        data: obj,
        //async:false,
        dataType: 'json',
        success: function(oData) {
            $(".load-shadow").hide();
            // console.log(oData)
            if (oData.success == true) {
                //获取总条数
                var len = oData.entity.totalSize;
                var sEnd;
                if (len == 0) {
                    //无结果情况
                    $container.children().remove();
                    var $list = $('<div class="list">' + nullInfo + '</div>');
                    $list.css({ 'width': '100%', 'lineHeight': '90px', 'fontSize': '30px', 'textAlign': 'center' });
                    $container.append($list);
                } else {
                    //有结果情况
                    if (len - pageNo * pageSize > pageSize) {
                        //下拉有加载
                        sEnd = pageSize;
                    } else {
                        //下拉无加载
                        sEnd = len - pageNo * pageSize;
                    }
                    //生成列表
                    for (var i = 0; i < sEnd; i++) {
                        //创建单元
                        build_unit(oData, $container, i);
                    }
                    //创建加载更多栏
                    if ($container.children().length < len) {
                        $container.append($('<div id="load_more" class="end_info">加载更多</div>'));
                    }
                    //pageNo+1
                    obj.pageNo++;
                    pageNo++;
                    //去除加载中栏（如果存在）
                    $('#loading').remove();
                    //判断是否滚动到底部
                    scrollFunc();
                }
            } else {
                if (oData.entity && oData.entity.status && oData.entity.status == '0000003') {
                    location.href = apppath + '/wx/authorized/no.action?' + ddcommparams;
                } else {
                    myAlert('暂时无法获取数据，请稍后再试');
                }
            }
        },
        error: function() {
            myAlert('暂时无法获取数据，请检查您的网络');
        }
    })
}

function loader() {
    var loader = $('<div class="loaderArea"><div class="loader"></div><span>加载中…</span></div>');
    $('body').append(loader);
}

function buriedPoint(buriedPointType) {}

function doChangeOwner(name, func) {
    var cOwner = $('<div class="cOwnerShadow"><div class="cOwner boxSizing"><div class="topInfo boxSizing">' +
        '<p><span class="word">确认将联系人变更为:"</span><span class="ownerName">' + name + '</span><span class="word">",</span></p><p>变更后将失去相关权限</p></div>' +
        '<div class="botBtn"><div class="no boxSizing">取消</div><div class="yes boxSizing">确认</div></div></div></div>');
    cOwner.find('.yes').bind('click', function() {
        cOwner.remove();
        func();
    })
    cOwner.find('.no').bind('click', function() {
        cOwner.remove();
    })
    $('body').append(cOwner);
}

function getPropertyname(item) {
    var propertyname = item.propertyname;
    if (propertyname == null) {
        propertyname = item.propertyName;
    }
    return propertyname;
}

function customizItem(elem, item, mydata) {
    if (typeof mydata == 'undefined') mydata = {};
    switch (item.type) {
        case 'ITEM_TYPE_LINE':
            elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing item-title"><div class="line-content"><span class="linetag">' + item.label + '</span></div></div>');
            break;
        case 'ITEM_TYPE_TEXT':
            var requireStr = '';
            if (item.required == true) {
                requireStr = '<span class="red">*</span>';
                if (getPropertyname(item) == "state" || getPropertyname(item) == "city") {
                    return;
                }
                if (getPropertyname(item) == "region") {
                    var label = '省市区';
                    elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + label + '</span></span><input save="needSave" arequired="' + item.required + '" type="text" id="region1" maxlength=' + item.length + ' placeholder="点击输入" atype="text"/></div></div>');
                } else {
                    elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><input save="needSave" arequired="' + item.required + '" type="text" maxlength=' + item.length + ' placeholder="点击输入" atype="text"/></div></div>');

                }

            } else {
                if (getPropertyname(item) == "state" || getPropertyname(item) == "city") {
                    return;
                }
                if (getPropertyname(item) == "region") {
                    var label = '省市区';
                    elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + label + '</span></span><input save="needSave" arequired="' + item.required + '" type="text" id="region1" maxlength=' + item.length + ' placeholder="点击输入" atype="text"/></div></div>');

                } else {
                    elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag"><span class="tagtitle">' + item.label + '</span></span><input type="text" save="needSave" arequired="' + item.required + '" maxlength=' + item.length + ' placeholder="点击输入" atype="text"/></div></div>');
                }
            }

            break;
        case 'ITEM_TYPE_SELECT':
            var requireStr = '';
            if (item.required == true) {
                requireStr = '<span class="red">*</span>';
            }
            mydata[getPropertyname(item) + 'List'] = item.selectitem;
            elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><button save="needSave" arequired="' + item.required + '"  atype="button">点击选择</button></div></div>');

            break;
        case 'ITEM_TYPE_INTEGER':
            var requireStr = '';
            if (item.required == true) {
                requireStr = '<span class="red">*</span>';
            }
            elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><input save="needSave"  arequired="' + item.required + '" type="number" maxlength=' + item.length + ' placeholder="点击输入" atype="text"/></div></div>');

            break;
        case 'ITEM_TYPE_REAL':
            var requireStr = '';
            if (item.required == true) {
                requireStr = '<span class="red">*</span>';
            }
            elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><input save="needSave" arequired="' + item.required + '"  type="number" maxlength=' + item.length + ' placeholder="点击输入" atype="text"/></div></div>');
            break;
        case 'ITEM_TYPE_TEXTAREA':
            var requireStr = '';
            if (item.required == true) {
                requireStr = '<span class="red">*</span>';
            }
            elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><textarea name="" id="textarea" placeholder="请填写备注内容…" save="needSave" maxlength=' + item.length + ' arequired="' + item.required + '"  atype="textarea"></textarea><span id="num">0/1000</span></div>');
            break;
        case 'ITEM_TYPE_DATE':
            var requireStr = '';
            if (item.required == true) {
                requireStr = '<span class="red">*</span>';
            }
            elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><input save="needSave" id="datetime" arequired="' + item.required + '" type="text" maxlength=' + item.length + ' placeholder="点击输入" atype="text"/></div></div>');
            break;
        case 'ITEM_TYPE_CHECKBOX':
            var requireStr = '';
            if (item.required == true) {
                requireStr = '<span class="red">*</span>';
            }
            mydata[getPropertyname(item) + 'List'] = item.checkitem;
            elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '"  required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><button save="needSave" arequired="' + item.required + '"  atype="button">点击选择</button></div></div>');
            break;
        case 'ITEM_TYPE_SEQUENCE':
            var requireStr = '';
            if (item.required == true) {
                requireStr = '<span class="red">*</span>';
            }
            elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><input save="needSave"  arequired="' + item.required + '" type="text"  maxlength=' + item.length + '  atype="text"/></div></div>');
            break;
        case 'ITEM_TYPE_RELATION':
            var requireStr = '';
            if (item.required == true) {
                requireStr = '<span class="red">*</span>';
            }
            elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><button save="needSave" arequired="' + item.required + '"  atype="button">点击选择</button></div></div>');
            break;
        case 'ITEM_TYPE_PHOTO':
            var requireStr = '';
            if (item.required == true) {
                requireStr = '<span class="red">*</span>';
            }
            elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><img save="needSave" arequired="' + item.required + '" src="' + item.src + '" alt="" /></div></div>');
            break;
        case 'ITEM_TYPE_DUMMY':
            var requireStr = '';
            if (item.required == true) {
                requireStr = '<span class="red">*</span>';
            }
            mydata[getPropertyname(item) + 'List'] = item.dummyItemBean;
            if (getPropertyname(item) == 'accountName') {
                elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><input save="needSave" arequired="' + item.required + '" type="text" maxlength=' + item.length + ' placeholder="点击输入" atype="text"/></div></div>');
                return;
            }
            if (getPropertyname(item) == 'industryId') {
                elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '"  required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><button save="needSave" arequired="' + item.required + '"  atype="button">点击选择</button></div></div>');
                return;
            }
            if (getPropertyname(item) == 'campaignId') {
                return;
            }
            if (getPropertyname(item) == 'comment') {
                elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><textarea name="" id="textarea" placeholder="请填写备注内容…" save="needSave" maxlength=' + item.length + ' arequired="' + item.required + '"  atype="textarea"></textarea><span id="num">0/1000</span></div>');
                return;
            }
            if (getPropertyname(item) == 'dimDepart') {
                elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '"  required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><button save="needSave" arequired="' + item.required + '"  atype="button">点击选择</button></div></div>');
                return;
            }
            if (getPropertyname(item) == 'accountId' || getPropertyname(item) == 'sourceId' || getPropertyname(item) == 'saleStageId' || getPropertyname(item) == 'ownerId') {
                elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '"  required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><button save="needSave" arequired="' + item.required + '"  atype="button">点击选择</button></div></div>');
                return;
            }
            if (getPropertyname(item) == 'birthday') {
                elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><input save="needSave" id="datetime" arequired="' + item.required + '" type="text" maxlength=' + item.length + ' placeholder="点击输入" atype="text"/></div></div>');
                return;
            }
            elem.append('<div id=' + getPropertyname(item) + ' class="item boxSizing" btype="' + item.type + '" required="' + item.required + '"><div class="bor"><span class="tag">' + requireStr + '<span class="tagtitle">' + item.label + '</span></span><input save="needSave" arequired="' + item.required + '" type="text" maxlength=' + item.length + ' placeholder="点击输入" atype="text"/></div></div>');

            break;

    }
}

function setPropertyname(item) {
    var propertyname = item.propertyname;
    if (propertyname == null) {
        propertyname = item.propertyName;
    }
    return propertyname;
}

// 
function set_infoSup(id, data, byid) {
    var re;
    var value = data.entity.data[id];
    var item;
    $.each(data.entity.structure.components, function(i, o) {
        if (byid) {
            if (id == o.id) {
                item = o;
            }
        } else {
            if (id == o.propertyname || id == o.propertyName) {
                item = o;
            }
        }
    });
    switch (item.type) {
        case 'ITEM_TYPE_TEXT':
            re = value;
            break;
        case 'ITEM_TYPE_TEXTAREA':
            re = value;
            break;
        case 'ITEM_TYPE_SEQUENCE':
            re = value;
            break;
        case 'ITEM_TYPE_REAL':
            re = value;
            break;
        case 'ITEM_TYPE_INTEGER':
            re = value;
            break;
        case 'ITEM_TYPE_DATE':
            re = value;
            break;
        case 'ITEM_TYPE_SEQUENCE':
            re = value;
            break;
        case 'ITEM_TYPE_SELECT':
            var text = data.entity.expandPro[setPropertyname(item) + "Text"];
            re = {
                value: value,
                text: text
            }
            break;
        case 'ITEM_TYPE_CHECKBOX':
            var text = data.entity.expandPro[setPropertyname(item) + "Text"];
            re = {
                value: value,
                text: text
            }
            break;
        case 'ITEM_TYPE_RELATION':
            var text = data.entity.expandPro[setPropertyname(item) + "Text"];
            re = {
                value: value,
                text: text
            }
            break;
        case 'ITEM_TYPE_DUMMY':
            if (item.propertyName == 'accountId' || item.propertyName == 'industryId' || item.propertyName == 'parentAccountId' || item.propertyName == 'level' || item.propertyName == 'dimDepart' || item.propertyName == 'createdBy' || item.propertyName == 'updatedBy' || item.propertyName == 'sourceId' || item.propertyName == 'saleStageId' || item.propertyName == 'ownerId') {
                var text = data.entity.expandPro[setPropertyname(item) + "Text"];
                if (text == "") {
                    re = {
                        value: null,
                        text: text
                    }
                } else {
                    re = {
                        value: value,
                        text: text
                    }
                }

            } else {
                re = value;
            }
            break;

    }
    return re;
}

// 提交验证
function regingData() {
    var saveArray = $("*[save='needSave']");
    console.log(saveArray);
    var isvalidate = true;
    $.each(saveArray, function(i, o) {
        var that = saveArray[i];
        var prveName = $(that).prev().find('.tagtitle').text();
        var required = $(that).attr('arequired');
        var atype = $(that).attr('atype');
        if (required == 'false') {
            return;
        }
        if (required == 'true') {
            if (atype == "text") {
                if ($.trim(that.value) == "") {
                    confirm_reg($(that), '' + prveName + '不能为空');
                    isvalidate = false;
                }
            } else if (atype == "button") {
                if ($.trim(that.innerHTML) == "" || $.trim(that.innerHTML) == "点击选择") {
                    confirm_reg($(that), '' + prveName + '不能为空');
                    isvalidate = false;
                }
            } else if (atype == "textarea") {
                if ($.trim(that.val()) == "") {
                    confirm_reg($(that), '' + prveName + '不能为空');
                    isvalidate = false;
                }
            }

        }
        if (that.maxlength < $.trim(that.value).length) {
            confirm_reg($(that), '' + prveName + '输入内容长度不正确');
            isvalidate = false;

        }
    });
    return isvalidate;
}

//电话和邮箱验证
function validateFn(v, type) {
    // var reg_contactName = /^.{1,50}$/;
    var reg_phone = /^\d+|[-#*]{1,30}$/;
    // var reg_department = /^.{0,20}$/;
    // var reg_post =/^.{0,50}$/;
    // var reg_tel =/^\d+|[-#*]{0,30}$/;
    var reg_email = /^(([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})){0,100}$/;
    // var reg_address =/^.{0,250}$/;

    if (type == "phone") {
        return reg_phone.match();
    } else if (type == "email") {
        return reg_email.match();
    }


}

//时间选择
function selectDate() {
    if (GetQueryString('type') != 'set') {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = '0' + String(month);
        }
        if (day < 10) {
            day = '0' + String(day);
        }
        var dateStr = year + '-' + month + '-' + day;
        $('#datetime').attr("value", dateStr);
    }
    var _date = document.getElementById('datetime');
    var datePicker = new window.DatePicker({
        confirmCbk: function(data) {
            _date.value = data.year + '-' + data.month + '-' + data.day;
        }
    });
    _date.onfocus = function(e) {
        _date.blur();
        datePicker.open();
    };

}

//选择所属部门
var postData;
var setPost = false;

function dimdepart_choose() {
    $('#dimDepart').bind('click', function() {
        checkTable('选择所属部门');
        $.ajax({
            type: "get",
            url: apppath + "/wx/department/mydepartment.action",
            async: true,
            dataType: 'json',
            success: function(oData) {
                // console.log('部门' + oData)
                if (oData.success == false) {
                    myAlert('暂时无法获取数据，请稍后再试');
                } else {
                    postData = oData;
                    create_dimdepart_list(oData);
                    $('#dimDepart').attr('value', postData.entity.departs[0].id);
                    $('#dimDepart  button').html(postData.entity.departs[0].text);
                }
            },
            error: function() {
                myAlert('暂时无法获取数据，请检查您的网络')
            }
        });
    });
}

function create_dimdepart_list(data) {
    var container = $('<div class="container"></div>');
    for (var i = 0, len = data.entity.departs.length; i < len; i++) {
        var list = $('<div class="item boxSizing"><em class="radio"><i></i></em><span>' + data.entity.departs[i].text + '</span></div>');
        list.attr('value', data.entity.departs[i].id);
        container.append(list);
    }
    $('.ct').append(container);
    for (var i = 0, len = $('.ct .item').length; i < len; i++) {
        if ($('#dimDepart button').html() == $('.ct .item').eq(i).find('span').text()) {
            $('.ct .item').eq(i).find('em').addClass('active');
        }
    }
    $('.ct .item').each(function(index) {
        $(this).bind('click', function() {
            $(this).find('em').addClass('active');
            $(this).siblings().find('em').removeClass('active');
            var value = data.entity.departs[$(this).index()].id;
            var index = $(this).index();
            var label = data.entity.departs[$(this).index()].text;
            $('#dimDepart button').html(label);
            btn_color_adjust();
            $('#dimDepart button').attr('value', value);
            $('.ct').remove();
            $('body').css({ 'overflow': 'scroll', 'height': 'auto' });
        })
    })
}

//===========================================选择公司或者客户==================================
function accountPost() {
    $('#accountId button').bind('click', function() {
        checkTable('选择公司');
        $.ajax({
            type: "get",
            url: apppath + "/wx/account/dolist.action",
            async: true,
            dataType: 'json',
            success: function(oData) {
                if (oData.success == false) {
                    myAlert('暂时无法获取数据，请稍后再试');
                } else {
                    if (oData.entity.records.length == 0) {
                        myAlert('暂无公司，请新建公司');
                        $('.ct').remove();
                        // var no_contact = $('<div class="no_contact">暂无公司，请新建公司</div>');
                        // $('body').append(no_contact);
                        // setTimeout(function() {
                        //     $('.no_contact').remove();
                        // }, 200000);
                    } else {
                        create_account_list(oData);
                    }
                }
            }
        })
    })
}

function create_account_list(data) {
    var container = $('<div class="container"></div>');
    for (var i = 0, len = data.entity.records.length; i < len; i++) {
        var list = $('<div class="item boxSizing" href="' + data.entity.records[i].id + '"><em class="radio"><i></i></em><span>' + data.entity.records[i].accountName + '</span></div>');
        container.append(list);
    }
    $('.ct').append(container);
    for (var i = 0, len = $('.ct .item').length; i < len; i++) {
        if ($('#accountId button').html() == $('.ct .item').eq(i).find('span').text()) {
            $('.ct .item').eq(i).find('em').addClass('active');
        }
    }
    $('.ct .item').each(function(index) {
        $(this).bind('click', function() {
            $(this).find('em').addClass('active');
            $(this).siblings().find('em').removeClass('active');
            var value = data.entity.records[$(this).index()].id;
            var index = $(this).index();
            var label = data.entity.records[$(this).index()].accountName;
            $('#accountId button').html(label);
            btn_color_adjust();
            $('#accountId button').attr('value', value);
            $('.ct').remove();
            $('body').css({ 'overflow': 'scroll', 'height': 'auto' });
        })
    })
}
// 自定义select下拉选择
function SelectItemPost() {
    $("#basic_info .item").each(function(i) {
        if ($(this).attr("btype") == 'ITEM_TYPE_SELECT') {
            var title = $(this).find('span.tagtitle').text();
            var listName = $(this).attr('id') + 'List';
            $(this).find('button').bind('click', function() {
                checkTable(title);
                createSelectList(selectitmeObj[listName], $(this));
            })
        }
    });
}

function createSelectList(data, elem) {
    var container = $('<div class="container"></div>');
    for (var i = 0, len = data.length; i < len; i++) {
        var list = $('<div class="item boxSizing" href="' + data[i].value + '"><em class="radio"><i></i></em><span>' + data[i].label + '</span></div>');
        container.append(list);
    }
    $('.ct').append(container);
    for (var i = 0, len = $('.ct .item').length; i < len; i++) {
        if ($(elem).html() == $('.ct .item').eq(i).find('span').text()) {
            $('.ct .item').eq(i).find('em').addClass('active');
        }
    }
    $('.ct .item').each(function(index) {
        $(this).bind('click', function() {
            $(this).find('em').addClass('active');
            $(this).siblings().find('em').removeClass('active');
            var value = data[$(this).index()].value;
            var index = $(this).index();
            var label = data[$(this).index()].label;
            $(elem).html(label);
            btn_color_adjust();
            $(elem).attr('value', value);
            $('.ct').remove();
            $('body').css({ 'overflow': 'scroll', 'height': 'auto' });
        })
    })
}

// 自定义Dummy下拉选择
function DummyItemPost() {
    $("#basic_info .item").each(function(i) {
        if ($(this).attr("btype") == 'ITEM_TYPE_DUMMY') {
            if ($(this).attr('id') == 'accountName' || $(this).attr('id') == 'ownerId' || $(this).attr('id') == 'dimDepart' || $(this).attr('id') == "accountId") {
                return;
            } else {
                if ($(this).find('button').size()) {
                    var title = $(this).find('span.tagtitle').text();
                    var listName = $(this).attr('id') + 'List';
                    $(this).find('button').bind('click', function() {
                        checkTable(title);
                        createDummyList(selectitmeObj[listName], $(this));
                    })
                }
            }
        }
    });
}

function createDummyList(data, elem) {
    var container = $('<div class="container"></div>');
    for (var i = 0, len = data.length; i < len; i++) {
        var list = $('<div class="item boxSizing" id="' + data[i].value + '"><em class="radio"><i></i></em><span>' + data[i].label + '</span></div>');
        container.append(list);
    }
    $('.ct').append(container);
    for (var i = 0, len = $('.ct .item').length; i < len; i++) {
        if ($(elem).html() == $('.ct .item').eq(i).find('span').text()) {
            $('.ct .item').eq(i).find('em').addClass('active');
        }
    }
    $('.ct .item').each(function(index) {
        $(this).bind('click', function() {
            $(this).find('em').addClass('active');
            $(this).siblings().find('em').removeClass('active');
            var value = data[$(this).index()].value;

            var index = $(this).index();
            var label = data[$(this).index()].label;
            $(elem).html(label);
            if ($(elem).parent().parent().attr('id') == 'saleStageId') {
                var percent = data[$(this).index()].percent;
                $('#winRate input').val(percent);
                $('#winRate input').attr('readonly', true);
            }
            btn_color_adjust();
            $(elem).attr('value', value);
            $('.ct').remove();
            $('body').css({ 'overflow': 'scroll', 'height': 'auto' });
        })
    })
}


// 自定义checkbox下拉多选
function checkboxItemPost() {
    $("#basic_info .item").each(function(i) {
        if ($(this).attr("btype") == 'ITEM_TYPE_CHECKBOX') {
            if ($(this).find('button').size()) {
                var title = $(this).find('span.tagtitle').text();
                var listName = $(this).attr('id') + 'List';
                $(this).find('button').bind('click', function() {
                    checkTable(title);
                    var container = $('<div id="container" class="container"></div>');
                    $('.ct').append(container);
                    checkboxDummyList(container, selectitmeObj[listName], $(this));
                })
            }
        }
    });
}
var checkboxMember = {};
var checkboxChange = false;

function checkboxDummyList(container, data, elem) {
    // var arr_member = $(elem).find('button').html().split(',');
    for (var i = 0, len = data.length; i < len; i++) {
        var value = data[i].value;
        var label = data[i].label;
        var con = $('<div class="item boxSizing" id = "' + value + '" atext = "' + label + '"><em class="checkbox"></em><span>' + label + '</span></div>');
        con.attr('value', value);
        container.append(con);
    }
    // $('.ct').append(container);
    for (var j = 0; j < checkboxMember.length; j++) {
        for (var i = 0, len = data.length; i < len; i++) {
            if ($.trim(arr_member[j]) == $('.ct .item').eq(i).find('span').text()) {
                $('.ct .item').eq(i).find('em').addClass('active');
            }
        }
    }
    checkboxClick(data);
    createConfirm(data, elem);
}

function checkboxClick(data) {
    $('.item').each(function(index) {
        $(this).bind('click', function() {
            memberChange = true;
            if ($(this).find('em').hasClass('active')) {
                $(this).find('em').removeClass('active');
            } else {
                $(this).find('em').addClass('active');
            }
        })
    })
}

function createConfirm(data, elem) {
    var confirm = $('<button id="confirm" class="confirm">确定</button>');

    $('.ct').append(confirm);
    confirm.bind('touchstart', function() {
        $(this).addClass('touching');
    })
    confirm.bind('touchend', function() {
        $(this).removeClass('touching');
    })
    confirm.bind('click', function() {
        var arr_value = [];
        var arr_label = [];
        $('#container .item').each(function() {
            if ($(this).find('em').hasClass('active')) {
                arr_value.push($(this).attr('value'));
                arr_label.push($(this).attr('atext') + ",");
            }

            console.log(arr_value);
            $(elem).attr('value', arr_value);
            $(elem).html(arr_label);
            $(elem).attr('class', 'active');
            // $(elem).attr('value', value);
            $('.ct').remove();
            $('body').css({ 'overflow': 'scroll', 'height': 'auto' })
        })
    })
}
