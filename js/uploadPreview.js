/*
*����:ͼƬ�ϴ�����Ԥ����� v1.1
*����:����
*ʱ��:2013��11��26��
*����:����JQUERY��չ,ͼƬ�ϴ�Ԥ����� Ŀǰ���������(IE �ȸ� ���) ��֧��safari
*�����վ:http://keleyi.com/keleyi/phtml/image/16.htm
*����˵��: Img:ͼƬID;Width:Ԥ�����;Height:Ԥ���߶�;ImgType:֧���ļ�����;Callback:ѡ���ļ���ʾͼƬ��ص�����;
*ʹ�÷���: 
<div>
<img id="ImgPr" width="120" height="120" /></div>
<input type="file" id="up" />
����Ҫ����Ԥ����IMG��ǩ�� ��һ��DIV Ȼ����ϴ��ؼ�ID����uploadPreview�¼�
$("#up").uploadPreview({ Img: "ImgPr", Width: 120, Height: 120, ImgType: ["gif", "jpeg", "jpg", "bmp", "png"], Callback: function () { }});
*/
jQuery.fn.extend({
    uploadPreview: function (opts) {
        var _self = this,
            _this = $(this);
        opts = jQuery.extend({
            Img: "ImgPr",
            Width: 100,
            Height: 100,
            ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
            Callback: function () {}
        }, opts || {});
        _self.getObjectURL = function (file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file)
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file)
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file)
            }
            return url
        };
        _this.change(function () {
            if (this.value) {
                if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert("ѡ���ļ�����,ͼƬ���ͱ�����" + opts.ImgType.join("��") + "�е�һ��");
                    this.value = "";
                    return false
                }
                if ($.browser.msie) {
                    try {
                        $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]))
                    } catch (e) {
                        var src = "";
                        var obj = $("#" + opts.Img);
                        var div = obj.parent("div")[0];
                        _self.select();
                        if (top != self) {
                            window.parent.document.body.focus()
                        } else {
                            _self.blur()
                        }
                        src = document.selection.createRange().text;
                        document.selection.empty();
                        obj.hide();
                        obj.parent("div").css({
                            'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
                            'width': opts.Width + 'px',
                            'height': opts.Height + 'px'
                        });
                        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src
                    }
                } else {
                    $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]))
                }
                opts.Callback()
            }
        })
    }
});