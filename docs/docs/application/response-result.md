# 响应结果

在对数据进行操作后，需要为调用方返回处理结果，如在 `ApplicationService` 类中，执行 `Add(entity)` 方法后，返回给调用方 `entity` 对应的 `Id` 值；或者在方法中，一些验证信息和业务逻辑校验失败信息返回给调用方。

在 **LUNZ#** 中，使用 `ResponseResult` 类和 `ResponseResult<T>` 类作为响应结果的对象。

## NuGet package

[Lunz.Kernel](http://lunztech.cn)

## 如何开始？

### 0. 使用 NuGet 安装 [Lunz.Kernel](http://lunztech.cn) 类库

### 1. 应用响应结果

添加引用 `using Lunz.Kernel;`

### 1.1. 使用 `ResponseResult` 类

    public ResponseResult AddClient(Client client)
    {
        if(string.IsNullOrWhiteSpace(client.ClientId))
            // 返回失败的 ResponseResult 对象
            return ResponseResult.Error(new RequiredException("标识"));
        
        // do anything...

        // 返回成功的 ResponseResult 对象
        return ResponseResult.Ok();
    }

    // 调用时
    var result = _applicationService.AddClient(client);
    if(result.IsValid)
    {
        // 成功，do anything...
    }
    else
    {
        // 失败，do anything...
        var errorMessage = string.Join(", ", result.Errors);
    }


### 1.2. 使用 `ResponseResult<T>` 类

    public ResponseResult<Client> AddClient(Client client)
    {
        if (string.IsNullOrWhiteSpace(client.ClientId))
            // 返回失败的 ResponseResult<Client> 对象
            return ResponseResult<Client>.Error(new RequiredException("标识"));

        // do anything...

        // 返回成功的 ResponseResult<Client> 对象
        return ResponseResult<Client>.Ok(client);
    }

    // 调用时
    var result = _applicationService.AddClient(client);
    if(result.IsValid)
    {
        // 成功，do anything...
        var newClient = result.Data;
    }
    else
    {
        // 失败，do anything...
        var errorMessage = string.Join(", ", result.Errors);
    }

## API

### ResponseResult 类

无数据的响应结果。

#### 属性

`Errors`    
获取错误信息集合。

`Exceptions`      
获取异常集合。

`IsValid`      
获取是否有效。

#### 方法

`AddError(string errorMessage)`      
添加错误信息。

`AddErrors(params string[] errorMessages)`      
添加错误信息。

`AddError(Exception exception)`      
添加错误信息。

`AddErrors(params Exception[] exceptions)`      
添加错误信息。

#### 静态方法

`ResponseResult Ok()`      
以成功的方式初始化 `ResponseResult` 对象的实例。

`ResponseResult Error(params string[] errorMessages)`    
以失败的方式初始化 `ResponseResult` 对象的实例。

`ResponseResult Error(params Exception[] exceptions)`    
以失败的方式初始化 `ResponseResult` 对象的实例。

### ResponseResult&lt;T&gt; 类

有数据的响应结果。

#### 属性

`Errors`    
获取错误信息集合。

`Exceptions`      
获取异常集合。

`IsValid`      
获取是否有效。

`Data`   
获取或设置响应的数据。

#### 方法

`AddError(string errorMessage)`      
添加错误信息。

`AddErrors(params string[] errorMessages)`      
添加错误信息。

`AddError(Exception exception)`      
添加错误信息。

`AddErrors(params Exception[] exceptions)`      
添加错误信息。

#### 静态方法

`ResponseResult<T> Ok(T data)`      
以成功的方式初始化 `ResponseResult<T>` 对象的实例。

`ResponseResult<T> Error(string errorMessage, T data = default(T))`    
以失败的方式初始化 `ResponseResult<T>` 对象的实例。

`ResponseResult<T> Error(Exception exception, T data = default(T))`     
以失败的方式初始化 `ResponseResult<T>` 对象的实例。

`ResponseResult<T> Error(T data = default(T), params string[] errorMessages)`    
以失败的方式初始化 `ResponseResult<T>` 对象的实例。

`ResponseResult<T> Error(T data = default(T), params Exception[] exceptions)`    
以失败的方式初始化 `ResponseResult<T>` 对象的实例。