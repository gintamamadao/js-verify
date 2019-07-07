# schema-verify

verify data type and schema

## 项目简介

js 本身是一种弱类型语音，但有时候我们需要严格限制数据的类型或者结构，本项目设计的目的是能对 js 中的数据类型和数据结构根据一定规则进行校验分析。
本项目的设计思路借鉴于 npm 上 validate 这个项目，但逻辑为独立完成。

## 安装

```sh
npm i schema-verify --save
```

## 使用例子

```js
const { Schema } = require("schema-verify");

const schemaInfo = {
    type: Object,
    restrict: true,
    hint: {
        type: "type error hint text",
        restrict: "restrict error hint text"
    },
    props: [
        {
            index: "email",
            required: true,
            type: String,
            pattern: "email",
            length: { min: 3, max: 32 },
            match: /abc/
        },
        {
            index: "str",
            required: true,
            type: String,
            enum: ["a", "b", "c"]
        },
        {
            index: "no",
            required: true,
            type: Number,
            range: { min: 0, max: 2 },
            natural: true,
            enum: [1, 2],
            custom: () => true
        },
        {
            index: "obj",
            required: true,
            type: Object,
            restrict: true,
            props: [
                {
                    index: "phone",
                    required: true,
                    type: String,
                    pattern: "phone"
                }
            ]
        },
        {
            index: "arr",
            required: true,
            type: Array,
            length: { min: 0, max: 2 },
            elements: [
                {
                    index: 0,
                    type: Object,
                    required: true,
                    restrict: true,
                    props: [
                        {
                            index: "uri",
                            required: true,
                            type: String,
                            pattern: "uri"
                        }
                    ]
                },
                {
                    type: String,
                    enum: ["a", "b", "c"]
                }
            ]
        }
    ]
};

const schema = new Schema(schemaInfo);

const data = {
    email: "abc@abc.abc",
    str: "a",
    no: 1,
    obj: {
        phone: "12312345123"
    },
    arr: [
        {
            uri: "https://abc.abc"
        },
        "a"
    ]
};
schema.verify(data);
```

-   schemaInfo 即我们设计的数据结构的规则
-   schema 就是我们基于规则 schemaInfo 新建的一个校验实例
-   data 就是实际要校验的数据
-   schema.verify 表示对数据按照规则进行校验

## 校验规则

<!-- TOC -->

