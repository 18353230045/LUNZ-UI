###说明
> 操作系统：CentOS 7.4 64位

> 服务器：Nginx；版本：1.12.2

###安装Nginx

    命令：yum install nginx

###上传LUNZ+项目文件

    命令：rz  

[注：若提示command not found，说明没有安装上传命令，请先安装上传下载命令：yum install -y lrzsz]

###解压缩项目文件

    命令：unzip 项目文件名

[若提示command not found，说明没有安装解压缩命令，请先安装解压缩命令：yum install -y unzip]

###创建存放项目目录

    命令：mkdir 项目目录名

###复制项目文件至项目目录

    命令：cp 项目文件 项目目录

###修改Nginx配置文件nginx.conf（使用vi编辑器）

    命令：vi nginx.conf

    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        index index.html;
        root         /website/lunz+/wwwroot;  #此路径改为项目文件所在目录

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
               try_files $uri $uri/ /index.html;  #添加重定向配置
        }                                    

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

###重新启动Nginx

    命令：nginx -s reload
    
###将域名解析至服务器IP即可访问