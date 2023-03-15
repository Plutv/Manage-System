## 思路
- 后端直接采用JS编码，大概框架已在demo中给出，其实我们做的就是模仿这种框架，修改函数方法，实现自己需要的功能即可，koa框架给后端搭建带来了很多便利，router负责处理对应的请求，koa-body可以解析请求报文，解析出request的数据，以及发送response数据等。
- 使用session，在每次登陆成功后，将其用户名保存在客户端中，下次访问页面是无需再次登录，除非在客户端将cookie清空删除，判断是否登录的依据就是ctx.session.user是否存在，如果存在就返回code=0说明已经登录，不存在就要返回code=-2，客户端根据code的值判断是否登录，能否进行进一步修改操作，其中code=-1是在密码错误时返回的值，因此，当点击退出登录时，需要将ctx.session.user置为null，清除后端session中已登录的状态。
- 在对request做出响应时，需要执行不同的方法，当接收到修改列表的请求时，需要先判断用户是否登录，如果已经登录，才能继续进行下一步操作，否则返回到登录页面；在方法中进行文件的读写操作，以及给ctx.body赋值，返回给客户端需要的数据，例如删除用户，就是在判断用户已经登录之后，使用fs.writeFileSync方法，将删除后的list写回文件中，返回给客户端`message:"删除成功"`。