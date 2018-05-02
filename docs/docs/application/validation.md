# 数据校验

在对数据进行操作时，需要为传入的数据进行校验，如在 `ApplicationService` 类中，执行 `Add(entity)` 方法时，首先要验证 `entity` 参数值的正确性。

在 **LUNZ#** 中，使用 `ResponseResult` 类和 `ResponseResult<T>` 类作为校验结果的对象。

## NuGet package

[Lunz.Kernel](http://lunztech.cn)

## 如何开始？

### 0. 使用 NuGet 安装 [Lunz.Kernel](http://lunztech.cn) 类库

### 1. 校验数据

添加引用 `using Lunz.Kernel.Exceptions;`

    // 方式一
    if(string.IsNullOrWhiteSpace(client.ClientId))
        return ResponseResult.Error(new RequiredException("标识"));

    // 方式二
    if(string.IsNullOrWhiteSpace(client.ClientId))
        return ResponseResult.Error("标识不能为空。");

    // 方式三
    if(string.IsNullOrWhiteSpace(client.ClientId))
        return ResponseResult.Error(new ValidationException("标识", "标识必填。"));

点击[这里](response-result)了解 `ResponseResult` 类和 `ResponseResult<T>` 类更多信息。

## Exception 类集合

使用 ValidattionException 对应的类返回校验信息，以统一校验信息格式。

### ValidationException 类
数据验证的 `Exception`。

### EmailException 类
Email 验证的 `Exception`。

### MaxValueException 类
最大值验证的 `Exception`。

### MinValueException 类
最小值验证的 `Exception`。

### MaxLengthException 类
值最大字符长度验证的 `Exception`。

### MinLengthException 类
值最小字符长度验证的 `Exception`。

### NotFoundException 类
未能找到对象的 `Exception`。

### RequiredException 类
必填验证的 `Exception`。

### UniqueException 类
唯一验证的 `Exception`。