//存放主要交互逻辑的js代码
// javascript 模块化(package.类.方法)

var gameDetail = {
    URL: {
        parent: function () {
            return "game/gameMngPage";
        },
        add: function () {
            return 'game/gameMsgAddAndEditAction?opType=2';
        },
        validateName: function () {
            return "/game/gameValidateAction";
        },
        edit: function () {
            return "game/gameMsgAddAndEditAction?opType=1";
        }
    },

    validator: {
        validateAll: function () {
            this.validateGameName();
            return true;
        },

        validateGameName: function (gameName) {
            console.log("validateGameName");
        },

    },

    gameAdd: {
        init: function () {
            $('#datetimepickerDiv').datetimepicker({
                format: 'YYYY-MM-DD hh:mm',//日期格式化，只显示日期
            });
            schoolNameUtil.init('schoolName');
            grid.init();
            //gameDetail.gameAdd.setFormValidator();
            var gameType = $('#opType').val();
            // if(gameType=="0"){
            //     gameDetail.gameAdd.handleDetail();
            // }else if(gameType=="1"){
            //     gameDetail.gameAdd.handleEdit();
            // }
            myToastr.init();
        },

        initPic: function () {
            var schLogo = $('#schLogo').val();
            if (schLogo != "") {
                $('#imgDiv').css("background", "url(resources/images/common/" + schLogo + ")");
                $('#imgDiv').css("background-size", "100% 100%");
            }

        },
        setFormValidator: function () {
            $("#gameForm").validate({
                focusCleanup: false,
                rules: {
                    gameName: {
                        required: true,
                        remote: {
                            url: gameDetail.URL.validateName(),     //后台处理程序
                            type: "get",               //数据发送方式
                            dataType: "json",           //接受数据格式
                            contentType: "application/json;charset=UTF-8",
                        }
                    },
                    rival: {
                        required: true,
                    },
                    startTime: {
                        required: true,
                    },
                    place:{
                        required:true,
                    }
                },
                messages: {
                    rival: {
                        required: "请输入对手",
                    },
                    startTime: {
                        required: "请选择开场时间",
                    },
                    place:{
                        required:"请输入地点",
                    },
                    gameName: {required: "请输入校名", remote: "该赛事已被注册"},
                },
                errorPlacement: function (error, element) {
                    if (error[0].innerHTML != " ") {
                        var errorMsgId = error[0].id;
                        var errorMsg = error[0].innerHTML;
                        $('#' + errorMsgId).parent().addClass('has-error');
                        /*jquery validate设计有个很变态的问题
                         如果重写下面的success函数,当验证通过时jquery validate会
                         检测页面的的错误信息，然后删除，在该系统并不需要删除信息，只需要
                         将信息隐藏用来占一行当行距。所以当我们放置错误信息时需要额外加入&nbsp来占
                         一个位置，这样即使jquery validate删除错误信息后还有&nbsp帮我们占着位置

                         当然，如果你没有重写success函数，通过jquery validate验证后jquery validate
                         不会删除错误信息
                         */
                        $('#' + errorMsgId).html(errorMsg + '&nbsp;');
                        $('#' + errorMsgId).css('visibility', 'visible');
                    }
                },
                success: function (label) {
                    var errorMsgId = label[0].id;
                    $('#' + errorMsgId).parent().removeClass('has-error');
                    $('#' + errorMsgId).css('visibility', 'hidden');
                }

            });
        },
        fileChange: function () {
            //因为可以一次上传多个文件所以要写file.files[0]表示第一个文件
            var myFile = file.files[0];
            if (!myValidator.picValidator(myFile)) {
                return;
            }
            var url = window.URL.createObjectURL(myFile);
            $('#imgDiv').css("background", "url(" + url + ")");
            $('#imgDiv').css("background-size", "100% 100%");
            //参考文档  https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
            $("#headImgForm").submit();
        },
        back: function () {
            window.document.location = gameDetail.URL.parent();
        },
        successBack: function () {
            setTimeout("gameDetail.gameAdd.back()", 1200);
        },
        submitForm: function () {
            debugger;
            var startTime = $('#startTime').val();

            var access = $("#gameForm").valid();
            if (!access) {
                return;
            }
            var url;
            var gameType = $('#type').val();
            if (gameType == "1") {
                url = gameDetail.URL.edit();
            } else {
                url = gameDetail.URL.add();
            }
            $('#btnSave').attr('disabled', true);
            $.post(url, $('#gameForm').serialize(), function (result) {
                if (result.success) {
                    toastr.success(result.msg);
                    gameDetail.gameAdd.successBack();
                } else {
                    toastr.error('添加失败');
                    $('#btnSave').attr('disabled', false);
                }
            }, 'json');
        },

        handleDetail: function () {
            $('#title').html("&nbsp;赛事管理&nbsp;&nbsp;>&nbsp;&nbsp;赛事详情");
            $('#btnSave').hide();
            $('#file').attr('disabled', true);
            $('#gameName').attr('disabled', true);
            $('#introduction').attr('disabled', true);
            var editState = $('#gameEditP').val();
            if (editState == 1) {
                $('#btnEdit').show();
            }
        },

        handleEdit: function () {
            $('#title').html("&nbsp;赛事管理&nbsp;&nbsp;>&nbsp;&nbsp;修改赛事");
            $('#gameName').attr('disabled', true);
        },

        handleEditBtn: function () {
            $('#type').val("1");
            $('#title').html("&nbsp;赛事管理&nbsp;&nbsp;>&nbsp;&nbsp;修改赛事");
            $('#btnSave').show();
            $('#btnEdit').hide();
            $('#file').attr('disabled', false);
            $('#introduction').attr('disabled', false);
        },
    }
}

$(function () {
    gameDetail.gameAdd.init();
});