/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v11.17.3.0 (NJsonSchema v9.10.46.0 (Newtonsoft.Json v9.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming


/** 查询组参数。 */
export class QueryGroup implements IQueryGroup {
    /** 获取或设置符号，如 and，or。 */
    op?: string | undefined;
    /** 获取或设置子查询组。 */
    groups?: QueryGroup[] | undefined;
    /** 获取或设置规则（查询条件）。 */
    rules?: Rule[] | undefined;

    constructor(data?: IQueryGroup) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.op = data["op"];
            if (data["groups"] && data["groups"].constructor === Array) {
                this.groups = [];
                for (let item of data["groups"])
                    this.groups.push(QueryGroup.fromJS(item));
            }
            if (data["rules"] && data["rules"].constructor === Array) {
                this.rules = [];
                for (let item of data["rules"])
                    this.rules.push(Rule.fromJS(item));
            }
        }
    }

    static fromJS(data: any): QueryGroup {
        data = typeof data === 'object' ? data : {};
        let result = new QueryGroup();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["op"] = this.op;
        if (this.groups && this.groups.constructor === Array) {
            data["groups"] = [];
            for (let item of this.groups)
                data["groups"].push(item.toJSON());
        }
        if (this.rules && this.rules.constructor === Array) {
            data["rules"] = [];
            for (let item of this.rules)
                data["rules"].push(item.toJSON());
        }
        return data; 
    }
}

/** 查询组参数。 */
export interface IQueryGroup {
    /** 获取或设置符号，如 and，or。 */
    op?: string | undefined;
    /** 获取或设置子查询组。 */
    groups?: QueryGroup[] | undefined;
    /** 获取或设置规则（查询条件）。 */
    rules?: Rule[] | undefined;
}

/** 规则（查询条件）。 */
export class Rule implements IRule {
    /** 获取或设置查询字段。 */
    field?: string | undefined;
    /** 获取或设置查询比较符，如 eq(=)。 */
    op?: string | undefined;
    /** 获取或设置查询数据。 */
    data?: string | undefined;
    /** 获取或设置查询值数组。 */
    datas?: string[] | undefined;

    constructor(data?: IRule) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.field = data["field"];
            this.op = data["op"];
            this.data = data["data"];
            if (data["datas"] && data["datas"].constructor === Array) {
                this.datas = [];
                for (let item of data["datas"])
                    this.datas.push(item);
            }
        }
    }

    static fromJS(data: any): Rule {
        data = typeof data === 'object' ? data : {};
        let result = new Rule();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["field"] = this.field;
        data["op"] = this.op;
        data["data"] = this.data;
        if (this.datas && this.datas.constructor === Array) {
            data["datas"] = [];
            for (let item of this.datas)
                data["datas"].push(item);
        }
        return data; 
    }
}

/** 规则（查询条件）。 */
export interface IRule {
    /** 获取或设置查询字段。 */
    field?: string | undefined;
    /** 获取或设置查询比较符，如 eq(=)。 */
    op?: string | undefined;
    /** 获取或设置查询数据。 */
    data?: string | undefined;
    /** 获取或设置查询值数组。 */
    datas?: string[] | undefined;
}

/** 排序参数 */
export class PagingSort implements IPagingSort {
    /** 获取或设置排序字段 */
    field?: string | undefined;
    /** 获取或设置排序方式 */
    sort?: string | undefined;
    /** 获取排序字符串 */
    sortOrder?: string | undefined;

    constructor(data?: IPagingSort) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.field = data["field"];
            this.sort = data["sort"];
            this.sortOrder = data["sortOrder"];
        }
    }

    static fromJS(data: any): PagingSort {
        data = typeof data === 'object' ? data : {};
        let result = new PagingSort();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["field"] = this.field;
        data["sort"] = this.sort;
        data["sortOrder"] = this.sortOrder;
        return data; 
    }
}

/** 排序参数 */
export interface IPagingSort {
    /** 获取或设置排序字段 */
    field?: string | undefined;
    /** 获取或设置排序方式 */
    sort?: string | undefined;
    /** 获取排序字符串 */
    sortOrder?: string | undefined;
}

/** 订单数据列表 */
export class Response implements IResponse {
    /** 总行数 */
    count: number;
    /** 当前页号 */
    pageIndex?: number | undefined;
    /** 每页行数 */
    pageSize?: number | undefined;
    /** 订单列表 */
    data?: OrderDetails[] | undefined;

