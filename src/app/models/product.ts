export class Product{
    "AUTHOR": { type: String };
    "SKU":"";
    "BRAND":{ type: String };
    "CATEGORY": { type: String };
    "COLOR": { type: String };
    "DESCRIPTION": { type: String };
    "DISCOUNTRATE": { type: Number};
    "FLOUR": { type: Boolean, default: false };
    "GRIHASTHI":{ type: Boolean, default: false };
    "ISACTIVE": { type: Boolean, default: true };
    "ISDELETED": { type: Boolean, default: false };
    "ISREDUCESTOCK": { type: Number,default:0};
    "QTY":{ type: Number,default:0};
    "MRP": "";
    "NAME":  { type: String };
    "OIL":  { type: Boolean, default: false };
    "PUBLISHER":  { type: String };
    "PULSE": { type: Boolean, default: false };
    "RICE": { type: Boolean, default: false };
    "SHIPPINGCHARGES":  { type: Number};
    "STOCKLEVEL":  { type: Number};
    "STYLE":  { type: String };
    "SUBCATEGORY":{ type: String };
    "TAXRATE":  { type: Number};
    "NETPRICE":{ type: Number};
    "TYPE": { type: String };
    "PRODUCT_ID": { type: String };
    "images":any
}