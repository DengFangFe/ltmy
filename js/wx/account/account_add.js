/**
 * Created by dell on 2016/1/15.
 */
$(document).on('ready', function() {
    getAddAcctountDesc();
    $('textarea').autoHeight();
    if (!xsyUser) {
        alert('获取当前用户失败')
    }
    if (GetQueryString('type') == 'set') {
        document.title = '修改客户';
    }
    btn_color_adjust();
    btn_touch_style();
    input_color_adjust();
    //取消报错样式
    $('input').each(function() {
        $(this).on('click', function() {
            if ($(this).hasClass('warn')) {
                remove_warn($(this));
            }
        })
    })
    input_adjust();
})
var reg_accountName = /^.{1,50}$/;
var reg_tel = /^\d+|[-#*]{0,30}$/;
var reg_address = /^.{0,250}$/;
var reg_fax = /^.{0,30}$/;
var selectitmeObj = {};
// 渲染客户列表
function getAddAcctountDesc() {
    $.ajax({
        url: apppath + "/wx/account/getDetail.action",
        dataType: "json",
        data: { scene: 'ADD' },
        type: "GET",
        beforeSend: function() {
            //请求前的处理
        },
        success: function(data) {
            if (data.success == false) {
                myAlert('加载数据失败，请稍后再试');
                $('.load-shadow').hide();
            }
            if (data.success == true) {
                $('.load-shadow').hide();
                var dataString = JSON.stringify(data);
                console.log(dataString);
                var structureList = data.entity.structure.components;
                $.each(structureList, function(i, o) {
                    customizItem($('#basic_info'), o, selectitmeObj);
                });
                $('body').append('<button id="confirm" class="confirm">保存</button>');
                $('body').append('<button id="add_contact" class="confirm">保存并添加联系人</button>');
                confirm();
                SelectItemPost();
                textarea_num();
                DummyItemPost();
                checkboxItemPost();
                dimdepart_choose();
                levelChoose();
                statusChoose();
                industryChoose();
                parentAccountChoose();
                ownerChoose();
                $('textarea').autoHeight();
                region();
                if (GetQueryString('type') == 'set') {
                    set_info();
                    $('#add_contact').remove();
                    $('#confirm').html('保存');
                } else {
                    //设置默认部门
                    setPost = true;
                }
            }
        },
        complete: function() {
            //请求完成的处理
        },
        error: function(error) {
            //请求出错处理
            alert(error);
        }
    });
}

// ===============================省市区==================================
function region() {
    $("#region1").cityPicker({
        title: "省市区"
    });
}

// 创建二级列表页
function createSecondaryList(data, el) {
    var container = $('<div class="container"></div>');
    for (var i = 0, len = data.entity.length; i < len; i++) {
        var list = $('<div class="item boxSizing"><em class="radio"><i></i></em><span>' + data.entity[i].label + '</span></div>');
        container.append(list);
    }
    $('.ct').append(container);
    for (var i = 0, len = $('.ct .item').length; i < len; i++) {
        if ($('#el button').html() == $('.ct .item').eq(i).find('span').text()) {
            console.log($('#el button').html());
            $('.ct .item').eq(i).find('em').addClass('active');
        }
    }
    $('.ct .item').each(function(index) {
        $(this).on('click', function() {
            $(this).find('em').addClass('active');
            $(this).siblings().find('em').removeClass('active');
            var value = data.entity[$(this).index()].value;
            var index = $(this).index();
            var label = data.entity[$(this).index()].label;
            $(el).find('button').html(label);
            $(el).find('button').attr('value', value);
            btn_color_adjust();
            $('.ct').remove();
            $('body').css({ 'overflow': 'scroll', 'height': 'auto' });
        })
    })
}
//================================客户等级页==============================
function levelChoose() {
    $('#level').on('click', function() {
        checkTable('选择公司等级');
        $.ajax({
            type: "get",
            url: apppath + "/wx/account/getLevelInfo.action",
            async: true,
            dataType: 'json',
            success: function(oData) {
                if (oData.success) {
                    console.log('公司等级' + oData);
                    var level = document.getElementById('level');
                    createSecondaryList(oData, level);
                } else {
                    myAlert('暂时无法获取数据，请稍后再试');
                }
            },
            error: function() {
                myAlert('暂时无法获取数据，请检查您的网络')
            }
        })
    })
}

//================================公司状态==============================
function statusChoose() {
    $('#dbcSelect1').attr('value', 1);
    $('#dbcSelect1').on('click', function() {
        checkTable('选择公司状态');
        $.ajax({
            type: "get",
            url: apppath + "/wx/account/getstates.action",
            async: true,
            dataType: 'json',
            success: function(oData) {
                if (oData.success) {
                    console.log('公司状态' + oData)
                    var dbcSelect1 = document.getElementById('dbcSelect1');
                    createSecondaryList(oData, dbcSelect1);
                } else {
                    myAlert('暂时无法获取数据，请稍后再试');
                }
            },
            error: function() {
                myAlert('暂时无法获取数据，请检查您的网络')
            }
        })
    })
}
//==================================行业选择页====================================
function industryChoose() {
    $('#industryId').on('click', function() {
        checkTable('选择行业');
        $.ajax({
            type: "get",
            url: apppath + "/wx/account/industryIds.action",
            async: true,
            dataType: 'json',
            success: function(oData) {
                if (oData.success) {
                    console.log('选择行业' + oData);
                    var industryId = document.getElementById('industryId');
                    createSecondaryList(oData, industryId);
                } else {
                    myAlert('暂时无法获取数据，请稍后再试');
                }
            },
            error: function() {
                myAlert('暂时无法获取数据，请检查您的网络')
            }
        })
    })
}


//===========================================改变所属部门==================================
var postData;
var setPost = false;
//  上级客户选择
var accountData;
var accountPost = false;

function parentAccountChoose() {
    $('#parentAccountId').on('click', function() {
        checkTable('选择上级客户');
        $.ajax({
            type: "get",
            url: apppath + "/wx/account/dolist.action",
            async: true,
            dataType: 'json',
            success: function(oData) {
                console.log('上级客户' + oData)
                if (oData.success == false) {
                    myAlert('暂时无法获取数据，请稍后再试');
                } else {
                    accountData = oData;
                    create_parentAccount_list(oData);
                    $('#parentAccountId').attr('value', accountData.entity.records[0].id);
                    $('#parentAccountId  button').html(accountData.entity.records[0].accountName);


                }
            },
            error: function() {
                myAlert('暂时无法获取数据，请检查您的网络')
            }
        });
    });
}

function create_parentAccount_list(data) {
    var container = $('<div class="container"></div>');
    for (var i = 0, len = data.entity.records.length; i < len; i++) {
        var list = $('<div class="item boxSizing"><em class="radio"><i></i></em><span>' + data.entity.records[i].accountName + '</span></div>');
        list.attr('value', data.entity.records[i].id);
        container.append(list);
    }
    $('.ct').append(container);
    for (var i = 0, len = $('.ct .item').length; i < len; i++) {
        if ($('#parentAccountId button').html() == $('.ct .item').eq(i).find('span').text()) {
            $('.ct .item').eq(i).find('em').addClass('active');
        }
    }
    $('.ct .item').each(function(index) {
        $(this).on('click', function() {
            $(this).find('em').addClass('active');
            $(this).siblings().find('em').removeClass('active');
            var value = data.entity.records[$(this).index()].id;
            var index = $(this).index();
            var label = data.entity.records[$(this).index()].accountName;
            $('#parentAccountId button').html(label);
            btn_color_adjust();
            $('#parentAccountId button').attr('value', value);
            $('.ct').remove();

            $('body').css({ 'overflow': 'scroll', 'height': 'auto' });
        })
    })
}

//  客户所有人选择
var ownerData;
var ownerPost = false;

function ownerChoose() {
    $('#ownerId').on('click', function() {
        checkTable('选择客户所有人');
        $.ajax({
            type: "get",
            url: apppath + "/wx/xsyuser/pager.action",
            async: true,
            dataType: 'json',
            success: function(oData) {
                console.log('客户所有人' + oData)
                if (oData.success == false) {
                    myAlert('暂时无法获取数据，请稍后再试');
                } else {
                    ownerData = oData;
                    create_owner_list(oData);
                    if (ownerPost) {
                        $('#parentAccountId').attr('value', accountData.entity.records[0].id);
                        $('#parentAccountId  button').html(accountData.entity.records[0].name);

                    }
                }
            },
            error: function() {
                myAlert('暂时无法获取数据，请检查您的网络')
            }
        });
    });
}

function create_owner_list(data) {
    var container = $('<div class="container"></div>');
    for (var i = 0, len = data.entity.records.length; i < len; i++) {
        var list = $('<div class="item boxSizing"><em class="radio"><i></i></em><span>' + data.entity.records[i].name + '</span></div>');
        list.attr('value', data.entity.records[i].id);
        container.append(list);
    }
    $('.ct').append(container);
    for (var i = 0, len = $('.ct .item').length; i < len; i++) {
        if ($('#ownerId button').html() == $('.ct .item').eq(i).find('span').text()) {
            $('.ct .item').eq(i).find('em').addClass('active');
        }
    }
    $('.ct .item').each(function(index) {
        $(this).on('click', function() {
            $(this).find('em').addClass('active');
            $(this).siblings().find('em').removeClass('active');
            var value = data.entity.records[$(this).index()].id;
            var index = $(this).index();
            var label = data.entity.records[$(this).index()].name;
            $('#ownerId button').html(label);
            btn_color_adjust();
            $('#ownerId button').attr('value', value);
            $('.ct').remove();

            $('body').css({ 'overflow': 'scroll', 'height': 'auto' });
        })
    })
}
// 确认框
function confirm() {
    $('#confirm').on('click', function() {
        confirm_action();
    })
    $('#add_contact').on('click', function() {
        confirm_action('add_contact');
    })

    function confirm_action(action) {
        regingData() && info_submit(action);
    }
}

//提交信息
function info_submit(action) {
    var url = '';
    if (GetQueryString('type') == 'set') {
        url = apppath + "/wx/account/doupdate.action";
        console.log('更新接口');
        var accountTemp = {
            id: GetQueryString('accountId')
        };
        $('#basic_info .item').each(function() {
            var that = $(this);
            var value;
            if (that.find('input').size()) {
                if (that.attr('id') == 'region') {
                    var parts = that.find('input').val();
                    var partsArray = parts.split(" ");
                    accountTemp['state'] = partsArray[0];
                    accountTemp['city'] = partsArray[1];
                    accountTemp['region'] = partsArray[2];
                    return;
                }
                var btype = that.attr('btype');
                if (btype == "ITEM_TYPE_INTEGER" && that.find('input').val() == "" || btype == "ITEM_TYPE_REAL" && that.find('input').val() == "") {
                    value == 0;
                    return;
                }
                value = that.find('input').val();
            }
            if (that.find('button').size()) {
                var btn = that.find('button');
                if (btn.html() == "" || btn.html() == "点击选择") {
                    value = null;
                }
                else if (that.attr('btype') == "ITEM_TYPE_CHECKBOX") {
                    var arrayList = [];
                    arrayList = that.find('button').attr('value').split(",");
                    if (arrayList.length = 0) {
                        value = [];
                    } else {
                        value = arrayList;
                    }
                    console.log(arrayList);
                } else {
                    value = that.find('button').attr('value');
                }
            }
            if (that.find('textarea').size()) {
                value = that.find('textarea').val();
            }
            accountTemp[that.attr('id')] = value;
        });
    } else {
        url = apppath + "/wx/account/docreate.action";
        console.log('创建接口')
        var accountTemp = {};
        $('#basic_info .item').each(function() {
            var value;
            var that = $(this);
            if (that.find('input').size()) {
                if (that.attr('id') == 'region') {
                    var parts = that.find('input').val();
                    var partsArray = parts.split(" ");
                    accountTemp['state'] = partsArray[0];
                    accountTemp['city'] = partsArray[1];
                    accountTemp['region'] = partsArray[2];
                    return;
                }
                value = that.find('input').val();
            }
            if (that.find('button').size()) {
                var btn = that.find('button');
                if (btn.html() == "" || btn.html() == "点击选择") {
                    value = null;
                } else if (that.attr('btype') == "ITEM_TYPE_CHECKBOX") {
                    var arrayList = [];
                    arrayList = that.find('button').attr('value').split(",");
                    if (arrayList.length = 0) {
                        value = []
                    } else {
                        value = arrayList;
                    }
                    console.log(arrayList);
                } else {
                    value = that.find('button').attr('value');
                }
            }
            if (that.find('textarea').size()) {
                value = that.find('textarea').val();
            }
            accountTemp[that.attr('id')] = value;
        });
    }
    $.ajax({
        type: "post",
        url: url,
        data: {
            account: JSON.stringify(accountTemp)
        },
        dataType: 'json',
        async: true,
        beforeSend: function() {
            $('.confirm').attr('disabled', 'true');
            loader();
        },
        success: function(oData) {
            $('.loaderArea').remove();
            if (oData.success == true) {
                myDialog('保存成功');
                setTimeout(function() {
                    if (action == 'add_contact') {
                        location.replace(apppath + '/wx/contact/add.action?' + ddcommparams + '&from=acc_add&accountId=' + accountId + '&accountName=' + oData.entity.data.accountName);
                    } else {
                        if (GetQueryString('type') == 'set') {
                            //编辑
                            var accountId = GetQueryString('accountId');
                        } else {
                            //新建
                            var accountId = oData.entity.id
                        }
                        location.replace(apppath + '/wx/account/info.action?' + ddcommparams + '&accountId=' + accountId);
                    }
                }, 2000);
            } else if (oData.success == false) {
                $('.confirm').removeAttr('disabled');
                if (oData.entity && oData.entity.status && oData.entity.status == '0000001') {
                    myAlert('保存失败，公司名称已存在');
                } else if (oData.entity && oData.entity.status && oData.entity.status == '0000002') {
                    myAlert('保存失败，不能包含表情符');
                } else if (oData.entity && oData.entity.status && oData.entity.status == '0000003') {
                    location.href = apppath + '/wx/authorized/no.action?' + ddcommparams;
                } else {
                    myAlert('保存失败，请检查输入信息');
                }
            }
        },
        error: function() {
            $('.loaderArea').remove();
            $('.confirm').removeAttr('disabled');
            myAlert('暂时无法获取数据，请检查您的网络')
        }
    })
}
var ownerId = xsyUser.id;

function set_info() {
    $.ajax({
        url: apppath + "/wx/account/getDetail.action",
        data: {
            accountId: GetQueryString('accountId'),
            scene: 'UPDATE'
        },
        dataType: 'json',
        success: function(oData) {
            // console.log(oData)
            //ownerId = oData.entity.ownerId;
            $('#basic_info .item').each(function() {
                var that = $(this);
                var value = set_infoSup(that.attr('id'), oData);
                var show, rValue;
                if (typeof value === "object") {
                    show = value.text;
                    rValue = value.value;
                } else {
                    show = rValue = value;
                }
                if (that.find('input').size()) {
                    if (that.attr('id') == 'region') {
                        var state = oData.entity.data.state;
                        var city = oData.entity.data.city;
                        var region = oData.entity.data.region;
                        var regionValue = state + " " + city + " " + region;
                        that.find('input').val(regionValue);
                        return;
                    }
                    that.find('input').val(rValue);
                }
                if (that.find('button').size()) {
                    that.find('button').attr('value', rValue);
                    that.find('button').html(show);
                }
                if (that.find('textarea').size()) {
                    that.find('textarea').val(rValue);
                }
            });

            btn_color_adjust();
            $('textarea').autoHeight();
            textarea_num();
        }
    })
}
