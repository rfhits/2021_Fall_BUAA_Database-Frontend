## date: 12-07

#### 搜索用户

url:@/admin/manage/user/search/

#### 搜索文章

url: @/admin/manage/article/search

#### 搜索商品

url: @/admin/manage/good/search

## date: 11-24

### 查看官方文章

url:@/article/get-official-articles

### 用户注册

url: @/user/register/

method: POST

用户注册时提供性别和年龄

### view-article

这个接口后端的实现有问题，topic没有在自己专门的model中，合并到article里了

### 查看一件商品

url: @/good/view-good

发送方法：GET

为good页面提供评论列表

## date: 11-20~11-21

备注：

目前所有的删除操作，可能会设计到多个表数据的修改。

比如一个用户被删除了，那么就没有人关注他，他也不会关注任何人。

### 查看板块下所有文章

url: @/topic/view-articles/

### 搜索商品

url: @/good/search

### 查看一件商品

url: @/good/view-good

### 撰写评论

url: @/good/comment

### 用户查看自己的订单

url: @/order/query-orders

### 用户购买商品

url: @/order/add-order

### 用户确认收货

url: @/order/confirm-receiving

### 用户查看购物车

url: @/cart/query-cart

### 用户添加商品到购物车

url: @/cart/add-good

### 移除购物车商品

url: @/cart/remove-good

### 编辑用户信息

url: @/admin/manage/edit-user

### 管理员删除文章

url: @/admin/manage/delete-article

### 发布商品

url: @/admin/manage/post-good

### 编辑商品

url: @/admin/manage/edit-good

## date: 11-17

### 用户搜索帖子

url: @/article/search/

字段名称由searchText变更为keyword

### 用户搜索用户

url: @/user/search/

新增用户搜索用户接口

### 管理员 <--> xxx

新增了管理员的一系列行为

## data: 11-17

### 看用户发布的帖子

url: @/user/posts-info

由post方法改为get方法，不过这个我改好了，可以忽视

### 用户取消点赞帖子

url: @/article/cancel-like-article/

新增用户取消点赞接口

## data: 11-13


### 用户上传头像

url: @/user/change-avatar

新增用户改变头像接口

### 用户修改个人信息

url: @/user/edit-info

接口url的名称改变，从edit变成edit-info，

修改密码和修改个人信息实现分离。

### 用户修改密码

url: @/user/change-password

将修改密码的接口分离出来

### 关注另一个用户

字段名称改变，修改为`otherUsername`
### 取消关注另一个用户

字段名称改变，修改为`otherUsername`

## date: 11-09

### 搜索帖子

在首页，用户会看到很多文章的信息

url: @/article/search

新增返回文章的articleId

### 看用户发布的帖子

url: @/user/posts-info

新增返回文章的articleId

## date: 11-07

### 用户登陆

url: @/user/login/

新增返回用户头像url

### 浏览一篇帖子

url:@/article/view-article

要返回用户是否点赞过这篇帖子