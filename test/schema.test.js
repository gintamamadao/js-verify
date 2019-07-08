const { Schema } = require("../src/index");

describe("common", () => {
    test(`type`, () => {
        const schemaInfo = {
            type: String
        };
        new Schema(schemaInfo);
    });
    test(`type`, () => {
        expect(() => {
            const schemaInfo = {
                type: Date
            };
            new Schema(schemaInfo);
        }).toThrowError("不可识别的属性类型");
    });
    test(`type`, () => {
        expect(() => {
            const schemaInfo = {
                hint: {
                    required: "required"
                }
            };
            new Schema(schemaInfo);
        }).toThrowError("不可识别的属性类型");
    });
    test(`methods`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                a: 1
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的校验属性");
    });
    test(`hint`, () => {
        const schemaInfo = {
            type: String,
            hint: {
                required: "required"
            }
        };
        new Schema(schemaInfo);
    });
    test(`hint`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                hint: "a"
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的校验属性");
    });
    test(`hint`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                hint: {
                    a: 1
                }
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的提示信息属性");
    });
    test(`custom`, () => {
        const schemaInfo = {
            type: String,
            custom: () => true
        };
        new Schema(schemaInfo);
    });
    test(`custom`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                custom: "a"
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的校验属性");
    });
    test(`index`, () => {
        const schemaInfo = {
            type: String,
            index: "1"
        };
        new Schema(schemaInfo);
    });
    test(`index`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                index: {}
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的校验属性");
    });
});

describe("string", () => {
    test(`pattern`, () => {
        const schemaInfo = {
            type: String,
            pattern: "email"
        };
        new Schema(schemaInfo);
    });
    test(`pattern`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                pattern: "a"
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的格式类型");
    });
    test(`length`, () => {
        const schemaInfo = {
            type: String,
            length: { min: 3, max: 32 }
        };
        new Schema(schemaInfo);
    });
    test(`length`, () => {
        const schemaInfo = {
            type: String,
            length: { min: 3 }
        };
        new Schema(schemaInfo);
    });
    test(`length`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                length: {}
            };
            new Schema(schemaInfo);
        }).toThrowError("空的长度信息");
    });
    test(`length`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                length: { a: 1 }
            };
            new Schema(schemaInfo);
        }).toThrowError("空的长度信息");
    });
    test(`enum`, () => {
        const schemaInfo = {
            type: String,
            enum: ["a", "b"]
        };
        new Schema(schemaInfo);
    });
    test(`enum`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                enum: []
            };
            new Schema(schemaInfo);
        }).toThrowError("空的枚举信息");
    });
    test(`enum`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                enum: {}
            };
            new Schema(schemaInfo);
        }).toThrowError("空的枚举信息");
    });
    test(`enum`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                enum: [1, 2]
            };
            new Schema(schemaInfo);
        }).toThrowError("错误的枚举信息");
    });
});

describe("number", () => {
    test(`range`, () => {
        const schemaInfo = {
            type: Number,
            range: { min: 3, max: 32 }
        };
        new Schema(schemaInfo);
    });
    test(`range`, () => {
        const schemaInfo = {
            type: Number,
            range: { min: 3 }
        };
        new Schema(schemaInfo);
    });
    test(`range`, () => {
        expect(() => {
            const schemaInfo = {
                type: Number,
                range: {}
            };
            new Schema(schemaInfo);
        }).toThrowError("空的范围信息");
    });
    test(`range`, () => {
        expect(() => {
            const schemaInfo = {
                type: Number,
                range: { a: 1 }
            };
            new Schema(schemaInfo);
        }).toThrowError("空的范围信息");
    });
    test(`integer`, () => {
        const schemaInfo = {
            type: Number,
            integer: true
        };
        new Schema(schemaInfo);
    });
    test(`integer`, () => {
        expect(() => {
            const schemaInfo = {
                type: Number,
                integer: "a"
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的校验属性");
    });
    test(`natural`, () => {
        const schemaInfo = {
            type: Number,
            natural: true
        };
        new Schema(schemaInfo);
    });
    test(`natural`, () => {
        expect(() => {
            const schemaInfo = {
                type: Number,
                natural: "a"
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的校验属性");
    });
    test(`enum`, () => {
        const schemaInfo = {
            type: Number,
            enum: [1, 2]
        };
        new Schema(schemaInfo);
    });
    test(`enum`, () => {
        expect(() => {
            const schemaInfo = {
                type: Number,
                enum: []
            };
            new Schema(schemaInfo);
        }).toThrowError("空的枚举信息");
    });
    test(`enum`, () => {
        expect(() => {
            const schemaInfo = {
                type: Number,
                enum: {}
            };
            new Schema(schemaInfo);
        }).toThrowError("空的枚举信息");
    });
    test(`enum`, () => {
        expect(() => {
            const schemaInfo = {
                type: Number,
                enum: ["a", "b"]
            };
            new Schema(schemaInfo);
        }).toThrowError("错误的枚举信息");
    });
});

describe("object", () => {
    test(`restrict`, () => {
        const schemaInfo = {
            type: Object,
            restrict: true,
            props: []
        };
        new Schema(schemaInfo);
    });
    test(`restrict`, () => {
        expect(() => {
            const schemaInfo = {
                type: Object,
                restrict: true
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的校验属性");
    });
    test(`restrict`, () => {
        const schemaInfo = {
            type: Object,
            props: {
                type: String
            }
        };
        new Schema(schemaInfo);
    });
    test(`restrict`, () => {
        const schemaInfo = {
            type: Object,
            props: [
                {
                    index: "a",
                    type: String
                },
                {
                    index: "b",
                    type: Number
                }
            ]
        };
        new Schema(schemaInfo);
    });
    test(`props`, () => {
        expect(() => {
            const schemaInfo = {
                type: Object,
                props: {}
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的校验属性");
    });
    test(`props`, () => {
        expect(() => {
            const schemaInfo = {
                type: Object,
                props: "a"
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的校验属性");
    });
});

describe("array", () => {
    test(`elements`, () => {
        const schemaInfo = {
            type: Array,
            elements: {
                type: String,
                pattern: "email"
            }
        };
        new Schema(schemaInfo);
    });
    test(`elements`, () => {
        const schemaInfo = {
            type: Array,
            elements: [
                {
                    type: String,
                    pattern: "email"
                }
            ]
        };
        new Schema(schemaInfo);
    });
    test(`elements`, () => {
        expect(() => {
            const schemaInfo = {
                type: Array,
                elements: "a"
            };
            new Schema(schemaInfo);
        }).toThrowError("非法的校验属性");
    });
    test(`length`, () => {
        const schemaInfo = {
            type: Array,
            length: { min: 3, max: 32 }
        };
        new Schema(schemaInfo);
    });
    test(`length`, () => {
        const schemaInfo = {
            type: Array,
            length: { min: 3 }
        };
        new Schema(schemaInfo);
    });
    test(`length`, () => {
        expect(() => {
            const schemaInfo = {
                type: Array,
                length: {}
            };
            new Schema(schemaInfo);
        }).toThrowError("空的长度信息");
    });
    test(`length`, () => {
        expect(() => {
            const schemaInfo = {
                type: Array,
                length: { a: 1 }
            };
            new Schema(schemaInfo);
        }).toThrowError("空的长度信息");
    });
    test(`multiple`, () => {
        const schemaInfo = [
            {
                type: String
            },
            {
                type: Number
            }
        ];
        new Schema(schemaInfo);
    });
});
