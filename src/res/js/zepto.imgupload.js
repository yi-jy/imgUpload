import './../css/zepto.imgupload.less';

;(function($) {
  function getImgProperty(files, callback) {

    let reader = new FileReader();

    let img = $('<img />'),
      width,
      height;

    let base64;

    reader.readAsDataURL(files);

    reader.onload = (e) => {
      // console.log(files, e.target);

      let {name, size} = files;

      size = (files.size/1000).toFixed(2) + 'k';

      base64 = e.target.result;

      img.attr('src', e.target.result);

      img.on('load', () => {
        img.appendTo(document.body).css('visibility', 'hidden');

        width = img.width();
        height = img.height();

        img.remove();

        callback ({
          base64,
          name,
          size,
          viewSize: `${width} x ${height}`
        });

      });
    };
  }

  function ImgUpload(
    uploadEle,
    options,
    defaults = {
      uploadTipsDesc: '',
      multiple: false,
      accept: 'image/*',
      callback: () => {}
    }) {

    this.uploadEle = uploadEle;
    this.isUpload = false;
    this.opts = $.extend({}, defaults, options);

    this.init();
  }

  $.extend(ImgUpload.prototype, {
    init() {
      let fileInput = $('<input type="file" class="input-img-upload">');

      fileInput
      .attr('accept', this.opts.accept)
      .appendTo(this.uploadEle);

      if (!this.opts.multiple) {
        this.createUploadTips();
      } else {
        fileInput.attr('multiple', 'multiple');
      }

      this.uploadEle
      .attr('data-type', 'img-upload');

      this.uploadEle.on('click', (e) => {
        if (this.isUpload && !this.opts.multiple) return ;

        if (this.opts.multiple) {
          if (!$(this.opts.imgContainer).length) {
            return alert('多图上传必须指定图片容器！');
          } else {
            $(this.opts.imgContainer).attr('data-type', 'img-upload');
          }
        }

        fileInput.get(0).click();
      });

      fileInput
      .on('click', (e) => {
        e.stopPropagation();
      })
      .on('change', () => {
        let files = fileInput.get(0).files,
          filesImg = [];

        // delete files.length; // 无效
        // delete files.item;

        for (let i in files) {
          if (i !== 'length' && i !== 'item') {
            filesImg.push(files[i]);
          }
        }

        $.each(filesImg, (index, item) => {
          if (this.opts.accept.indexOf(item.type) === -1) {
            alert('请上传正确类型');
            return false;
          }
        });

        let filesImgInfos = [];

        $.each(filesImg, (index, item) => {
          getImgProperty(item, (res) => {
            filesImgInfos.push(res);
          });
        });

        let timer = setInterval(() => {
          if (filesImgInfos.length === files.length) {
            clearInterval(timer);

            this.isUpload = true;

            this.opts.callback(filesImgInfos);

            $.each(filesImgInfos, (index, item) => {
              this.createUploadContent(item.base64);
            });
          }
        }, 100);

      });
    },

    createUploadTips() {
      let  uploadTips = $('<div class="upload-tips" />'),
        icon = $('<i class="icon icon-add" />'),
        uploadTipsDesc;

      icon.appendTo(uploadTips);

      if (this.opts.uploadTipsDesc) {
        uploadTipsDesc = $('<div class="upload-tips-desc" />');

        uploadTipsDesc.html(this.opts.uploadTipsDesc).appendTo(uploadTips);
      }

      uploadTips.appendTo(this.uploadEle);
    },

    createUploadContent(imgBase64) {
      let uploadContent = $('<div class="upload-content" />'),
        iconCancel = $('<i class="icon icon-cancel" />');

      let env = this;

      this.uploadEle.find('.upload-tips').remove();

      iconCancel.off();

      iconCancel.appendTo(uploadContent).on('click', function() {
        env.removeUploadContent(this);
      });

      uploadContent
      .css('background-image', `url(${imgBase64})`)
      .addClass(this.opts.multiple ? 'multiple' : 'single')
      .appendTo(this.opts.multiple ? this.opts.imgContainer : this.uploadEle);

      setTimeout(() => {
        uploadContent.addClass('in');
      }, 0);

    },

    removeUploadContent(iconCancel) {

      $(iconCancel).parent('.upload-content').removeClass('in');

      setTimeout(() => {
        $(iconCancel).parent('.upload-content').remove();
        this.isUpload = false;

        !this.opts.multiple && this.createUploadTips();
      }, 500);
    }
  });

  $.fn.imgUpload = function(options) {
    $(this).each(function(index, item) {
      new ImgUpload($(item), options);
    });
  };
})(Zepto);