    constructor(data?: IResponse) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.count = data["count"];
            this.pageIndex = data["pageIndex"];
            this.pageSize = data["pageSize"];
            if (data["data"] && data["data"].constructor === Array) {
                this.data = [];
                for (let item of data["data"])
                    this.data.push(OrderDetails.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Response {
        data = typeof data === 'object' ? data : {};
        let result = new Response();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["count"] = this.count;
        data["pageIndex"] = this.pageIndex;
        data["pageSize"] = this.pageSize;
        if (this.data && this.data.constructor === Array) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item.toJSON());
        }
        return data; 
    }
}

/** 订单数据列表 */
export interface IResponse {
    /** 总行数 */
    count: number;
    /** 当前页号 */
    pageIndex?: number | undefined;
    /** 每页行数 */
    pageSize?: number | undefined;
    /** 订单列表 */
    data?: OrderDetails[] | undefined;
}

/** 订单 */
export class OrderDetails2 implements IOrderDetails2 {
    /** 订单摘要 */
    subject?: string | undefined;
    /** 日期 */
    date: Date;
    /** 从何处了解本站 Id */
    hearFromId?: string | undefined;
    /** 从何处了解本站名称 */
    hearFromName?: string | undefined;
    /** 数量 */
    amount: number;
    /** 单价 */
    price: number;
    /** 金额 */
    total: number;

    constructor(data?: IOrderDetails2) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.subject = data["subject"];
            this.date = data["date"] ? new Date(data["date"].toString()) : <any>undefined;
            this.hearFromId = data["hearFromId"];
            this.hearFromName = data["hearFromName"];
            this.amount = data["amount"];
            this.price = data["price"];
            this.total = data["total"];
        }
    }

    static fromJS(data: any): OrderDetails2 {
        data = typeof data === 'object' ? data : {};
        let result = new OrderDetails2();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["subject"] = this.subject;
        data["date"] = this.date ? this.date.toISOString() : <any>undefined;
        data["hearFromId"] = this.hearFromId;
        data["hearFromName"] = this.hearFromName;
        data["amount"] = this.amount;
        data["price"] = this.price;
        data["total"] = this.total;
        return data; 
    }
}

/** 订单 */
export interface IOrderDetails2 {
    /** 订单摘要 */
    subject?: string | undefined;
    /** 日期 */
    date: Date;
    /** 从何处了解本站 Id */
    hearFromId?: string | undefined;
    /** 从何处了解本站名称 */
    hearFromName?: string | undefined;
    /** 数量 */
    amount: number;
    /** 单价 */
    price: number;
    /** 金额 */
    total: number;
}

export class OrderDetails extends OrderDetails2 implements IOrderDetails {
    id: string;
    items?: OrderItem[] | undefined;

    constructor(data?: IOrderDetails) {
        super(data);
    }

    init(data?: any) {
        super.init(data);
        if (data) {
            this.id = data["id"];
            if (data["items"] && data["items"].constructor === Array) {
                this.items = [];
                for (let item of data["items"])
                    this.items.push(OrderItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): OrderDetails {
        data = typeof data === 'object' ? data : {};
        let result = new OrderDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        if (this.items && this.items.constructor === Array) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        super.toJSON(data);
        return data; 
    }
}

export interface IOrderDetails extends IOrderDetails2 {
    id: string;
    items?: OrderItem[] | undefined;
}

/** 订单项目 */
export class OrderItem2 implements IOrderItem2 {
    /** 产品名称 */
    productName?: string | undefined;
    /** 数量 */
    amount: number;
    /** 单价 */
    price: number;
    /** 金额 */
    total: number;

    constructor(data?: IOrderItem2) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.productName = data["productName"];
            this.amount = data["amount"];
            this.price = data["price"];
            this.total = data["total"];
        }
    }

    static fromJS(data: any): OrderItem2 {
        data = typeof data === 'object' ? data : {};
        let result = new OrderItem2();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["productName"] = this.productName;
        data["amount"] = this.amount;
        data["price"] = this.price;
        data["total"] = this.total;
        return data; 
    }
}

/** 订单项目 */
export interface IOrderItem2 {
    /** 产品名称 */
    productName?: string | undefined;
    /** 数量 */
    amount: number;
    /** 单价 */
    price: number;
    /** 金额 */
    total: number;
}

export class OrderItem extends OrderItem2 implements IOrderItem {
    id: string;

