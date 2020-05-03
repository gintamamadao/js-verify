import { Schema } from "./schema";

export type TypeTypes =
    | "string"
    | "number"
    | "object"
    | "array"
    | "function"
    | "boolean"
    | "null";

export type PatternTypes =
    | "phone"
    | "uri"
    | "email"
    | "color"
    | "version"
    | "sign"
    | "numStr"
    | "jsonStr"
    | "time";

export type RangeType = {
    min?: number;
    max?: number;
};

export type LengthTypes = RangeType | number;

export type EnumTypes =
    | string[]
    | number[]
    | {
          [prop: string]: string | number;
      };

export type EleType = {
    index: string | number;
} & SchemaInfo;

export type PropsType =
    | {
          [prop: string]: SchemaInfo;
      }
    | EleType[]
    | Schema;

export type ElementsType = SchemaInfo | EleType[];

export type CustomType = (value: any, pattern: any) => boolean;

export type HintType = {
    [prop: string]: string;
};

export type SingleSchemaInfo = {
    type?: TypeTypes;
    pattern?: PatternTypes;
    match?: RegExp;
    length?: LengthTypes;
    minLength?: number;
    maxLength?: number;
    enum?: EnumTypes;
    range?: RangeType;
    min?: number;
    max?: number;
    integer?: boolean;
    natural?: boolean;
    props?: PropsType;
    required?: boolean;
    restrict?: boolean;
    elements?: ElementsType;
    schema?: Schema;
    custom?: CustomType;
    hint?: HintType;
};

export type SchemaInfo = SingleSchemaInfo | SingleSchemaInfo[];
