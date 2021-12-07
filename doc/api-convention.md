# api约定

## 字段约定

前端发送后端的数据应为如下格式：

```json
{
    field_1: {},
    field_2: sth
}
```

如：

```json
{
    "user": {
        "username": "abc"
        "password": "12345"
    },
    "searchText": "hello world"
}
```

后端返回前端的数据应为如下格式：

```json
{
    "data": {},
    "status": 0,
    "statusInfo": {
        "message": "给用户的提示信息",
        "detail": "用于排查错误的详细错误信息"
    }
}
```

约定`status=0`时成功，`status!=0`表示失败。

## 功能

@表示`localhost:8000`

### 首页

#### 查看官方文章

url:@/article/get-official-articles

methos: GET

发送格式：

```json
{
    
}
```

返回格式：

```json
{
    "data": {
        officialArticles: [
            {
                id: 233,
                coverUrl: "233"
            },
        ]
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```

备注：整一个官方账号，然后把官方账号发的文章的封面给前端

### 用户

#### 上传图片

用户在发布文章时，需要上传图片

当然，出于各种需要，系统应当有一个上传图片的接口

url:@/image_host/

methos: POST

发送格式：

```json
{
    "base64": "xxxxx", // png文件的base64，很长的字符串
    "filename": "png_name"
}
```

返回格式：

```json
{
    "data": {
        "imageUrl": "xxxx"
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```

备注：把这张照片绑定到一个url上，然后把这个url返回给前端

#### 用户登陆

url: @/user/login/

method: POST

发送格式：

```json
{
    "user": {
        "username": "2333",
        "password": "xxx",
    }
}
```

返回格式：

若登陆成功，返回如下格式：

```json
{
    "data": {
        "username": "2333"
        "nickname": "xxx"
        "token": "xxx"
        "avatarUrl" : "xxx"
    },
    "status": 0,
    "statusInfo": {
        "message": "登陆成功",
        "detail": ""
    }
}
```

备注：

#### 用户注册

url: @/user/register/

method: POST

发送格式：

```json
{
    user: {
        username: "2333",
        nickname: "xxx"
        password: "xxx",
        age: 12,
        gender: 0,
        avB:"xxx"
    }
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```

备注：avB是avatarBase64的缩写，是一串很长的字符串，请将其保存到本地并绑定到url上，将url写入用户表的字段中。

#### 用户修改头像

url: @/user/change-avatar/

method: POST

发送格式：

```json
{
    "user": {
        "username": "2333",
        "avatarB64": "xxx"
        
    }
}
```

返回格式：

```json
{
    "data": {
        "avatarUrl": "xxx", // the url of the avatar
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```



#### 用户修改个人信息

url: @/user/edit-info

method: POST

发送格式：