    constructor(data?: IOrderItem) {
        super(data);
    }

    init(data?: any) {
        super.init(data);
        if (data) {
            this.id = data["id"];
        }
    }

    static fromJS(data: any): OrderItem {
        data = typeof data === 'object' ? data : {};
        let result = new OrderItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        super.toJSON(data);
        return data; 
    }
}

export interface IOrderItem extends IOrderItem2 {
    id: string;
}

export class Command extends OrderDetails2 implements ICommand {
    /** 订单项目列表 */
    items?: OrderItem2[] | undefined;

    constructor(data?: ICommand) {
        super(data);
    }

    init(data?: any) {
        super.init(data);
        if (data) {
            if (data["items"] && data["items"].constructor === Array) {
                this.items = [];
                for (let item of data["items"])
                    this.items.push(OrderItem2.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Command {
        data = typeof data === 'object' ? data : {};
        let result = new Command();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.items && this.items.constructor === Array) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        super.toJSON(data);
        return data; 
    }
}

export interface ICommand extends IOrderDetails2 {
    /** 订单项目列表 */
    items?: OrderItem2[] | undefined;
}

export class Command2 extends OrderDetails2 implements ICommand2 {
    /** 要编辑订单的 Id。 */
    id: string;

    constructor(data?: ICommand2) {
        super(data);
    }

    init(data?: any) {
        super.init(data);
        if (data) {
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Command2 {
        data = typeof data === 'object' ? data : {};
        let result = new Command2();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        super.toJSON(data);
        return data; 
    }
}

export interface ICommand2 extends IOrderDetails2 {
    /** 要编辑订单的 Id。 */
    id: string;
}

/** 从哪里听说数据列表 */
export class Response2 implements IResponse2 {
    /** 总行数 */
    count: number;
    /** 当前页号 */
    pageIndex?: number | undefined;
    /** 每页行数 */
    pageSize?: number | undefined;
    /** 从哪里听说列表 */
    data?: HearFromDetails[] | undefined;

    constructor(data?: IResponse2) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.count = data["count"];
            this.pageIndex = data["pageIndex"];
            this.pageSize = data["pageSize"];
            if (data["data"] && data["data"].constructor === Array) {
                this.data = [];
                for (let item of data["data"])
                    this.data.push(HearFromDetails.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Response2 {
        data = typeof data === 'object' ? data : {};
        let result = new Response2();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["count"] = this.count;
        data["pageIndex"] = this.pageIndex;
        data["pageSize"] = this.pageSize;
        if (this.data && this.data.constructor === Array) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item.toJSON());
        }
        return data; 
    }
}

/** 从哪里听说数据列表 */
export interface IResponse2 {
    /** 总行数 */
    count: number;
    /** 当前页号 */
    pageIndex?: number | undefined;
    /** 每页行数 */
    pageSize?: number | undefined;
    /** 从哪里听说列表 */
    data?: HearFromDetails[] | undefined;
}

/** 从哪里听说 */
export class HearFromDetails implements IHearFromDetails {
    /** ID */
    id: string;
    /** 名称 */
    name?: string | undefined;

    constructor(data?: IHearFromDetails) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
        }
    }

    static fromJS(data: any): HearFromDetails {
        data = typeof data === 'object' ? data : {};
        let result = new HearFromDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        return data; 
    }
}

/** 从哪里听说 */
export interface IHearFromDetails {
    /** ID */
    id: string;
    /** 名称 */
    name?: string | undefined;
}

export class Command3 implements ICommand3 {
    /** 要创建从哪里听说数据的名称 Name */
    name?: string | undefined;

    constructor(data?: ICommand3) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
        }
    }

    static fromJS(data: any): Command3 {
        data = typeof data === 'object' ? data : {};
        let result = new Command3();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        return data; 
    }
}

export interface ICommand3 {
    /** 要创建从哪里听说数据的名称 Name */
    name?: string | undefined;
}

export class Command4 extends HearFromDetails implements ICommand4 {

    constructor(data?: ICommand4) {
        super(data);
    }

    init(data?: any) {
        super.init(data);
        if (data) {
        }
    }

    static fromJS(data: any): Command4 {
        data = typeof data === 'object' ? data : {};
        let result = new Command4();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        super.toJSON(data);
        return data; 
    }
}

export interface ICommand4 extends IHearFromDetails {
}