-   [type](#type)
-   [pattern](#pattern)
-   [match](#match)
-   [length](#length)
-   [enum](#enum)
-   [range](#range)
-   [integer](#integer)
-   [natural](#natural)
-   [props](#props)
-   [required](#required)
-   [restrict](#restrict)
-   [elements](#elements)
-   [index](#index)
-   [schema](#schema)
-   [custom](#custom)
-   [hint](#hint)

### type

数据类型校验规则，校验实例必须要有的校验规则

-   String， 字符串
-   Number， 数字
-   Object， 对象
-   Array， 数组

有些校验规则是某特定类型才能设置

```js
const schemaInfo = {
    type: String
};
const schema = new Schema(schemaInfo);
schema.verify("a");
// true
schema.verify(1);
// false
```

### pattern

特殊字符串格式校验规则。

-   phone， 手机号
-   uri， 链接
-   email， 邮箱地址
-   color， 颜色
-   version， 版本号
-   sign， 仅允许由字母，数字和下划线组成，首字符必须为字母或者下划线
-   numStr， 仅允许数字组成
-   jsonStr， json 字符串，代码用 JSON.parse 实现校验
-   time， 时间格式，代码用 new Date(time) 实现校验

```js
const schemaInfo = {
    type: String,
    pattern: "email"
};
const schema = new Schema(schemaInfo);
schema.verify("abc@abc.abc");
// true
schema.verify("abc");
// false
```

### match

自定义特殊字符串格式校验规则，如果 pattern 中的规则不符合你的需求，可以在 match 里定义自己的正则规则。

```js
const schemaInfo = {
    type: String,
    match: /abc/
};
const schema = new Schema(schemaInfo);
return schema.verify(data);
schema.verify("abc");
// true
schema.verify("bcd");
// false
```

### length

字符串长度或者数组的长度校验规则。

-   min， 最小长度，字符串（数组）的长度必须大于或等于最小长度
-   max， 最大长度，字符串（数组）的长度必须小于或等于最大长度

规则中，min，max 两个属性中必须要有一个

```js
const schemaInfo = {
    type: String,
    length: { min: 1, max: 2 }
};
const schema = new Schema(schemaInfo);
schema.verify("aa");
// true
schema.verify("aaa");
// false
schema.verify("");
// false
```

### enum

合法值枚举校验规则，字符串或者数字只能是一组值中的某一个。

```js
const schemaInfo = {
    type: String,
    enum: ["a", "b", "c"]
};
const schema = new Schema(schemaInfo);
schema.verify("a");
// true
schema.verify("b");
// true
schema.verify("d");
// false
```

### range

数值的范围校验规则，仅数值类型可用。

-   min， 最小值，数值必须大于或等于最小值
-   max， 最大值，数值必须小于或等于最大值

规则中，min，max 两个属性中必须要有一个

```js
const schemaInfo = {
    type: Number,
    range: { min: 1, max: 2 }
};
const schema = new Schema(schemaInfo);
schema.verify(1);
// true
schema.verify(2);
// true
schema.verify(0);
// false
```

### integer

数字是否是整数。

```js
const schemaInfo = {
    type: Number,
    integer: true
};
const schema = new Schema(schemaInfo);
schema.verify(1);
// true
schema.verify(-1);
// true
schema.verify(0.5);
// false
```

### natural

数字是否是自然数。

```js
const schemaInfo = {
    type: Number,
    natural: true
};
const schema = new Schema(schemaInfo);
schema.verify(1);
// true
schema.verify(-1);
// false
schema.verify(0.5);
// false
```

### props

该规则只有类型为 Object 才能设置，是用于设置对象属性的校验规则。

```js
const schemaInfo = {
    type: Object,
    props: [
        {
            index: "a",
            type: Number
        }
    ]
};
const schema = new Schema(schemaInfo);
schema.verify({
    a: 1
});
// true
schema.verify({
    b: 1
});
// true
schema.verify({
    a: "a"
});
// false
```

也可以用一个校验实例作为对象属性的校验规则。

```js
const schemaRule = new Schema({
    type: Number
});
const schemaInfo = {
    type: Object,
    props: schemaRule
};
const schema = new Schema(schemaInfo);
schema.verify({
    a: 1
});
// true
schema.verify({
    b: 1
});
// true
schema.verify({
    a: "a"
});
// false
schema.verify({
    b: "b"
});
// false
```

### required

属性是否必须存在，该规则只有 props 或者 elements 里的规则设置才有效。

```js
const schemaInfo = {
    type: Object,
    props: [
        {
            index: "a",
            type: String,
            required: true
        }
    ]
};
const schema = new Schema(schemaInfo);
schema.verify({
    a: "a"
});
// true
schema.verify({});
// false
schema.verify({
    b: "b"
});
// false
```

### restrict

属性是否要被限制，该规则只有类型为 Object 才能设置, 当规则设置为 true，对象的属性只能是 props 中出现的属性。

```js
const schemaInfo = {
    type: Object,
    restrict: true,
    props: [
        {
            index: "a",
            type: String
        },
        {
            index: "b:",
            type: String
        }
    ]
};
const schema = new Schema(schemaInfo);
schema.verify({
    a: "a",
    b: "b"
});
// true
schema.verify({});
// true
schema.verify({
    a: "a",
    b: "b",
    c: "c"
});
// false
schema.verify({
    c: "c"
});
// false
```

### elements

该规则只有类型为 Array 才能设置，是用于设置数组元素的校验规则。规则内容可以为对象或者数组，对象表示所有元素用同一个规则，数组则可以指定某个元素用特定规则

```js
const schemaInfo = {
    type: Array,
    elements: {
        type: String,
        required: true
    }
};
const schema = new Schema(schemaInfo);
schema.verify(["a"]);
// true
schema.verify(["a", "b"]);
// true
schema.verify([]);
// false，因为 required 为 true，所以数组不能为空
schema.verify([1]);
// false
```

也可以用一个校验实例作为元素的校验规则。

```js
const schemaRuleA = new Schema({
    index: 0,
    type: String
});

const schemaRuleB = new Schema({
    index: 1,
    type: Number
});

const schemaInfo = {
    type: Array,
    elements: [schemaRuleA, schemaRuleB]
};
const schema = new Schema(schemaInfo);
schema.verify(["a", 1]);
// true
schema.verify(["a", "b"]);
// false
```

### index

设置要校验元素的索引，该规则只有 elements 里的规则设置才有效。

```js
const schemaInfo = {
    type: Array,
    elements: [
        {
            index: 0,
            type: String,
            required: true
        },
        {
            index: 1,
            type: Number,
            required: true
        }
    ]
};
const schema = new Schema(schemaInfo);
schema.verify(["a", 1]);
// true
schema.verify(["a", "b"]);
// false
```

### schema

可以设置一个校验实例作为规则，如果规则中没有 type 规则，就会自动取 schema 校验实例的 type 规则

```js
const schemaRule = new Schema({
    type: String,
    pattern: "email"
});
const schemaInfo = {
    schema: schemaRule
};
const schema = new Schema(schemaInfo);
schema.verify("abc@abc.abc");
// true
schema.verify("aaa");
// false
```

### custom

如果没有校验符合你的需求，也可以设置自己的校验函数。自定义校验函数会在最后执行，函数会传入两个默认参数，一个是当前值，一个是父节点值。

```js
const schemaInfo = {
    type: String,
    custom: v => v.match(/a/)
};
const schema = new Schema(schemaInfo);
const data = "a";
schema.verify("a");
// true
schema.verify("b");
// false
```

### hint

设置某些规则错误后抛出的错误提示，schema.verify 的第二个参数为 true 时错误才会抛出。

```js
const schemaInfo = {
    type: String,
    hint: {
        type: "数据类型错误，需要字符串类型"
    }
};
const schema = new Schema(schemaInfo);
schema.verify(1, true);
// throw Error: 数据类型错误，需要字符串类型
```
