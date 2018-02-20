export class Product{
    product_id:"";
    product_type:Number=0;
    product_name:String="";
    product_price:Number=0;
    images=[];
    description:String="";
    off:Number=0;
    default_qty:Number=0;
    is_active:Boolean=false;
    is_deleted:Boolean=false;
    is_pending:Boolean=false;
    created_by_id:String="";
    created_date:String;
    last_updated:String;
}