```json
{
    "user": {
        "username": "2333",
        "nickname": "xxx",
        "gender": "0", // "0" or "1" or "2"
        
    }
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：gender：0，1，2分别表示男，女，和“保密”

#### 用户修改密码

url: @/user/change-password/

method: POST

发送格式：

```json
{
    "user": {
        "username": "2333",
        "originPassword": "2333",
        "password": "2333",
        
    }
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

### 



### 用户 <--> 文章

#### 搜索文章

在首页，用户会看到很多文章的信息

帖子和文章是一个东西，不做区分。

url: @/article/search/

发送方法：GET

发送格式：

```json
{
    keyword: "233",
}
```

返回格式：

```json
{
    "data": {
        "articleList": [
            {
                username: "username000",
                nickname: "nickname000",
                avatarUrl: "the url of the user",
                articleId: 233,
                postDate: "",
                title: "Hello World",
                brief: "article brief", // 截取文章的前<=30个字即可
                likes: 100,
                comments: 200,
                clicks: 50,
                coverUrl: "the url of the cover",
                topics: [
                    {
                        id: 233,
                        name: "hh"
                    }, {
                        id: 23,
                        name: "233"
                    }
                ],
            }, 
            {
                ...
            }, ...
        ]
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：

搜索内容为空时，返回**所有**帖子的信息。

#### 浏览一篇文章

url:@/article/view-article/

发送方法：GET

发送格式

```json
{
    "username": "2333"
    "articleId": 233,
}

```

返回格式：

```json
{
    "data": {
        "user": {
            username: "username000",
            nickname: "nickname000",
            avatarUrl: "the url of the user"
        },
        "article": {
            postDate: "1926-08-17",
            title: "Hello World",
            content: "article brief", // 文章的详细内容
            likes: 100,
            comments: 200,
            clicks: 50,
            topics: [
                {
                    id: 233,
                    name: "hh"
            	}, {
                    id: 23,
                    name: "233"
                }
            ],
            liked: true, // 发送浏览请求的用户是否喜欢过这篇文章
         }, 
        "comments": [ // 属于该文章的评论列表
			{
                username: "xxx", // 谁发布了这条评论
                nickname: "XXX",
                avatarUrl: "xxx",
                date: "1926-08-17",
                commentId: 233,
                content: "xxx", 
                likes: 233,
                liked: true, // 发送的username是否点赞过这条评论
            },{},...   
         ], 
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}


```

如果用户名为空，说明是在未登录得情况下浏览的文章，得全部liked返回false

#### 用户点赞帖子

url: @/article/like-article/

发送方法：POST

发送格式

```json
{
    "username": "2333"
    "articleId": "2333",
}
```

备注：注意从header中获取token做验证

#### 用户取消点赞帖子

url: @/article/cancel-like-article/

发送方法：POST

发送格式

```json
{
    "username": "2333"
    "articleId": "2333",
}
```

备注：注意从header中获取token做验证

#### 用户发帖

url: @/article/post-article/

发送方法：POST

发送格式

```json
{
    "article": {
    	"title": "xx",
        "content": "xx",
        'coverB64': "xxxx", // 文章封面的base64表示
        "date": "2021-11-22"
	},
    "topics": ["top1", "top2",...]
}

```

返回格式：

```json
{
    "data": {
        "articleId": 233
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```

备注：将封面的base64存到本地并绑定到url上，存入article表中的cover_url字段。获取时间存到date字段中。

自动生成articleId，并且返回文章的articleId

记得将文章-topic存入表中，如果有不存在的topic，创建之

#### 用户删除自己帖子

url: @/article/delete-article/

method：POST

要求：

发送格式：

```json
{
    "username": "2333"
    "articleId": "xxx",
}
```

备注：

用户只能删除自己的帖子，验证下不要删除成别人的。

帖子在一起的评论也要一并删除

### 用户 <--> 回复

回复就是评价

#### 用户评论帖子

url：@/comment/post

method: POST

发送格式：

```json
{
    "username": "xxx",
    "articleId": 233,
    "content": "xxx",
    "date": "2021-11-6",
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```

#### 用户点赞评论

url：@/comment/like

method: POST

发送格式：

```json
{
    "username": "xxx",
    "commentId": 233
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```



#### 用户取消点赞评论

url：@/comment/dislike

method: POST

发送格式：

```json
{
    "username": "xxx",
    "commentId": 233
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```

#### 

### 用户 <--> 用户

#### 用户搜索用户

url: @/user/search/

发送方法：GET

发送格式：

```json
{
    keyword: "233",
    username: "233" // who triggers this search
}
```

返回格式：

```json
{
    "data": {
        "userList": [
            {
                username: "username000",
                nickname: "nickname000",
                avatarUrl: "the url of the user",
                followed: true,
            }, 
            {
                ...
            }, ...
        ]
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}


```

字段说明：

followed表示发起搜索的用户是否关注了找出来的用户

备注：

搜索内容为空时，返回空

#### 关注另一个用户

url: @/user/follow-user

method：POST

要求：

发送格式：

```json
{
    "selfUsername": "233"
    "otherUsername": "2333"
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```

备注：

#### 取消关注另一个用户

url: @/user/unfollow-user

method：POST

要求：

发送格式：

```json
{
    "selfUsername": "233"
    "otherUsername": "2333"
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```

备注：

#### 看用户简单信息

url: @/user/simple-info

method：POST

要求：

发送格式：

```json
{
    "selfUsername": "xxx"
    "viewedUsername": "2333"
}
```

返回格式：

```json
{
    "data": {
        "username": "xxx",
        "nickname": "xxx",
        "avatarUrl": xxxx,
        "posts": 233, // 该用户发了多少文章
        "followers": 233 // 该用户有多少关注者
        "followed": true // self user是否关注了被查看的user
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```

备注：

#### 看用户发布的文章

url: @/user/posts-info

method：GET

要求：

发送格式：

```json
{
    "username": "2333"
}
```

返回格式：

```json
{
    "data": {
        "articleList": [
            {
                username: "username000",
                nickname: "nickname000",
                avatarUrl: "the url of the user",
                articleId: 233
                postDate: "",
                title: "Hello World",
                brief: "article brief", // 截取文章的前<=30个字即可
                likes: 100,
                comments: 200,
                clicks: 50,
                coverUrl: "the url of the cover",
                topics: ["t1", "t2"]
            }, 
            {
                xxx
            }, ...
        ]
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```



#### 看用户发布的评论

url: @/user/comments

method：POST

要求：

发送格式：

```json
{
    "selfUsername": "233",
    "viewedUsername": "2333",
   
}
```

返回格式：

```json
{
    "data": {
        "comments": [
            {
                articleId: 233,
                articleTitle: "title",
                userId: 233, // who post this comment
                commentId: 233;
                date: "1926-08-17", // comment post date
                content: "comment content", 
                likes: 100, // 多少人点赞了该评论
                liked: true, // 用户是否点赞过这条评论
            }, 
            {
                xxx
            }, ...
        ]
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```



#### 看用户的粉丝

url: @/user/view-followers

method：POST

要求：

发送格式：

```json
{
    "selfUsername": "xxx"
    "viewedUsername": "2333"
}
```

返回格式：

```json
{
    "data": {
        followers: [
            {
                "username": "xxx",
                "nickname": "xxx",
                "avatarUrl": "xxxx",
                "followed": true // self user是否关注了这个user
            },{},...
        ]
        
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```



#### 看用户的关注

url: @/user/view-leaders

method：POST

要求：

发送格式：

```json
{
    "selfUsername": "xxx"
    "viewedUsername": "2333"
}
```

返回格式：

```json
{
    "data": {
        leaders: [
            {
                "username": "xxx",
                "nickname": "xxx",
                "avatarUrl": xxxx,
                "followed": true // self user是否关注了这个user
            },{},...
        ]
        
    },
    "status": 0,
    "statusInfo": {
        "message": "",
        "detail": ""
    }
}
```

### 用户 <--> 板块

板块就是话题（topic）

#### 查看板块下所有文章

url: @/topic/view-articles/

发送方法：GET

发送格式：

```json
{
    topicId: 233,
}
```

返回格式：

```json
{
    "data": {
       "articleList": [
            {
                username: "username000",
                nickname: "nickname000",
                avatarUrl: "the url of the user",
                articleId: 233,
                postDate: "",
                title: "Hello World",
                brief: "article brief", // 截取文章的前<=30个字即可
                likes: 100,
                comments: 200,
                clicks: 50,
                coverUrl: "the url of the cover",
                topics: ["t1", "t2"]
            }, 
            {
                ...
            }, ...
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：

搜索内容为空时，topicList返回空。

#### 用户搜索板块

url: @/topic/search/

发送方法：GET

发送格式：

```json
{
    keyword: "233",
}
```

返回格式：

```json
{
    "data": {
        topicList: [
            {	id: 233, // topicId
                name: "topic name"
                clicks: 233
            }, 
            {...}, ...
        ]
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：

搜索内容为空时，topicList返回空。

### 用户 <--> 商品

#### 搜索商品

url: @/good/search

发送方法：GET

发送格式：

```json
{
    keyword: "233"
}
```

返回格式：

```json
{
    "data": {
       goodList: [
           {
               id: 233,
               name: "233",
               price: 233,
               quantity: 23,
               content: "233",
               imgUrl: "233", 
           }
       ]
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：如果库存不足，则不要下单，注意锁的问题，order状态设置成未收货。

keyword如果为空，返回所有商品

#### 查看一件商品

url: @/good/view-good

发送方法：GET

发送格式：

```json
{
    goodId: 233
}
```

返回格式：

```json
{
    "data": {
        good: {
            id: 233,
            name: "233",
            price: 233,
            quantity: 23,
            content: "233"
            imgUrl: "233"
        },
        commentList: [
            {
                username: "233",
                nickname: "233",
                avatarUrl: "233",
                date: "2021",
                content: "233"
            }, {...}, ...
        ]
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：如果库存不足，则不要下单，注意锁的问题，order状态设置成未收货。

#### 撰写评论

url: @/good/comment

发送方法：POST

发送格式：

```json
{
    username: 233,
    goodId: 233,
    comment: "good comment",
}
```

返回格式：

```json
{
    "data": {
       
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：如果库存不足，则不要下单，注意锁的问题，order状态设置成未收货。

### 用户 <--> 订单

#### 用户查看自己的订单

url: @/order/query-orders

发送方法：GET

发送格式：

```json
{
    username: 233,
}
```

返回格式：

```json
{
    "data": {
        orderList: [
            {
                orderId: 233,
                goodId: 233,
                goodName: "233",
                imgUrl: "xxx", // 商品的图片地址
                quantity: 233,
                price: 233, // 这次订单的总价
                hasReceived: false
                date: 2021-08-17 // 下单的日期
            }
        ]
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：如果库存不足，则不要下单，注意锁的问题，order状态设置成未收货。

#### 用户购买商品

url: @/order/add-order

发送方法：POST

发送格式：

```json
{
    goodId: 233,
    orderQuantity: 233,
}
```

返回格式：

```json
{
    "data": {
        storeQuantity: 233, // 剩下的库存
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：如果库存不足，则不要下单，注意锁的问题，order状态设置成未收货。

#### 用户确认收货

url: @/order/confirm-receiving

发送方法：POST

发送格式：

```json
{
    orderId: 233,
}
```

返回格式：

```json
{
    "data": {
        
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：order状态设置成已收货即可

### 用户 <--> 购物车

#### 用户查看购物车

url: @/cart/query-cart

发送方法：GET

发送格式：

```json
{
	username: "233",
}
```

返回格式：

```json
{
    "data": {
        goodList: [
            {
                id: 233,
                name: "23",
                price: 233, // 单价
                storeQuantity: 233 // 库存
            },
            
        ]
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

注：

#### 用户添加商品到购物车

url: @/cart/add-good

发送方法：POST

发送格式：

```json
{
	username: "233",
    goodId: 233,
}
```

返回格式：

```json
{
    "data": {
        
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

注：不需要对商品的库存做任何修改，只需要添加到购物车即可。重复的话就忽视。

#### 移除购物车商品

url: @/cart/remove-good

发送方法：POST

发送格式：

```json
{
	username: "233",
    goodId: 233,
}
```

返回格式：

```json
{
    "data": {
        
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

注：

### 管理员

### 登陆

url: @/admin/manage/edit-user

发送方法：POST

发送格式：

```json
{
    user: {
        username: "233",
        password: "2333"
    }
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：

要编辑的用户名就是username，改掉这个username对应的用户的信息



### 管理员 <--> 用户

#### 搜索用户

url:@/admin/manage/user/search/

发送方法：GET

发送格式：

```json
{
     keyword："233",
     pageNum: 1,
     pageSize: 10,
}
```

返回格式：

```json
{
    "data": {
        userList: [
           {
               username: "233",
               nickname: "233",
               gender: "0",
               age: 16,
           }, {
           },...
       ]
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：

1. 若keyword为空，返回所有用户

2. 注意鉴权

3. pageNum从1开始，是用户的视角，要查找结果（pageNum-1 * pageSize）：（pageNum*pageSize)

    如果没有查到或者查找长度不够，注意数组的越界问题

#### 编辑用户信息

url: @/admin/manage/edit-user

发送方法：POST

发送格式：

```json
{
    username: "xxx",
    nickname: "xxx",
    gender: 0,
    age: 18,
}
```

返回格式：

```json
{
    "data": {
        
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：

要编辑的用户名就是username，改掉这个username对应的用户的信息

#### 删除用户

url: @/admin/manage/delete-user

发送方法：GET

发送格式：

```json
{
	username: "xxx",
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：

删除用户之间的关注关系

### 管理员<-->文章

#### 搜索文章

url: @/admin/manage/article/search

发送方法：GET

发送格式：

```json
{
    keyword: "",
    pageNum: 1,
    pageSize: 10,
}
```

返回格式：

```json
{
    "data": {
        "articleList": [
            {
                username: "username000", // 作者用户名
                nickname: "nickname000", // 作者昵称
                articleId: 233,
                postDate: "",
                title: "Hello World",
            }, 
            {
                ...
            }, ...
        ]
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：

1. 注意鉴权

2. pageNum从1开始，是用户的视角，要查找结果（pageNum-1 * pageSize）：（pageNum*pageSize)

    如果没有查到或者查找长度不够，注意数组的越界问题

3. keyword为空，返回所有结果的分页，而不是返回空

#### 删除文章

url: @/admin/manage/delete-article

发送方法：POST

发送格式：

```json
{
    articleId: 233,
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：

删除文章的评论，用户-文章关系

### 管理员 <-->商品

#### 搜索商品

url: @/admin/manage/good/search

发送方法：GET

发送格式：

```json
{
    keyword: "233",
    pageNum: 1,
    pageSize: 10,
}
```

返回格式：

```json
{
    "data": {
       goodList: [
           {
               id: 233,
               name: "233",
               price: 233,
               quantity: 23,
               content: "233",
               imgUrl: "233", 
           }
       ]
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

1. keyword如果为空，返回所有商品

2. 注意鉴权

3. pageNum从1开始，是用户的视角，要查找结果（pageNum-1 * pageSize）：（pageNum*pageSize)

    如果没有查到或者查找长度不够，注意数组的越界问题

#### 发布商品

url: @/admin/manage/post-good

发送方法：POST

发送格式：

```json
{
    good: { 
        name: "good_name", // 商品名称
        price: 233, // 商品单价
        quantity: 233, // 商品数量
        content: "xxx", // 商品的描述
        imgB64: "xxx", // 商品图片的base64
    }
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：

#### 编辑商品

url: @/admin/manage/edit-good

发送方法：POST

发送格式：

```json
{
    good: { 
        id: 233,
        name: "good_name", // 商品名称
        price: 233, // 商品单价
        quantity: 233, // 商品数量
        content: "xxx", // 商品的描述
    }
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：

#### 删除商品

url: @/admin/manage/delete-good/

发送方法：POST

发送格式：

```json
{
    id: 233,
}
```

返回格式：

```json
{
    "data": {
    },
    "status": 0,
    "statusInfo": {
        "message": "xxx",
        "detail": ""
    }
}
```

备注：
