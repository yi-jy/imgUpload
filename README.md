# imgUpload

基于zepto的图片上传，主要应用于移动端。

imgUpload演示：**[demo](http://joy-yi0905.github.io/imgUpload/demo/demo.html)**

### 如何使用

- 首先引入插件的样式文件 `zepto..imgupload.min.css`

```html
<link rel="stylesheet" href="src/zepto.imgupload.min.css">
```

- 然后再引入 `zepto.min.js` 和 `zepto.imgupload.min.js`（这些文件包含在demo目录）

```html
<script src="src/zepto.min.js"></script>
<script src="src/zepto.imgupload.min.js"></script>
```

- 最后，在页面里相应的元素添加方法。 相关示例代码：

```html
<div class="upload-item"></div>

<script>
$('.upload-item').imgUpload();
</script>
```

### 参数

当用户需要自定义输入时，可以将一个对象作为参数传递给 imgUpload 方法，该参数对象可配置以下选项。默认情况下，它们的取值如下：

| **参数** | **描述** | **默认值** | **格式** |
|----------|----------|------------|----------|
| uploadTipsDesc | 上传描述 | 空 | 字符串 |
| multiple | 是否可上传多个 | false | 布尔值  |
| accept | 上传图片格式限制 | 'image/gif,image/jpeg,image/png,image/svg' | 字符串 |
| callback | 每次上传完的回调 | 空函数 | 包含图片信息 |

